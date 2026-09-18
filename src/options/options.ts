import { ext, sendRuntimeMessage } from '@/lib/browser';
import {
  AUTO_LANGUAGE,
  AVAILABLE_LOCALES,
  LOCALE_NAMES,
  applyTranslations,
  browserLocale,
  initLocale,
  setLanguage,
  t,
} from '@/lib/i18n';
import { DEFAULT_MAX_GAIN } from '@/lib/defaults';
import type { AudioSettings } from '@/types';
import { ABSOLUTE_MAX_GAIN } from '@/lib/defaults';
import { clearAllOrigins, listOrigins, replaceOrigins } from '@/lib/storage';
import {
  ImportError,
  buildExport,
  exportFilename,
  parseImport,
} from '@/lib/transfer';
import { MAX_PRESET_NAME } from '@/lib/presets';
import { EQ_BAND_FREQUENCIES, type EqPreset } from '@/types';
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
  resetMaxGain: document.getElementById('reset-max-gain') as HTMLButtonElement,
  language: document.getElementById('language') as HTMLSelectElement,
  saveStatus: document.getElementById('save-status') as HTMLElement,
  aboutVersion: document.getElementById('about-version') as HTMLElement,
  presetsList: document.getElementById('presets-list') as HTMLUListElement,
  presetsEmpty: document.getElementById('presets-empty') as HTMLElement,
  exportSettings: document.getElementById('export-settings') as HTMLButtonElement,
  importSettings: document.getElementById('import-settings') as HTMLButtonElement,
  importFile: document.getElementById('import-file') as HTMLInputElement,
  transferStatus: document.getElementById('transfer-status') as HTMLElement,
};

let preferences: GlobalPreferences | null = null;
let rendering = false;
let statusTimer: ReturnType<typeof setTimeout> | null = null;

function send<T>(message: UiToBackgroundMessage): Promise<T> {
  return sendRuntimeMessage<T>(message);
}

function flashSaved(): void {
  dom.saveStatus.textContent = t('optionsSaved', 'Saved');
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
  renderPresets(next.userPresets);

  rendering = false;
}

/* -------------------------------------------------------------------------- */
/* Saved presets                                                               */
/* -------------------------------------------------------------------------- */

/** Sends the whole list back, which is how every edit here is expressed. */
function commitPresets(presets: EqPreset[]): void {
  void send<GlobalPreferences>({ type: 'ui:set-presets', presets }).then((next) => {
    render(next);
    flashSaved();
  });
}

/** A one-line sketch of the curve, so a preset is identifiable without opening it. */
function describeCurve(gains: number[]): string {
  return EQ_BAND_FREQUENCIES.map((frequency, index) => {
    const value = gains[index] ?? 0;
    const hz = frequency >= 1000 ? `${frequency / 1000}k` : String(frequency);
    return `${hz} ${value > 0 ? '+' : ''}${value}`;
  }).join('  ');
}

function renderPresets(presets: EqPreset[]): void {
  dom.presetsList.replaceChildren();
  dom.presetsEmpty.hidden = presets.length > 0;

  presets.forEach((preset, index) => {
    const row = document.createElement('li');
    row.className = 'preset-item';

    const name = document.createElement('span');
    name.className = 'preset-item__name';
    name.textContent = preset.name ?? '';

    const curve = document.createElement('span');
    curve.className = 'preset-item__curve';
    curve.textContent = describeCurve(preset.gains);

    const actions = document.createElement('div');
    actions.className = 'preset-item__actions';

    // Up and down rather than drag: a two-button reorder works with a keyboard
    // and a screen reader, which a drag handle does not without a great deal
    // more code.
    const move = (delta: number, labelKey: string, fallback: string, glyph: string) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'icon-button';
      button.textContent = glyph;
      button.title = t(labelKey, fallback);
      button.setAttribute('aria-label', `${t(labelKey, fallback)}: ${preset.name ?? ''}`);
      button.disabled = delta < 0 ? index === 0 : index === presets.length - 1;
      button.addEventListener('click', () => {
        const next = [...presets];
        const target = index + delta;
        const moved = next[index];
        const displaced = next[target];
        if (!moved || !displaced) return;
        next[index] = displaced;
        next[target] = moved;
        commitPresets(next);
      });
      return button;
    };

    const rename = document.createElement('button');
    rename.type = 'button';
    rename.className = 'link-button';
    rename.textContent = t('optionsPresetRename', 'Rename');
    rename.addEventListener('click', () => {
      const entered = window.prompt(
        t('popupPresetNamePrompt', 'Name for this preset'),
        preset.name ?? '',
      );
      if (entered === null) return;
      const trimmed = entered.trim().slice(0, MAX_PRESET_NAME);
      // An empty name would leave a row that cannot be told apart from another.
      if (!trimmed) return;
      commitPresets(
        presets.map((entry) => (entry.id === preset.id ? { ...entry, name: trimmed } : entry)),
      );
    });

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'link-button link-button--danger';
    remove.textContent = t('optionsPresetDelete', 'Delete');
    remove.addEventListener('click', () => {
      // Deleting is the one irreversible action on this page: the curve is not
      // recoverable once it is gone, so it asks first.
      const question = t('optionsPresetDeleteConfirm', 'Delete "$NAME$"?', {
        NAME: preset.name ?? '',
      });
      if (!window.confirm(question)) return;
      commitPresets(presets.filter((entry) => entry.id !== preset.id));
    });

    actions.append(
      move(-1, 'optionsPresetMoveUp', 'Move up', '↑'),
      move(1, 'optionsPresetMoveDown', 'Move down', '↓'),
      rename,
      remove,
    );
    row.append(name, curve, actions);
    dom.presetsList.append(row);
  });
}

