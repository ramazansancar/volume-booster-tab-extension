import {
  EQ_BAND_FREQUENCIES,
  type AudioSettings,
  type GlobalPreferences,
} from '@/types';

/** Hard ceiling. Anything above this risks damaging speakers and hearing. */
export const ABSOLUTE_MAX_GAIN = 10;

/** Default ceiling for the slider; users can raise it in the options page. */
export const DEFAULT_MAX_GAIN = 6;

export const NEUTRAL_SETTINGS: AudioSettings = {
  gain: 1,
  limiterEnabled: true,
  balance: 0,
  mono: false,
  equalizer: EQ_BAND_FREQUENCIES.map(() => 0),
  bypassed: false,
};

export const DEFAULT_PREFERENCES: GlobalPreferences = {
  defaults: NEUTRAL_SETTINGS,
  // Tab-scoped and temporary by default: closing the tab forgets the boost, so
  // a loud setting can never surprise the user on a later visit.
  defaultPersistence: 'session',
  maxGain: DEFAULT_MAX_GAIN,
  autoLimiterAboveUnity: true,
  tabCaptureFallback: true,
};

/** Returns a deep copy so callers can mutate without touching the constants. */
export function cloneSettings(settings: AudioSettings): AudioSettings {
  return { ...settings, equalizer: [...settings.equalizer] };
}

export function neutralSettings(): AudioSettings {
  return cloneSettings(NEUTRAL_SETTINGS);
}
