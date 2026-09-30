import { AudioEngine } from '@/lib/audio-engine';
import { ext, sendRuntimeMessage } from '@/lib/browser';
import { neutralSettings } from '@/lib/defaults';
import { sanitizeSettings } from '@/lib/validate';
import { AttachmentRegistry } from '@/content/attachments';
import { mediaEligibility } from '@/content/eligibility';
import type {
  AudioPathway,
  AudioSettings,
  BackgroundToContentMessage,
  ContentToBackgroundMessage,
} from '@/types';

/**
 * Content script: finds media elements on the page, routes them through the
 * shared AudioEngine, and keeps the background informed about what it can see.
 *
 * A single AudioContext and a single engine serve the whole page. Every media
 * element gets its own MediaElementAudioSourceNode (the spec allows exactly one
 * per element, for the lifetime of that element) feeding into that shared
 * engine, so the user's settings apply to whatever is currently playing.
 *
 * The hard part is single-page apps. On Netflix, YouTube and Twitch, moving to
 * the next episode or stream does not reload the document: the old <video> is
 * torn out of the DOM and a new one is inserted, often before it has any media
 * attached to it. A naive implementation attaches once, never notices the
 * swap, and leaves the user with a UI that claims 400 % while the new element
 * plays at 100 %. Everything below exists to close that gap:
 *
 *   - new elements are discovered through a MutationObserver *and* through
 *     capture-phase media events, because some players create their element
 *     inside a shadow root the observer cannot see;
 *   - settings are re-applied on every attach, not just on the first one;
 *   - a failed attach is retried with backoff instead of being written off,
 *     since players routinely insert an empty <video> and set .src later;
 *   - removed elements are dropped from the live set so the reported count and
 *     the active pathway always describe what is really playing.
 */

let context: AudioContext | null = null;
let engine: AudioEngine | null = null;
let settings: AudioSettings = neutralSettings();
let pathway: AudioPathway = 'idle';

/**
 * Whether this document has seen something the autoplay policy accepts as a
 * reason to start audio: a real user gesture, or media that is already playing
 * (which can only have started from a gesture or an allowed autoplay).
 *
 * Calling resume() without one is not an error - the promise simply rejects -
 * but Chrome logs a console warning every time, and a boost applied from the
 * popup produces no gesture in the page at all. Gating the call keeps the
 * page's console clean while losing nothing: the graph is already built, and
 * the moment a gesture arrives the resume runs.
 */
let audioUnlocked = false;

/** How many times a single element may fail to attach before we give up. */
const MAX_ATTACH_ATTEMPTS = 6;
/** Backoff schedule in milliseconds, indexed by attempt number. */
const RETRY_DELAYS_MS = [150, 400, 900, 1800, 3000, 5000];

/**
 * Which elements are routed into the engine. The rules this enforces are in
 * `attachments.ts`, where they are covered by tests: entries are never deleted
 * and source nodes never disconnected, because both would silence an element
 * that the page later reuses.
 */
const attachments = new AttachmentRegistry<HTMLMediaElement, MediaElementAudioSourceNode>();

/**
 * Elements that have fired `encrypted`. The event can arrive well before the
 * player calls setMediaKeys, and remembering it closes that gap.
 */
const encryptedMedia = new WeakSet<HTMLMediaElement>();

function post(message: ContentToBackgroundMessage): void {
  try {
    void sendRuntimeMessage(message).catch(() => undefined);
  } catch {
    // The background may be asleep or the extension reloading; the next probe
    // resynchronises us.
  }
}

function connectedCount(): number {
  return attachments.connectedCount();
}

function reportCount(): void {
  post({ type: 'content:media-count', count: connectedCount() });
}

function setPathway(next: AudioPathway, reason?: string): void {
  if (pathway === next) return;
  pathway = next;
  post(
    reason
      ? { type: 'content:pathway', pathway: next, reason }
      : { type: 'content:pathway', pathway: next },
  );
}

/** True when the settings would leave the audio untouched. */
function isNeutral(value: AudioSettings): boolean {
  return (
    value.bypassed ||
    (value.gain === 1 &&
      !value.mono &&
      value.balance === 0 &&
      value.equalizer.every((band) => band === 0))
  );
}

/**
 * Builds the audio graph, creating the AudioContext on first use.
 *
 * Chrome logs "The AudioContext was not allowed to start" when a context is
 * constructed before the page has had a user gesture. That warning is
 * informational: the context is created suspended and starts working at the
 * first gesture, which `resumeIfUnlocked` waits for. Deferring construction
 * until after a gesture would be worse - the graph has to exist before a media
 * element can be routed into it, and the element usually appears first.
 */
