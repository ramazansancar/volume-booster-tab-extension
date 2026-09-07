import { ext, sendMessageSafe } from '@/lib/browser';
import { cloneSettings } from '@/lib/defaults';
import {
  loadOriginSettings,
  loadPreferences,
  savePreferences,
  syncPersistence,
} from '@/lib/storage';
import { mergeSettings, originOf } from '@/lib/validate';
import { TabRegistry } from '@/background/tab-registry';
import type {
  ContentToBackgroundMessage,
  GlobalPreferences,
  TabState,
  TabStateResponse,
  UiToBackgroundMessage,
} from '@/types';

/**
 * Background coordinator.
 *
 * It owns one TabState per tab, so two tabs boosting different sites never see
 * each other's settings: changing Twitch to 300 % leaves YouTube exactly where
 * the user left it. Nothing here is shared between tabs except the user's
 * global preferences, which only supply the starting values for a new tab.
 */

const registry = new TabRegistry();

/** Cached so the hot path (a slider drag) does not hit storage on every tick. */
let cachedPreferences: GlobalPreferences | null = null;

async function preferences(): Promise<GlobalPreferences> {
  cachedPreferences ??= await loadPreferences();
  return cachedPreferences;
}

async function tabOrigin(tabId: number): Promise<string | null> {
  try {
    const tab = await ext.tabs.get(tabId);
    return originOf(tab.url);
  } catch {
    return null;
  }
}

/**
 * Returns the state for a tab, seeding it from stored origin settings the first
 * time we see it. A tab only inherits stored values if the user previously
 * chose 'origin' persistence for that site; otherwise it starts from the
 * global defaults, which is what keeps boosts temporary by default.
 */
async function stateFor(tabId: number): Promise<TabState> {
  const prefs = await preferences();
  const existing = registry.get(tabId);
  if (existing) return existing;

  const origin = await tabOrigin(tabId);
  const state = registry.ensure(tabId, prefs, origin);

  if (origin) {
    const stored = await loadOriginSettings(origin, prefs.maxGain);
    if (stored) {
      state.settings = stored;
      state.persistence = 'origin';
    }
  }
  return state;
}

/** Pushes a tab's settings down to its content script. */
async function pushToTab(state: TabState): Promise<void> {
  await sendMessageSafe(() =>
    ext.tabs.sendMessage(state.tabId, {
      type: 'bg:apply-settings',
      settings: state.settings,
    }),
  );
}

/**
 * Reflects the boost level on the toolbar icon so the user can tell at a glance
 * which tabs are amplified without opening the popup.
 */
async function updateBadge(state: TabState): Promise<void> {
  const action = ext.action ?? ext.browserAction;
  if (!action) return;

  const active = registry.isActive(state.tabId);
  const text = active ? `${Math.round(state.settings.gain * 100)}%` : '';
  try {
    await action.setBadgeText({ tabId: state.tabId, text });
    if (active) {
      // Amber above unity gain, neutral grey otherwise.
      await action.setBadgeBackgroundColor({
        tabId: state.tabId,
        color: state.settings.gain > 1 ? '#b45309' : '#475569',
      });
    }
  } catch {
    // Per-tab badges are unsupported on some builds; the popup still works.
  }
}

async function applyAndPersist(state: TabState): Promise<void> {
  await pushToTab(state);
  await updateBadge(state);
  await syncPersistence(state.origin, state.persistence, state.settings);
}

/* -------------------------------------------------------------------------- */
/* Message handling                                                            */
/* -------------------------------------------------------------------------- */

