import { describe, expect, it } from 'vitest';

import { ABSOLUTE_MAX_GAIN } from '@/lib/defaults';
import { MAX_EQ_DB, clamp, mergeSettings, originOf, sanitizeSettings } from '@/lib/validate';
import { EQ_BAND_FREQUENCIES } from '@/types';

describe('clamp', () => {
  it('bounds a value to the range', () => {
    expect(clamp(5, 0, 3)).toBe(3);
    expect(clamp(-5, 0, 3)).toBe(0);
    expect(clamp(2, 0, 3)).toBe(2);
  });

  it('falls back to the minimum for non-finite input', () => {
    // NaN reaching an AudioParam silences the whole graph, so it must never
    // survive validation.
    expect(clamp(Number.NaN, 1, 6)).toBe(1);
    expect(clamp(Number.POSITIVE_INFINITY, 1, 6)).toBe(1);
  });
});

describe('sanitizeSettings', () => {
  it('returns neutral settings for junk input', () => {
    for (const input of [null, undefined, 42, 'loud', []]) {
      const result = sanitizeSettings(input);
      expect(result.gain).toBe(1);
      expect(result.equalizer).toHaveLength(EQ_BAND_FREQUENCIES.length);
    }
  });

  it('caps the gain at the supplied ceiling', () => {
    expect(sanitizeSettings({ gain: 99 }, 6).gain).toBe(6);
    expect(sanitizeSettings({ gain: 99 }).gain).toBe(ABSOLUTE_MAX_GAIN);
  });

  it('never allows a negative gain', () => {
    expect(sanitizeSettings({ gain: -3 }).gain).toBe(0);
  });

  it('keeps one bad field from discarding the rest', () => {
    const result = sanitizeSettings({ gain: 2, mono: 'yes', balance: 0.5 });
    expect(result.gain).toBe(2);
    expect(result.balance).toBe(0.5);
    expect(result.mono).toBe(false);
  });

  it('bounds equalizer bands and pads a short array', () => {
    const result = sanitizeSettings({ equalizer: [99, -99, 3] });
    expect(result.equalizer[0]).toBe(MAX_EQ_DB);
    expect(result.equalizer[1]).toBe(-MAX_EQ_DB);
    expect(result.equalizer[2]).toBe(3);
    expect(result.equalizer).toHaveLength(EQ_BAND_FREQUENCIES.length);
    expect(result.equalizer[5]).toBe(0);
  });

  it('bounds the balance to the stereo range', () => {
    expect(sanitizeSettings({ balance: 4 }).balance).toBe(1);
    expect(sanitizeSettings({ balance: -4 }).balance).toBe(-1);
  });
});

describe('mergeSettings', () => {
  it('applies a partial patch without losing other fields', () => {
    const base = sanitizeSettings({ gain: 2, mono: true });
    const merged = mergeSettings(base, { gain: 3 }, 6);
    expect(merged.gain).toBe(3);
    expect(merged.mono).toBe(true);
  });

  it('re-clamps against the ceiling on every merge', () => {
    const base = sanitizeSettings({ gain: 5 }, 6);
    expect(mergeSettings(base, {}, 2).gain).toBe(2);
  });
});

describe('originOf', () => {
  it('extracts http and https origins', () => {
    expect(originOf('https://youtube.com/watch?v=1')).toBe('https://youtube.com');
    expect(originOf('http://example.com:8080/a')).toBe('http://example.com:8080');
  });

  it('rejects pages the extension cannot touch', () => {
    // These are the pages where a boost is impossible, so they must not get a
    // storage key that would make the UI look functional.
    for (const url of [
      'chrome://extensions',
      'about:addons',
      'file:///C:/video.mp4',
      'moz-extension://abc/page.html',
      undefined,
      'not a url',
    ]) {
      expect(originOf(url)).toBeNull();
    }
  });
});
