import { EQ_BAND_FREQUENCIES, type EqualizerGains } from '@/types';
import { MAX_EQ_DB, clamp } from '@/lib/validate';

/**
 * Equalizer presets, band naming, and the three-control tone stack.
 *
 * The extension ships a six-band equalizer. Six sliders is more than most
 * people want to touch, so this module offers two smaller ways in: a list of
 * named presets, and a bass/mid/treble trio that drives the same six bands.
 * Neither is a second equalizer - both write EqualizerGains, so whatever the
 * user reaches for, the audio engine sees one shape of data.
 */

/* -------------------------------------------------------------------------- */
/* Band names                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * What each band is called, and what moving it actually does to the sound.
 *
 * The frequency alone ("350 Hz") tells a user who already knows what they are
 * doing nothing they did not know, and tells everyone else nothing at all.
 * These are the names the audio world uses for those ranges, with the audible
 * effect spelled out, so the label answers "what will this change?".
 *
 * Keyed by frequency rather than by index so that adding a band cannot
 * silently shift every name onto the wrong slider.
 */
export const BAND_LABELS: Record<number, { nameKey: string; hintKey: string }> = {
  60: { nameKey: 'bandSubBass', hintKey: 'bandSubBassHint' },
  170: { nameKey: 'bandBass', hintKey: 'bandBassHint' },
  350: { nameKey: 'bandLowMid', hintKey: 'bandLowMidHint' },
  1000: { nameKey: 'bandMid', hintKey: 'bandMidHint' },
  3500: { nameKey: 'bandPresence', hintKey: 'bandPresenceHint' },
  10000: { nameKey: 'bandBrilliance', hintKey: 'bandBrillianceHint' },
};

/* -------------------------------------------------------------------------- */
/* Tone stack: three controls over six bands                                   */
/* -------------------------------------------------------------------------- */

/**
 * Which bands each of the three tone controls moves, and how strongly.
 *
 * The weights overlap deliberately. A tone control with hard edges sounds like
 * a tone control - you hear the band it stops at. Tapering the outer bands to
 * half strength makes the three behave like the bass/mid/treble knobs on an
 * amplifier, where each one shades into the next.
 *
 * Every band is covered by at least one control, so a shape reachable with the
 * six sliders is never unreachable from the three.
 */
const TONE_WEIGHTS: Record<ToneControl, Record<number, number>> = {
  bass: { 60: 1, 170: 1, 350: 0.5 },
  mid: { 350: 0.5, 1000: 1, 3500: 0.5 },
  treble: { 3500: 0.5, 10000: 1 },
};

export type ToneControl = 'bass' | 'mid' | 'treble';

export const TONE_CONTROLS: ToneControl[] = ['bass', 'mid', 'treble'];

/** Applies one tone control to a set of band gains, returning a new set. */
export function applyTone(
  equalizer: EqualizerGains,
  control: ToneControl,
  db: number,
): EqualizerGains {
  const weights = TONE_WEIGHTS[control];
  const value = clamp(db, -MAX_EQ_DB, MAX_EQ_DB);

  return EQ_BAND_FREQUENCIES.map((frequency, index) => {
    const weight = weights[frequency];
    // Bands this control does not own keep whatever the user set by hand, so
    // reaching for Bass never quietly undoes an adjustment made in Advanced.
    if (weight === undefined) return equalizer[index] ?? 0;
    return clamp(Math.round(value * weight), -MAX_EQ_DB, MAX_EQ_DB);
  });
}

/**
 * Reads back the position of one tone control from a set of band gains.
 *
 * Used to place the three sliders when the popup opens, or after the six-band
 * equalizer has been edited directly. It reports the gain of the control's
 * strongest band, which round-trips exactly for any shape the tone controls
 * produced and gives a sensible reading for shapes they did not.
 */
