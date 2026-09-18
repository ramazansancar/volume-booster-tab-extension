/**
 * Where "rate this" and "get help" should send the user.
 *
 * Both destinations depend on where the extension was installed from, and that
 * is decided at build time rather than guessed at runtime: every store gets its
 * own package, so `__BROWSER__` already names the right one. Sniffing the user
 * agent instead would be worse in both directions — a Chromium fork reports
 * itself as Chrome, and a user who installed the Chrome build on Edge would be
 * sent to a listing that has no review button for them.
 *
 * The review URLs point straight at each store's review form where the store
 * offers a deep link, so the button lands on the thing it promised rather than
 * on a listing page the user then has to scroll.
 */

/** Issue tracker. One destination for every build: the extension is one repo. */
export const SUPPORT_URL =
  'https://github.com/ramazansancar/volume-booster-tab-extension/issues';

/**
 * The review URL for this build, or null when its store has no listing.
 *
 * Written as a chain of comparisons against `__BROWSER__` rather than as a
 * lookup table, because esbuild substitutes that constant and then folds the
 * whole chain away: each package ends up carrying only its own URL. A table
 * indexed at runtime would compile to every store's URL in every package,
 * which is both dead weight and a confusing thing to find in a review.
 *
 * Null is not a gap to fill in later with a guess. It is what makes the popup
 * drop the stars: Opera is still in review and Safari is built from source, so
 * neither has a review form to send anyone to.
 */
export function reviewUrl(): string | null {
  // Chrome's listing anchors the review pane directly.
  if (__BROWSER__ === 'chrome') {
    return 'https://chromewebstore.google.com/detail/icmlbabfmbcmpjekdinfhblfpngadhad/reviews';
  }
  // Edge has no review deep link; the listing page carries the rating control.
  if (__BROWSER__ === 'edge') {
    return 'https://microsoftedge.microsoft.com/addons/detail/cpbcdpdcompfagchdibndboomcplhodk';
  }
  // AMO's dedicated review form, which opens with the star picker focused.
  if (__BROWSER__ === 'firefox') {
    return 'https://addons.mozilla.org/en-US/firefox/addon/volume-booster-tab/reviews/';
  }
  return null;
}

/** True when this build has somewhere to send a rating. */
export function canReview(): boolean {
  return reviewUrl() !== null;
}

/** Human-readable name of the store this build came from. */
export function storeName(): string {
  if (__BROWSER__ === 'chrome') return 'Chrome Web Store';
  if (__BROWSER__ === 'edge') return 'Microsoft Edge Add-ons';
  if (__BROWSER__ === 'firefox') return 'Firefox Add-ons';
  if (__BROWSER__ === 'opera') return 'Opera add-ons';
  return 'Safari';
}
