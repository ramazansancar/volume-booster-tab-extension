#!/usr/bin/env node
/**
 * Build script.
 *
 * Bundles the TypeScript sources with esbuild, generates the right manifest for
 * each target, copies the static assets, and optionally zips the result for
 * store submission. Every target produces a self-contained directory under
 * dist/ that can be loaded unpacked for testing.
 *
 * Usage:
 *   node scripts/build.mjs --all
 *   node scripts/build.mjs --target=firefox-mv2
 *   node scripts/build.mjs --target=chrome-mv3 --watch
 *   node scripts/build.mjs --all --zip
 */


import { cp, mkdir, readFile, rm, writeFile, readdir, stat } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { deflateRaw } from 'node:zlib';
import { promisify } from 'node:util';

import * as esbuild from 'esbuild';

import { DEFAULT_TARGETS, TARGETS, TARGET_NOTES, buildManifest, parseTarget } from './manifest.mjs';
import { LOCALES, LOCALE_NAMES, catalogueFor } from './locales.mjs';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'src');
const distDir = path.join(root, 'dist');
const publicDir = path.join(root, 'public');

const deflate = promisify(deflateRaw);

/* -------------------------------------------------------------------------- */
/* Argument parsing                                                            */
/* -------------------------------------------------------------------------- */