export function readTone(equalizer: EqualizerGains, control: ToneControl): number {
  const weights = TONE_WEIGHTS[control];
  let best = 0;
  let bestWeight = 0;

  EQ_BAND_FREQUENCIES.forEach((frequency, index) => {
    const weight = weights[frequency] ?? 0;
    if (weight > bestWeight) {
      bestWeight = weight;
      best = equalizer[index] ?? 0;
    }
  });
  return best;
}

/* -------------------------------------------------------------------------- */
/* Built-in presets                                                            */
/* -------------------------------------------------------------------------- */

export interface EqPreset {
  /** Stable identifier, stored rather than the name so renaming is safe. */
  id: string;
  /** Message key for the display name; absent on user presets. */
  nameKey?: string;
  /** Literal name, used by user presets. */
  name?: string;
  /** Band gains in dB, one per EQ_BAND_FREQUENCIES entry. */
  gains: EqualizerGains;
}

/**
 * The presets that ship with the extension.
 *
 * Each is a shape, not a volume: the curves sum to roughly nothing so that
 * switching preset changes the character of the sound without changing how
 * loud it is. That matters here more than in a music player, because the user
 * may already be at 600% and a preset that added broadband gain on top would
 * be a genuine hazard.
 *
 * Values are in dB per band, ordered to match EQ_BAND_FREQUENCIES:
 * 60, 170, 350, 1000, 3500, 10000 Hz.
 */
export const BUILTIN_PRESETS: EqPreset[] = [
  { id: 'flat', nameKey: 'presetFlat', gains: [0, 0, 0, 0, 0, 0] },
  // Speech: cut the rumble that masks consonants, lift the presence range
  // where intelligibility actually lives.
  { id: 'voice', nameKey: 'presetVoice', gains: [-4, -2, 1, 4, 5, 1] },
  // Music: the gentle smile curve, lows and highs up, mids left alone.
  { id: 'music', nameKey: 'presetMusic', gains: [4, 3, 0, -1, 2, 4] },
  // Film: weight under explosions, presence for dialogue over the score.
  { id: 'cinema', nameKey: 'presetCinema', gains: [5, 2, -1, 1, 3, 3] },
  // Studio: nearly flat, with the smallest tilt away from harshness.
  { id: 'studio', nameKey: 'presetStudio', gains: [1, 0, 0, 0, -1, 1] },
  // Outdoors: traffic and wind sit low, so cut there and push presence up to
  // carry the signal over them.
  { id: 'outdoor', nameKey: 'presetOutdoor', gains: [-6, -3, 0, 3, 6, 4] },
  // Nature recordings: air and detail at the top, rumble out of the way.
  { id: 'nature', nameKey: 'presetNature', gains: [-3, -1, 0, 1, 3, 6] },
  // Bass boost, kept inside the limiter's comfort zone.
  { id: 'bass', nameKey: 'presetBass', gains: [8, 5, 1, -1, 0, 0] },
  // Night: pull the extremes in so quiet passages stay audible without the
  // loud ones waking the house.
  { id: 'night', nameKey: 'presetNight', gains: [-5, -2, 1, 3, 1, -3] },

  /*
   * Genre curves. These are the shapes people expect to find under these
   * names, kept to the same rule as the ones above: each sums to roughly
   * nothing, so picking one changes the character and not the loudness.
   */
  // Rock: scooped mids, with bite in the presence range for guitars.
  { id: 'rock', nameKey: 'presetRock', gains: [5, 3, -2, -1, 4, 3] },
  // Pop: vocals forward, gentle lift at both ends.
  { id: 'pop', nameKey: 'presetPop', gains: [2, 1, -1, 3, 3, 2] },
  // Jazz: warm low end, honest mids, air on top.
  { id: 'jazz', nameKey: 'presetJazz', gains: [4, 2, 0, 1, 2, 3] },
  // Classical: nearly flat with hall air, since the recording already has
  // the balance the conductor wanted.
  { id: 'classical', nameKey: 'presetClassical', gains: [3, 1, 0, 0, 1, 3] },
  // Electronic: sub weight and a bright top, the mids left out of the way.
  { id: 'electronic', nameKey: 'presetElectronic', gains: [6, 3, -2, 0, 2, 5] },
  // Hip-hop: the kick and the bassline carry it, vocals kept present.
  { id: 'hiphop', nameKey: 'presetHipHop', gains: [7, 4, -1, 2, 2, 1] },
  // Acoustic: body without mud, string detail at the top.
  { id: 'acoustic', nameKey: 'presetAcoustic', gains: [3, 2, -1, 1, 3, 4] },
  // Vocal boost: everything that is not the voice pulled back a little.
  { id: 'vocal', nameKey: 'presetVocal', gains: [-3, -2, 2, 5, 4, 0] },
  // Bass reducer, for headphones that already have too much of it.
  { id: 'bassCut', nameKey: 'presetBassCut', gains: [-7, -4, -1, 1, 1, 1] },
];

