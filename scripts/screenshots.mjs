#!/usr/bin/env node
/**
 * Store screenshot generator.
 *
 * Renders the real popup markup and stylesheet at store dimensions, so the
 * images in a listing are the actual interface rather than a mockup that drifts
 * from it. The popup is driven with fixed sample state instead of a live tab,
 * which keeps the output identical on every run - a screenshot that changed
 * between builds would be worse than useless for spotting regressions.
 *
 * Uses Chrome's own headless screenshot flag rather than Puppeteer, so nothing
 * is added to the dependency list for a task run a handful of times per release.
 *
 * Usage:
 *   node scripts/screenshots.mjs            # 1280x800, the Chrome Web Store size
 *   node scripts/screenshots.mjs --size=640x400
 *   node scripts/screenshots.mjs --chrome="C:/path/to/chrome.exe"
 */

import { execFile } from 'node:child_process';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import { cropPng } from './png-crop.mjs';

const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'src');
const outDir = path.join(root, 'store-assets');
const workDir = path.join(root, '.screenshots');

/**
 * What headless Chrome takes off a requested window before handing back a
 * viewport. Measured on this build: asking for 1280x800 lays the page out in
 * 1264x705, and anything drawn past that is missing from the capture while the
 * image still comes back at the full requested size.
 *
 * The window is therefore asked for the target size plus this, which makes the
 * viewport exactly the target and the captured image slightly larger; the extra
 * rows and columns are trimmed off afterwards.
 */
const VIEWPORT_INSET = { width: 16, height: 95 };

/** Where Chrome usually lives, in order of preference. */
const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];

/* -------------------------------------------------------------------------- */
/* Sample state                                                                */
/* -------------------------------------------------------------------------- */

/**
 * The state each screenshot shows.
 *
 * Chosen to look like real use rather than a fresh install: a recognisable
 * site, a boost that is clearly doing something, and — in the second shot — an
 * equalizer curve that is obviously hand-set rather than flat.
 */
const SCENES = [
  {
    name: 'popup-boost',
    heading: 'Boost any tab to 600%',
    blurb: 'Every tab keeps its own volume. Run a stream loud in one and music quiet in another - changing one never touches the other.',
    features: [
      ['Up to 600%', 'raisable to 1000% in settings'],
      ['Limiter', 'stays on above 100% so loud never means distorted'],
      ['Per-tab', 'independent volume, balance and equalizer'],
      ['Temporary', 'forgotten when the tab closes, unless you say otherwise'],
    ],
    origin: 'youtube.com',
    gain: 300,
    balance: 0,
    mono: false,
    limiter: true,
    remember: false,
    bypassed: false,
    equalizer: [0, 0, 0, 0, 0, 0],
    advanced: false,
    status: '2 media sources connected',
  },
  {
    name: 'popup-equalizer',
    heading: 'Shape the sound, not just its level',
    blurb: 'A six-band equalizer, stereo balance and a mono downmix, tucked under Advanced settings so the everyday controls stay simple.',
    features: [
      ['6-band EQ', '60 Hz to 10 kHz, plus or minus 12 dB'],
      ['Balance', 'full left to full right'],
      ['Mono', 'both channels summed, for one earbud'],
      ['Bypass', 'compare processed and untouched instantly'],
    ],
    origin: 'twitch.tv',
    gain: 200,
    balance: -20,
    mono: false,
    limiter: true,
    remember: true,
    bypassed: false,
    equalizer: [5, 3, 0, -2, 4, 6],
    advanced: true,
    status: '1 media source connected',
  },
  {
    name: 'options',
    kind: 'options',
    heading: 'Settings that stay out of the way',
    blurb: 'Defaults for new tabs, a safety ceiling you control, and every site you asked to be remembered - editable in place.',
    features: [
      ['Your language', 'pick any of the 55, or follow the browser'],
      ['Saved sites', 'edit or forget each one; changes apply at once'],
      ['Safety', 'keep the limiter on above 100%, cap the maximum'],
      ['Defaults', 'decide what a brand new tab starts at'],
    ],
    language: 'Türkçe',
    defaultGain: 100,
    maxGain: 600,
    persistence: 'session',
    autoLimiter: true,
    tabCapture: true,
    savedSites: [
      ['youtube.com', '300%'],
      ['twitch.tv', '200%'],
      ['soundcloud.com', '150%'],
    ],
  },
];

