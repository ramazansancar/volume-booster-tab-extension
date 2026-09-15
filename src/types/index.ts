/**
 * Shared type definitions used across background, content, popup and options.
 * Keeping every cross-context contract in one file makes it obvious when a
 * change on one side needs a matching change on the other.
 */

/** Identifier of the equalizer bands, ordered from low to high frequency. */
export const EQ_BAND_FREQUENCIES = [60, 170, 350, 1000, 3500, 10000] as const;

export type EqBandFrequency = (typeof EQ_BAND_FREQUENCIES)[number];

/** Gain applied to each equalizer band, in decibels. Index matches EQ_BAND_FREQUENCIES. */
export type EqualizerGains = number[];

/**
 * The complete audio state of a single tab. Everything the audio engine needs
 * to render its node graph is here, so state can be serialised and restored.
 */
export interface AudioSettings {
  /** Linear gain multiplier. 1 means untouched, 6 means 600 %. */
  gain: number;
  /** Whether the limiter (DynamicsCompressorNode) is engaged. */
  limiterEnabled: boolean;
  /** Stereo balance from -1 (full left) to 1 (full right). */
  balance: number;
  /** Downmix both channels to mono. Useful for single-earbud listening. */
  mono: boolean;
  /** Equalizer band gains in dB, one entry per EQ_BAND_FREQUENCIES entry. */
  equalizer: EqualizerGains;
  /** Whether the whole processing chain is bypassed. */
  bypassed: boolean;
}

/** Where a tab's settings should live once the tab goes away. */
export type PersistenceMode =
  /** Settings vanish when the tab closes. This is the default. */
  | 'session'
  /** Settings are stored per origin and reapplied on the next visit. */
  | 'origin';

export interface TabState {
  tabId: number;
  /** Origin of the top-level document, used as the persistence key. */
  origin: string | null;
  settings: AudioSettings;
  persistence: PersistenceMode;
  /** Which audio path is currently active in this tab. */
  pathway: AudioPathway;
  /** Number of media elements the content script is currently driving. */
  mediaElementCount: number;
  /**
   * Why the current pathway is what it is, when the content script could say.
   * Surfaced in the popup so a page that cannot be boosted explains itself
   * instead of leaving the user with a slider that does nothing.
   */
  pathwayReason?: string;
}

/**
 * How audio is being intercepted. The content-script path is preferred because
 * it works in every browser; tab capture is a Chromium-only fallback for pages
 * where createMediaElementSource is unavailable (DRM, cross-origin media).
 */
export type AudioPathway =
  | 'idle'
  | 'media-element'
  | 'tab-capture'
  | 'unavailable';

export interface GlobalPreferences {
  /** Applied to tabs that have no stored settings of their own. */
  defaults: AudioSettings;
  /** Default persistence for newly touched tabs. */
  defaultPersistence: PersistenceMode;
  /** Upper bound for the gain slider, so users can opt into louder boosts. */
  maxGain: number;
  /** Keep the limiter on whenever gain goes above 1 to protect hearing. */
  autoLimiterAboveUnity: boolean;
  /** Allow the Chromium tab-capture fallback. */
  tabCaptureFallback: boolean;
}

/** Settings saved per origin when persistence is set to 'origin'. */
export type OriginSettingsMap = Record<string, AudioSettings>;

/* -------------------------------------------------------------------------- */
/* Messaging protocol                                                          */
/* -------------------------------------------------------------------------- */

/** Messages sent from popup/options to the background service worker. */
export type UiToBackgroundMessage =
  | { type: 'ui:get-tab-state'; tabId: number }
  | { type: 'ui:set-settings'; tabId: number; settings: Partial<AudioSettings> }
  | { type: 'ui:set-persistence'; tabId: number; persistence: PersistenceMode }
  | { type: 'ui:reset-tab'; tabId: number }
  | { type: 'ui:get-preferences' }
  | { type: 'ui:set-preferences'; preferences: Partial<GlobalPreferences> }
  | { type: 'ui:request-fallback'; tabId: number }
  /** Edits the settings stored for one origin, from the options page. */
  | { type: 'ui:update-origin'; origin: string; settings: Partial<AudioSettings> }
  /** Deletes the settings stored for one origin. */
  | { type: 'ui:forget-origin'; origin: string };

/** Messages sent from the background to a tab's content script. */
export type BackgroundToContentMessage =
  | { type: 'bg:apply-settings'; settings: AudioSettings }
  | { type: 'bg:probe' }
  | { type: 'bg:teardown' };

/** Messages sent from a content script up to the background. */
export type ContentToBackgroundMessage =
  | { type: 'content:ready'; origin: string | null }
  | { type: 'content:media-count'; count: number }
  | { type: 'content:pathway'; pathway: AudioPathway; reason?: string };

/**
 * Messages sent from the background to the offscreen document.
 *
 * Only Chromium MV3 builds ever exchange these: the offscreen document is the
 * only place a service worker can own an AudioContext, and it is created on
 * demand when the tab-capture fallback is actually used.
 */
export type BackgroundToOffscreenMessage =
  | {
      type: 'offscreen:start';
      tabId: number;
      /** Stream id minted by tabCapture.getMediaStreamId in the worker. */
      streamId: string;
      settings: AudioSettings;
    }
  | { type: 'offscreen:update'; tabId: number; settings: AudioSettings }
  | { type: 'offscreen:stop'; tabId: number };

/** Sent back up when the offscreen document has no captures left to host. */
export interface OffscreenIdleMessage {
  type: 'offscreen:idle';
}

/** Reply shape for every offscreen command. */
export type OffscreenResult =
  | { ok: true }
  | { ok: false; reason: string };

export type RuntimeMessage =
  | UiToBackgroundMessage
  | BackgroundToContentMessage
  | ContentToBackgroundMessage
  | BackgroundToOffscreenMessage
  | OffscreenIdleMessage;

/** Response returned for 'ui:get-tab-state'. */
export interface TabStateResponse {
  state: TabState;
  preferences: GlobalPreferences;
}
