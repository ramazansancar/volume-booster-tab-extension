/**
 * Chromium tab-capture fallback, driven from the service worker.
 *
 * The preferred path routes a page's own media elements through
 * createMediaElementSource in the content script. That fails for cross-origin
 * media served without CORS headers, which is why this fallback exists: the
 * browser hands us the tab's mixed audio output instead of the element, so the
 * page's own CORS posture stops mattering.
 *
 * The worker itself cannot process audio - MV3 service workers have no DOM and
 * no AudioContext - so the work is split. The worker mints a stream id (only an
 * extension context may call getMediaStreamId) and an offscreen document
 * redeems it and owns the audio graph. This module is the worker half: it
 * manages the offscreen document's lifetime and which tabs are captured.
 *
 * Everything here is inert on Firefox and Safari, which have no tabCapture and
 * no offscreen API. Those builds never request the permissions either, so the
 * fallback simply reports that it is unavailable.
 */

import { ext, supportsOffscreen, supportsTabCapture } from '@/lib/browser';
import type { AudioSettings, OffscreenResult } from '@/types';

const OFFSCREEN_PATH = 'offscreen/index.html';

/** Tabs currently held by a capture, so repeat calls re-apply instead of re-capture. */
const captured = new Set<number>();

/**
 * In-flight offscreen creation. Two tabs asking for the fallback at once would
 * otherwise both try to create the document, and the second call throws because
 * only one offscreen document may exist per extension.
 */
let creating: Promise<void> | null = null;

/** True when this build can actually run the fallback. */
export function canCapture(): boolean {
  return supportsTabCapture() && supportsOffscreen();
}

/** Tabs the fallback is currently driving. */
export function isCaptured(tabId: number): boolean {
  return captured.has(tabId);
}

type OffscreenApi = {
  hasDocument?: () => Promise<boolean>;
  createDocument: (options: {
    url: string;
    reasons: string[];
    justification: string;
  }) => Promise<void>;
  closeDocument: () => Promise<void>;
};

function offscreenApi(): OffscreenApi | null {
  const api = (ext as unknown as { offscreen?: OffscreenApi }).offscreen;
  return api && typeof api.createDocument === 'function' ? api : null;
}

/**
 * Creates the offscreen document if it is not already open.
 *
 * `hasDocument` is not available on every Chromium version that has the rest of
 * the API, so a "single document" error from createDocument is also treated as
 * success - that error means exactly the state we were trying to reach.
 */
async function ensureDocument(): Promise<boolean> {
  const api = offscreenApi();
  if (!api) return false;

  if (creating) {
    await creating;
    return true;
  }

  try {
    if (api.hasDocument && (await api.hasDocument())) return true;
  } catch {
    // Fall through and let createDocument decide.
  }

  creating = api
    .createDocument({
      url: OFFSCREEN_PATH,
      reasons: ['USER_MEDIA'],
      justification:
        'Processes captured tab audio so pages whose media cannot be read directly can still be boosted.',
    })
    .catch((error: unknown) => {
      const message = error instanceof Error ? error.message : String(error);
      // Concurrent creation, or a document left over from a previous call.
      if (!/single offscreen|already exists|Only a single/i.test(message)) {
        throw error;
      }
    })
    .finally(() => {
      creating = null;
    });

  try {
    await creating;
    return true;
  } catch {
    return false;
  }
}

/** Closes the offscreen document once nothing is being captured any more. */
async function closeDocumentIfIdle(): Promise<void> {
  if (captured.size > 0) return;
  const api = offscreenApi();
  if (!api) return;
  try {
    await api.closeDocument();
  } catch {
    // Already closed, or never opened.
  }
}

/** Mints a capture stream id for one tab. */
function streamIdFor(tabId: number): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      ext.tabCapture.getMediaStreamId({ targetTabId: tabId }, (streamId) => {
        const error = ext.runtime.lastError;
        if (error) reject(new Error(error.message ?? 'Tab capture was refused'));
        else if (!streamId) reject(new Error('Tab capture returned no stream'));
        else resolve(streamId);
      });
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
    }
  });
}

/** Sends one command to the offscreen document and normalises its reply. */
async function command(message: unknown): Promise<OffscreenResult> {
  try {
    const result = (await ext.runtime.sendMessage(message)) as
      | OffscreenResult
      | undefined;
    return result ?? { ok: false, reason: 'The audio processor did not respond' };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : 'The audio processor is unreachable',
    };
  }
}

/**
 * Starts capturing a tab, or re-applies settings if it is already captured.
 *
 * Returns the failure reason rather than throwing, because every caller wants
 * to show that reason in the popup instead of failing silently.
 */
export async function startCapture(
  tabId: number,
  settings: AudioSettings,
): Promise<OffscreenResult> {
  if (!canCapture()) {
    return { ok: false, reason: 'Tab capture is not supported in this browser' };
  }

  if (captured.has(tabId)) return updateCapture(tabId, settings);

  if (!(await ensureDocument())) {
    return { ok: false, reason: 'The audio processor could not be started' };
  }

  let streamId: string;
  try {
    streamId = await streamIdFor(tabId);
  } catch (error) {
    await closeDocumentIfIdle();
    return {
      ok: false,
      reason: error instanceof Error ? error.message : 'Tab capture was refused',
    };
  }

  const result = await command({
    type: 'offscreen:start',
    tabId,
    streamId,
    settings,
  });

  if (result.ok) captured.add(tabId);
  else await closeDocumentIfIdle();
  return result;
}

/** Applies new settings to a tab that is already being captured. */
export async function updateCapture(
  tabId: number,
  settings: AudioSettings,
): Promise<OffscreenResult> {
  if (!captured.has(tabId)) {
    return { ok: false, reason: 'No capture is running for this tab' };
  }
  const result = await command({ type: 'offscreen:update', tabId, settings });
  // The offscreen document can be torn down under memory pressure. Forgetting
  // the tab here means the next request re-captures instead of failing forever.
  if (!result.ok) captured.delete(tabId);
  return result;
}

/**
 * Stops capturing a tab and hands its audio back to the normal output path.
 *
 * Safe to call for a tab that was never captured, so tab-close and teardown
 * handlers can call it unconditionally.
 */
export async function stopCapture(tabId: number): Promise<void> {
  if (!captured.delete(tabId)) return;
  await command({ type: 'offscreen:stop', tabId });
  await closeDocumentIfIdle();
}

/** Releases every capture. Used when the fallback is switched off globally. */
export async function stopAllCaptures(): Promise<void> {
  for (const tabId of [...captured]) await stopCapture(tabId);
  await closeDocumentIfIdle();
}
