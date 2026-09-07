import { describe, expect, it, vi } from 'vitest';

import { AttachmentRegistry } from '@/content/attachments';

/** Stand-ins for a media element and its source node. */
const element = () => ({ tag: 'video' }) as object;
const source = (id: string) => ({ id });

describe('AttachmentRegistry', () => {
  it('keeps the entry when an element leaves the DOM', () => {
    // This is the bug that silenced playback on Kick: dropping the entry made
    // the next attach call createMediaElementSource a second time on the same
    // element, which throws and can never be undone.
    const registry = new AttachmentRegistry<object, { id: string }>();
    const video = element();

    registry.markConnected(video, source('a'));
    registry.markDisconnected(video);

    expect(registry.has(video)).toBe(true);
    expect(registry.get(video)?.source).toEqual({ id: 'a' });
  });

  it('reuses the original source when an element comes back', () => {
    // Players reuse one <video> across streams. The second attach has to rewire
    // the existing node rather than build a new one.
    const registry = new AttachmentRegistry<object, { id: string }>();
    const video = element();

    registry.markConnected(video, source('first'));
    registry.markDisconnected(video);

    const entry = registry.ensure(video);
    expect(entry.source).toEqual({ id: 'first' });
    expect(entry.connected).toBe(false);
  });

  it('stops counting an element that left, without forgetting it', () => {
    const registry = new AttachmentRegistry<object, { id: string }>();
    const a = element();
    const b = element();

    registry.markConnected(a, source('a'));
    registry.markConnected(b, source('b'));
    expect(registry.connectedCount()).toBe(2);

    registry.markDisconnected(a);
    expect(registry.connectedCount()).toBe(1);
    expect(registry.elements()).toHaveLength(2);
  });

  it('counts an element once when it reconnects', () => {
    const registry = new AttachmentRegistry<object, { id: string }>();
    const video = element();

    registry.markConnected(video, source('a'));
    registry.markDisconnected(video);
    registry.markConnected(video, source('a'));

    expect(registry.connectedCount()).toBe(1);
    expect(registry.elements()).toHaveLength(1);
  });

  it('resets the failure count when an element leaves', () => {
    // A returning element deserves a fresh set of retries; otherwise a stream
    // that failed once could never be picked up again.
    const registry = new AttachmentRegistry<object, { id: string }>();
    const video = element();

    expect(registry.recordFailure(video)).toBe(1);
    expect(registry.recordFailure(video)).toBe(2);

    registry.markDisconnected(video);
    expect(registry.get(video)?.attempts).toBe(0);
  });

  it('clears a pending retry when the element leaves', () => {
    vi.useFakeTimers();
    const registry = new AttachmentRegistry<object, { id: string }>();
    const video = element();
    const run = vi.fn();

    registry.scheduleRetry(video, setTimeout(run, 1000));
    registry.markDisconnected(video);
    vi.advanceTimersByTime(2000);

    expect(run).not.toHaveBeenCalled();
    expect(registry.get(video)?.timer).toBeNull();
    vi.useRealTimers();
  });

  it('clears the retry timer on a successful connect', () => {
    vi.useFakeTimers();
    const registry = new AttachmentRegistry<object, { id: string }>();
    const video = element();
    const run = vi.fn();

    registry.scheduleRetry(video, setTimeout(run, 1000));
    registry.markConnected(video, source('a'));
    vi.advanceTimersByTime(2000);

    expect(run).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('keeps every source across a full reset', () => {
    // Teardown must not disconnect sources either - the elements are still on
    // the page, and a disconnected source is a mute element.
    const registry = new AttachmentRegistry<object, { id: string }>();
    const a = element();
    const b = element();

    registry.markConnected(a, source('a'));
    registry.markConnected(b, source('b'));
    registry.reset();

    expect(registry.connectedCount()).toBe(0);
    expect(registry.get(a)?.source).toEqual({ id: 'a' });
    expect(registry.get(b)?.source).toEqual({ id: 'b' });
  });
});