function ensureEngine(): AudioEngine | null {
  if (engine) return engine;
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) {
      setPathway('unavailable', 'Web Audio API is not available on this page');
      return null;
    }
    context = new Ctor();
    engine = new AudioEngine(context);
    engine.apply(settings);
    return engine;
  } catch (error) {
    setPathway(
      'unavailable',
      error instanceof Error ? error.message : 'AudioContext creation failed',
    );
    return null;
  }
}

/**
 * Attempts to route one media element into the engine.
 *
 * `createMediaElementSource` throws for cross-origin media served without CORS
 * headers, and it can throw on an element that has no media attached yet. The
 * second case is temporary and extremely common in SPA players, so a failure
 * schedules a retry rather than blacklisting the element. Only after
 * MAX_ATTACH_ATTEMPTS do we conclude the page genuinely cannot be boosted.
 *
 * Nothing is routed while the settings are neutral: wrapping an element cannot
 * be undone, so a page the user never boosted is never touched. Nor is an
 * element routed before it plays, nor an encrypted one before its keys are in -
 * `eligibility.ts` explains why capturing early broke DRM players such as
 * Prime Video.
 */
function attach(element: HTMLMediaElement, immediate = false): void {
  const existing = attachments.get(element);
  if (!existing?.source) {
    if (isNeutral(settings)) return;

    if (mediaEligibility(element, encryptedMedia.has(element)) === 'wait') return;
  }

  const attachment = existing ?? attachments.ensure(element);

  if (attachment.connected) {
    // Already routed. Re-apply so a settings change made while this element was
    // being swapped in is not lost.
    engine?.apply(settings);
    return;
  }
  if (attachment.timer !== null && !immediate) return;
  attachments.clearRetry(element);

  const activeEngine = ensureEngine();
  if (!activeEngine || !context) return;

  try {
    // An element that already has a source node from an earlier attempt must be
    // reused; a second createMediaElementSource for the same element throws
    // InvalidStateError, and there is no way to undo the first one.
    const source = attachment.source ?? context.createMediaElementSource(element);

    // Connecting a node that is already connected to the same destination is a
    // no-op, so this safely rewires an element the page detached and restored.
    source.connect(activeEngine.inputNode);
    attachments.markConnected(element, source);

    // Re-apply on every successful attach. This is the line that keeps the next
    // episode at the volume the user chose for the previous one.
    activeEngine.apply(settings);
    resumeIfUnlocked();

    setPathway('media-element');
    reportCount();
  } catch (error) {
    const attempts = attachments.recordFailure(element);
    if (attempts >= MAX_ATTACH_ATTEMPTS) {
      setPathway(
        'unavailable',
        error instanceof Error
          ? error.message
          : 'Media element could not be routed',
      );
      return;
    }
    const delay =
      RETRY_DELAYS_MS[attempts - 1] ??
      RETRY_DELAYS_MS[RETRY_DELAYS_MS.length - 1] ??
      1000;
    attachments.scheduleRetry(
      element,
      setTimeout(() => attach(element, true), delay),
    );
  }
}

/**
 * Marks an element that has left the DOM as no longer counted.
 *
 * The source node stays wired and the entry stays in the registry - see
 * `attachments.ts` for why undoing either would mute the element for good.
 */
function forget(element: HTMLMediaElement): void {
  if (!attachments.has(element)) return;
  attachments.markDisconnected(element);
  reportCount();

  // With nothing connected left, stop claiming the media-element pathway so the
  // popup can tell the user the page is not currently being boosted.
  if (connectedCount() === 0 && pathway === 'media-element') {
    setPathway('idle');
  }
}


/**
 * Collects media elements from a subtree, descending into open shadow roots.
 * Several large video sites render their player inside a shadow DOM, where a
 * plain querySelectorAll finds nothing.
 */
function collectMedia(root: ParentNode, found: HTMLMediaElement[] = []): HTMLMediaElement[] {
  for (const element of root.querySelectorAll<HTMLElement>('video, audio, *')) {
    if (element instanceof HTMLMediaElement) {
      found.push(element);
    } else if (element.shadowRoot) {
      collectMedia(element.shadowRoot, found);
    }
  }
  return found;
}

function scan(root: ParentNode = document): void {
  for (const element of collectMedia(root)) attach(element);
}

/**
 * Watches for DOM changes. Additions are attached; removals are forgotten so a
 * player that swaps its <video> between episodes does not leave stale state
 * behind.
 */
