import { describe, expect, it } from 'vitest';
import { mediaEligibility, type MediaLike } from '@/content/eligibility';

const media = (overrides: Partial<MediaLike> = {}): MediaLike => ({
  mediaKeys: null,
  paused: false,
  readyState: 4,
  ...overrides,
});

describe('mediaEligibility', () => {
  it('is ready for clear media that is playing', () => {
    expect(mediaEligibility(media(), false)).toBe('ready');
  });

  it('waits for an element that has not started', () => {
    expect(mediaEligibility(media({ paused: true }), false)).toBe('wait');
    expect(mediaEligibility(media({ readyState: 1 }), false)).toBe('wait');
  });

  it('never routes an element with MediaKeys attached', () => {
    expect(mediaEligibility(media({ mediaKeys: {} }), false)).toBe('protected');
  });

  it('treats an encrypted event as protected before the keys arrive', () => {
    expect(mediaEligibility(media(), true)).toBe('protected');
  });

  it('checks protection before playback, so a paused DRM element is not merely waiting', () => {
    expect(mediaEligibility(media({ paused: true, mediaKeys: {} }), false)).toBe('protected');
  });

  describe('where keyed media is audible (Firefox)', () => {
    it('routes a keyed element once it plays', () => {
      expect(mediaEligibility(media({ mediaKeys: {} }), true, true)).toBe('ready');
    });

    it('waits for the keys after an encrypted event, never capturing ahead of them', () => {
      expect(mediaEligibility(media(), true, true)).toBe('wait');
    });

    it('still waits for playback on a keyed element', () => {
      expect(mediaEligibility(media({ mediaKeys: {}, paused: true }), false, true)).toBe('wait');
    });
  });
});
