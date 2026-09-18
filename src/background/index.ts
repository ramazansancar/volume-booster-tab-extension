import { ext, getAllFrames, getTab, sendMessageSafe, sendMessageToTab } from '@/lib/browser';
import { cloneSettings, neutralSettings } from '@/lib/defaults';
import {
  forgetOrigin,
  loadOriginSettings,
  loadPreferences,
  saveOriginSettings,
  savePreferences,
  savePreset,
  syncPersistence,
} from '@/lib/storage';
import {
  MAX_PRESET_NAME,
  newPresetId,
  sanitizePresets,
} from '@/lib/presets';
import { mergeSettings, originOf, sanitizeSettings } from '@/lib/validate';
import { TabRegistry } from '@/background/tab-registry';
import {
  canCapture,
  isCaptured,
  startCapture,
  stopAllCaptures,
  stopCapture,
  updateCapture,
} from '@/background/tab-capture';
import type {
  AudioSettings,
  ContentToBackgroundMessage,
  GlobalPreferences,
  TabState,
  TabStateResponse,
  UiToBackgroundMessage,
} from '@/types';

/**
 * Background coordinator.
 *
 * It owns one TabState per tab, so two tabs boosting different sites never see
 * each other's settings: changing Twitch to 300 % leaves YouTube exactly where
 * the user left it. Nothing here is shared between tabs except the user's
 * global preferences, which only supply the starting values for a new tab.
 */

const registry = new TabRegistry();

/** Cached so the hot path (a slider drag) does not hit storage on every tick. */
let cachedPreferences: GlobalPreferences | null = null;

async function preferences(): Promise<GlobalPreferences> {
  cachedPreferences ??= await loadPreferences();
  return cachedPreferences;
}

async function tabOrigin(tabId: number): Promise<string | null> {
  try {
    const tab = await getTab(tabId);
    return originOf(tab.url);
  } catch {
    return null;
  }
}

/**
 * Returns the state for a tab, seeding it from stored origin settings the first
 * time we see it. A tab only inherits stored values if the user previously
 * chose 'origin' persistence for that site; otherwise it starts from the
 * global defaults, which is what keeps boosts temporary by default.
 */
async function stateFor(tabId: number): Promise<TabState> {
  const prefs = await preferences();
  const existing = registry.get(tabId);
  if (existing) return existing;

  const origin = await tabOrigin(tabId);
  const state = registry.ensure(tabId, prefs, origin);

  if (origin) {
    const stored = await loadOriginSettings(origin, prefs.maxGain);
    if (stored) {
      state.settings = stored;
      state.persistence = 'origin';
    }
  }
  return state;
}

/**
 * Pushes a tab's settings down to every content script in the tab.
 *
 * `tabs.sendMessage` without a frameId reaches only the top-level document, but
 * players are routinely embedded in an iframe - Kick, Twitch embeds and most
 * "watch" pages that wrap a third-party player. The content script is injected
 * into those frames (`all_frames: true`), so the settings have to be delivered
 * to each of them individually or the boost silently does nothing.
 *
 * The top frame is messaged directly and the rest are enumerated through
 * webNavigation, so a player nested several frames deep is still reached.
 */
async function pushToTab(state: TabState): Promise<void> {
  const message = {
    type: 'bg:apply-settings',
    settings: state.settings,
  };

  // The top frame first, so the common case applies without waiting on the
  // frame enumeration below.
  await sendMessageSafe(() => sendMessageToTab(state.tabId, message));

  const frameIds = await frameIdsFor(state.tabId);
  await Promise.all(
    frameIds.map((frameId) =>
      sendMessageSafe(() => sendMessageToTab(state.tabId, message, { frameId })),
    ),
  );
}

/**
 * Lists the sub-frames of a tab. Returns an empty list when the browser cannot
 * report them, in which case only the top frame is driven - the same behaviour
 * as before, rather than a hard failure.
 */
async function frameIdsFor(tabId: number): Promise<number[]> {
  try {
    const frames = await getAllFrames(tabId);
    // Frame 0 is the top document, already handled by the caller.
    return frames.filter((frame) => frame.frameId !== 0).map((frame) => frame.frameId);
  } catch {
    return [];
  }
}

/**
 * Reflects the boost level on the toolbar icon so the user can tell at a glance
 * which tabs are amplified without opening the popup.
 */
async function updateBadge(state: TabState): Promise<void> {
  const action = ext.action ?? ext.browserAction;
  if (!action) return;

  const active = registry.isActive(state.tabId);
  const text = active ? `${Math.round(state.settings.gain * 100)}%` : '';
  try {
    await action.setBadgeText({ tabId: state.tabId, text });
    if (active) {
      // Amber above unity gain, neutral grey otherwise.
      await action.setBadgeBackgroundColor({
        tabId: state.tabId,
        color: state.settings.gain > 1 ? '#b45309' : '#475569',
      });
    }
  } catch {
    // Per-tab badges are unsupported on some builds; the popup still works.
  }
}

/**
 * Pushes an edited origin setting to every open tab currently on that origin
 * and following it, so a change made in the options page takes effect at once.
 */
