import { ABSOLUTE_MAX_GAIN, DEFAULT_PREFERENCES } from '@/lib/defaults';
import { sanitizePresets } from '@/lib/presets';
import { clamp, sanitizeSettings } from '@/lib/validate';
import type { GlobalPreferences, OriginSettingsMap } from '@/types';

/**
 * Settings export and import.
 *
 * The file is the user's way of moving their setup between browsers and
 * machines, so it has to keep working across versions of this extension in
 * both directions: a file written today must still import after a schema
 * change, and a file written by an older build must import into a newer one.
 *
 * That is what `schema` is for. It is the version of the *file format*, not of
 * the extension - the extension's own version is recorded separately, purely as
 * a breadcrumb for anyone debugging a file someone sent them.
 */

/** Current file-format version. */
export const SCHEMA_VERSION = 3;

/**
 * Oldest format this build can read.
 *
 * Kept at 1 deliberately. Every reader below is written to cope with a field
 * being absent, so there has been no need to drop support for an older file,
 * and dropping it would strand exactly the users this feature exists for.
 */
export const MIN_SCHEMA_VERSION = 1;

/** Marker identifying a file as ours before anything is read out of it. */
export const FILE_KIND = 'volume-booster-tab/settings';

export interface TransferFile {
  kind: typeof FILE_KIND;
  /** Version of this file format. */
  schema: number;
  /** Extension version that wrote the file; informational only. */
  appVersion?: string;
  /** ISO timestamp, so a user with several files can tell them apart. */
  exportedAt?: string;
  preferences?: Partial<GlobalPreferences>;
  origins?: OriginSettingsMap;
}

export interface ImportResult {
  preferences: GlobalPreferences;
  origins: OriginSettingsMap;
  /** Counts for the message shown after a successful import. */
  counts: { origins: number; presets: number };
  /** Format version the file declared, for the confirmation message. */
  schema: number;
}

/** Raised when a file cannot be read; the message is already translated. */
export class ImportError extends Error {}

/** Builds the object written to disk. */
export function buildExport(
  preferences: GlobalPreferences,
  origins: OriginSettingsMap,
  appVersion: string,
): TransferFile {
  return {
    kind: FILE_KIND,
    schema: SCHEMA_VERSION,
    appVersion,
    exportedAt: new Date().toISOString(),
    preferences,
    origins,
  };
}

/**
 * Reads a settings file, falling back per field rather than rejecting.
 *
 * `translate` supplies the error text, because this runs in the options page
 * where the user's chosen language applies; the module has no opinion about
 * wording.
 */
export function parseImport(
  text: string,
  translate: (key: string, fallback: string) => string,
): ImportResult {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new ImportError(
      translate('optionsImportNotJson', 'That file is not valid JSON.'),
    );
  }

  if (typeof raw !== 'object' || raw === null) {
    throw new ImportError(
      translate('optionsImportNotOurs', 'That file is not a settings export from this extension.'),
    );
  }

  const file = raw as Partial<TransferFile>;

  // Checked before the version, so a JSON file from some other tool is named as
  // such rather than reported as an unsupported version of ours.
  if (file.kind !== FILE_KIND) {
    throw new ImportError(
      translate('optionsImportNotOurs', 'That file is not a settings export from this extension.'),
    );
  }

  // A file from a *newer* build may contain fields this one cannot honour.
  // Importing it would silently drop them, so it is refused rather than
  // half-applied.
  const schema = typeof file.schema === 'number' ? file.schema : 1;
  if (schema > SCHEMA_VERSION) {
    throw new ImportError(
      translate(
        'optionsImportTooNew',
        'That file was written by a newer version of this extension. Update it first.',
      ),
    );
  }
  if (schema < MIN_SCHEMA_VERSION) {
    throw new ImportError(
      translate('optionsImportTooOld', 'That file is too old to import.'),
    );
  }

  const stored = (file.preferences ?? {}) as Partial<GlobalPreferences>;

  // Every field is validated the same way it is when read from storage, so a
  // hand-edited or truncated file costs the user that field rather than
  // leaving the extension in a state it cannot render.
  const maxGain =
    typeof stored.maxGain === 'number'
      ? clamp(stored.maxGain, 1, ABSOLUTE_MAX_GAIN)
      : DEFAULT_PREFERENCES.maxGain;

  const preferences: GlobalPreferences = {
    maxGain,
    defaults: sanitizeSettings(stored.defaults, maxGain),
    defaultPersistence: stored.defaultPersistence === 'origin' ? 'origin' : 'session',
    autoLimiterAboveUnity:
      typeof stored.autoLimiterAboveUnity === 'boolean'
        ? stored.autoLimiterAboveUnity
        : DEFAULT_PREFERENCES.autoLimiterAboveUnity,
    tabCaptureFallback:
      typeof stored.tabCaptureFallback === 'boolean'
        ? stored.tabCaptureFallback
        : DEFAULT_PREFERENCES.tabCaptureFallback,
    // Schema 1 and 2 predate saved presets; an absent list is simply empty,
    // which is what sanitizePresets returns for undefined.
    userPresets: sanitizePresets(stored.userPresets),
  };

  const origins: OriginSettingsMap = {};
  if (typeof file.origins === 'object' && file.origins !== null) {
    for (const [origin, settings] of Object.entries(file.origins)) {
      // A key that is not an origin cannot be matched against a tab later, so
      // it would sit in storage forever doing nothing.
      if (!/^https?:\/\/[^/]+$/.test(origin)) continue;
      origins[origin] = sanitizeSettings(settings, maxGain);
    }
  }

  return {
    preferences,
    origins,
    counts: {
      origins: Object.keys(origins).length,
      presets: preferences.userPresets.length,
    },
    schema,
  };
}

/** Filename for an export, dated so successive exports do not collide. */
export function exportFilename(): string {
  const stamp = new Date().toISOString().slice(0, 10);
  return `volume-booster-tab-settings-${stamp}.json`;
}