const EQ_LABELS = ['60', '170', '350', '1k', '3.5k', '10k'];
const PRESETS = [100, 150, 200, 300, 500, 600];

/* -------------------------------------------------------------------------- */
/* Rendering                                                                   */
/* -------------------------------------------------------------------------- */

function eqBand(value, label) {
  const active = value !== 0;
  const shown = value > 0 ? `+${value}` : String(value);
  // The vertical range input is replaced by a drawn track, because a headless
  // screenshot renders native range thumbs inconsistently across platforms.
  const fill = ((value + 12) / 24) * 100;
  return `
    <div class="eq-band">
      <span class="eq-band__gain" data-active="${active}">${shown}</span>
      <div class="eq-shot">
        <div class="eq-shot__track"></div>
        <div class="eq-shot__thumb" style="bottom: calc(${fill}% - 6px)"></div>
      </div>
      <span class="eq-band__freq">${label}</span>
    </div>`;
}

function slider(percent) {
  return `
    <div class="slider-shot">
      <div class="slider-shot__track"></div>
      <div class="slider-shot__fill" style="width: ${percent}%"></div>
      <div class="slider-shot__thumb" style="left: calc(${percent}% - 8px)"></div>
    </div>`;
}


/**
 * The settings page for the options scene.
 *
 * Written out here rather than rendered from the real options.html, because
 * that page is populated entirely by script at runtime - there is nothing to
 * capture without a live extension context. The markup mirrors it closely
 * enough that the listing image stays honest.
 */
function optionsPanel(scene) {
  const sites = scene.savedSites
    .map(
      ([host, level]) => `
        <li class="origins__item">
          <div class="origins__summary">
            <span class="origins__toggle">
              <span class="origins__name">${host}</span>
              <span class="origins__level">${level}</span>
            </span>
            <span class="link-button">Forget</span>
          </div>
        </li>`,
    )
    .join('');

  return `  <main class="page">
    <h1 class="page__title">Volume Booster Tab</h1>
    <p class="page__lead">
      These settings apply to every new tab. Per-tab volume is controlled from the
      toolbar popup.
    </p>

    <section class="card">
      <h2 class="card__title">Defaults for new tabs</h2>
      <div class="field">
        <span class="field__label">Starting volume</span>
        <div class="field__control">
          ${slider((scene.defaultGain / 600) * 100)}
          <output>${scene.defaultGain}%</output>
        </div>
      </div>
      <div class="field">
        <div class="field__header">
          <span class="field__label">Maximum volume</span>
          <span class="link-button">Reset to 600%</span>
        </div>
        <div class="field__control">
          ${slider(((scene.maxGain - 100) / 900) * 100)}
          <output>${scene.maxGain}%</output>
        </div>
        <p class="field__hint field__hint--warn">
          Raising this ceiling can damage speakers and hearing. Keep the limiter on.
        </p>
      </div>
    </section>

    <section class="card">
      <h2 class="card__title">Language</h2>
      <div class="field">
        <span class="field__label">Interface language</span>
        <div class="select-shot">${scene.language}</div>
      </div>
    </section>

    <section class="card">
      <h2 class="card__title">Saved sites</h2>
      <p class="card__lead">${scene.savedSites.length} sites saved.</p>
      <p class="card__lead">
        Editing a site here applies immediately to any tab already open on it.
      </p>
      <ul class="origins">${sites}</ul>
    </section>
  </main>`;
}

/**
 * Reads the background template and fills in the canvas size.
 *
 * The backdrop is a separate file so it can be redesigned without touching this
 * script, and it is rendered to a PNG before use: headless Chrome lays a page
 * out in a viewport smaller than the window it is given, so a CSS gradient
 * painted live stopped partway down the captured image. A background image is
 * stretched over whatever box it is given, which sidesteps that entirely.
 */
async function groundHtml(width, height) {
  const template = await readFile(
    path.join(root, 'scripts', 'screenshot-templates', 'background.html'),
    'utf8',
  );
  return template
    .replaceAll('{{WIDTH}}', String(width))
    .replaceAll('{{HEIGHT}}', String(height));
}

