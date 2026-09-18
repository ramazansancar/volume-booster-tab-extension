import {
  createTab,
  ext,
  queryTabs,
  sendMessageToTab,
  sendRuntimeMessage,
  supportsOffscreen,
  supportsTabCapture,
} from '@/lib/browser';
import { applyTranslations, initLocale, t } from '@/lib/i18n';
import { SUPPORT_URL, reviewUrl, storeName } from '@/lib/store-links';
import {
  BAND_LABELS,
  BUILTIN_PRESETS,
  MAX_PRESET_NAME,
  TONE_CONTROLS,
  applyTone,
  builtinPreset,
  matchPreset,
  presetName,
  readTone,
  type ToneControl,
} from '@/lib/presets';
import { EQ_BAND_FREQUENCIES } from '@/types';
import { MAX_EQ_DB } from '@/lib/validate';
import type {
  AudioSettings,
  EqPreset,
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
  preset: document.getElementById('preset') as HTMLSelectElement,
  savePreset: document.getElementById('save-preset') as HTMLButtonElement,
  tone: document.getElementById('tone') as HTMLElement,
  resetDefaults: document.getElementById('reset-defaults') as HTMLButtonElement,
  feedback: document.getElementById('feedback') as HTMLElement,
  stars: document.getElementById('stars') as HTMLElement,
  supportLink: document.getElementById('support-link') as HTMLButtonElement,
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

/** Ids the preset dropdown was last built for, so it is rebuilt only on change. */
let builtPresetIds: string | null = null;

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

/** Opens a link in a new tab and closes the popup, which is always the intent. */
function openLink(url: string): void {
  void createTab(url);
  window.close();
}

/**
 * Builds the rating row, or leaves it hidden on a build with no listing.
 *
 * The stars do not record a rating - nothing here can, since only the store
 * can take one. Each is a button that opens the store's review form, and the
 * accessible name says so outright ("Rate on the Chrome Web Store") rather
 * than "5 stars", so a screen reader user is not told they are casting a vote
 * that this extension has no way to cast.
 *
 * Filling on hover is the one piece of theatre kept, because it is how every
 * rating widget behaves and it costs the user nothing to discover it does not
 * submit anything.
 */
function buildFeedback(): void {
  const url = reviewUrl();

  // Support is offered on every build: a user on the Opera or Safari package
  // has the same right to report a bug as anyone else, and the issue tracker
  // is the same one regardless of where the extension came from.
  dom.supportLink.addEventListener('click', () => openLink(SUPPORT_URL));
  // The button is a bare icon, so the tooltip says where it goes rather than
  // repeating the accessible name applyTranslations already set.
  dom.supportLink.title = t('popupReportIssue', 'Report a problem on GitHub');
  dom.feedback.hidden = false;

  // The stars are the part that needs a listing behind them. Opera is still in
  // review and Safari is built from source, so on those builds the prompt and
  // the stars are dropped and the row carries the support link alone.
  if (!url) {
    dom.feedback.dataset.rateable = 'false';
    return;
  }
  dom.feedback.dataset.rateable = 'true';

  const label = t('popupRateOn', 'Rate on $STORE$', { STORE: storeName() });
  dom.stars.setAttribute('aria-label', label);

  const stars: HTMLButtonElement[] = [];
  const light = (upTo: number): void => {
    stars.forEach((star, index) => {
      star.dataset.lit = String(index <= upTo);
    });
  };

  for (let index = 0; index < 5; index += 1) {
    const star = document.createElement('button');
    star.type = 'button';
    star.className = 'star';
    star.setAttribute('aria-label', label);
    star.title = label;
    star.textContent = '★';
    star.addEventListener('click', () => openLink(url));
    // Hovering one star fills it and everything to its left, the way the
    // store's own control does.
    star.addEventListener('mouseenter', () => light(index));
    star.addEventListener('focus', () => light(index));
    stars.push(star);
    dom.stars.append(star);
  }

  dom.stars.addEventListener('mouseleave', () => light(-1));
  dom.stars.addEventListener('focusout', () => light(-1));
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
    const labels = BAND_LABELS[frequency];
    const bandName = labels ? t(labels.nameKey, '') : '';
    const bandHint = labels ? t(labels.hintKey, '') : '';
    const hz = frequency >= 1000 ? `${frequency / 1000} kHz` : `${frequency} Hz`;
    // The frequency alone says nothing to most people, so the accessible name
    // leads with what the band does and keeps the number for those who want it.
    slider.setAttribute('aria-label', bandName ? `${bandName} (${hz})` : hz);
    if (bandHint) slider.title = `${bandName} - ${bandHint} (${hz})`;
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
    // The name is what the user reads; the frequency stays as a subtitle so the
    // slider is still identifiable to someone who thinks in hertz.
    label.textContent = bandName || (frequency >= 1000 ? `${frequency / 1000}k` : String(frequency));
    if (bandName) label.title = `${bandName} - ${bandHint} (${hz})`;

    band.append(readout, slider, label);
    dom.equalizer.append(band);
    eqSliders.push(slider);
    eqReadouts.push(readout);
  });
}

/** Tone sliders, in TONE_CONTROLS order, kept for re-rendering. */
const toneSliders: HTMLInputElement[] = [];
const toneReadouts: HTMLElement[] = [];

/**
 * Builds the bass/mid/treble trio.
 *
 * These write the same six bands the per-band equalizer does, so the two are
 * one setting seen at two resolutions rather than two settings that can
 * disagree. Moving Bass rewrites only the bands Bass owns, which is what makes
 * it safe to use after hand-tuning something in the per-band view.
 */