function observe(): void {
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node instanceof HTMLMediaElement) attach(node);
        else if (node instanceof Element) scan(node);
      }
      for (const node of record.removedNodes) {
        if (node instanceof HTMLMediaElement) forget(node);
        else if (node instanceof Element) {
          for (const media of collectMedia(node)) forget(media);
        }
      }
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

/**
 * Media events are the safety net for everything the observer misses: elements
 * created inside closed shadow roots, elements that exist from the start but
 * only receive a source later, and players that reuse one element while
 * swapping its `src` between episodes.
 *
 * These listeners are registered in the capture phase on the document so they
 * fire for events that do not bubble (`play`, `loadedmetadata` and friends).
 */
function bindMediaEvents(): void {
  const handler = (event: Event): void => {
    const target = event.target;
    if (!(target instanceof HTMLMediaElement)) return;

    if (event.type === 'encrypted') {
      encryptedMedia.add(target);
      return;
    }

    // Media that has reached playback proves the page is allowed to make sound,
    // which is exactly the condition resume() needs.
    if (event.type === 'playing' || event.type === 'play') {
      audioUnlocked = true;
      resumeIfUnlocked();
    }
    attach(target, true);
  };
  for (const type of [
    'encrypted',
    'loadstart',
    'loadedmetadata',
    'canplay',
    'play',
    'playing',
    'volumechange',
  ] as const) {
    document.addEventListener(type, handler, { capture: true, passive: true });
  }
}

/**
 * Browsers start an AudioContext suspended until the user interacts with the
 * page, so retry the resume on the first gestures and re-scan at the same time:
 * a click on "next episode" is exactly when a new element tends to appear.
 */
function bindGestureResume(): void {
  const onGesture = (): void => {
    audioUnlocked = true;
    resumeIfUnlocked();
    if (!isNeutral(settings)) scan();
  };
  for (const event of ['pointerdown', 'keydown'] as const) {
    document.addEventListener(event, onGesture, { capture: true, passive: true });
  }
}

/**
 * Resumes the context, but only once the page is allowed to start audio.
 * Before that the call would be refused and logged, so it is skipped; the
 * gesture listeners and the `playing` handler retry it at the first legal
 * opportunity.
 */
function resumeIfUnlocked(): void {
  if (!audioUnlocked) return;
  void engine?.resume();
}

/**
 * SPA route changes are the other reliable signal that the player is about to
 * be rebuilt. Patching the history API lets us re-scan on navigations that
 * never touch the network.
 */
function bindHistoryEvents(): void {
  const rescan = (): void => {
    // The new element is usually inserted a tick or two after the URL changes.
    setTimeout(() => scan(), 0);
    setTimeout(() => scan(), 500);
  };

  window.addEventListener('popstate', rescan);
  window.addEventListener('hashchange', rescan);

  for (const method of ['pushState', 'replaceState'] as const) {
    const original = history[method];
    history[method] = function patched(
      this: History,
      ...args: Parameters<History['pushState']>
    ): void {
      original.apply(this, args);
      rescan();
    };
  }
}

/**
 * Last-resort periodic sweep. Some players build their element in ways none of
 * the signals above can see; a slow poll costs almost nothing and guarantees we
 * eventually notice. It only runs while the user actually has a boost applied.
 */
function startSweep(): void {
  setInterval(() => {
    if (isNeutral(settings)) return;
    if (document.hidden) return;
    scan();
  }, 3000);
}

ext.runtime.onMessage.addListener(
  (message: BackgroundToContentMessage, _sender, sendResponse) => {
    switch (message.type) {
      case 'bg:apply-settings': {
        settings = sanitizeSettings(message.settings);
        // Only spin up an AudioContext once the user actually asks for a
        // change, so untouched pages pay no audio-processing cost at all.
        if (engine || !isNeutral(settings)) {
          ensureEngine();
          scan();
          engine?.apply(settings);
          resumeIfUnlocked();
        }
        sendResponse({ ok: true, pathway, count: connectedCount() });
        return true;
      }
      case 'bg:probe': {
        // The popup opening is a good moment to re-check reality, since the
        // user is about to be shown a number that has to be true.
        scan();
        engine?.apply(settings);
        sendResponse({ ok: true, pathway, count: connectedCount() });
        return true;
      }
      case 'bg:teardown': {
        attachments.reset();
        engine?.dispose();
        engine = null;
        void context?.close().catch(() => undefined);
        context = null;
        setPathway('idle');
        sendResponse({ ok: true });
        return true;
      }
      default:
        return false;
    }
  },
);

function boot(): void {
  post({ type: 'content:ready', origin: window.location.origin });
  scan();
  observe();
  bindMediaEvents();
  bindGestureResume();
  bindHistoryEvents();
  startSweep();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
