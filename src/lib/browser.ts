/**
 * Thin compatibility layer over the WebExtension APIs.
 *
 * Firefox exposes a promise-based `browser.*` namespace, Chromium exposes a
 * callback-based `chrome.*` one (promise-based for most APIs since MV3). Rather
 * than pulling in a polyfill we wrap only the handful of calls this extension
 * makes, which keeps the bundle small and the behaviour explicit.
 */

declare const browser: typeof chrome | undefined;

/** The namespace object, whichever the host browser provides. */
export const ext: typeof chrome =
  typeof browser !== 'undefined' && browser?.runtime
    ? (browser as typeof chrome)
    : chrome;

/** True when running on a Firefox-family browser. */
export const isFirefox = typeof browser !== 'undefined' && !!browser?.runtime;

/** Manifest version of the currently running build. */
export function manifestVersion(): 2 | 3 {
  return ext.runtime.getManifest().manifest_version === 2 ? 2 : 3;
}

/** True when tabCapture is usable, which today means Chromium with MV3. */
export function supportsTabCapture(): boolean {
  return typeof ext.tabCapture?.getMediaStreamId === 'function';
}

/** True when the offscreen document API exists (Chromium MV3 only). */
export function supportsOffscreen(): boolean {
  return typeof (ext as { offscreen?: unknown }).offscreen === 'object';
}

/**
 * Calls a browser API that may be promise-based or callback-based and always
 * returns a promise. Errors surfaced through runtime.lastError are rethrown.
 */
export function promisify<T>(
  invoke: (callback: (result: T) => void) => void,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    try {
      invoke((result) => {
        const error = ext.runtime.lastError;
        if (error) reject(new Error(error.message ?? 'Unknown extension error'));
        else resolve(result);
      });
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
    }
  });
}

/**
 * Sends a message and swallows "receiving end does not exist" errors, which are
 * expected whenever a tab has no content script (an internal page, a tab that
 * has not finished loading, or a page the manifest does not match).
 */
export async function sendMessageSafe<T>(
  send: () => Promise<T>,
): Promise<T | undefined> {
  try {
    return await send();
  } catch {
    return undefined;
  }
}
