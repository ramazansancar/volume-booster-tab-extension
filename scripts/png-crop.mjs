/**
 * Minimal PNG cropper.
 *
 * Headless Chrome returns an image the size of the window it was given, while
 * laying the page out in a smaller viewport. Compensating for that inset means
 * the capture comes back slightly larger than the target, so the extra rows and
 * columns have to come off. Doing it here avoids adding an image library for
 * one rectangular crop.
 *
 * Only the subset of PNG this script produces is handled: 8-bit RGBA, no
 * interlacing, no ancillary chunks worth preserving.
 */

import { deflateSync, inflateSync } from 'node:zlib';

const SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

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
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([length, body, crc]);
}

/** Splits a PNG into its chunks. */
function readChunks(png) {
  const chunks = [];
  let offset = 8;
  while (offset < png.length) {
    const length = png.readUInt32BE(offset);
    const type = png.toString('ascii', offset + 4, offset + 8);
    const data = png.subarray(offset + 8, offset + 8 + length);
    chunks.push({ type, data });
    offset += 12 + length;
  }
  return chunks;
}

/**
 * Undoes the per-scanline filters PNG applies before compression.
 * Filter types are those defined by the spec: none, sub, up, average, paeth.
 */
function unfilter(raw, width, height, bpp) {
  const stride = width * bpp;
  const out = Buffer.alloc(stride * height);

  for (let y = 0; y < height; y += 1) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null;
    const target = out.subarray(y * stride, (y + 1) * stride);

    for (let x = 0; x < stride; x += 1) {
      const a = x >= bpp ? target[x - bpp] : 0;
      const b = prev ? prev[x] : 0;
      const c = prev && x >= bpp ? prev[x - bpp] : 0;
      const value = line[x];

      switch (filter) {
        case 0:
          target[x] = value;
          break;
        case 1:
          target[x] = (value + a) & 0xff;
          break;
        case 2:
          target[x] = (value + b) & 0xff;
          break;
        case 3:
          target[x] = (value + ((a + b) >> 1)) & 0xff;
          break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - c);
          const pred = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
          target[x] = (value + pred) & 0xff;
          break;
        }
        default:
          throw new Error(`Unsupported PNG filter type: ${filter}`);
      }
    }
  }
  return out;
}

/**
 * Crops a PNG to the given size, anchored at the top left.
 *
 * @param {Buffer} png
 * @param {number} width
 * @param {number} height
 * @returns {Buffer}
 */
export function cropPng(png, width, height) {
  if (!png.subarray(0, 8).equals(SIGNATURE)) {
    throw new Error('Not a PNG');
  }

  const chunks = readChunks(png);
  const ihdr = chunks.find((c) => c.type === 'IHDR');
  if (!ihdr) throw new Error('PNG has no IHDR');

  const sourceWidth = ihdr.data.readUInt32BE(0);
  const sourceHeight = ihdr.data.readUInt32BE(4);
  const depth = ihdr.data.readUInt8(8);
  const colourType = ihdr.data.readUInt8(9);
  const interlace = ihdr.data.readUInt8(12);

  if (depth !== 8 || interlace !== 0) {
    throw new Error(`Unsupported PNG: depth ${depth}, interlace ${interlace}`);
  }
  // 2 = RGB, 6 = RGBA. Chrome writes one or the other.
  const bpp = colourType === 6 ? 4 : colourType === 2 ? 3 : 0;
  if (!bpp) throw new Error(`Unsupported PNG colour type: ${colourType}`);

  if (sourceWidth === width && sourceHeight === height) return png;
  if (sourceWidth < width || sourceHeight < height) {
    throw new Error(
      `Cannot crop ${sourceWidth}x${sourceHeight} up to ${width}x${height}`,
    );
  }

  const idat = Buffer.concat(
    chunks.filter((c) => c.type === 'IDAT').map((c) => c.data),
  );
  const pixels = unfilter(inflateSync(idat), sourceWidth, sourceHeight, bpp);

  // Re-emit with filter type 0 on every line; the crop is small and the size
  // cost of skipping filter selection is not worth the code.
  const sourceStride = sourceWidth * bpp;
  const targetStride = width * bpp;
  const out = Buffer.alloc((targetStride + 1) * height);

  for (let y = 0; y < height; y += 1) {
    out[y * (targetStride + 1)] = 0;
    pixels.copy(
      out,
      y * (targetStride + 1) + 1,
      y * sourceStride,
      y * sourceStride + targetStride,
    );
  }

  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header.writeUInt8(depth, 8);
  header.writeUInt8(colourType, 9);
  header.writeUInt8(0, 10);
  header.writeUInt8(0, 11);
  header.writeUInt8(0, 12);

  return Buffer.concat([
    SIGNATURE,
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(out, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}