async function applyToOpenTabs(origin: string, settings: AudioSettings): Promise<void> {
  for (const [tabId, state] of registry.entries()) {
    if (state.origin !== origin || state.persistence !== 'origin') continue;
    state.settings = settings;
    registry.updateSettings(tabId, settings);
    await pushToTab(state);
    await updateBadge(state);
  }
}

async function applyAndPersist(state: TabState): Promise<void> {
  await pushToTab(state);
  // A captured tab is driven by the offscreen graph, not by its content script,
  // so the same settings have to be pushed down both paths.
  if (isCaptured(state.tabId)) {
    const result = await updateCapture(state.tabId, state.settings);
    if (!result.ok) {
      registry.reportCapture(state.tabId, 'unavailable', result.reason);
    }
  }
  await updateBadge(state);
  await syncPersistence(state.origin, state.persistence, state.settings);
}

/* -------------------------------------------------------------------------- */
/* Message handling                                                            */
/* -------------------------------------------------------------------------- */

async function handleUiMessage(message: UiToBackgroundMessage): Promise<unknown> {
  const prefs = await preferences();

  switch (message.type) {
    case 'ui:get-tab-state': {
      const state = await stateFor(message.tabId);
      return { state, preferences: prefs } satisfies TabStateResponse;
    }

    case 'ui:set-settings': {
      const state = await stateFor(message.tabId);
      let next = mergeSettings(state.settings, message.settings, prefs.maxGain);

      // Boosting past unity without a limiter is the fastest way to produce
      // painful clipping, so the safety default re-arms it automatically.
      if (prefs.autoLimiterAboveUnity && next.gain > 1) {
        next = { ...next, limiterEnabled: true };
      }

      registry.updateSettings(message.tabId, next);
      state.settings = next;
      await applyAndPersist(state);
      return { state, preferences: prefs } satisfies TabStateResponse;
    }

    case 'ui:set-persistence': {
      const state = await stateFor(message.tabId);
      state.persistence = message.persistence;
      registry.updatePersistence(message.tabId, message.persistence);
      await syncPersistence(state.origin, state.persistence, state.settings);
      return { state, preferences: prefs } satisfies TabStateResponse;
    }

    case 'ui:reset-tab': {
      await stateFor(message.tabId);
      const state = registry.reset(message.tabId, prefs);
      if (!state) return { ok: false };
      await applyAndPersist(state);
      return { state, preferences: prefs } satisfies TabStateResponse;
    }

    case 'ui:reset-neutral': {
      await stateFor(message.tabId);
      // Neutral means the shipped defaults, not the user's: this is the button
      // for "undo everything", including a saved default they now regret.
      const state = registry.reset(message.tabId, {
        ...prefs,
        defaults: neutralSettings(),
      });
      if (!state) return { ok: false };
      await applyAndPersist(state);
      return { state, preferences: prefs } satisfies TabStateResponse;
    }

    case 'ui:get-preferences':
      return prefs;

    case 'ui:set-preferences': {
      cachedPreferences = await savePreferences(message.preferences);

      // Switching the fallback off has to release the streams it is already
      // holding, or the capture indicator stays lit on tabs the user has just
      // told the extension to leave alone.
      if (!cachedPreferences.tabCaptureFallback) {
        await stopAllCaptures();
        for (const [tabId, state] of registry.entries()) {
          if (state.pathway === 'tab-capture') {
            registry.reportCapture(
              tabId,
              'unavailable',
              'The tab-capture fallback is switched off in the options page',
            );
          }
        }
      }

      // A lowered ceiling has to be enforced on tabs that are already above it.
      for (const [tabId, state] of registry.entries()) {
        const clamped = mergeSettings(state.settings, {}, cachedPreferences.maxGain);
        if (clamped.gain !== state.settings.gain) {
          state.settings = clamped;
          registry.updateSettings(tabId, clamped);
          await applyAndPersist(state);
        }
      }
      return cachedPreferences;
    }

    case 'ui:update-origin': {
      const stored =
        (await loadOriginSettings(message.origin, prefs.maxGain)) ?? prefs.defaults;
      const next = mergeSettings(stored, message.settings, prefs.maxGain);
      await saveOriginSettings(message.origin, next);

      // Tabs already open on that origin are following the stored value, so an
      // edit here has to reach them too - otherwise the options page and the
      // tab would disagree until the next reload.
      await applyToOpenTabs(message.origin, next);
      return next;
    }

    case 'ui:save-preset': {
      const name = message.name.trim().slice(0, MAX_PRESET_NAME);
      // A preset with no name could never be picked out of the list again.
      if (!name) return prefs;
      cachedPreferences = await savePreset({
        id: newPresetId(),
        name,
        gains: sanitizeSettings({ equalizer: message.gains }).equalizer,
      });
      return cachedPreferences;
    }

    case 'ui:set-presets': {
      // The options page sends the whole list back after a rename, reorder or
      // delete, so replacing it wholesale is the operation, not a shortcut.
      cachedPreferences = await savePreferences({
        userPresets: sanitizePresets(message.presets),
      });
      return cachedPreferences;
    }

    case 'ui:forget-origin': {
      await forgetOrigin(message.origin);
      // The tab keeps whatever it is playing at, but stops being persistent, so
      // closing it now forgets the setting like any session-scoped tab.
      for (const [, state] of registry.entries()) {
        if (state.origin === message.origin && state.persistence === 'origin') {
          state.persistence = 'session';
        }
      }
      return { ok: true };
    }

    case 'ui:request-fallback': {
      const state = await stateFor(message.tabId);

      // The fallback is a user-facing preference as well as a capability. A
      // user who turned it off should keep seeing the honest "cannot boost"
      // answer rather than having their tab captured behind their back.
      if (!prefs.tabCaptureFallback) {
        registry.reportCapture(
          message.tabId,
          'unavailable',
          'The tab-capture fallback is switched off in the options page',
        );
        return { state, preferences: prefs } satisfies TabStateResponse;
      }

      if (!canCapture()) {
        registry.reportCapture(
          message.tabId,
          'unavailable',
          'Tab capture is not supported in this browser',
        );
        return { state, preferences: prefs } satisfies TabStateResponse;
      }

      const result = await startCapture(message.tabId, state.settings);
      if (result.ok) {
        registry.reportCapture(message.tabId, 'tab-capture');
      } else {
        registry.reportCapture(message.tabId, 'unavailable', result.reason);
      }
      await updateBadge(state);
      return { state, preferences: prefs } satisfies TabStateResponse;
    }

    default:
      return { ok: false };
  }
}