/** Extra rules that replace the native range inputs for a static capture. */
const SHOT_CSS = `
  /* Static stand-ins for native range inputs, which headless Chrome renders
     differently from a real browser window. */
  .slider-shot { position: relative; height: 20px; }
  .slider-shot__track {
    position: absolute; top: 8px; left: 0; right: 0; height: 4px;
    border-radius: 2px; background: var(--track);
  }
  .slider-shot__fill {
    position: absolute; top: 8px; left: 0; height: 4px;
    border-radius: 2px; background: var(--accent);
  }
  .slider-shot__thumb {
    position: absolute; top: 4px; width: 12px; height: 12px;
    border-radius: 50%; background: var(--accent);
  }
  .eq-shot { position: relative; width: 20px; height: 76px; }
  .eq-shot__track {
    position: absolute; left: 8px; top: 0; bottom: 0; width: 4px;
    border-radius: 2px; background: var(--track);
  }
  .eq-shot__thumb {
    position: absolute; left: 4px; width: 12px; height: 12px;
    border-radius: 50%; background: var(--accent);
  }
  /* The real popup lets the range input flex; the stand-in needs the same
     treatment or the ends collapse onto each other. */
  .balance__slider { flex: 1; }

  /* The options page flexes its real range input; the stand-in needs the same
     or it collapses to zero width and the track disappears. */
  .field__control .slider-shot { flex: 1; }

  /* Stand-in for the language <select>: a native control renders with the
     host platform's own chrome, which would look foreign in a listing image. */
  .select-shot {
    position: relative;
    max-width: 320px;
    padding: 8px 10px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--bg);
    color: var(--text);
  }
  .select-shot::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 12px;
    margin-top: -2px;
    border-top: 5px solid currentColor;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    color: var(--text-muted);
  }
`;

/** The popup panel for one scene, as markup to inline into the frame page. */
function popupPanel(scene) {
  const gainPercent = Math.round((scene.gain / 600) * 100);
  const balancePercent = ((scene.balance + 100) / 200) * 100;
  const balanceLabel =
    scene.balance === 0
      ? 'Center'
      : `${scene.balance < 0 ? 'L' : 'R'} ${Math.abs(scene.balance)}%`;

  return `  <main class="panel">
    <header class="panel__header">
      <div class="site">
        <span class="site__label">Current tab</span>
        <span class="site__origin">${scene.origin}</span>
      </div>
      <button type="button" class="toggle-pill" aria-pressed="${scene.bypassed}">
        <span>${scene.bypassed ? 'Bypassed' : 'Active'}</span>
      </button>
    </header>

    <section class="control control--primary">
      <div class="control__row">
        <span class="control__label">Volume</span>
        <output class="control__value" data-boosted="${scene.gain > 100}">${scene.gain}%</output>
      </div>
      ${slider(gainPercent)}
      <div class="presets">
        ${PRESETS.map(
          (p) =>
            `<button type="button" aria-current="${p === scene.gain}">${p}%</button>`,
        ).join('\n        ')}
      </div>
      <p class="hint">Above 100% the limiter stays on to prevent distortion.</p>
    </section>

    <section class="control">
      <div class="control__row">
        <span class="control__label">Balance</span>
        <output class="control__value">${balanceLabel}</output>
      </div>
      <div class="balance">
        <span class="balance__end">Left</span>
        <div class="balance__slider">${slider(balancePercent)}</div>
        <span class="balance__end">Right</span>
      </div>
    </section>

    <section class="switches">
      <label class="switch"><input type="checkbox" ${scene.mono ? 'checked' : ''} /><span>Mono</span></label>
      <label class="switch"><input type="checkbox" ${scene.limiter ? 'checked' : ''} /><span>Limiter</span></label>
      <label class="switch"><input type="checkbox" ${scene.remember ? 'checked' : ''} /><span>Remember this site</span></label>
    </section>

    <details class="advanced" ${scene.advanced ? 'open' : ''}>
      <summary class="advanced__summary">
        <span>Advanced settings</span>
        ${scene.equalizer.some((b) => b !== 0) ? '<span class="advanced__badge">EQ on</span>' : ''}
      </summary>
      <div class="advanced__body">
        <div class="control__row">
          <span class="control__label">Equalizer</span>
          <button type="button" class="link-button">Reset</button>
        </div>
        <div class="equalizer">
          ${scene.equalizer.map((v, i) => eqBand(v, EQ_LABELS[i])).join('')}
        </div>
      </div>
    </details>

    <footer class="panel__footer">
      <div class="status-block">
        <p class="status">${scene.status}</p>
      </div>
      <button type="button" class="link-button">Reset tab</button>
    </footer>

    <button type="button" class="link-button link-button--block">Open all settings</button>
  </main>`;
}