async function handleUiMessage(message: UiToBackgroundMessage): Promise<unknown> {
  const prefs = await preferences();

  switch (message.type) {
    case 'ui:get-tab-state': {
      const state = await stateFor(message.tabId);
      return { state, preferences: prefs } satisfies TabStateResponse;
    }

    case 'ui:set-settings': {
      const state = await stateFor(message.tabId);
      let next = mergeSettings(state.settings, message.settings, prefs.maxGain);

      // Boosting past unity without a limiter is the fastest way to produce
      // painful clipping, so the safety default re-arms it automatically.
      if (prefs.autoLimiterAboveUnity && next.gain > 1) {
        next = { ...next, limiterEnabled: true };
      }

      registry.updateSettings(message.tabId, next);
      state.settings = next;
      await applyAndPersist(state);
      return { state, preferences: prefs } satisfies TabStateResponse;
    }

    case 'ui:set-persistence': {
      const state = await stateFor(message.tabId);
      state.persistence = message.persistence;
      registry.updatePersistence(message.tabId, message.persistence);
      await syncPersistence(state.origin, state.persistence, state.settings);
      return { state, preferences: prefs } satisfies TabStateResponse;
    }

    case 'ui:reset-tab': {
      await stateFor(message.tabId);
      const state = registry.reset(message.tabId, prefs);
      if (!state) return { ok: false };
      await applyAndPersist(state);
      return { state, preferences: prefs } satisfies TabStateResponse;
    }

    case 'ui:get-preferences':
      return prefs;

    case 'ui:set-preferences': {
      cachedPreferences = await savePreferences(message.preferences);
      // A lowered ceiling has to be enforced on tabs that are already above it.
      for (const [tabId, state] of registry.entries()) {
        const clamped = mergeSettings(state.settings, {}, cachedPreferences.maxGain);
        if (clamped.gain !== state.settings.gain) {
          state.settings = clamped;
          registry.updateSettings(tabId, clamped);
          await applyAndPersist(state);
        }
      }
      return cachedPreferences;
    }

    case 'ui:request-fallback': {
      // The Chromium tab-capture path lands here in a follow-up release; until
      // then the UI is told plainly that this page cannot be boosted.
      const state = await stateFor(message.tabId);
      registry.updatePathway(message.tabId, 'unavailable');
      return { state, preferences: prefs } satisfies TabStateResponse;
    }

    default:
      return { ok: false };
  }
}

async function handleContentMessage(
  message: ContentToBackgroundMessage,
  tabId: number,
): Promise<unknown> {
  switch (message.type) {
    case 'content:ready': {
      // A fresh document means the previous graph is gone; re-send the tab's
      // settings so a reload or SPA navigation keeps the user's boost.
      const state = await stateFor(tabId);
      if (message.origin) state.origin = message.origin;
      await applyAndPersist(state);
      return { ok: true };
    }
    case 'content:media-count':
      registry.updateMediaCount(tabId, message.count);
      return { ok: true };
    case 'content:pathway':
      registry.updatePathway(tabId, message.pathway);
      return { ok: true };
    default:
      return { ok: false };
  }
}

ext.runtime.onMessage.addListener((message: unknown, sender, sendResponse) => {
  if (typeof message !== 'object' || message === null || !('type' in message)) {
    return false;
  }
  const typed = message as { type: string };

  if (typed.type.startsWith('ui:')) {
    void handleUiMessage(message as UiToBackgroundMessage).then(sendResponse);
    return true;
  }
  if (typed.type.startsWith('content:') && sender.tab?.id !== undefined) {
    void handleContentMessage(
      message as ContentToBackgroundMessage,
      sender.tab.id,
    ).then(sendResponse);
    return true;
  }
  return false;
});

/* -------------------------------------------------------------------------- */
/* Tab lifecycle                                                               */
/* -------------------------------------------------------------------------- */

// Dropping the state here is what makes a boost disappear with its tab.
ext.tabs.onRemoved.addListener((tabId) => registry.remove(tabId));

ext.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status !== 'complete') return;
  void (async () => {
    const state = registry.get(tabId);
    if (!state) return;
    const origin = await tabOrigin(tabId);

    // Navigating a session-scoped tab to a different site resets it, so a boost
    // meant for one page does not silently follow the user to the next one.
    if (origin !== state.origin && state.persistence === 'session') {
      const prefs = await preferences();
      state.origin = origin;
      state.settings = cloneSettings(prefs.defaults);
    } else {
      state.origin = origin;
    }
    await applyAndPersist(state);
  })();
});

ext.storage.onChanged.addListener((_changes, area) => {
  if (area === 'local') cachedPreferences = null;
});
