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
});
