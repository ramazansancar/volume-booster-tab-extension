import { ext, sendRuntimeMessage } from '@/lib/browser';
import { ABSOLUTE_MAX_GAIN } from '@/lib/defaults';
import { clearAllOrigins, forgetOrigin, listOrigins } from '@/lib/storage';
import type { GlobalPreferences, PersistenceMode, UiToBackgroundMessage } from '@/types';

/**
 * Options page controller.
 *
 * Preferences here only seed *new* tabs. Tabs that are already open keep the
 * volume the user gave them, except when the maximum is lowered below their
 * current level, which the background clamps.
 */

const dom = {
  defaultGain: document.getElementById('default-gain') as HTMLInputElement,
  defaultGainValue: document.getElementById('default-gain-value') as HTMLOutputElement,
  maxGain: document.getElementById('max-gain') as HTMLInputElement,
  maxGainValue: document.getElementById('max-gain-value') as HTMLOutputElement,
  persistence: [
    ...document.querySelectorAll<HTMLInputElement>('input[name="persistence"]'),
  ],
  autoLimiter: document.getElementById('auto-limiter') as HTMLInputElement,
  tabCapture: document.getElementById('tab-capture') as HTMLInputElement,
  origins: document.getElementById('origins') as HTMLUListElement,
  originsSummary: document.getElementById('origins-summary') as HTMLElement,
  clearOrigins: document.getElementById('clear-origins') as HTMLButtonElement,
  restoreDefaults: document.getElementById('restore-defaults') as HTMLButtonElement,
  saveStatus: document.getElementById('save-status') as HTMLElement,
  aboutVersion: document.getElementById('about-version') as HTMLElement,
};

let preferences: GlobalPreferences | null = null;
let rendering = false;
let statusTimer: ReturnType<typeof setTimeout> | null = null;

function send<T>(message: UiToBackgroundMessage): Promise<T> {
  return sendRuntimeMessage<T>(message);
}

function flashSaved(): void {
  dom.saveStatus.textContent = 'Saved';
  if (statusTimer) clearTimeout(statusTimer);
  statusTimer = setTimeout(() => {
    dom.saveStatus.textContent = '';
  }, 1600);
}

function render(next: GlobalPreferences): void {
  rendering = true;
  preferences = next;

  const maxPercent = Math.round(next.maxGain * 100);
  dom.maxGain.value = String(maxPercent);
  dom.maxGainValue.textContent = `${maxPercent}%`;

  // The default can never exceed the ceiling, so the slider is bounded by it.
  dom.defaultGain.max = String(maxPercent);
  const defaultPercent = Math.round(next.defaults.gain * 100);
  dom.defaultGain.value = String(defaultPercent);
  dom.defaultGainValue.textContent = `${defaultPercent}%`;

  for (const radio of dom.persistence) {
    radio.checked = radio.value === next.defaultPersistence;
  }
  dom.autoLimiter.checked = next.autoLimiterAboveUnity;
  dom.tabCapture.checked = next.tabCaptureFallback;

  rendering = false;
}

async function save(patch: Partial<GlobalPreferences>): Promise<void> {
  const updated = await send<GlobalPreferences>({
    type: 'ui:set-preferences',
    preferences: patch,
  });
  render(updated);
  flashSaved();
}

async function renderOrigins(): Promise<void> {
  const map = await listOrigins();
  const entries = Object.entries(map);
  dom.origins.replaceChildren();

  if (entries.length === 0) {
    dom.originsSummary.textContent = 'No sites saved yet.';
    dom.clearOrigins.disabled = true;
    return;
  }

  dom.originsSummary.textContent =
    entries.length === 1 ? '1 site saved.' : `${entries.length} sites saved.`;
  dom.clearOrigins.disabled = false;

  for (const [origin, settings] of entries) {
    const item = document.createElement('li');
    item.className = 'origins__item';

    const name = document.createElement('span');
    name.className = 'origins__name';
    name.textContent = origin.replace(/^https?:\/\//, '');

    const level = document.createElement('span');
    level.className = 'origins__level';
    level.textContent = `${Math.round(settings.gain * 100)}%`;

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'link-button';
    remove.textContent = 'Forget';
    remove.addEventListener('click', () => {
      void forgetOrigin(origin).then(renderOrigins);
    });

    item.append(name, level, remove);
    dom.origins.append(item);
  }
}

function bind(): void {
  dom.defaultGain.addEventListener('input', () => {
    if (rendering || !preferences) return;
    const percent = Number(dom.defaultGain.value);
    dom.defaultGainValue.textContent = `${percent}%`;
    void save({ defaults: { ...preferences.defaults, gain: percent / 100 } });
  });

  dom.maxGain.addEventListener('input', () => {
    if (rendering) return;
    const percent = Math.min(Number(dom.maxGain.value), ABSOLUTE_MAX_GAIN * 100);
    dom.maxGainValue.textContent = `${percent}%`;
    void save({ maxGain: percent / 100 });
  });

  for (const radio of dom.persistence) {
    radio.addEventListener('change', () => {
      if (rendering || !radio.checked) return;
      void save({ defaultPersistence: radio.value as PersistenceMode });
    });
  }

  dom.autoLimiter.addEventListener('change', () => {
    if (!rendering) void save({ autoLimiterAboveUnity: dom.autoLimiter.checked });
  });

  dom.tabCapture.addEventListener('change', () => {
    if (!rendering) void save({ tabCaptureFallback: dom.tabCapture.checked });
  });

  dom.clearOrigins.addEventListener('click', () => {
    // Deleting every saved site is easy to trigger by accident and cannot be
    // undone, so it asks first.
    if (!window.confirm('Forget the saved volume for every site?')) return;
    void clearAllOrigins().then(renderOrigins);
  });

  dom.restoreDefaults.addEventListener('click', () => {
    if (!window.confirm('Restore all settings to their defaults?')) return;
    void save({
      defaults: { ...(preferences?.defaults ?? {}), gain: 1 } as GlobalPreferences['defaults'],
      defaultPersistence: 'session',
      maxGain: 6,
      autoLimiterAboveUnity: true,
      tabCaptureFallback: true,
    });
  });
}

async function init(): Promise<void> {
  bind();
  // Naming the running version makes bug reports precise, and pairs with the
  // source link the AGPL asks us to surface.
  dom.aboutVersion.textContent = `Volume Booster Tab ${ext.runtime.getManifest().version}`;
  render(await send<GlobalPreferences>({ type: 'ui:get-preferences' }));
  await renderOrigins();
}

void init();
