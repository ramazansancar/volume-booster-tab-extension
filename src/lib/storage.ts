import { storageGet, storageSet } from '@/lib/browser';
import { DEFAULT_PREFERENCES, cloneSettings } from '@/lib/defaults';
import { sanitizeSettings, clamp } from '@/lib/validate';
import { MAX_USER_PRESETS, sanitizePresets } from '@/lib/presets';
import { ABSOLUTE_MAX_GAIN } from '@/lib/defaults';
import type {
  AudioSettings,
  EqPreset,
  GlobalPreferences,
  OriginSettingsMap,
  PersistenceMode,
} from '@/types';

const PREFERENCES_KEY = 'preferences';
const ORIGINS_KEY = 'origins';

async function readArea<T>(key: string): Promise<T | undefined> {
  try {
    const result = await storageGet(key);
    return result[key] as T | undefined;
  } catch {
    return undefined;
  }
}

async function writeArea(key: string, value: unknown): Promise<void> {
  try {
    await storageSet({ [key]: value });
  } catch {
    // Storage can fail when the quota is exhausted or the profile is read-only.
    // Losing a persisted preference is recoverable, so we do not surface it.
  }
}

export async function loadPreferences(): Promise<GlobalPreferences> {
  const stored = await readArea<Partial<GlobalPreferences>>(PREFERENCES_KEY);
  if (!stored) {
    return {
      ...DEFAULT_PREFERENCES,
      defaults: cloneSettings(DEFAULT_PREFERENCES.defaults),
      userPresets: [],
    };
  }

  const maxGain = typeof stored.maxGain === 'number'
    ? clamp(stored.maxGain, 1, ABSOLUTE_MAX_GAIN)
    : DEFAULT_PREFERENCES.maxGain;

  return {
    maxGain,
    defaults: sanitizeSettings(stored.defaults, maxGain),
    defaultPersistence:
      stored.defaultPersistence === 'origin' ? 'origin' : 'session',
    autoLimiterAboveUnity:
      typeof stored.autoLimiterAboveUnity === 'boolean'
        ? stored.autoLimiterAboveUnity
        : DEFAULT_PREFERENCES.autoLimiterAboveUnity,
    tabCaptureFallback:
      typeof stored.tabCaptureFallback === 'boolean'
        ? stored.tabCaptureFallback
        : DEFAULT_PREFERENCES.tabCaptureFallback,
    userPresets: sanitizePresets(stored.userPresets),
  };
}

export async function savePreferences(
  patch: Partial<GlobalPreferences>,
): Promise<GlobalPreferences> {
  const current = await loadPreferences();
  const merged: GlobalPreferences = { ...current, ...patch };
  merged.maxGain = clamp(merged.maxGain, 1, ABSOLUTE_MAX_GAIN);
  merged.defaults = sanitizeSettings(merged.defaults, merged.maxGain);
  merged.userPresets = sanitizePresets(merged.userPresets);
  await writeArea(PREFERENCES_KEY, merged);
  return merged;
}

/**
 * Appends one user preset, replacing any earlier preset with the same name.
 *
 * Saving over a name the user already used is what they almost always mean -
 * they tweaked "Podcast" and want the new version - and it keeps the list from
 * filling with near-duplicates. Returns the preferences so the caller can
 * re-render from one source of truth.
 */
export async function savePreset(
  preset: EqPreset,
): Promise<GlobalPreferences> {
  const current = await loadPreferences();
  const name = (preset.name ?? '').trim().toLowerCase();
  const kept = current.userPresets.filter(
    (existing) => (existing.name ?? '').trim().toLowerCase() !== name,
  );
  // Oldest go first when the ceiling is reached: the list is capped, and a
  // preset the user has not touched in a long time is the safest thing to drop.
  const next = [...kept, preset].slice(-MAX_USER_PRESETS);
  return savePreferences({ userPresets: next });
}

/* -------------------------------------------------------------------------- */
/* Per-origin settings, used only when a tab opts into 'origin' persistence.    */
/* -------------------------------------------------------------------------- */

export async function loadOriginSettings(
  origin: string,
  maxGain: number,
): Promise<AudioSettings | null> {
  const map = (await readArea<OriginSettingsMap>(ORIGINS_KEY)) ?? {};
  const stored = map[origin];
  return stored ? sanitizeSettings(stored, maxGain) : null;
}

export async function saveOriginSettings(
  origin: string,
  settings: AudioSettings,
): Promise<void> {
  const map = (await readArea<OriginSettingsMap>(ORIGINS_KEY)) ?? {};
  map[origin] = settings;
  await writeArea(ORIGINS_KEY, map);
}

export async function forgetOrigin(origin: string): Promise<void> {
  const map = (await readArea<OriginSettingsMap>(ORIGINS_KEY)) ?? {};
  if (!(origin in map)) return;
  delete map[origin];
  await writeArea(ORIGINS_KEY, map);
}

export async function listOrigins(): Promise<OriginSettingsMap> {
  return (await readArea<OriginSettingsMap>(ORIGINS_KEY)) ?? {};
}

/**
 * Replaces every saved origin at once, used by the settings import.
 *
 * A wholesale replace rather than a merge: the user is restoring a setup they
 * exported, and silently keeping sites from the old profile would leave them
 * with a state that matches neither machine.
 */
export async function replaceOrigins(map: OriginSettingsMap): Promise<void> {
  await writeArea(ORIGINS_KEY, map);
}

export async function clearAllOrigins(): Promise<void> {
  await writeArea(ORIGINS_KEY, {});
}

/**
 * Persists (or forgets) a tab's settings according to its persistence mode.
 * Session-scoped tabs deliberately write nothing, which is what makes the
 * default behaviour "forget everything when the tab closes".
 */
export async function syncPersistence(
  origin: string | null,
  persistence: PersistenceMode,
  settings: AudioSettings,
): Promise<void> {
  if (!origin) return;
  if (persistence === 'origin') await saveOriginSettings(origin, settings);
  else await forgetOrigin(origin);
}
