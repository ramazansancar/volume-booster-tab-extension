/**
 * Bookkeeping for the media elements this document has routed into the audio
 * graph.
 *
 * Extracted from the content script because the rules it enforces are subtle,
 * easy to regress, and cost the user their audio entirely when broken - so they
 * are worth testing directly, away from the Web Audio APIs that a test
 * environment cannot provide.
 *
 * Two facts about the Web Audio spec drive the whole design:
 *
 *  1. `createMediaElementSource` may be called at most once per element, for
 *     the lifetime of that element. A second call throws InvalidStateError.
 *  2. Routing an element through a source node is irreversible. Disconnecting
 *     the node does not hand the audio back to the browser - it sends it
 *     nowhere, and the element is silent until the document is reloaded.
 *
 * Together these mean an entry must never be deleted and a source must never be
 * disconnected, however far the element travels through the DOM. Players like
 * Kick reuse one <video> across streams, detaching and reattaching it; treating
 * that as a teardown left the element permanently mute.
 */

export interface Attachment<TSource = unknown> {
  /**
   * The source node wrapping the element. Created once and kept forever, so a
   * returning element is rewired rather than re-wrapped.
   */
  source: TSource | null;
  /** Consecutive failed attach attempts, reset on success. */
  attempts: number;
  /** Pending retry, if one is scheduled. */
  timer: ReturnType<typeof setTimeout> | null;
  /** Whether the element is currently in the DOM and feeding the engine. */
  connected: boolean;
}

/**
 * Tracks attachments per element. Backed by a Map rather than a WeakMap because
 * retry counts have to be read back, and the entries are bounded by the number
 * of distinct media elements a document creates.
 */
export class AttachmentRegistry<TElement extends object, TSource = unknown> {
  private readonly entries = new Map<TElement, Attachment<TSource>>();

  /** Returns the existing entry for an element, creating a blank one if new. */
  ensure(element: TElement): Attachment<TSource> {
    let entry = this.entries.get(element);
    if (!entry) {
      entry = { source: null, attempts: 0, timer: null, connected: false };
      this.entries.set(element, entry);
    }
    return entry;
  }

  get(element: TElement): Attachment<TSource> | undefined {
    return this.entries.get(element);
  }

  has(element: TElement): boolean {
    return this.entries.has(element);
  }

  /** Records a successful attach. */
  markConnected(element: TElement, source: TSource): void {
    const entry = this.ensure(element);
    entry.source = source;
    entry.connected = true;
    entry.attempts = 0;
    if (entry.timer !== null) {
      clearTimeout(entry.timer);
      entry.timer = null;
    }
  }

  /**
   * Records that an element has left the DOM.
   *
   * The entry survives and the source node stays wired to the engine; only the
   * connected flag is cleared. This is the single most important rule in the
   * file: deleting the entry would make a returning element throw on its next
   * `createMediaElementSource`, and disconnecting the node would mute it for
   * good.
   */
  markDisconnected(element: TElement): void {
    const entry = this.entries.get(element);
    if (!entry) return;
    if (entry.timer !== null) {
      clearTimeout(entry.timer);
      entry.timer = null;
    }
    entry.connected = false;
    entry.attempts = 0;
  }

  /** Counts a failed attach and returns the new total. */
  recordFailure(element: TElement): number {
    const entry = this.ensure(element);
    entry.attempts += 1;
    entry.timer = null;
    return entry.attempts;
  }

  scheduleRetry(element: TElement, timer: ReturnType<typeof setTimeout>): void {
    this.ensure(element).timer = timer;
  }

  clearRetry(element: TElement): void {
    const entry = this.entries.get(element);
    if (!entry || entry.timer === null) return;
    clearTimeout(entry.timer);
    entry.timer = null;
  }

  /** How many elements are currently feeding the engine. */
  connectedCount(): number {
    let count = 0;
    for (const entry of this.entries.values()) {
      if (entry.connected) count += 1;
    }
    return count;
  }

  /** Every element seen so far, connected or not. */
  elements(): TElement[] {
    return [...this.entries.keys()];
  }

  /**
   * Cancels pending retries and marks everything disconnected, for a full
   * teardown. Sources are still not disconnected, for the reason above.
   */
  reset(): void {
    for (const element of this.entries.keys()) this.markDisconnected(element);
  }
}
