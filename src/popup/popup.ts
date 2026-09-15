import {
  ext,
  queryTabs,
  sendMessageToTab,
  sendRuntimeMessage,
  supportsOffscreen,
  supportsTabCapture,
} from '@/lib/browser';
import { applyTranslations, initLocale, t } from '@/lib/i18n';
import { EQ_BAND_FREQUENCIES } from '@/types';
import { MAX_EQ_DB } from '@/lib/validate';
import type {
  AudioSettings,
  GlobalPreferences,
  TabStateResponse,
  UiToBackgroundMessage,
} from '@/types';

/**
 * Popup controller.
 *
 * Every control edits the state of the *current tab only*. The popup never
 * writes settings directly: it sends a patch to the background, which owns the
 * per-tab state, and re-renders from the response. That keeps two tabs boosting
 * two different sites completely independent of one another.
 */

const dom = {
  origin: document.getElementById('origin') as HTMLElement,
  gain: document.getElementById('gain') as HTMLInputElement,
  gainValue: document.getElementById('gain-value') as HTMLOutputElement,
  balance: document.getElementById('balance') as HTMLInputElement,
  balanceValue: document.getElementById('balance-value') as HTMLOutputElement,
  mono: document.getElementById('mono') as HTMLInputElement,
  limiter: document.getElementById('limiter') as HTMLInputElement,
  remember: document.getElementById('remember') as HTMLInputElement,
  bypass: document.getElementById('bypass') as HTMLButtonElement,
  bypassLabel: document.getElementById('bypass-label') as HTMLElement,
  equalizer: document.getElementById('equalizer') as HTMLElement,
  eqBadge: document.getElementById('eq-badge') as HTMLElement,
  eqReset: document.getElementById('eq-reset') as HTMLButtonElement,
  advanced: document.getElementById('advanced') as HTMLDetailsElement,
  reset: document.getElementById('reset') as HTMLButtonElement,
  optionsLink: document.getElementById('options-link') as HTMLButtonElement,
  status: document.getElementById('status') as HTMLElement,
  statusDetail: document.getElementById('status-detail') as HTMLElement,
  useCapture: document.getElementById('use-capture') as HTMLButtonElement,
  presets: document.getElementById('presets') as HTMLElement,
};

/** Remembers whether the user had the advanced section open. */
const ADVANCED_OPEN_KEY = 'popup:advanced-open';

let tabId: number | null = null;
let settings: AudioSettings | null = null;
let preferences: GlobalPreferences | null = null;
/** Set while re-rendering, so programmatic input updates do not echo back. */
let rendering = false;

const eqSliders: HTMLInputElement[] = [];
const eqReadouts: HTMLElement[] = [];

/** Preset buttons currently rendered, kept so the active one can be marked. */
let presetButtons: HTMLButtonElement[] = [];
/** The ceiling the buttons were built for, so they are only rebuilt on change. */
let presetsBuiltFor = -1;

/**
 * Volume steps offered as buttons, in percent. The list is trimmed to the
 * configured ceiling and always ends at it, so raising the maximum in settings
 * makes the higher steps reachable in one click rather than only by dragging.
 */
const PRESET_STEPS = [100, 150, 200, 300, 500, 700, 1000];

function buildPresets(maxPercent: number): void {
  if (presetsBuiltFor === maxPercent) return;
  presetsBuiltFor = maxPercent;

  const steps = PRESET_STEPS.filter((step) => step <= maxPercent);
  // The ceiling itself is always worth one click, even when it is not one of
  // the canonical steps.
  if (steps[steps.length - 1] !== maxPercent) steps.push(maxPercent);

  dom.presets.replaceChildren();
  presetButtons = steps.map((step) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.preset = String(step);
    button.textContent = `${step}%`;
    button.addEventListener('click', () => void patch({ gain: step / 100 }));
    dom.presets.append(button);
    return button;
  });
}

function send<T>(message: UiToBackgroundMessage): Promise<T> {
  return sendRuntimeMessage<T>(message);
}