/**
 * Composes one listing image: the popup on the left, what it does on the right.
 *
 * A centred popup leaves most of a 1280x800 canvas empty, and the store shows
 * these at thumbnail size first - so the text has to carry the image when the
 * interface itself is too small to read. Everything scales from the canvas
 * height, which keeps the 640x400 variant identical in proportion.
 *
 * The ground is a plain gradient rather than a screenshot of some website: a
 * listing image must not carry another site's content, and a neutral backdrop
 * keeps the interface the subject.
 */
/**
 * Rewrites the popup stylesheet so it applies only inside `.popup-host`.
 *
 * The frame page loads popup.css to render a real panel, but that file styles
 * `body` - width 320px, its own background - and those rules would otherwise
 * reshape the whole canvas. Selectors are prefixed rather than the file being
 * duplicated by hand, so the screenshot keeps tracking the real stylesheet.
 */
function scopePopupCss(css) {
  return css.replace(/(^|\})\s*([^{}@]+)\{/g, (match, brace, selector) => {
    const scoped = selector
      .split(',')
      .map((one) => {
        const trimmed = one.trim();
        if (!trimmed) return trimmed;
        // :root carries the custom properties; it has to stay global or every
        // var() in the sheet resolves to nothing.
        if (trimmed.startsWith(':root')) return trimmed;
        if (trimmed === 'body' || trimmed === 'html') return '.popup-host';
        if (trimmed === '*') return '.popup-host, .popup-host *';
        return `.popup-host ${trimmed}`;
      })
      .join(', ');
    return `${brace} ${scoped} {`;
  });
}

