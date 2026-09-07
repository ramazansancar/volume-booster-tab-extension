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
export class TabRegistry {
  private readonly tabs = new Map<number, TabState>();

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

  updatePathway(tabId: number, pathway: AudioPathway): void {
    const state = this.tabs.get(tabId);
    if (state) state.pathway = pathway;
  }

  updateMediaCount(tabId: number, count: number): void {
    const state = this.tabs.get(tabId);
    if (state) state.mediaElementCount = count;
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