async function save(patch: Partial<GlobalPreferences>): Promise<void> {
  const updated = await send<GlobalPreferences>({
    type: 'ui:set-preferences',
    preferences: patch,
  });
  render(updated);
  flashSaved();
}

/** Which saved site currently has its editor open, if any. */
let expandedOrigin: string | null = null;

async function renderOrigins(): Promise<void> {
  const map = await listOrigins();
  const entries = Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  dom.origins.replaceChildren();

  if (entries.length === 0) {
    dom.originsSummary.textContent = t('optionsNoSavedSites', 'No sites saved yet.');
    dom.clearOrigins.disabled = true;
    expandedOrigin = null;
    return;
  }

  dom.originsSummary.textContent =
    entries.length === 1
      ? t('optionsOneSiteSaved', '1 site saved.')
      : t('optionsManySitesSaved', 'sites saved.').replace('%d', String(entries.length));
  dom.clearOrigins.disabled = false;

  for (const [origin, settings] of entries) {
    dom.origins.append(renderOriginRow(origin, settings));
  }
}

/** One saved site: a summary row, plus an editor while it is expanded. */
function renderOriginRow(origin: string, settings: AudioSettings): HTMLLIElement {
  const item = document.createElement('li');
  item.className = 'origins__item';

  const summary = document.createElement('div');
  summary.className = 'origins__summary';

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'origins__toggle';
  toggle.setAttribute('aria-expanded', String(expandedOrigin === origin));
  toggle.addEventListener('click', () => {
    // Only one editor open at a time, so a long list stays readable.
    expandedOrigin = expandedOrigin === origin ? null : origin;
    void renderOrigins();
  });

  const name = document.createElement('span');
  name.className = 'origins__name';
  name.textContent = origin.replace(/^https?:\/\//, '');

  const level = document.createElement('span');
  level.className = 'origins__level';
  level.textContent = `${Math.round(settings.gain * 100)}%`;

  toggle.append(name, level);

  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'link-button';
  remove.textContent = t('optionsForget', 'Forget');
  remove.addEventListener('click', () => {
    void send({ type: 'ui:forget-origin', origin }).then(() => {
      if (expandedOrigin === origin) expandedOrigin = null;
      return renderOrigins();
    });
  });

  summary.append(toggle, remove);
  item.append(summary);

  if (expandedOrigin === origin) item.append(renderOriginEditor(origin, settings));
  return item;
}

/**
 * The editor for one saved site. Changes are sent to the background rather than
 * written straight to storage, so a tab already open on that origin is updated
 * at the same moment instead of drifting out of sync with what is stored.
 */
function renderOriginEditor(origin: string, settings: AudioSettings): HTMLElement {
  const editor = document.createElement('div');
  editor.className = 'origins__editor';

  const commit = (patch: Partial<AudioSettings>): void => {
    void send<AudioSettings>({
      type: 'ui:update-origin',
      origin,
      settings: patch,
    }).then(() => {
      flashSaved();
      return renderOrigins();
    });
  };

  const maxPercent = Math.round((preferences?.maxGain ?? 6) * 100);

  editor.append(
    sliderRow({
      label: t('popupVolume', 'Volume'),
      min: 0,
      max: maxPercent,
      step: 5,
      value: Math.round(settings.gain * 100),
      format: (v) => `${v}%`,
      onCommit: (v) => commit({ gain: v / 100 }),
    }),
    sliderRow({
      label: t('popupBalance', 'Balance'),
      min: -100,
      max: 100,
      step: 5,
      value: Math.round(settings.balance * 100),
      format: (v) =>
        v === 0
          ? t('popupBalanceCenter', 'Center')
          : `${v < 0 ? 'L' : 'R'} ${Math.abs(v)}%`,
      onCommit: (v) => commit({ balance: v / 100 }),
    }),
  );

  const switches = document.createElement('div');
  switches.className = 'origins__switches';
  switches.append(
    checkboxRow(t('popupLimiter', 'Limiter'), settings.limiterEnabled, (v) =>
      commit({ limiterEnabled: v }),
    ),
    checkboxRow(t('popupMono', 'Mono'), settings.mono, (v) => commit({ mono: v })),
  );
  editor.append(switches);

  const eqActive = settings.equalizer.some((band) => band !== 0);
  const note = document.createElement('p');
  note.className = 'origins__note';
  note.textContent = eqActive
    ? t('optionsEqSaved', 'Equalizer settings are saved for this site.')
    : t('optionsEqNone', 'No equalizer settings saved for this site.');
  editor.append(note);

  if (eqActive) {
    const clearEq = document.createElement('button');
    clearEq.type = 'button';
    clearEq.className = 'link-button';
    clearEq.textContent = t('optionsClearEq', 'Clear equalizer');
    clearEq.addEventListener('click', () =>
      commit({ equalizer: settings.equalizer.map(() => 0) }),
    );
    editor.append(clearEq);
  }

  return editor;
}

interface SliderRowConfig {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  format: (value: number) => string;
  onCommit: (value: number) => void;
}

/**
 * A labelled slider that updates its readout live but only saves on release,
 * so dragging does not write a storage entry per pixel.
 */
function sliderRow(config: SliderRowConfig): HTMLElement {
  const row = document.createElement('div');
  row.className = 'origins__field';

  const header = document.createElement('div');
  header.className = 'origins__field-header';

  const label = document.createElement('span');
  label.textContent = config.label;

  const readout = document.createElement('span');
  readout.className = 'origins__field-value';
  readout.textContent = config.format(config.value);

  header.append(label, readout);

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = String(config.min);
  slider.max = String(config.max);
  slider.step = String(config.step);
  slider.value = String(config.value);
  slider.setAttribute('aria-label', config.label);

  slider.addEventListener('input', () => {
    readout.textContent = config.format(Number(slider.value));
  });
  slider.addEventListener('change', () => {
    config.onCommit(Number(slider.value));
  });

  row.append(header, slider);
  return row;
}

function checkboxRow(
  label: string,
  checked: boolean,
  onChange: (value: boolean) => void,
): HTMLElement {
  const wrapper = document.createElement('label');
  wrapper.className = 'switch switch--compact';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = checked;
  input.addEventListener('change', () => onChange(input.checked));

  const text = document.createElement('span');
  text.textContent = label;

  wrapper.append(input, text);
  return wrapper;
}

/**
 * Fills the language picker. The first entry follows the browser, which is the
 * default and what most people want; the rest are named in their own script,
 * since someone hunting for their language recognises it there and not as an
 * English exonym.
 */
function buildLanguagePicker(selected: string): void {
  dom.language.replaceChildren();

  const auto = document.createElement('option');
  auto.value = AUTO_LANGUAGE;
  const browserName = LOCALE_NAMES[browserLocale()] ?? browserLocale();
  auto.textContent = `${t('optionsLanguageAuto', 'Automatic')} (${browserName})`;
  dom.language.append(auto);

  const named = AVAILABLE_LOCALES.map((code) => ({
    code,
    name: LOCALE_NAMES[code] ?? code,
  })).sort((a, b) => a.name.localeCompare(b.name));

  for (const { code, name } of named) {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = name;
    dom.language.append(option);
  }

  dom.language.value = selected;
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

  dom.language.addEventListener('change', () => {
    void setLanguage(dom.language.value).then(() => {
      // Re-translate in place rather than reloading, so the page does not lose
      // its scroll position or a saved-site editor the user had open.
      applyTranslations();
      buildLanguagePicker(dom.language.value);
      flashSaved();
      return renderOrigins();
    });
  });

  dom.resetMaxGain.addEventListener('click', () => {
    void save({ maxGain: DEFAULT_MAX_GAIN });
  });

  dom.clearOrigins.addEventListener('click', () => {
    // Deleting every saved site is easy to trigger by accident and cannot be
    // undone, so it asks first.
    if (!window.confirm(t('optionsConfirmClearAll', 'Forget the saved volume for every site?')))
      return;
    void clearAllOrigins().then(renderOrigins);
  });

  dom.exportSettings.addEventListener('click', () => void exportSettings());

  // The button stands in for the file input, which is hidden because browsers
  // style it inconsistently and it cannot be made to match the others.
  dom.importSettings.addEventListener('click', () => dom.importFile.click());

  dom.importFile.addEventListener('change', () => {
    const file = dom.importFile.files?.[0];
    // Clearing the value lets the same file be picked twice in a row, which
    // otherwise fires no change event at all.
    dom.importFile.value = '';
    if (file) void importSettings(file);
  });

  dom.restoreDefaults.addEventListener('click', () => {
    if (
      !window.confirm(t('optionsConfirmRestore', 'Restore all settings to their defaults?'))
    )
      return;
    void save({
      defaults: { ...(preferences?.defaults ?? {}), gain: 1 } as GlobalPreferences['defaults'],
      defaultPersistence: 'session',
      maxGain: 6,
      autoLimiterAboveUnity: true,
      tabCaptureFallback: true,
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Export and import                                                           */
/* -------------------------------------------------------------------------- */

function setTransferStatus(message: string, tone: 'ok' | 'error'): void {
  dom.transferStatus.textContent = message;
  dom.transferStatus.dataset.tone = tone;
}

/**
 * Writes the settings to a file the user picks a location for.
 *
 * A blob URL and a synthetic click rather than the downloads API: this needs no
 * extra permission, and a settings file is small enough that holding it in
 * memory costs nothing.
 */
async function exportSettings(): Promise<void> {
  const prefs = preferences ?? (await send<GlobalPreferences>({ type: 'ui:get-preferences' }));
  const origins = await listOrigins();
  const version = ext.runtime.getManifest().version;

  const json = JSON.stringify(buildExport(prefs, origins, version), null, 2);
  const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));

  const link = document.createElement('a');
  link.href = url;
  link.download = exportFilename();
  link.click();
  // Revoking immediately can cancel the download in some browsers, so the
  // handle is released on the next turn of the event loop instead.
  setTimeout(() => URL.revokeObjectURL(url), 0);

  setTransferStatus(t('optionsExported', 'Settings exported.'), 'ok');
}

/**
 * Replaces the stored settings with the contents of a file.
 *
 * Destructive, so it confirms first: the saved sites and presets already here
 * are overwritten, not merged, and someone who picked the wrong file would
 * otherwise lose a setup with no way back.
 */
async function importSettings(file: File): Promise<void> {
  let result;
  try {
    result = parseImport(await file.text(), (key, fallback) => t(key, fallback));
  } catch (error) {
    setTransferStatus(
      error instanceof ImportError
        ? error.message
        : t('optionsImportFailed', 'That file could not be read.'),
      'error',
    );
    return;
  }

  const question = t(
    'optionsImportConfirm',
    'Replace your current settings with this file? $SITES$ saved sites and $PRESETS$ presets will be restored.',
    {
      SITES: String(result.counts.origins),
      PRESETS: String(result.counts.presets),
    },
  );
  if (!window.confirm(question)) return;

  await replaceOrigins(result.origins);
  const next = await send<GlobalPreferences>({
    type: 'ui:set-preferences',
    preferences: result.preferences,
  });
  render(next);
  await renderOrigins();
  setTransferStatus(t('optionsImported', 'Settings imported.'), 'ok');
}

async function init(): Promise<void> {
  // Resolve the language before anything is rendered, so the page never shows
  // English text and then swaps it out.
  const language = await initLocale();
  applyTranslations();
  buildLanguagePicker(language);

  bind();
  // Naming the running version makes bug reports precise, and pairs with the
  // source link the AGPL asks us to surface.
  dom.aboutVersion.textContent = `Volume Booster Tab ${ext.runtime.getManifest().version}`;
  render(await send<GlobalPreferences>({ type: 'ui:get-preferences' }));
  await renderOrigins();
}

void init();