function framedHtml(scene, popupCss, width, height) {
  const unit = height / 800;
  const px = (n) => `${Math.round(n * unit)}px`;

  // The popup is scaled to fit the canvas rather than by a fixed factor. The
  // equalizer scene is far taller than the other, and a single factor either
  // pushed it past the bottom edge or left the shorter scene looking lost.
  // The popup is shown near its true 320px width. Scaling it up made the panel
  // taller than the canvas on the equalizer scene, and blowing up 13px type
  // only makes it look soft.
  //
  // The settings page is far taller than the popup, so it is shrunk to fit
  // rather than being allowed to run off both edges of the canvas.
  const popupScale = scene.kind === 'options' ? unit * 0.72 : unit;

  const features = scene.features
    .map(
      ([term, rest]) => `
      <li class="feature">
        <span class="feature__mark"></span>
        <span class="feature__text"><strong>${term}</strong> &mdash; ${rest}</span>
      </li>`,
    )
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>${scopePopupCss(popupCss)}</style>
<style>${scopePopupCss(SHOT_CSS)}</style>
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  /* The gradient goes on html, not body. Headless Chrome sizes its capture to
     the document, and a gradient confined to body left a strip of bare html
     colour along the bottom edge whenever the two heights disagreed. */
  /* Chrome lays the page out in a viewport shorter than the captured image and
     fills the remainder with html's own colour. Rather than fight that, html
     carries the colour the gradient ends on, so the seam is invisible. */
  html {
    width: ${width}px;
    height: ${height}px;
    /* The pre-rendered ground, stretched over the whole canvas. A background
       image is painted across the element it is given, so it cannot stop
       partway down the way a CSS gradient did. */
    background: url('${scene.groundUrl}') no-repeat center / 100% 100%;
  }

  /* The ground is its own element rather than a background on html or body.
     The popup stylesheet takes part in this page's cascade, and its own page
     rules kept cutting the painted area short partway down the canvas; an
     absolutely positioned layer cannot be truncated that way. */
  /* Sized in viewport units, so it covers the capture regardless of how the
     laid-out viewport compares to the requested window size - the two differ
     in headless Chrome, and a pixel height left a band of bare colour. */
  .ground {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 55%, #16181d 100%);
    z-index: 0;
  }
  .frame-outer, .copy { position: relative; z-index: 1; }
  body {
    background: transparent;
    width: ${width}px;
    height: ${height}px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${px(72)};
    padding: 0 ${px(80)};
    font: 400 16px/1.45 system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    color: #e8eaee;
    overflow: hidden;
  }

  .frame {
    flex-shrink: 0;
    border-radius: ${px(14)};
    overflow: hidden;
    box-shadow: 0 ${px(24)} ${px(60)} rgba(0,0,0,0.55), 0 ${px(2)} ${px(8)} rgba(0,0,0,0.4);
  }
  /* The popup is inlined rather than framed in an iframe. An iframe needs an
     explicit height, and every guess was either short - clipping the panel -
     or long, leaving an empty strip below it. Inlined, the panel sizes itself
     and the shadow wraps exactly what is there. */
  .frame-outer {
    flex-shrink: 0;
    overflow: hidden;
    border-radius: ${px(14)};
    box-shadow: 0 ${px(24)} ${px(60)} rgba(0,0,0,0.55), 0 ${px(2)} ${px(8)} rgba(0,0,0,0.4);
  }
  /* The options page paints its own page padding; the popup does not. */
  .popup-host[data-kind='options'] { padding: ${px(18)} 0; }
  .popup-host {
    width: ${Math.round((scene.kind === 'options' ? 620 : 320) * popupScale)}px;
    background: #16181d;
    font-size: ${(13 * popupScale).toFixed(1)}px;
  }

  .copy { max-width: ${px(520)}; }

  .brand {
    display: flex;
    align-items: center;
    gap: ${px(12)};
    margin-bottom: ${px(26)};
  }
  .brand__icon {
    width: ${px(40)};
    height: ${px(40)};
    border-radius: ${px(9)};
  }
  .brand__name {
    font-size: ${px(21)};
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  h1 {
    margin: 0 0 ${px(16)};
    font-size: ${px(42)};
    line-height: 1.15;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .blurb {
    margin: 0 0 ${px(34)};
    font-size: ${px(19)};
    line-height: 1.5;
    color: #b9c0cc;
  }

  .features { margin: 0; padding: 0; list-style: none; }
  .feature {
    display: flex;
    align-items: flex-start;
    gap: ${px(13)};
    margin-bottom: ${px(17)};
    font-size: ${px(18)};
    line-height: 1.45;
    color: #cbd2dd;
  }
  .feature__mark {
    flex-shrink: 0;
    width: ${px(8)};
    height: ${px(8)};
    margin-top: ${px(9)};
    border-radius: 50%;
    background: #60a5fa;
  }
  .feature strong { color: #ffffff; font-weight: 600; }

  .footnote {
    margin: ${px(30)} 0 0;
    font-size: ${px(15)};
    color: #8d96a5;
  }
</style>
</head>
<body>
  <div class="frame-outer">
    <div class="popup-host" data-kind="${scene.kind ?? 'popup'}">${
      scene.kind === 'options' ? optionsPanel(scene) : popupPanel(scene)
    }</div>
  </div>

  <div class="copy">
    <div class="brand">
      <img class="brand__icon" src="${scene.iconUrl}" alt="" />
      <span class="brand__name">Volume Booster Tab</span>
    </div>
    <h1>${scene.heading}</h1>
    <p class="blurb">${scene.blurb}</p>
    <ul class="features">${features}</ul>
    <p class="footnote">No tracking &middot; no network requests &middot; open source</p>
  </div>
</body>
</html>`;
}

/* -------------------------------------------------------------------------- */

function parseArgs(argv) {
  const options = { width: 1280, height: 800, chrome: null };
  for (const arg of argv.slice(2)) {
    if (arg.startsWith('--size=')) {
      const [w, h] = arg.slice('--size='.length).split('x').map(Number);
      if (!w || !h) throw new Error(`Bad --size: ${arg}`);
      options.width = w;
      options.height = h;
    } else if (arg.startsWith('--chrome=')) {
      options.chrome = arg.slice('--chrome='.length);
    } else if (arg === '--help' || arg === '-h') {
      console.log(
        '\nUsage: node scripts/screenshots.mjs [--size=1280x800] [--chrome=path]\n',
      );
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

async function findChrome(explicit) {
  if (explicit) return explicit;
  const { existsSync } = await import('node:fs');
  const found = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));
  if (!found) {
    throw new Error(
      'Chrome not found. Pass --chrome=/path/to/chrome, or install Chrome.',
    );
  }
  return found;
}

/**
 * Captures one page at exactly `width` x `height`.
 *
 * Chrome is asked for a slightly larger window so the laid-out viewport comes
 * out at the target size, then the surplus rows and columns are cropped off the
 * returned image.
 */
async function capture(chrome, htmlPath, pngPath, width, height) {
  // A dedicated profile directory is required. Without one Chrome reuses the
  // user's own profile, finds it locked by whatever instance they already have
  // open, and exits with status 21 having written nothing.
  const profile = path.join(workDir, 'chrome-profile');

  await run(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--user-data-dir=${profile}`,
      // Compensated so the laid-out viewport comes out at exactly the target
      // size; see VIEWPORT_INSET.
      `--window-size=${width + VIEWPORT_INSET.width},${height + VIEWPORT_INSET.height}`,
      `--screenshot=${pngPath}`,
      // Three slashes: a local file URL needs an empty authority, and Chrome
      // silently refuses the two-slash form for Windows paths.
      `file:///${htmlPath.replace(/\\/g, '/')}`,
    ],
    { timeout: 120_000 },
  );

  // Chrome returns an image the size of the window it was given, not of the
  // viewport it laid the page out in, so the compensation above leaves a strip
  // of surplus on two edges. Trim it back to the size the store expects.
  const captured = await readFile(pngPath);
  const cropped = cropPng(captured, width, height);
  if (cropped.length !== captured.length) await writeFile(pngPath, cropped);
}

async function main() {
  const options = parseArgs(process.argv);
  const chrome = await findChrome(options.chrome);

  const popupCss = await readFile(path.join(srcDir, 'popup', 'popup.css'), 'utf8');
  const optionsCss = await readFile(
    path.join(srcDir, 'options', 'options.css'),
    'utf8',
  );

  await rm(workDir, { recursive: true, force: true });
  await mkdir(workDir, { recursive: true });
  await mkdir(outDir, { recursive: true });

  console.log(`\nChrome: ${chrome}`);
  console.log(`Size:   ${options.width}x${options.height}\n`);

  // The icon is inlined rather than linked: a file:// page is an opaque origin,
  // so Chrome refuses to load even a sibling file:// image into it, and the
  // listing would ship with a broken-image placeholder.
  const iconBytes = await readFile(
    path.join(root, 'public', 'icons', 'icon-128.png'),
  );
  const iconUrl = `data:image/png;base64,${iconBytes.toString('base64')}`;

  // Render the empty backdrop once, then reuse it behind every scene. Doing it
  // as a capture rather than live CSS is what finally made the ground fill the
  // whole image: headless Chrome's viewport does not match the window it is
  // asked for, and every CSS approach left a band of bare colour at the bottom.
  const groundPath = path.join(workDir, 'ground.html');
  await writeFile(
    groundPath,
    await groundHtml(options.width, options.height),
    'utf8',
  );
  const groundPng = path.join(workDir, 'ground.png');
  await capture(chrome, groundPath, groundPng, options.width, options.height);
  const groundUrl = `data:image/png;base64,${(await readFile(groundPng)).toString('base64')}`;

  for (const scene of SCENES) {
    const framePath = path.join(workDir, `${scene.name}-frame.html`);
    await writeFile(
      framePath,
      framedHtml(
        { ...scene, iconUrl, groundUrl },
        scene.kind === 'options' ? optionsCss : popupCss,
        options.width,
        options.height,
      ),
      'utf8',
    );

    const pngPath = path.join(
      outDir,
      `${scene.name}-${options.width}x${options.height}.png`,
    );
    await capture(chrome, framePath, pngPath, options.width, options.height);
    console.log(`  ${path.relative(root, pngPath)}`);
  }

  await rm(workDir, { recursive: true, force: true });
  console.log(`\nDone. ${SCENES.length} screenshots in ${path.relative(root, outDir)}\n`);
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