function buildEqualizer(): void {
  dom.equalizer.replaceChildren();
  eqSliders.length = 0;
  eqReadouts.length = 0;

  EQ_BAND_FREQUENCIES.forEach((frequency, index) => {
    const band = document.createElement('div');
    band.className = 'eq-band';

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = String(-MAX_EQ_DB);
    slider.max = String(MAX_EQ_DB);
    slider.step = '1';
    slider.value = '0';
    slider.setAttribute(
      'aria-label',
      frequency >= 1000 ? `${frequency / 1000} kHz` : `${frequency} Hz`,
    );
    slider.addEventListener('input', () => {
      if (rendering || !settings) return;
      const next = [...settings.equalizer];
      next[index] = Number(slider.value);
      void patch({ equalizer: next });
    });

    const readout = document.createElement('span');
    readout.className = 'eq-band__gain';
    readout.textContent = '0';

    const label = document.createElement('span');
    label.className = 'eq-band__freq';
    label.textContent = frequency >= 1000 ? `${frequency / 1000}k` : String(frequency);

    band.append(readout, slider, label);
    dom.equalizer.append(band);
    eqSliders.push(slider);
    eqReadouts.push(readout);
  });
}

function formatBalance(value: number): string {
  if (value === 0) return t('popupBalanceCenter', 'Center');
  const side = value < 0 ? 'L' : 'R';
  return `${side} ${Math.abs(Math.round(value * 100))}%`;
}

