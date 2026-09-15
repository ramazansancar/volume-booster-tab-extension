import { neutralSettings, cloneSettings } from '@/lib/defaults';
import type {
  AudioPathway,
  AudioSettings,
  GlobalPreferences,
  PersistenceMode,
  TabState,
} from '@/types';

/**
 * In-memory map of per-tab audio state.
 *
 * This is intentionally not persisted: a tab's boost is scoped to that tab and
 * disappears with it, which is the extension's default behaviour. Only tabs the
 * user explicitly switches to 'origin' persistence get written to storage, and
 * that happens in the storage module rather than here.
 *
 * On MV3 the service worker can be torn down at any time, taking this map with
 * it. That is acceptable and even desirable for session-scoped state: a
 * restarted worker rehydrates a tab from its origin settings if it has any, and
 * otherwise starts neutral.
 */
/** What a single frame within a tab last reported about itself. */
interface FrameState {
  pathway: AudioPathway;
  count: number;
  reason?: string;
}

export class TabRegistry {
  private readonly tabs = new Map<number, TabState>();
  /**
   * Per-frame reports, keyed by tab and then frame id. Kept separate from
   * TabState because the popup only ever needs the collapsed answer, while
   * collapsing it correctly requires remembering what each frame said.
   */
  private readonly frames = new Map<number, Map<number, FrameState>>();

  /**
   * Tabs whose audio the background is driving through tab capture, with the
   * reason when a capture attempt failed.
   *
   * Capture is a property of the whole tab rather than of any one frame - the
   * browser hands over the tab's mixed output - so it cannot be stored
   * alongside the per-frame reports, and it has to outrank them: once a tab is
   * captured, a frame still saying "I could not build an AudioContext" is
   * describing a path that is no longer in use.
   */
  private readonly captures = new Map<number, { pathway: AudioPathway; reason?: string }>();

  get(tabId: number): TabState | undefined {
    return this.tabs.get(tabId);
  }

  /** Returns the existing state for a tab, creating a neutral one if needed. */
  ensure(
    tabId: number,
    preferences: GlobalPreferences,
    origin: string | null,
  ): TabState {
    const existing = this.tabs.get(tabId);
    if (existing) {
      // A navigation can change the origin of a tab we already track.
      if (origin !== null && existing.origin !== origin) existing.origin = origin;
      return existing;
    }
    const state: TabState = {
      tabId,
      origin,
      settings: cloneSettings(preferences.defaults),
      persistence: preferences.defaultPersistence,
      pathway: 'idle',
      mediaElementCount: 0,
    };
    this.tabs.set(tabId, state);
    return state;
  }

  set(tabId: number, state: TabState): void {
    this.tabs.set(tabId, state);
  }

  updateSettings(tabId: number, settings: AudioSettings): void {
    const state = this.tabs.get(tabId);
    if (state) state.settings = settings;
  }

  updatePersistence(tabId: number, persistence: PersistenceMode): void {
    const state = this.tabs.get(tabId);
    if (state) state.persistence = persistence;
  }

  /**
   * Records what one frame reports, then recomputes the tab's overall pathway.
   *
   * A tab's frames disagree routinely: the top document has no media while an
   * embedded player does, or a player frame works while an unrelated tracking
   * iframe reports that it cannot build an AudioContext. Taking the last
   * message to arrive would make the popup flicker between those answers, so
   * the tab-level pathway is derived from all of them instead.
   */
  updateFramePathway(
    tabId: number,
    frameId: number,
    pathway: AudioPathway,
    reason?: string,
  ): void {
    const state = this.tabs.get(tabId);
    if (!state) return;

    const frames = this.framesFor(tabId);
    frames.set(frameId, { ...(frames.get(frameId) ?? { count: 0 }), pathway, reason });
    this.recompute(state, frames);
  }

  updateFrameMediaCount(tabId: number, frameId: number, count: number): void {
    const state = this.tabs.get(tabId);
    if (!state) return;

    const frames = this.framesFor(tabId);
    frames.set(frameId, { ...(frames.get(frameId) ?? { pathway: 'idle' }), count });
    this.recompute(state, frames);
  }

  /**
   * Records the outcome of a tab-capture attempt for the whole tab.
   *
   * Passing 'idle' clears the record, which is what a navigation does: the new
   * document gets to report for itself again.
   */
  reportCapture(tabId: number, pathway: AudioPathway, reason?: string): void {
    const state = this.tabs.get(tabId);
    if (!state) return;

    if (pathway === 'idle') this.captures.delete(tabId);
    else this.captures.set(tabId, { pathway, reason });

    this.recompute(state, this.framesFor(tabId));
  }

  /**
   * Collapses the per-frame reports into the single answer the popup shows.
   *
   * Any frame that is actually driving media wins: that is the frame the user
   * cares about, and it means the boost is working whatever the other frames
   * say. Only when nothing is connected anywhere does a failure surface, and
   * then the reason comes from a frame that actually failed.
   */
  private recompute(state: TabState, frames: Map<number, FrameState>): void {
    let total = 0;
    let working = false;
    let failure: FrameState | undefined;

    for (const frame of frames.values()) {
      total += frame.count;
      if (frame.pathway === 'media-element' || frame.pathway === 'tab-capture') {
        working = true;
        if (state.pathway !== frame.pathway) state.pathway = frame.pathway;
      } else if (frame.pathway === 'unavailable' && !failure) {
        failure = frame;
      }
    }

    state.mediaElementCount = total;

    // Capture outranks the frame reports, because it replaces them: the audio
    // is coming from the tab's output, not from any frame's media element.
    const capture = this.captures.get(state.tabId);
    if (capture) {
      state.pathway = capture.pathway;
      if (capture.reason) state.pathwayReason = capture.reason;
      else delete state.pathwayReason;
      return;
    }

    if (working) {
      delete state.pathwayReason;
      return;
    }
    if (failure) {
      state.pathway = 'unavailable';
      if (failure.reason) state.pathwayReason = failure.reason;
      else delete state.pathwayReason;
      return;
    }
    state.pathway = 'idle';
    delete state.pathwayReason;
  }

  private framesFor(tabId: number): Map<number, FrameState> {
    let frames = this.frames.get(tabId);
    if (!frames) {
      frames = new Map();
      this.frames.set(tabId, frames);
    }
    return frames;
  }

  reset(tabId: number, preferences: GlobalPreferences): TabState | undefined {
    const state = this.tabs.get(tabId);
    if (!state) return undefined;
    state.settings = neutralSettings();
    state.persistence = preferences.defaultPersistence;
    return state;
  }

  /** Drops a tab's state. Called when the tab closes, which is what makes
   *  session-scoped boosts temporary. */
  remove(tabId: number): void {
    this.tabs.delete(tabId);
    this.frames.delete(tabId);
    this.captures.delete(tabId);
  }

  /** True when a tab is doing anything other than passing audio through. */
  isActive(tabId: number): boolean {
    const state = this.tabs.get(tabId);
    if (!state || state.settings.bypassed) return false;
    const { gain, mono, balance, equalizer } = state.settings;
    return gain !== 1 || mono || balance !== 0 || equalizer.some((band) => band !== 0);
  }

  entries(): IterableIterator<[number, TabState]> {
    return this.tabs.entries();
  }
}