/** Looks up a built-in preset by id. */
export function builtinPreset(id: string): EqPreset | undefined {
  return BUILTIN_PRESETS.find((preset) => preset.id === id);
}

/**
 * Finds the preset whose curve matches these gains exactly, if any.
 *
 * An exact match is the right test: the dropdown should show a preset's name
 * only while the sound really is that preset. Once the user nudges one band it
 * is their own shape, and saying otherwise would misdescribe what they hear.
 */
export function matchPreset(
  equalizer: EqualizerGains,
  userPresets: EqPreset[] = [],
): EqPreset | undefined {
  const same = (gains: EqualizerGains): boolean =>
    EQ_BAND_FREQUENCIES.every((_, index) => (gains[index] ?? 0) === (equalizer[index] ?? 0));

  // User presets win a tie, since a user who saved their own version of a
  // built-in curve means that one.
  return userPresets.find((preset) => same(preset.gains))
    ?? BUILTIN_PRESETS.find((preset) => same(preset.gains));
}

/* -------------------------------------------------------------------------- */
/* User presets                                                                */
/* -------------------------------------------------------------------------- */

/** Ceiling on saved presets, so a runaway loop cannot fill the storage quota. */
export const MAX_USER_PRESETS = 24;

/** Longest name accepted, enough to be descriptive and short enough to render. */
export const MAX_PRESET_NAME = 40;

/**
 * Coerces stored preset JSON into a usable list.
 *
 * Presets come out of storage, which is untrusted in the same way the rest of
 * the stored state is: a half-written or hand-edited entry should cost the user
 * that one preset, not the whole list.
 */
export function sanitizePresets(input: unknown): EqPreset[] {
  if (!Array.isArray(input)) return [];

  const presets: EqPreset[] = [];
  const seen = new Set<string>();

  for (const entry of input) {
    if (presets.length >= MAX_USER_PRESETS) break;
    if (typeof entry !== 'object' || entry === null) continue;

    const raw = entry as Partial<Record<keyof EqPreset, unknown>>;
    const id = typeof raw.id === 'string' ? raw.id.slice(0, 64) : '';
    const name = typeof raw.name === 'string' ? raw.name.trim().slice(0, MAX_PRESET_NAME) : '';
    if (!id || !name || seen.has(id)) continue;
    if (!Array.isArray(raw.gains)) continue;

    seen.add(id);
    presets.push({
      id,
      name,
      gains: EQ_BAND_FREQUENCIES.map((_, index) => {
        const value = (raw.gains as unknown[])[index];
        return typeof value === 'number' ? clamp(Math.round(value), -MAX_EQ_DB, MAX_EQ_DB) : 0;
      }),
    });
  }
  return presets;
}

/** Mints an id for a new user preset. */
export function newPresetId(): string {
  return `u${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

/** The display name of a preset, translated for built-ins. */
export function presetName(preset: EqPreset, translate: (key: string) => string): string {
  return preset.nameKey ? translate(preset.nameKey) : (preset.name ?? '');
}
