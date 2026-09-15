/**
 * Promotional image generator.
 *
 * Opera asks for an optional 300x188 promotional image, used only if its
 * editors decide to feature the extension. That size is far too small for a
 * screenshot: the popup's 13px type would land near 3px. So this draws a
 * purpose-built card instead - icon, name, one line of what it does - rather
 * than resizing anything.
 *
 * It renders with the same machinery as the screenshot generator: headless
 * Chrome against a local HTML file, so nothing is added to the dependency tree
 * and the output is identical on every run.
 *
 * Usage:
 *
 *   node scripts/promo.mjs
 *   node scripts/promo.mjs --locale=tr
 *   node scripts/promo.mjs --locale=en,tr
 *   node scripts/promo.mjs --size=440x280 --chrome="C:/path/to/chrome.exe"
 *
 * The default 300x188 is Opera's required size. --size exists because other
 * stores ask for their own promotional dimensions, and the layout is written in
 * relative units so it survives a different aspect ratio.
 */

import { execFile } from 'node:child_process';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify as nodePromisify } from 'node:util';

import { cropPng } from './png-crop.mjs';

const execFileAsync = nodePromisify(execFile);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'store-assets');
const workDir = path.join(root, '.promo');

/**
 * What headless Chrome takes off a requested window before handing back a
 * viewport, measured the same way as in `screenshots.mjs`. The window is asked
 * for the target plus this, then the surplus is cropped off.
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

/**
 * The wording, per listing language.
 *
 * Deliberately not read from the locale files: those hold interface strings,
 * and a promotional card needs a marketing line that has no interface
 * equivalent. The tagline is held to roughly 40 characters - past that it wraps
 * to a third line and crowds the icon at 300x188.
 */
const COPY = {
  en: {
    name: 'Volume Booster Tab',
    tagline: 'Any tab, up to 600%',
    detail: 'Limiter · Equalizer · Per-tab',
  },
  tr: {
    name: 'Sekme Ses Yükseltici',
    tagline: 'Her sekme %600’e',
    detail: 'Limitör · Ekolayzer · Sekme başına',
  },
};

const LOCALES = Object.keys(COPY);

/* -------------------------------------------------------------------------- */
/* Rendering                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Builds the card markup.
 *
 * Every dimension is derived from the target height, so the same layout holds
 * at a different requested size instead of needing a second set of numbers.
 *
 * @param {{ name: string, tagline: string, detail: string }} copy
 * @param {number} width
 * @param {number} height
 * @param {string} iconDataUri
 */
function html(copy, width, height, iconDataUri) {
  const unit = height / 188;
  const px = (value) => `${(value * unit).toFixed(1)}px`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }

      html, body {
        width: ${width}px;
        height: ${height}px;
        overflow: hidden;
      }

      /* The same gradient as the screenshot backdrop, so a featured card and
         the listing images read as one set. */
      body {
        background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 55%, #16181d 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: ${px(10)};
        padding: ${px(18)} ${px(20)};
        font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        color: #f8fafc;
      }

      /* A soft highlight behind the icon, matching the screenshot backdrop's
         radial accent. Without it the icon sits flat on the gradient. */
      body::before {
        content: '';
        position: absolute;
        top: ${px(-40)};
        left: ${px(-30)};
        width: ${px(150)};
        height: ${px(150)};
        background: radial-gradient(circle, rgba(59, 130, 246, 0.28) 0%, transparent 70%);
        pointer-events: none;
      }

      .head {
        display: flex;
        align-items: center;
        gap: ${px(10)};
        position: relative;
      }

      .icon {
        width: ${px(34)};
        height: ${px(34)};
        flex: none;
        border-radius: ${px(8)};
      }

      .name {
        font-size: ${px(15)};
        font-weight: 600;
        letter-spacing: ${px(0.1)};
        line-height: 1.2;
      }

      .tagline {
        position: relative;
        font-size: ${px(26)};
        font-weight: 700;
        line-height: 1.12;
        letter-spacing: ${px(-0.4)};
      }

      /* The number is the thing a reader picks out of a 300px card, so it gets
         the accent rather than the whole line. */
      .tagline em {
        font-style: normal;
        color: #fbbf24;
      }

      .detail {
        position: relative;
        font-size: ${px(11)};
        color: #cbd5e1;
        letter-spacing: ${px(0.2)};
      }
    </style>
  </head>
  <body>
    <div class="head">
      <img class="icon" src="${iconDataUri}" alt="" />
      <div class="name">${copy.name}</div>
    </div>
    <div class="tagline">${copy.tagline.replace(
      /(%?\d+%?)/,
      '<em>$1</em>',
    )}</div>
    <div class="detail">${copy.detail}</div>
  </body>