function render(response: TabStateResponse): void {
  rendering = true;
  settings = response.state.settings;
  preferences = response.preferences;

  const percent = Math.round(settings.gain * 100);
  dom.gain.max = String(Math.round(preferences.maxGain * 100));
  dom.gain.value = String(percent);
  dom.gainValue.textContent = `${percent}%`;
  dom.gainValue.dataset.boosted = String(settings.gain > 1);

  dom.balance.value = String(Math.round(settings.balance * 100));
  dom.balanceValue.textContent = formatBalance(settings.balance);

  dom.mono.checked = settings.mono;
  dom.limiter.checked = settings.limiterEnabled;
  dom.remember.checked = response.state.persistence === 'origin';
  // The pill names the current state rather than the action, so it has to be
  // relabelled on every render: "Active" while processing runs, "Bypassed"
  // once the audio is passing through untouched.
  dom.bypass.setAttribute('aria-pressed', String(settings.bypassed));
  dom.bypassLabel.textContent = settings.bypassed
    ? t('popupStateBypassed', 'Bypassed')
    : t('popupStateActive', 'Active');

  buildPresets(Math.round(preferences.maxGain * 100));
  for (const button of presetButtons) {
    const preset = Number(button.dataset.preset);
    button.setAttribute('aria-current', String(preset === percent));
  }

  settings.equalizer.forEach((value, index) => {
    const slider = eqSliders[index];
    const readout = eqReadouts[index];
    if (slider) slider.value = String(value);
    if (readout) {
      readout.textContent = value > 0 ? `+${value}` : String(value);
      readout.dataset.active = String(value !== 0);
    }
  });

  const eqActive = settings.equalizer.some((band) => band !== 0);
  dom.eqBadge.hidden = !eqActive;

  dom.origin.textContent =
    response.state.origin?.replace(/^https?:\/\//, '') ??
    t('popupUnsupportedPage', 'This page');

  renderStatus(response);
  rendering = false;
}

function renderStatus(response: TabStateResponse): void {
  const { pathway, mediaElementCount, origin, pathwayReason } = response.state;

  if (!origin) {
    setStatus('popupNoOrigin', 'Browser pages cannot be boosted.', 'warn');
    document.body.dataset.disabled = 'true';
    return;
  }
  document.body.dataset.disabled = 'false';

  switch (pathway) {
    case 'media-element':
      setStatus(
        'popupActive',
        mediaElementCount === 1
          ? '1 media source connected'
          : `${mediaElementCount} media sources connected`,
        'ok',
      );
      break;
    case 'tab-capture':
      setStatus('popupTabCapture', 'Using tab capture.', 'ok');
      break;
    case 'unavailable':
      setStatus(
        'popupUnavailable',
        'This page blocks audio processing (DRM or cross-origin media).',
        'warn',
      );
      break;
    default:
      setStatus('popupIdle', 'No audio playing yet.', 'ok');
  }

  // The status line is the only place the user can find out why a boost is not
  // taking effect, so it must never be blank. When the content script explained
  // itself, show that explanation as a second line rather than discarding it.
  dom.statusDetail.textContent = pathwayReason ?? '';
  dom.statusDetail.hidden = !pathwayReason;

  // The fallback is offered rather than applied automatically. Capturing a tab
  // lights the browser's recording indicator, so it is not something to start
  // on the user's behalf without them asking for it.
  dom.useCapture.hidden = !(
    pathway === 'unavailable' &&
    response.preferences.tabCaptureFallback &&
    supportsTabCapture() &&
    supportsOffscreen()
  );
}

function setStatus(key: string, fallback: string, tone: 'ok' | 'warn'): void {
  dom.status.textContent = t(key, fallback);
  dom.status.dataset.tone = tone;
}

async function patch(update: Partial<AudioSettings>): Promise<void> {
  if (tabId === null) return;
  const response = await send<TabStateResponse>({
    type: 'ui:set-settings',
    tabId,
    settings: update,
  });
  render(response);
}

function bindControls(): void {
  dom.gain.addEventListener('input', () => {
    if (rendering) return;
    const percent = Number(dom.gain.value);
    // Update the readout immediately so the slider feels responsive even before
    // the background round-trip completes.
    dom.gainValue.textContent = `${percent}%`;
    dom.gainValue.dataset.boosted = String(percent > 100);
    void patch({ gain: percent / 100 });
  });

  dom.balance.addEventListener('input', () => {
    if (rendering) return;
    const value = Number(dom.balance.value) / 100;
    dom.balanceValue.textContent = formatBalance(value);
    void patch({ balance: value });
  });

  dom.mono.addEventListener('change', () => {
    if (!rendering) void patch({ mono: dom.mono.checked });
  });

  dom.limiter.addEventListener('change', () => {
    if (!rendering) void patch({ limiterEnabled: dom.limiter.checked });
  });

  dom.bypass.addEventListener('click', () => {
    if (settings) void patch({ bypassed: !settings.bypassed });
  });

  dom.remember.addEventListener('change', () => {
    if (rendering || tabId === null) return;
    void send<TabStateResponse>({
      type: 'ui:set-persistence',
      tabId,
      persistence: dom.remember.checked ? 'origin' : 'session',
    }).then(render);
  });

  dom.eqReset.addEventListener('click', () => {
    void patch({ equalizer: EQ_BAND_FREQUENCIES.map(() => 0) });
  });

  dom.reset.addEventListener('click', () => {
    if (tabId === null) return;
    void send<TabStateResponse>({ type: 'ui:reset-tab', tabId }).then(render);
  });

  dom.useCapture.addEventListener('click', () => {
    if (tabId === null) return;
    dom.useCapture.disabled = true;
    setStatus('popupStartingCapture', 'Starting tab capture...', 'ok');
    void send<TabStateResponse>({ type: 'ui:request-fallback', tabId })
      .then(render)
      .finally(() => {
        dom.useCapture.disabled = false;
      });
  });

  dom.optionsLink.addEventListener('click', () => {
    ext.runtime.openOptionsPage();
    window.close();
  });

  dom.advanced.addEventListener('toggle', () => {
    try {
      localStorage.setItem(ADVANCED_OPEN_KEY, String(dom.advanced.open));
    } catch {
      // Private browsing can refuse storage; the section simply starts closed.
    }
  });
}

function restoreAdvancedState(): void {
  try {
    dom.advanced.open = localStorage.getItem(ADVANCED_OPEN_KEY) === 'true';
  } catch {
    dom.advanced.open = false;
  }
}

async function init(): Promise<void> {
  // The language is a stored preference, so it has to be resolved before any
  // text is written; otherwise the popup would flash English first.
  await initLocale();
  applyTranslations();
  buildEqualizer();
  restoreAdvancedState();
  bindControls();

  const [tab] = await queryTabs({ active: true, currentWindow: true });
  if (tab?.id === undefined) {
    setStatus('popupNoTab', 'No active tab.', 'warn');
    document.body.dataset.disabled = 'true';
    return;
  }
  tabId = tab.id;

  // Ask the content script to re-check the page before we render, so the number
  // shown here always matches what is actually connected right now.
  try {
    await sendMessageToTab(tabId, { type: 'bg:probe' });
  } catch {
    // No content script on this page; the background reports that below.
  }

  const response = await send<TabStateResponse>({
    type: 'ui:get-tab-state',
    tabId,
  });
  render(response);
}

void init();
