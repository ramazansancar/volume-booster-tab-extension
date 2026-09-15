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

/**
 * True when tabCapture is usable, which today means Chromium with MV3.
 *
 * The manifest-version check is not redundant with the API check. MV2 Chromium
 * exposes tabCapture too, but this build deliberately does not request the
 * permission there - the capture path is written against the MV3 worker plus
 * offscreen-document split, and MV2 has no offscreen API. Without this check
 * the popup would offer a fallback that fails the moment it is used.
 */
export function supportsTabCapture(): boolean {
  return (
    manifestVersion() === 3 && typeof ext.tabCapture?.getMediaStreamId === 'function'
  );
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

/* -------------------------------------------------------------------------- */
/* Promise-shaped wrappers                                                     */
/* -------------------------------------------------------------------------- */

/*
 * Chromium only returns promises from these APIs under Manifest V3. Under MV2
 * they are callback-only, so `await chrome.tabs.sendMessage(...)` resolves to
 * undefined immediately: the call still happens, but the reply is dropped and
 * any error is invisible. Firefox returns promises under both versions.
 *
 * These wrappers detect which shape the host provides and always hand back a
 * promise, so calling code does not have to care.
 */

/** True when the host returns promises from the callback-style APIs. */
function returnsPromises(): boolean {
  // Firefox's browser.* namespace is promise-based everywhere; Chromium's is
  // only from MV3 onward.
  return isFirefox || manifestVersion() === 3;
}

/** Sends a message to one tab, optionally to a single frame within it. */
export function sendMessageToTab<T>(
  tabId: number,
  message: unknown,
  options?: { frameId?: number },
): Promise<T> {
  if (returnsPromises()) {
    return options
      ? (ext.tabs.sendMessage(tabId, message, options) as Promise<T>)
      : (ext.tabs.sendMessage(tabId, message) as Promise<T>);
  }
  return promisify<T>((callback) => {
    if (options) ext.tabs.sendMessage(tabId, message, options, callback);
    else ext.tabs.sendMessage(tabId, message, callback);
  });
}

/** Sends a message to the extension's own pages and the background. */
export function sendRuntimeMessage<T>(message: unknown): Promise<T> {
  if (returnsPromises()) {
    return ext.runtime.sendMessage(message) as Promise<T>;
  }
  return promisify<T>((callback) => ext.runtime.sendMessage(message, callback));
}

/** Queries tabs. */
export function queryTabs(query: chrome.tabs.QueryInfo): Promise<chrome.tabs.Tab[]> {
  if (returnsPromises()) {
    return ext.tabs.query(query) as Promise<chrome.tabs.Tab[]>;
  }
  return promisify<chrome.tabs.Tab[]>((callback) => ext.tabs.query(query, callback));
}

/** Looks up one tab by id. */
export function getTab(tabId: number): Promise<chrome.tabs.Tab> {
  if (returnsPromises()) {
    return ext.tabs.get(tabId) as Promise<chrome.tabs.Tab>;
  }
  return promisify<chrome.tabs.Tab>((callback) => ext.tabs.get(tabId, callback));
}

/**
 * Lists every frame in a tab. Resolves to an empty array when the API is
 * unavailable, so callers can treat "no sub-frames" and "cannot enumerate"
 * the same way.
 */
export function getAllFrames(
  tabId: number,
): Promise<chrome.webNavigation.GetAllFrameResultDetails[]> {
  const api = ext.webNavigation;
  if (!api?.getAllFrames) return Promise.resolve([]);

  if (returnsPromises()) {
    return (api.getAllFrames({ tabId }) as Promise<
      chrome.webNavigation.GetAllFrameResultDetails[] | null
    >).then((frames) => frames ?? []);
  }
  return promisify<chrome.webNavigation.GetAllFrameResultDetails[] | null>((callback) =>
    api.getAllFrames({ tabId }, callback),
  ).then((frames) => frames ?? []);
}

/** Reads from local storage. */
export function storageGet(keys: string | string[]): Promise<Record<string, unknown>> {
  if (returnsPromises()) {
    return ext.storage.local.get(keys) as Promise<Record<string, unknown>>;
  }
  return promisify<Record<string, unknown>>((callback) =>
    ext.storage.local.get(keys, callback),
  );
}

/** Writes to local storage. */
export function storageSet(items: Record<string, unknown>): Promise<void> {
  if (returnsPromises()) {
    return ext.storage.local.set(items) as Promise<void>;
  }
  return promisify<void>((callback) => ext.storage.local.set(items, callback));
}
