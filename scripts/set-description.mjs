/**
 * Replaces or adds one language's section in docs/store-descriptions.md.
 *
 * The file holds one section per language, all of identical shape, so editing
 * one by hand means matching a 50-line block exactly and getting the heading,
 * the placeholder note and the fence markers right every time. Doing that
 * dozens of times is how a file like this ends up with a duplicated heading or
 * an unterminated fence that nobody notices until a store form rejects the
 * paste.
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
 * To add a language the file does not carry yet, pass its own name as a second
 * argument; the section is inserted in alphabetical order by tag:
 *
 *   node scripts/set-description.mjs ka "ქართული" < translated.txt
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

/** The note that marks a section as translated rather than authored. */
const NOTE = '_Translated from the English description._';

/** Reads all of stdin as UTF-8. */
async function readStdin() {
  /** @type {Buffer[]} */
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

/**
 * Renders one complete section.
 *
 * @param {string} tag
 * @param {string} name language's own name, shown in the heading
 * @param {string} body
 */
function renderSection(tag, name, body) {
  return `## \`${tag}\` — ${name}\n\n${NOTE}\n\n\`\`\`text\n${body.trim()}\n\`\`\`\n\n`;
}

/**
 * Inserts a section the file does not carry yet, in alphabetical order by tag.
 *
 * Ordering is case-insensitive so `en-CA` lands between `en-AU` and `en-GB`
 * rather than before all of them, which is where a plain codepoint sort would
 * put an uppercase tag.
 *
 * @param {string} source
 * @param {string} tag
 * @param {string} name
 * @param {string} body
 */
function insertSection(source, tag, name, body) {
  const headings = [...source.matchAll(/^## `([^`]+)` — /gm)];
  if (headings.length === 0) throw new Error('No sections found to order against');

  const key = tag.toLowerCase();
  const next = headings.find((h) => h[1].toLowerCase() > key);

  if (next) {
    return source.slice(0, next.index) + renderSection(tag, name, body) + source.slice(next.index);
  }

  // Sorts after every existing tag, so it goes at the end. The file ends with a
  // closing fence and a newline; the section supplies its own trailing blank
  // line, so nothing has to be added here.
  const trimmed = source.replace(/\s*$/, '\n\n');
  return trimmed + renderSection(tag, name, body).replace(/\n+$/, '\n');
}

/**
 * Rewrites one section, or adds it when `name` is given and it does not exist.
 *
 * Sections are delimited by their headings rather than by counting lines, so a
 * section whose body has grown or shrunk is still found.
 *
 * @param {string} source full file
 * @param {string} tag language tag as it appears in the heading
 * @param {string} body translated description
 * @param {string} [name] language's own name, required only when adding
 */
export function setDescription(source, tag, body, name) {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    // The terminator is the next section heading, or end of file for the last
    // section. JavaScript has no \Z: written that way it matched a literal "Z",
    // so the final section never matched and could not be rewritten.
    `^## \`${escaped}\` — (.+?)(?: — TRANSLATION NEEDED)?\\n[\\s\\S]*?(?=^## \`|(?![\\s\\S]))`,
    'm',
  );

  const match = pattern.exec(source);
  if (!match) {
    if (!name) {
      throw new Error(
        `No section for \`${tag}\`. To add one, pass the language's own name as ` +
          `a second argument: node scripts/set-description.mjs ${tag} "Name" < text`,
      );
    }
    return insertSection(source, tag, name, body);
  }

  // The existing heading carries the language's own name, which this script has
  // no business rewriting, so it is captured and put back unchanged.
  const existingName = match[1];
  const replacement = renderSection(tag, existingName, body);

  return source.slice(0, match.index) + replacement + source.slice(match.index + match[0].length);
}

async function main() {
  const tag = process.argv[2];
  const name = process.argv[3];
  if (!tag) {
    throw new Error('Usage: node scripts/set-description.mjs <tag> [name] < text');
  }

  const body = await readStdin();
  if (body.trim() === '') throw new Error('Refusing to write an empty description');

  const source = await readFile(target, 'utf8');
  const existed = source.includes(`## \`${tag}\` — `);
  const next = setDescription(source, tag, body, name);
  await writeFile(target, next, 'utf8');

  const verb = existed ? 'updated' : 'added';
  console.log(`  ${tag}: ${verb}, ${body.trim().split('\n').length} lines`);
}

main().catch((error) => {
  console.error(`\n${error.message}\n`);
  process.exit(1);
});
