import { describe, expect, it } from 'vitest';

import {
  FILE_KIND,
  ImportError,
  SCHEMA_VERSION,
  buildExport,
  exportFilename,
  parseImport,
} from '@/lib/transfer';
import { DEFAULT_PREFERENCES } from '@/lib/defaults';
import { neutralSettings } from '@/lib/defaults';
import type { GlobalPreferences } from '@/types';

/** Error text is supplied by the caller, so the tests pass the key through. */
const translate = (key: string): string => key;

function preferences(overrides: Partial<GlobalPreferences> = {}): GlobalPreferences {
  return {
    ...DEFAULT_PREFERENCES,
    defaults: neutralSettings(),
    userPresets: [],
    ...overrides,
  };
}

describe('buildExport', () => {
  it('stamps the file with its kind, schema and a date', () => {
    const file = buildExport(preferences(), {}, '1.2.3');
    expect(file.kind).toBe(FILE_KIND);
    expect(file.schema).toBe(SCHEMA_VERSION);
    expect(file.appVersion).toBe('1.2.3');
    // The timestamp is what lets a user with several exports tell them apart.
    expect(Date.parse(file.exportedAt ?? '')).not.toBeNaN();
  });

  it('dates the filename, so successive exports do not collide', () => {
    expect(exportFilename()).toMatch(/^volume-booster-tab-settings-\d{4}-\d{2}-\d{2}\.json$/);
  });
});

describe('parseImport round trip', () => {
  it('restores what was exported', () => {
    const original = preferences({
      maxGain: 8,
      defaultPersistence: 'origin',
      userPresets: [{ id: 'u1', name: 'Podcast', gains: [-4, -2, 1, 4, 5, 1] }],
    });
    const origins = { 'https://example.com': neutralSettings() };

    const text = JSON.stringify(buildExport(original, origins, '1.0.0'));
    const result = parseImport(text, translate);

    expect(result.preferences.maxGain).toBe(8);
    expect(result.preferences.defaultPersistence).toBe('origin');
    expect(result.preferences.userPresets).toHaveLength(1);
    expect(result.preferences.userPresets[0]?.name).toBe('Podcast');
    expect(result.origins['https://example.com']).toBeDefined();
    expect(result.counts).toEqual({ origins: 1, presets: 1 });
  });
});

describe('parseImport backward compatibility', () => {
  /*
   * The whole point of the version field: a file written by an older build has
   * to keep importing. Schema 1 predates saved presets entirely, so the reader
   * must treat the missing list as empty rather than failing on it.
   */
  it('reads a schema 1 file that has no presets', () => {
    const legacy = {
      kind: FILE_KIND,
      schema: 1,
      preferences: { maxGain: 4, defaultPersistence: 'origin' },
      origins: { 'https://old.example': { gain: 2 } },
    };

    const result = parseImport(JSON.stringify(legacy), translate);
    expect(result.schema).toBe(1);
    expect(result.preferences.maxGain).toBe(4);
    expect(result.preferences.userPresets).toEqual([]);
    expect(result.preferences.defaults).toEqual(neutralSettings());
    expect(result.origins['https://old.example']?.gain).toBe(2);
  });

  it('treats a file with no schema field as version 1', () => {
    const ancient = { kind: FILE_KIND, preferences: { maxGain: 3 } };
    expect(parseImport(JSON.stringify(ancient), translate).schema).toBe(1);
  });

  it('refuses a file from a newer build rather than dropping its fields', () => {
    const future = { kind: FILE_KIND, schema: SCHEMA_VERSION + 1 };
    expect(() => parseImport(JSON.stringify(future), translate)).toThrow(ImportError);
    expect(() => parseImport(JSON.stringify(future), translate)).toThrow(
      'optionsImportTooNew',
    );
  });
});

describe('parseImport rejects what it cannot use', () => {
  it('names a non-JSON file as such', () => {
    expect(() => parseImport('not json at all', translate)).toThrow('optionsImportNotJson');
  });

  it('names a JSON file from another tool as such, not as a bad version', () => {
    // Checked before the version so the message matches the actual problem.
    expect(() => parseImport('{"schema":99}', translate)).toThrow('optionsImportNotOurs');
  });

  it('rejects a JSON array', () => {
    expect(() => parseImport('[]', translate)).toThrow('optionsImportNotOurs');
  });
});

describe('parseImport sanitises untrusted content', () => {
  it('clamps a gain above the absolute ceiling', () => {
    const file = {
      kind: FILE_KIND,
      schema: SCHEMA_VERSION,
      preferences: { maxGain: 9999, defaults: { gain: 9999 } },
    };
    const result = parseImport(JSON.stringify(file), translate);
    expect(result.preferences.maxGain).toBeLessThanOrEqual(10);
    expect(result.preferences.defaults.gain).toBeLessThanOrEqual(10);
  });

  it('drops origin keys that are not origins', () => {
    // A key that cannot match a tab would sit in storage forever doing nothing.
    const file = {
      kind: FILE_KIND,
      schema: SCHEMA_VERSION,
      origins: {
        'https://good.example': { gain: 1 },
        'not-a-url': { gain: 1 },
        'https://bad.example/with/path': { gain: 1 },
        'javascript:alert(1)': { gain: 1 },
      },
    };
    const result = parseImport(JSON.stringify(file), translate);
    expect(Object.keys(result.origins)).toEqual(['https://good.example']);
  });

  it('survives a preferences field of the wrong type', () => {
    const file = {
      kind: FILE_KIND,
      schema: SCHEMA_VERSION,
      preferences: { maxGain: 'loud', defaults: 'nonsense', userPresets: 'none' },
    };
    const result = parseImport(JSON.stringify(file), translate);
    expect(result.preferences.maxGain).toBe(DEFAULT_PREFERENCES.maxGain);
    expect(result.preferences.defaults).toEqual(neutralSettings());
    expect(result.preferences.userPresets).toEqual([]);
  });
});