function parseArgs(argv) {
  const options = { targets: [], watch: false, zip: false, all: false, dev: false };

  for (const arg of argv.slice(2)) {
    if (arg === '--all') options.all = true;
    else if (arg === '--watch') options.watch = true;
    else if (arg === '--zip') options.zip = true;
    else if (arg === '--dev') options.dev = true;
    else if (arg.startsWith('--target=')) {
      options.targets.push(...arg.slice('--target='.length).split(','));
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else {
      console.error(`Unknown argument: ${arg}`);
      printHelp();
      process.exit(1);
    }
  }

  if (options.all || options.targets.length === 0) {
    options.targets = [...DEFAULT_TARGETS];
  }

  for (const target of options.targets) {
    if (!TARGETS.includes(target)) {
      console.error(`Unknown target: ${target}`);
      console.error(`Available targets:\n  ${TARGETS.join('\n  ')}`);
      process.exit(1);
    }
  }

  // Watch mode drives a single unpacked directory; watching several at once
  // makes the console output impossible to follow.
  if (options.watch && options.targets.length > 1) {
    options.targets = [options.targets[0]];
    console.warn(`Watch mode builds a single target: ${options.targets[0]}`);
  }

  return options;
}

function printHelp() {
  const rows = TARGETS.map((t) => `  ${t.padEnd(14)}${TARGET_NOTES[t] ?? ''}`).join('\n');
  console.log(`
Volume Booster Tab build script

  --all                 Build every target (default)
  --target=<name>       Build one target, or a comma-separated list
  --watch               Rebuild on change (single target only)
  --zip                 Package each build into dist/<target>.zip
  --dev                 Skip minification and keep readable output

Targets:
${rows}
`);
}

/* -------------------------------------------------------------------------- */
/* Bundling                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * esbuild configuration shared by every entry point.
 *
 * `browser` platform with an ES2020 target covers every engine we ship to,
 * including Firefox ESR 91 and Safari 16.4.
 */
function bundleOptions(target, outDir, dev) {
  const { browser, version } = parseTarget(target);

  return {
    entryPoints: {
      background: path.join(srcDir, 'background', 'index.ts'),
      content: path.join(srcDir, 'content', 'index.ts'),
      'popup/popup': path.join(srcDir, 'popup', 'popup.ts'),
      'options/options': path.join(srcDir, 'options', 'options.ts'),
      // The offscreen document only exists on Chromium MV3, which is the only
      // place with both an offscreen API and a service worker that cannot host
      // an AudioContext. Shipping it elsewhere would be dead weight, and on
      // Firefox and Safari an unused page in the package invites review
      // questions about a feature the build cannot use.
      ...(usesOffscreen(target)
        ? { 'offscreen/offscreen': path.join(srcDir, 'offscreen', 'offscreen.ts') }
        : {}),
    },
    outdir: outDir,
    bundle: true,
    // MV2 background pages and content scripts are classic scripts, so an IIFE
    // is the only format they can load. MV3 service workers accept modules.
    format: version === 3 && browser !== 'firefox' ? 'esm' : 'iife',
    platform: 'browser',
    target: ['es2020'],
    sourcemap: dev ? 'inline' : false,
    minify: !dev,
    legalComments: 'none',
    logLevel: 'warning',
    define: {
      __TARGET__: JSON.stringify(target),
      __BROWSER__: JSON.stringify(browser),
      __MANIFEST_VERSION__: JSON.stringify(version),
      __DEV__: JSON.stringify(dev),
      __LOCALE_CODES__: JSON.stringify(LOCALES),
      __LOCALE_NAMES__: JSON.stringify(LOCALE_NAMES),
      // Only English is inlined; the rest are fetched from the packaged
      // _locales files when a language is actually selected. Inlining all 55
      // made every bundle 250 KB, most of it languages the user never sees.
      __LOCALE_MESSAGES_EN__: JSON.stringify(catalogueFor('en')),
    },
    alias: { '@': srcDir },
  };
}

/**
 * Content scripts must always be classic scripts, never ES modules, because no
 * browser supports module content scripts in a manifest declaration. When the
 * main bundle is ESM the content script is rebuilt separately as an IIFE.
 */
async function bundleContentScriptSeparately(target, outDir, dev) {
  const options = bundleOptions(target, outDir, dev);
  if (options.format !== 'esm') return;

  await esbuild.build({
    ...options,
    entryPoints: { content: path.join(srcDir, 'content', 'index.ts') },
    format: 'iife',
  });
}

/* -------------------------------------------------------------------------- */
/* Static assets                                                               */
/* -------------------------------------------------------------------------- */

/**
 * True for the builds that ship the tab-capture fallback.
 *
 * Firefox has no tabCapture API at all and Safari rejects unknown permissions
 * during review, so both get a build with no offscreen document and no capture
 * permissions. Chromium MV2 uses a persistent background page, which can own an
 * AudioContext directly and so needs no offscreen document either.
 */
function usesOffscreen(target) {
  const { browser, version } = parseTarget(target);
  return version === 3 && (browser === 'chrome' || browser === 'edge');
}

async function copyStatic(outDir, target) {
  // The offscreen host page ships only with the builds that can use it.
  if (usesOffscreen(target)) {
    const to = path.join(outDir, 'offscreen');
    await mkdir(to, { recursive: true });
    await cp(
      path.join(srcDir, 'offscreen', 'index.html'),
      path.join(to, 'index.html'),
    );
  }

  // HTML and CSS live next to their TypeScript so each surface is one folder.
  for (const page of ['popup', 'options']) {
    const from = path.join(srcDir, page);
    const to = path.join(outDir, page);
    await mkdir(to, { recursive: true });
    for (const file of await readdir(from)) {
      if (file.endsWith('.html') || file.endsWith('.css')) {
        await cp(path.join(from, file), path.join(to, file));
      }
    }
  }

  // Icons and locale files ship as-is.
  for (const dir of ['icons', '_locales']) {
    const from = path.join(publicDir, dir);
    try {
      await stat(from);
      await cp(from, path.join(outDir, dir), { recursive: true });
    } catch {
      console.warn(`  ! missing public/${dir}, skipping`);
    }
  }
}

async function writeManifest(target, outDir, pkg) {
  const manifest = buildManifest(target, pkg);
  await writeFile(
    path.join(outDir, 'manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  );
}

/* -------------------------------------------------------------------------- */
/* Zip packaging                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Minimal ZIP writer.
 *
 * Store submissions need a plain zip and nothing more, so writing ~60 lines
 * here avoids adding a dependency that contributors would have to install.
 */
async function zipDirectory(sourceDir, zipPath) {
  const files = [];
  async function walk(dir, prefix = '') {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) await walk(full, rel);
      else files.push({ path: rel, data: await readFile(full) });
    }
  }
  await walk(sourceDir);

  const crcTable = buildCrcTable();
  const chunks = [];
  const central = [];
  let offset = 0;

  for (const file of files) {
    const nameBytes = Buffer.from(file.path, 'utf8');
    const crc = crc32(file.data, crcTable);
    const compressed = await deflate(file.data, { level: 9 });
    // Only use deflate when it actually helps; tiny files often grow.
    const useDeflate = compressed.length < file.data.length;
    const payload = useDeflate ? compressed : file.data;
    const method = useDeflate ? 8 : 0;

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(method, 8);
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(0, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(payload.length, 18);
    local.writeUInt32LE(file.data.length, 22);
    local.writeUInt16LE(nameBytes.length, 26);
    local.writeUInt16LE(0, 28);

    chunks.push(local, nameBytes, payload);

    const header = Buffer.alloc(46);
    header.writeUInt32LE(0x02014b50, 0);
    header.writeUInt16LE(20, 4);
    header.writeUInt16LE(20, 6);
    header.writeUInt16LE(0, 8);
    header.writeUInt16LE(method, 10);
    header.writeUInt16LE(0, 12);
    header.writeUInt16LE(0, 14);
    header.writeUInt32LE(crc, 16);
    header.writeUInt32LE(payload.length, 20);
    header.writeUInt32LE(file.data.length, 24);
    header.writeUInt16LE(nameBytes.length, 28);
    header.writeUInt16LE(0, 30);
    header.writeUInt16LE(0, 32);
    header.writeUInt16LE(0, 34);
    header.writeUInt16LE(0, 36);
    header.writeUInt32LE(0, 38);
    header.writeUInt32LE(offset, 42);
    central.push(header, nameBytes);

    offset += local.length + nameBytes.length + payload.length;
  }

  const centralBuffer = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralBuffer.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);

  await writeFile(zipPath, Buffer.concat([...chunks, centralBuffer, end]));
}

function buildCrcTable() {
  const table = new Int32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c;
  }
  return table;
}

