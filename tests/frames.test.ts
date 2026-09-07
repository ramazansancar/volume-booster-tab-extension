import { describe, expect, it } from 'vitest';

import { TabRegistry } from '@/background/tab-registry';
import { DEFAULT_PREFERENCES, neutralSettings } from '@/lib/defaults';
import type { GlobalPreferences } from '@/types';

const prefs: GlobalPreferences = {
  ...DEFAULT_PREFERENCES,
  defaults: neutralSettings(),
};

const TOP = 0;
const PLAYER_FRAME = 7;
const WIDGET_FRAME = 12;

describe('per-frame reporting', () => {
  it('sums media counts across frames', () => {
    // A page can drive media in several frames at once; the popup should show
    // the total, not whichever frame reported last.
    const registry = new TabRegistry();
    registry.ensure(1, prefs, 'https://kick.com');

    registry.updateFrameMediaCount(1, TOP, 0);
    registry.updateFrameMediaCount(1, PLAYER_FRAME, 1);

    expect(registry.get(1)?.mediaElementCount).toBe(1);
  });

  it('reports the tab as working when any frame is driving audio', () => {
    // The top document of a site like Kick has no media of its own, and an
    // embedded widget on an unrelated origin may fail outright. Neither should
    // mask the player frame that is actually working.
    const registry = new TabRegistry();
    registry.ensure(1, prefs, 'https://kick.com');

    registry.updateFramePathway(1, TOP, 'idle');
    registry.updateFramePathway(1, WIDGET_FRAME, 'unavailable', 'no media');
    registry.updateFramePathway(1, PLAYER_FRAME, 'media-element');

    expect(registry.get(1)?.pathway).toBe('media-element');
    expect(registry.get(1)?.pathwayReason).toBeUndefined();
  });

  it('surfaces a failure reason only when nothing is working', () => {
    const registry = new TabRegistry();
    registry.ensure(1, prefs, 'https://example.com');

    registry.updateFramePathway(1, TOP, 'unavailable', 'DRM protected');

    expect(registry.get(1)?.pathway).toBe('unavailable');
    expect(registry.get(1)?.pathwayReason).toBe('DRM protected');
  });

  it('clears a stale reason once a frame starts working', () => {
    // A reason that outlived its cause would tell the user a page is broken
    // while the audio is audibly being boosted.
    const registry = new TabRegistry();
    registry.ensure(1, prefs, 'https://example.com');

    registry.updateFramePathway(1, PLAYER_FRAME, 'unavailable', 'no source yet');
    expect(registry.get(1)?.pathwayReason).toBe('no source yet');

    registry.updateFramePathway(1, PLAYER_FRAME, 'media-element');
    expect(registry.get(1)?.pathwayReason).toBeUndefined();
    expect(registry.get(1)?.pathway).toBe('media-element');
  });

  it('drops frame state when the tab closes', () => {
    // Frame ids are reused across tabs, so leaking them would let a closed
    // tab's report describe a new one.
    const registry = new TabRegistry();
    registry.ensure(1, prefs, 'https://example.com');
    registry.updateFrameMediaCount(1, PLAYER_FRAME, 3);
    registry.remove(1);

    const state = registry.ensure(1, prefs, 'https://other.example');
    expect(state.mediaElementCount).toBe(0);
    expect(state.pathway).toBe('idle');
  });

  it('goes back to idle when every frame stops', () => {
    const registry = new TabRegistry();
    registry.ensure(1, prefs, 'https://example.com');

    registry.updateFramePathway(1, PLAYER_FRAME, 'media-element');
    registry.updateFrameMediaCount(1, PLAYER_FRAME, 1);
    expect(registry.get(1)?.pathway).toBe('media-element');

    registry.updateFramePathway(1, PLAYER_FRAME, 'idle');
    registry.updateFrameMediaCount(1, PLAYER_FRAME, 0);
    expect(registry.get(1)?.pathway).toBe('idle');
    expect(registry.get(1)?.mediaElementCount).toBe(0);
  });
});
