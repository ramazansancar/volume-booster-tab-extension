import { describe, expect, it } from 'vitest';

import { TabRegistry } from '@/background/tab-registry';
import { DEFAULT_PREFERENCES, neutralSettings } from '@/lib/defaults';
import type { GlobalPreferences } from '@/types';

const prefs: GlobalPreferences = {
  ...DEFAULT_PREFERENCES,
  defaults: neutralSettings(),
};

describe('TabRegistry', () => {
  it('keeps each tab independent', () => {
    // The behaviour users notice most: boosting Twitch must not touch YouTube.
    const registry = new TabRegistry();
    const twitch = registry.ensure(1, prefs, 'https://twitch.tv');
    const youtube = registry.ensure(2, prefs, 'https://youtube.com');

    registry.updateSettings(1, { ...twitch.settings, gain: 3 });
    registry.updateSettings(2, { ...youtube.settings, gain: 1.5 });

    expect(registry.get(1)?.settings.gain).toBe(3);
    expect(registry.get(2)?.settings.gain).toBe(1.5);
  });

  it('does not share the defaults object between tabs', () => {
    // A shallow copy here would let one tab's equalizer edit leak into every
    // other tab that started from the same defaults.
    const registry = new TabRegistry();
    const first = registry.ensure(1, prefs, 'https://a.example');
    const second = registry.ensure(2, prefs, 'https://b.example');

    first.settings.equalizer[0] = 6;

    expect(second.settings.equalizer[0]).toBe(0);
    expect(prefs.defaults.equalizer[0]).toBe(0);
  });

  it('forgets a tab when it closes', () => {
    const registry = new TabRegistry();
    registry.ensure(1, prefs, 'https://a.example');
    registry.remove(1);
    expect(registry.get(1)).toBeUndefined();
  });

  it('reports a tab as active only when it changes the audio', () => {
    const registry = new TabRegistry();
    const state = registry.ensure(1, prefs, 'https://a.example');
    expect(registry.isActive(1)).toBe(false);

    registry.updateSettings(1, { ...state.settings, gain: 2 });
    expect(registry.isActive(1)).toBe(true);

    // Bypass means the audio is untouched no matter what else is set.
    registry.updateSettings(1, { ...state.settings, gain: 2, bypassed: true });
    expect(registry.isActive(1)).toBe(false);
  });

  it('counts a pure equalizer change as active', () => {
    const registry = new TabRegistry();
    const state = registry.ensure(1, prefs, 'https://a.example');
    registry.updateSettings(1, {
      ...state.settings,
      equalizer: [4, 0, 0, 0, 0, 0],
    });
    expect(registry.isActive(1)).toBe(true);
  });

  it('updates the origin when a tab navigates', () => {
    const registry = new TabRegistry();
    registry.ensure(1, prefs, 'https://a.example');
    registry.ensure(1, prefs, 'https://b.example');
    expect(registry.get(1)?.origin).toBe('https://b.example');
  });

  it('lets a capture outrank a frame that reported failure', () => {
    // The sequence that made the fallback worth building: the page's own media
    // cannot be routed, the user presses "Try tab capture", and the popup has
    // to stop saying the page is blocked.
    const registry = new TabRegistry();
    registry.ensure(1, prefs, 'https://drm.example');
    registry.updateFramePathway(1, 0, 'unavailable', 'CORS refused the media');

    expect(registry.get(1)?.pathway).toBe('unavailable');

    registry.reportCapture(1, 'tab-capture');

    expect(registry.get(1)?.pathway).toBe('tab-capture');
    expect(registry.get(1)?.pathwayReason).toBeUndefined();
  });

  it('keeps reporting the capture after a later frame report', () => {
    // Sub-frames keep talking while a capture runs - an analytics iframe that
    // cannot build an AudioContext must not flip the tab back to "blocked".
    const registry = new TabRegistry();
    registry.ensure(1, prefs, 'https://example.com');
    registry.reportCapture(1, 'tab-capture');

    registry.updateFramePathway(1, 7, 'unavailable', 'no AudioContext');

    expect(registry.get(1)?.pathway).toBe('tab-capture');
  });

  it('surfaces the reason a capture attempt failed', () => {
    const registry = new TabRegistry();
    registry.ensure(1, prefs, 'https://example.com');
    registry.reportCapture(1, 'unavailable', 'Tab capture was refused');

    expect(registry.get(1)?.pathway).toBe('unavailable');
    expect(registry.get(1)?.pathwayReason).toBe('Tab capture was refused');
  });

  it('returns to the frame reports once a capture is cleared', () => {
    // A navigation clears the capture, and the new document gets to speak for
    // itself again rather than inheriting the old tab's verdict.
    const registry = new TabRegistry();
    registry.ensure(1, prefs, 'https://example.com');
    registry.updateFramePathway(1, 0, 'media-element');
    registry.reportCapture(1, 'tab-capture');

    registry.reportCapture(1, 'idle');

    expect(registry.get(1)?.pathway).toBe('media-element');
  });

  it('drops the capture record when the tab closes', () => {
    // Tab ids are reused, so a stale capture record would make a brand new tab
    // claim it was already being captured.
    const registry = new TabRegistry();
    registry.ensure(1, prefs, 'https://example.com');
    registry.reportCapture(1, 'tab-capture');

    registry.remove(1);
    registry.ensure(1, prefs, 'https://other.example');

    expect(registry.get(1)?.pathway).toBe('idle');
  });
});
