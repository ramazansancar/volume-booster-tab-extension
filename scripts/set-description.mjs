/**
 * Replaces one language's section in docs/store-descriptions.md.
 *
 * The file holds 55 sections of identical shape, so editing one by hand means
 * matching a 50-line block exactly and getting the heading, the placeholder
 * note and the fence markers right every time. Doing that 51 times is how a
 * file like this ends up with a duplicated heading or an unterminated fence
 * that nobody notices until a store form rejects the paste.
 *
 * This takes the language tag and the translated text on stdin, rewrites that
 * one section, drops the TRANSLATION NEEDED marker, and replaces the
 * English-text note with one recording that the text is a translation.
 *
 * That note goes outside the ```text fence, because everything inside the fence
 * is pasted verbatim into a store form - a provenance line in there would be
 * published as part of the listing.
 *
 * Usage:
 *
 *   node scripts/set-description.mjs de < translated.txt
 *   printf '%s' "$text" | node scripts/set-description.mjs pt-BR
 *
 * The tag is the hyphenated form the stores display and the file uses as its
 * heading (`pt-BR`, `zh-CN`), not the underscore form under public/_locales/.
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = path.join(root, 'docs', 'store-descriptions.md');

/** Reads all of stdin as UTF-8. */
async function readStdin() {
  /** @type {Buffer[]} */
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

/**
 * Rewrites one section.
 *
 * Sections are delimited by their headings rather than by counting lines, so a
 * section whose body has grown or shrunk is still found. The last section runs
 * to end of file, which is why the terminator is optional.
 *
 * @param {string} source full file
 * @param {string} tag language tag as it appears in the heading
 * @param {string} body translated description
 */
export function setDescription(source, tag, body) {
  // The heading carries the language's own name, which this script has no
  // business rewriting, so it is captured and put back unchanged.
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    // The terminator is the next section heading, or end of file for the last
    // section. JavaScript has no \Z: written that way it matched a literal "Z",
    // so the final section never matched and could not be rewritten.
    `^## \`${escaped}\` — (.+?)(?: — TRANSLATION NEEDED)?\\n[\\s\\S]*?(?=^## \`|(?![\\s\\S]))`,
    'm',
  );

  const match = pattern.exec(source);
  if (!match) throw new Error(`No section for \`${tag}\``);

  const name = match[1];

  // The provenance note sits outside the fence on purpose: everything inside is
  // pasted verbatim into a store form, so a line saying where the text came
  // from would end up published as part of the listing.
  const note = '_Translated from the English description._';
  const replacement =
    `## \`${tag}\` — ${name}\n\n${note}\n\n\`\`\`text\n${body.trim()}\n\`\`\`\n\n`;

  return source.slice(0, match.index) + replacement + source.slice(match.index + match[0].length);
}

async function main() {
  const tag = process.argv[2];
  if (!tag) throw new Error('Usage: node scripts/set-description.mjs <tag> < text');

  const body = await readStdin();
  if (body.trim() === '') throw new Error('Refusing to write an empty description');

  const source = await readFile(target, 'utf8');
  const next = setDescription(source, tag, body);
  await writeFile(target, next, 'utf8');

  console.log(`  ${tag}: ${body.trim().split('\n').length} lines`);
}

main().catch((error) => {
  console.error(`\n${error.message}\n`);
  process.exit(1);
});
