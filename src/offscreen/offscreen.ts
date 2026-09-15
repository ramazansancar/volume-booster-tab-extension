/**
 * Offscreen document: host for the tab-capture audio graph.
 *
 * A Chromium MV3 service worker has no DOM and therefore no AudioContext, so
 * the tab-capture fallback cannot run there. This document exists purely to own
 * the AudioContext and the captured MediaStream on the worker's behalf. It is
 * never visible and is torn down as soon as the last capture ends.
 *
 * Why the fallback exists at all: the preferred path routes a page's own
 * <video> through createMediaElementSource, which fails for cross-origin media
 * served without CORS headers. Capturing the tab's audio output sidesteps that,
 * because the browser hands us the mixed output rather than the element.
 *
 * One capture per tab, keyed by tab id, because chrome.tabCapture issues one
 * stream per tab and a second capture of the same tab would fail.
 */

import { AudioEngine } from '@/lib/audio-engine';
import type { AudioSettings } from '@/types';
import type {
  BackgroundToOffscreenMessage,
  OffscreenResult,
} from '@/types';

interface Capture {
  context: AudioContext;
  engine: AudioEngine;
  stream: MediaStream;
  source: MediaStreamAudioSourceNode;
}

const captures = new Map<number, Capture>();

/**
 * Starts capturing one tab and routes it through a fresh audio graph.
 *
 * The stream id is minted in the service worker (getMediaStreamId needs the
 * extension context) and redeemed here through getUserMedia, which is the
 * documented handoff for tab capture from an offscreen document.
 *
 * Critically, the captured stream is also connected straight to the
 * destination by the engine's own output. Without that the tab is muted the
 * instant capture begins: capturing takes the audio out of the normal output
 * path, so the extension becomes responsible for playing it back.
 */
async function start(tabId: number, streamId: string, settings: AudioSettings): Promise<OffscreenResult> {
  // Re-capturing a tab we already hold would fail, so an existing capture is
  // just re-applied. This is the common case when the popup reopens.
  const existing = captures.get(tabId);
  if (existing) {
    existing.engine.apply(settings);
    return { ok: true };
  }

  let stream: MediaStream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: 'tab',
          chromeMediaSourceId: streamId,
        },
      },
      video: false,
    } as unknown as MediaStreamConstraints);
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : 'Tab capture was refused',
    };
  }

  // A tab with no audio track yields a stream we cannot process. Releasing it
  // immediately matters: an unreleased capture keeps the tab's recording
  // indicator lit for a stream nobody is listening to.
  if (stream.getAudioTracks().length === 0) {
    for (const track of stream.getTracks()) track.stop();
    return { ok: false, reason: 'The tab is not producing any audio' };
  }

  const context = new AudioContext();
  const engine = new AudioEngine(context);
  const source = context.createMediaStreamSource(stream);
  source.connect(engine.inputNode);
  engine.apply(settings);
  await engine.resume();

  // The user can revoke a capture from Chrome's own sharing indicator, which
  // ends the track without telling the extension. Cleaning up on that event is
  // what stops a dead AudioContext from lingering.
  const [track] = stream.getAudioTracks();
  track?.addEventListener('ended', () => {
    void stop(tabId);
  });

  captures.set(tabId, { context, engine, stream, source });
  return { ok: true };
}

/** Applies settings to a running capture. */
function update(tabId: number, settings: AudioSettings): OffscreenResult {
  const capture = captures.get(tabId);
  if (!capture) return { ok: false, reason: 'No capture is running for this tab' };
  capture.engine.apply(settings);
  return { ok: true };
}

/**
 * Ends one tab's capture and releases every resource it held.
 *
 * Stopping the tracks is what hands the audio back to the tab's normal output
 * path and clears the browser's "this tab is being captured" indicator.
 */
async function stop(tabId: number): Promise<OffscreenResult> {
  const capture = captures.get(tabId);
  if (!capture) return { ok: true };
  captures.delete(tabId);

  try {
    capture.source.disconnect();
  } catch {
    // Already disconnected.
  }
  capture.engine.dispose();
  for (const track of capture.stream.getTracks()) track.stop();
  try {
    await capture.context.close();
  } catch {
    // Closing an already-closed context throws; nothing left to release.
  }

  // Tell the worker when the last capture ends, so it can close this document
  // rather than leaving it resident for the rest of the session.
  if (captures.size === 0) {
    chrome.runtime.sendMessage({ type: 'offscreen:idle' }).catch(() => {
      // The worker may already be gone; it will re-check on next use.
    });
  }
  return { ok: true };
}

chrome.runtime.onMessage.addListener((message: unknown, _sender, sendResponse) => {
  if (typeof message !== 'object' || message === null || !('type' in message)) {
    return false;
  }
  const typed = message as BackgroundToOffscreenMessage;

  // Only messages explicitly addressed to this document are handled, so the
  // popup's own traffic passes straight through.
  switch (typed.type) {
    case 'offscreen:start':
      void start(typed.tabId, typed.streamId, typed.settings).then(sendResponse);
      return true;
    case 'offscreen:update':
      sendResponse(update(typed.tabId, typed.settings));
      return false;
    case 'offscreen:stop':
      void stop(typed.tabId).then(sendResponse);
      return true;
    default:
      return false;
  }
});
