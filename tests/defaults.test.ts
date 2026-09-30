import { describe, expect, it } from 'vitest';

import { neutralSettings, sameSettings } from '@/lib/defaults';

describe('sameSettings', () => {
  it('treats two copies of the same settings as equal', () => {
    expect(sameSettings(neutralSettings(), neutralSettings())).toBe(true);
  });

  it('notices a change in any field, including one equalizer band', () => {
    const base = neutralSettings();
    expect(sameSettings(base, { ...base, gain: 2 })).toBe(false);
    expect(sameSettings(base, { ...base, mono: true })).toBe(false);

    const eq = neutralSettings();
    eq.equalizer[3] = 1;
    expect(sameSettings(base, eq)).toBe(false);
  });
});