async function handleContentMessage(
  message: ContentToBackgroundMessage,
  tabId: number,
  frameId: number,
): Promise<unknown> {
  // Frame 0 is the page the user is actually looking at. Every other frame is
  // an embed - a player, but just as often an analytics pixel or a payment
  // widget on some unrelated origin - so a sub-frame must never be allowed to
  // speak for the tab as a whole.
  const isTopFrame = frameId === 0;

  switch (message.type) {
    case 'content:ready': {
      // A fresh document means the previous graph is gone; re-send the tab's
      // settings so a reload or SPA navigation keeps the user's boost.
      const state = await stateFor(tabId);

      // Only the top document defines the tab's identity. Taking it from any
      // frame let an embedded widget relabel the tab as its own origin, which
      // both mislabelled the popup and would have filed a "remember this site"
      // entry under the wrong domain entirely.
      if (isTopFrame && message.origin) state.origin = message.origin;

      await applyAndPersist(state);
      return { ok: true };
    }
    case 'content:media-count':
      // Each frame reports only what it drives, so the tab total is their sum.
      registry.updateFrameMediaCount(tabId, frameId, message.count);
      return { ok: true };
    case 'content:pathway':
      registry.updateFramePathway(tabId, frameId, message.pathway, message.reason);
      return { ok: true };
    default:
      return { ok: false };
  }
}

ext.runtime.onMessage.addListener((message: unknown, sender, sendResponse) => {
  if (typeof message !== 'object' || message === null || !('type' in message)) {
    return false;
  }
  const typed = message as { type: string };

  if (typed.type.startsWith('ui:')) {
    void handleUiMessage(message as UiToBackgroundMessage).then(sendResponse);
    return true;
  }
  // The offscreen document reports when its last capture ended. Nothing to do
  // beyond acknowledging it: stopCapture already closed the document.
  if (typed.type === 'offscreen:idle') {
    sendResponse({ ok: true });
    return false;
  }
  if (typed.type.startsWith('content:') && sender.tab?.id !== undefined) {
    void handleContentMessage(
      message as ContentToBackgroundMessage,
      sender.tab.id,
      sender.frameId ?? 0,
    ).then(sendResponse);
    return true;
  }
  return false;
});

/* -------------------------------------------------------------------------- */
/* Tab lifecycle                                                               */
/* -------------------------------------------------------------------------- */

// Dropping the state here is what makes a boost disappear with its tab.
ext.tabs.onRemoved.addListener((tabId) => {
  registry.remove(tabId);
  // Releasing the stream is what clears Chrome's "this tab is being captured"
  // indicator and lets the offscreen document close.
  void stopCapture(tabId);
});

ext.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status !== 'complete') return;
  void (async () => {
    const state = registry.get(tabId);
    if (!state) return;
    const origin = await tabOrigin(tabId);

    // A finished navigation means a new document, which gets to try the normal
    // media-element path first. Holding the old capture across it would keep
    // the tab captured for a page that may not need it at all.
    if (isCaptured(tabId)) {
      await stopCapture(tabId);
      registry.reportCapture(tabId, 'idle');
    }

    // Navigating a session-scoped tab to a different site resets it, so a boost
    // meant for one page does not silently follow the user to the next one.
    if (origin !== state.origin && state.persistence === 'session') {
      const prefs = await preferences();
      state.origin = origin;
      state.settings = cloneSettings(prefs.defaults);
    } else {
      state.origin = origin;
    }
    await applyAndPersist(state);
  })();
});

ext.storage.onChanged.addListener((_changes, area) => {
  if (area === 'local') cachedPreferences = null;
});