function buildTone(): void {
  dom.tone.replaceChildren();
  toneSliders.length = 0;
  toneReadouts.length = 0;

  const names: Record<ToneControl, [string, string]> = {
    bass: ['toneBass', 'Bass'],
    mid: ['toneMid', 'Mid'],
    treble: ['toneTreble', 'Treble'],
  };

  for (const control of TONE_CONTROLS) {
    const row = document.createElement('div');
    row.className = 'tone-row';

    const [key, fallback] = names[control];
    const label = document.createElement('span');
    label.className = 'tone-row__name';
    label.textContent = t(key, fallback);

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = String(-MAX_EQ_DB);
    slider.max = String(MAX_EQ_DB);
    slider.step = '1';
    slider.value = '0';
    slider.setAttribute('aria-label', t(key, fallback));
    slider.addEventListener('input', () => {
      if (rendering || !settings) return;
      void patch({ equalizer: applyTone(settings.equalizer, control, Number(slider.value)) });
    });

    const readout = document.createElement('span');
    readout.className = 'tone-row__gain';
    readout.textContent = '0';

    row.append(label, slider, readout);
    dom.tone.append(row);
    toneSliders.push(slider);
    toneReadouts.push(readout);
  }
}

/* -------------------------------------------------------------------------- */
/* Equalizer presets                                                           */
/* -------------------------------------------------------------------------- */

/** Sentinel for "these gains are not any saved preset". */
const CUSTOM_PRESET = '__custom__';

/**
 * Fills the preset dropdown with the built-ins and whatever the user saved.
 *
 * Rebuilt whenever the saved list changes rather than on every render, because
 * replacing the options would drop the open dropdown out from under a user who
 * was in the middle of choosing.
 */
function buildPresetOptions(userPresets: EqPreset[]): void {
  dom.preset.replaceChildren();

  // "Custom" is always first and always present: it is the honest label for
  // whatever the user has dialled in, and selecting it deliberately does
  // nothing, since there is no curve to apply.
  const custom = document.createElement('option');
  custom.value = CUSTOM_PRESET;
  custom.textContent = t('popupPresetCustom', 'Custom');
  dom.preset.append(custom);

  const group = (labelKey: string, fallback: string, presets: EqPreset[]): void => {
    if (presets.length === 0) return;
    const optgroup = document.createElement('optgroup');
    optgroup.label = t(labelKey, fallback);
    for (const preset of presets) {
      const option = document.createElement('option');
      option.value = preset.id;
      option.textContent = presetName(preset, (key) => t(key, key));
      optgroup.append(option);
    }
    dom.preset.append(optgroup);
  };

  group('popupPreset', 'Preset', BUILTIN_PRESETS);
  group('optionsPresets', 'Saved presets', userPresets);
}

/** Marks the dropdown to match the gains currently in effect. */
function renderPresetSelection(): void {
  if (!settings || !preferences) return;
  const match = matchPreset(settings.equalizer, preferences.userPresets);
  dom.preset.value = match?.id ?? CUSTOM_PRESET;
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

  TONE_CONTROLS.forEach((control, index) => {
    const value = readTone(settings!.equalizer, control);
    const slider = toneSliders[index];
    const readout = toneReadouts[index];
    if (slider) slider.value = String(value);
    if (readout) {
      readout.textContent = value > 0 ? `+${value}` : String(value);
      readout.dataset.active = String(value !== 0);
    }
  });

  // The saved list only changes when the user saves one, so the options are
  // rebuilt on change rather than on every render.
  const savedIds = preferences.userPresets.map((preset) => preset.id).join(',');
  if (savedIds !== builtPresetIds) {
    builtPresetIds = savedIds;
    buildPresetOptions(preferences.userPresets);
  }
  renderPresetSelection();

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

  // Two resets, because "reset" is ambiguous once the user has saved defaults
  // of their own: one returns to those, the other to 100% and flat.
  dom.resetDefaults.addEventListener('click', () => {
    if (tabId === null) return;
    void send<TabStateResponse>({ type: 'ui:reset-tab', tabId }).then(render);
  });

  dom.reset.addEventListener('click', () => {
    if (tabId === null) return;
    void send<TabStateResponse>({ type: 'ui:reset-neutral', tabId }).then(render);
  });

  dom.preset.addEventListener('change', () => {
    if (rendering) return;
    const id = dom.preset.value;
    // "Custom" describes what the user already has; there is no curve behind
    // it to apply, so selecting it is a no-op rather than a reset.
    if (id === CUSTOM_PRESET) {
      renderPresetSelection();
      return;
    }
    const preset =
      builtinPreset(id) ?? preferences?.userPresets.find((entry) => entry.id === id);
    if (preset) void patch({ equalizer: [...preset.gains] });
  });

  dom.savePreset.addEventListener('click', () => {
    if (!settings) return;
    // A prompt is a blunt instrument, but the popup closes the moment focus
    // leaves it on some browsers, which rules out an inline rename field here.
    // Managing the saved list properly happens on the options page.
    const name = window.prompt(t('popupPresetNamePrompt', 'Name for this preset'));
    if (name === null) return;
    const trimmed = name.trim().slice(0, MAX_PRESET_NAME);
    if (!trimmed) return;

    void send<GlobalPreferences>({
      type: 'ui:save-preset',
      name: trimmed,
      gains: [...settings.equalizer],
    }).then((next) => {
      preferences = next;
      buildPresetOptions(next.userPresets);
      builtPresetIds = next.userPresets.map((preset) => preset.id).join(',');
      renderPresetSelection();
    });
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
  buildTone();
  buildFeedback();
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
