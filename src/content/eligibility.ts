/**
 * Decides whether a media element may be routed into the audio graph yet.
 *
 * Routing is irreversible (see `attachments.ts`), so the question has to be
 * answered before `createMediaElementSource`, never after. Two things make the
 * answer "not now" or "never":
 *
 *  - **Encrypted media.** A player using Encrypted Media Extensions attaches
 *    its MediaKeys after the element already exists and has fired `loadstart`.
 *    Firefox refuses `setMediaKeys` on an element whose audio is being
 *    captured, so wrapping it first makes the player fail outright - Prime
 *    Video shows "Video unavailable". Chromium lets it play but hands the graph
 *    silence. Either way a protected element must be left alone.
 *  - **Media that has not started.** Waiting for real playback is what makes
 *    the encryption check trustworthy: an encrypted stream cannot reach
 *    `playing` without its keys, so by then `mediaKeys` is set or the
 *    `encrypted` event has fired. Earlier events such as `loadstart` come
 *    before either, which is exactly how the capture used to win the race.
 */

/** The subset of HTMLMediaElement this module reads, so tests can fake it. */
export interface MediaLike {
  readonly mediaKeys: unknown;
  readonly paused: boolean;
  readonly readyState: number;
}

export type Eligibility = 'ready' | 'wait' | 'protected';

/** HTMLMediaElement.HAVE_CURRENT_DATA, spelled out so tests need no DOM. */
const HAVE_CURRENT_DATA = 2;

/**
 * @param sawEncrypted whether the element has fired an `encrypted` event,
 *   which can precede `setMediaKeys` by a noticeable delay.
 */
export function mediaEligibility(element: MediaLike, sawEncrypted: boolean): Eligibility {
  if (sawEncrypted || element.mediaKeys != null) return 'protected';
  if (element.paused || element.readyState < HAVE_CURRENT_DATA) return 'wait';
  return 'ready';
}