function crc32(buffer, table) {
  let crc = -1;
  for (let i = 0; i < buffer.length; i += 1) {
    crc = (crc >>> 8) ^ table[(crc ^ buffer[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

/* -------------------------------------------------------------------------- */
/* Orchestration                                                               */
/* -------------------------------------------------------------------------- */

async function buildTarget(target, pkg, options) {
  const outDir = path.join(distDir, target);
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const config = bundleOptions(target, outDir, options.dev);

  if (options.watch) {
    const context = await esbuild.context(config);
    await context.watch();
    await bundleContentScriptSeparately(target, outDir, options.dev);
    await copyStatic(outDir, target);
    await writeManifest(target, outDir, pkg);
    console.log(`\nWatching ${target} -> ${path.relative(root, outDir)}`);
    console.log('Load the directory unpacked in your browser and reload after each change.\n');
    return;
  }

  await esbuild.build(config);
  await bundleContentScriptSeparately(target, outDir, options.dev);
  await copyStatic(outDir, target);
  await writeManifest(target, outDir, pkg);

  const note = TARGET_NOTES[target] ? `  (${TARGET_NOTES[target]})` : '';
  console.log(`  built ${target}${note}`);

  const zipPath = path.join(distDir, `${target}-${pkg.version}.zip`);

  if (options.zip) {
    await zipDirectory(outDir, zipPath);
    console.log(`  zipped ${path.relative(root, zipPath)}`);
    return;
  }

  // Without --zip the folder was just rebuilt but any existing archive was
  // not, so a stale zip would silently disagree with the fresh directory. That
  // is exactly the kind of mismatch that gets an outdated build uploaded to a
  // store, so the archive is deleted rather than left to rot.
  try {
    await stat(zipPath);
    await rm(zipPath, { force: true });
    console.log(
      `  removed stale ${path.basename(zipPath)} - re-run with --zip to repackage`,
    );
  } catch {
    // No archive to invalidate.
  }
}

async function main() {
  const options = parseArgs(process.argv);
  const pkg = require('../package.json');

  console.log(`\nVolume Booster ${pkg.version}`);
  console.log(`Building ${options.targets.length} target(s)\n`);

  const started = Date.now();
  for (const target of options.targets) {
    await buildTarget(target, pkg, options);
  }

  if (!options.watch) {
    console.log(`\nDone in ${Date.now() - started} ms -> ${path.relative(root, distDir)}\n`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