</html>`;
}

/* -------------------------------------------------------------------------- */
/* Chrome                                                                      */
/* -------------------------------------------------------------------------- */

async function findChrome(explicit) {
  if (explicit) return explicit;
  const { existsSync } = await import('node:fs');
  const found = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));
  if (!found) {
    throw new Error(
      'Could not find Chrome. Pass --chrome="/path/to/chrome" explicitly.',
    );
  }
  return found;
}

/**
 * @param {string} chrome
 * @param {string} htmlPath
 * @param {string} pngPath
 * @param {number} width
 * @param {number} height
 */
async function capture(chrome, htmlPath, pngPath, width, height) {
  // A dedicated profile directory is required: without one Chrome reuses the
  // user's own profile, finds it locked by an instance they already have open,
  // and exits having written nothing.
  const profile = path.join(workDir, 'chrome-profile');

  await execFileAsync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--user-data-dir=${profile}`,
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
  // of surplus on two edges. Trim it to the size the store expects.
  const captured = await readFile(pngPath);
  await writeFile(pngPath, cropPng(captured, width, height));
}

/* -------------------------------------------------------------------------- */
/* Entry point                                                                 */
/* -------------------------------------------------------------------------- */

function parseArgs(argv) {
  const options = { width: 300, height: 188, chrome: null, locales: ['en'] };

  for (const arg of argv) {
    if (arg.startsWith('--size=')) {
      const [w, h] = arg.slice('--size='.length).split('x').map(Number);
      if (!w || !h) throw new Error(`Bad --size: ${arg}`);
      options.width = w;
      options.height = h;
    } else if (arg.startsWith('--locale=')) {
      const wanted = arg.slice('--locale='.length).split(',');
      const resolved = wanted.includes('all') ? LOCALES : wanted;
      const unknown = resolved.filter((code) => !COPY[code]);
      if (unknown.length > 0) {
        throw new Error(
          `No promotional copy for: ${unknown.join(', ')}. ` +
            `Add it to COPY in this file. Known: ${LOCALES.join(', ')}`,
        );
      }
      options.locales = resolved;
    } else if (arg.startsWith('--chrome=')) {
      options.chrome = arg.slice('--chrome='.length);
    } else if (arg === '--help' || arg === '-h') {
      console.log(
        `\nUsage: node scripts/promo.mjs [--size=300x188] ` +
          `[--locale=${LOCALES.join('|')}|all] [--chrome=path]\n`,
      );
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const chrome = await findChrome(options.chrome);

  await mkdir(workDir, { recursive: true });
  await mkdir(outDir, { recursive: true });

  // Inlined as a data URI because headless Chrome loading a file:// page will
  // not always read a sibling file, and an unresolved icon fails silently as a
  // blank box rather than an error.
  const icon = await readFile(path.join(root, 'public', 'icons', 'icon-128.png'));
  const iconDataUri = `data:image/png;base64,${icon.toString('base64')}`;

  console.log(`\nChrome:  ${chrome}`);
  console.log(`Size:    ${options.width}x${options.height}`);
  console.log(`Locales: ${options.locales.join(', ')}\n`);

  for (const locale of options.locales) {
    // English writes the unsuffixed filename the Opera listing already refers
    // to; every other locale appends its code so the sets never collide.
    const suffix = locale === 'en' ? '' : `-${locale}`;
    const name = `promo-${options.width}x${options.height}${suffix}.png`;

    const htmlPath = path.join(workDir, `promo-${locale}.html`);
    const pngPath = path.join(outDir, name);

    await writeFile(
      htmlPath,
      html(COPY[locale], options.width, options.height, iconDataUri),
      'utf8',
    );
    await capture(chrome, htmlPath, pngPath, options.width, options.height);

    console.log(`  ${path.relative(root, pngPath)}`);
  }

  await rm(workDir, { recursive: true, force: true });
  console.log(`\nDone. ${options.locales.length} image(s) in store-assets\n`);
}

main().catch((error) => {
  console.error(`\n${error.message}\n`);
  process.exit(1);
});
