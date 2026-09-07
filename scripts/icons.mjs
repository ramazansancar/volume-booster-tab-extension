#!/usr/bin/env node
/**
 * Icon generator.
 *
 * Renders the extension icon at every size the stores require, writing real
 * PNGs with no image library involved. Encoding a PNG by hand is a little more
 * code than calling sharp, but it keeps `npm install` small and means anyone
 * can regenerate the icons on a fresh clone without native build tooling.
 *
 * Usage: node scripts/icons.mjs
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'icons');

const SIZES = [16, 32, 48, 96, 128, 256, 512];

/** Brand colours: a speaker mark in white on a blue rounded square. */
const BACKGROUND = [37, 99, 235, 255];
const FOREGROUND = [255, 255, 255, 255];

/**
 * Draws the icon into an RGBA pixel buffer.
 *
 * The artwork is defined in a 0..1 coordinate space and sampled per pixel with
 * 3x3 supersampling, so a single description scales cleanly from 16 px to
 * 512 px without separate assets.
 */
function render(size) {
  const pixels = Buffer.alloc(size * size * 4);
  const samples = 3;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;

      for (let sy = 0; sy < samples; sy += 1) {
        for (let sx = 0; sx < samples; sx += 1) {
          const u = (x + (sx + 0.5) / samples) / size;
          const v = (y + (sy + 0.5) / samples) / size;
          const [pr, pg, pb, pa] = sample(u, v);
          r += pr;
          g += pg;
          b += pb;
          a += pa;
        }
      }

      const total = samples * samples;
      const offset = (y * size + x) * 4;
      pixels[offset] = Math.round(r / total);
      pixels[offset + 1] = Math.round(g / total);
      pixels[offset + 2] = Math.round(b / total);
      pixels[offset + 3] = Math.round(a / total);
    }
  }

  return pixels;
}

/** Returns the RGBA colour at normalised coordinates (u, v). */
function sample(u, v) {
  // Rounded-square background covering the full canvas.
  if (!insideRoundedRect(u, v, 0, 0, 1, 1, 0.22)) return [0, 0, 0, 0];

  // Speaker body: a rectangle on the left plus a triangular cone.
  const inSpeaker =
    insideRect(u, v, 0.2, 0.4, 0.13, 0.2) || insideCone(u, v);

  // Three sound waves to the right of the cone, drawn as arc segments.
  const inWaves =
    insideArc(u, v, 0.42, 0.5, 0.17, 0.045) ||
    insideArc(u, v, 0.42, 0.5, 0.27, 0.045) ||
    insideArc(u, v, 0.42, 0.5, 0.37, 0.045);

  return inSpeaker || inWaves ? FOREGROUND : BACKGROUND;
}

function insideRect(u, v, x, y, w, h) {
  return u >= x && u <= x + w && v >= y && v <= y + h;
}

/** Signed-distance test for a rounded rectangle. */
function insideRoundedRect(u, v, x, y, w, h, radius) {
  const cx = Math.max(x + radius, Math.min(u, x + w - radius));
  const cy = Math.max(y + radius, Math.min(v, y + h - radius));
  const dx = u - cx;
  const dy = v - cy;
  return dx * dx + dy * dy <= radius * radius || (insideRect(u, v, x + radius, y, w - 2 * radius, h) || insideRect(u, v, x, y + radius, w, h - 2 * radius));
}

/** The speaker cone: a triangle widening from the body toward the top/bottom. */
function insideCone(u, v) {
  if (u < 0.28 || u > 0.44) return false;
  const progress = (u - 0.28) / 0.16;
  const halfHeight = 0.1 + progress * 0.2;
  return Math.abs(v - 0.5) <= halfHeight;
}

/** An arc segment centred at (cx, cy), open to the right. */
function insideArc(u, v, cx, cy, radius, thickness) {
  const dx = u - cx;
  const dy = v - cy;
  if (dx <= 0) return false;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (Math.abs(distance - radius) > thickness / 2) return false;
  // Limit the arc to roughly +/- 55 degrees so it reads as a wave, not a ring.
  return Math.abs(dy) / distance < 0.82;
}

/* -------------------------------------------------------------------------- */
/* PNG encoding                                                                */
/* -------------------------------------------------------------------------- */

function crcTable() {
  const table = new Int32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c;
  }
  return table;
}

const CRC = crcTable();

function crc32(buffer) {
  let crc = -1;
  for (let i = 0; i < buffer.length; i += 1) {
    crc = (crc >>> 8) ^ CRC[(crc ^ buffer[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([length, typeAndData, crc]);
}

function encodePng(size, pixels) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr.writeUInt8(8, 8); // bit depth
  ihdr.writeUInt8(6, 9); // colour type: RGBA
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace

  // Each scanline is prefixed with filter type 0 (None), which keeps the
  // encoder simple at a small cost in file size.
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y += 1) {
    raw[y * (stride + 1)] = 0;
    pixels.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  for (const size of SIZES) {
    const png = encodePng(size, render(size));
    const file = path.join(outDir, `icon-${size}.png`);
    await writeFile(file, png);
    console.log(`  icon-${size}.png  ${(png.length / 1024).toFixed(1)} KB`);
  }
  console.log(`\nWrote ${SIZES.length} icons to ${path.relative(root, outDir)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
