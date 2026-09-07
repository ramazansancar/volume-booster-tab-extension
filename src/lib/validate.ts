import { EQ_BAND_FREQUENCIES, type AudioSettings } from '@/types';
import { ABSOLUTE_MAX_GAIN, neutralSettings } from '@/lib/defaults';

/** Largest boost or cut a single equalizer band may apply, in decibels. */
export const MAX_EQ_DB = 12;

export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

/**
 * Coerces untrusted input (stored JSON, messages from other contexts) into a
 * valid AudioSettings object. Anything unusable falls back to the neutral value
 * for that field rather than rejecting the whole object, so a single corrupt
 * entry cannot lock the user out of the extension.
 */
export function sanitizeSettings(
  input: unknown,
  maxGain: number = ABSOLUTE_MAX_GAIN,
): AudioSettings {
  const base = neutralSettings();
  if (typeof input !== 'object' || input === null) return base;
  const raw = input as Partial<Record<keyof AudioSettings, unknown>>;
  const ceiling = clamp(maxGain, 1, ABSOLUTE_MAX_GAIN);

  if (typeof raw.gain === 'number') {
    base.gain = clamp(raw.gain, 0, ceiling);
  }
  if (typeof raw.limiterEnabled === 'boolean') {
    base.limiterEnabled = raw.limiterEnabled;
  }
  if (typeof raw.balance === 'number') {
    base.balance = clamp(raw.balance, -1, 1);
  }
  if (typeof raw.mono === 'boolean') {
    base.mono = raw.mono;
  }
  if (typeof raw.bypassed === 'boolean') {
    base.bypassed = raw.bypassed;
  }
  if (Array.isArray(raw.equalizer)) {
    base.equalizer = EQ_BAND_FREQUENCIES.map((_, index) => {
      const value = (raw.equalizer as unknown[])[index];
      return typeof value === 'number' ? clamp(value, -MAX_EQ_DB, MAX_EQ_DB) : 0;
    });
  }
  return base;
}

/** Merges a partial update onto existing settings, re-validating the result. */
export function mergeSettings(
  current: AudioSettings,
  patch: Partial<AudioSettings>,
  maxGain: number,
): AudioSettings {
  return sanitizeSettings({ ...current, ...patch }, maxGain);
}

/**
 * Extracts the origin of a URL, or null when the page cannot carry settings
 * (about:, chrome://, file:// and other non-http schemes).
 */
export function originOf(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    return parsed.origin;
  } catch {
    return null;
  }
}
