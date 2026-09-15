/**
 * Joins hard-wrapped Markdown prose back into one line per paragraph.
 *
 * Hard wrapping makes a one-word edit rewrap a whole paragraph, so a diff that
 * changed a sentence looks like it changed six lines. One line per paragraph
 * keeps diffs to the sentences that actually moved. Editors soft-wrap for
 * reading, and every Markdown renderer treats a wrapped and an unwrapped
 * paragraph identically.
 *
 * What it deliberately does NOT touch, because the line breaks there are the
 * content rather than formatting:
 *
 *   - fenced code blocks (``` and ~~~), which hold the store listing copy,
 *     build instructions and changelogs that get pasted into forms verbatim
 *   - indented code blocks
 *   - tables
 *   - list items and blockquotes, including > [!NOTE] callouts
 *   - headings, horizontal rules, link-reference definitions
 *   - HTML blocks
 *
 * Usage:
 *
 *   node scripts/unwrap-md.mjs            # rewrites every tracked .md
 *   node scripts/unwrap-md.mjs --check    # exits 1 if any file would change
 *   node scripts/unwrap-md.mjs README.md  # only the named files
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Files rewritten when no paths are given. */
const DEFAULT_FILES = [
  'README.md',
  'CHANGELOG.md',
  'CONTRIBUTING.md',
  'PRIVACY.md',
  'docs/amo-submission.md',
  'docs/chrome-submission.md',
  'docs/opera-submission.md',
  'docs/publishing.md',
  'docs/safari.md',
  'docs/store-descriptions.md',
  '.github/pull_request_template.md',
];

/**
 * True for a line that starts a block whose own line breaks matter, so the
 * paragraph joiner has to leave it and everything like it alone.
 *
 * @param {string} line
 */
function isStructural(line) {
  return (
    line.trim() === '' ||
    /^\s{0,3}#{1,6}\s/.test(line) || // heading
    /^\s{0,3}(?:[-*_]\s*){3,}$/.test(line) || // horizontal rule
    /^\s{0,3}[-*+]\s/.test(line) || // bullet item
    /^\s{0,3}\d+[.)]\s/.test(line) || // ordered item
    /^\s{0,3}>/.test(line) || // blockquote, including callouts
    /^\s{0,3}\|/.test(line) || // table row
    /^\s{0,3}\[[^\]]+\]:\s/.test(line) || // link reference definition
    /^\s{0,3}<\/?[a-zA-Z]/.test(line) || // HTML block
    /^ {4,}\S/.test(line) // indented code
  );
}

/**
 * Rejoins wrapped prose paragraphs.
 *
 * @param {string} source
 * @returns {string}
 */
export function unwrap(source) {
  const lines = source.split('\n');
  /** @type {string[]} */
  const out = [];
  /** @type {string[]} */
  let paragraph = [];

  // Tracks the delimiter of the fence currently open, so a ``` inside a ~~~
  // block does not close it early.
  let fence = null;

  const flush = () => {
    if (paragraph.length > 0) {
      out.push(paragraph.join(' '));
      paragraph = [];
    }
  };

  for (const line of lines) {
    const fenceMatch = /^\s{0,3}(`{3,}|~{3,})/.exec(line);

    if (fence) {
      // Inside a fence: copy verbatim, and close only on the same delimiter.
      out.push(line);
      if (fenceMatch && fenceMatch[1][0] === fence[0] && fenceMatch[1].length >= fence.length) {
        fence = null;
      }
      continue;
    }

    if (fenceMatch) {
      flush();
      fence = fenceMatch[1];
      out.push(line);
      continue;
    }

    if (isStructural(line)) {
      flush();
      out.push(line);
      continue;
    }

    // A plain prose line: accumulate, trimming the wrap indentation that a
    // hard-wrapped continuation carries.
    paragraph.push(paragraph.length === 0 ? line.trimEnd() : line.trim());
  }

  flush();

  // An unterminated fence means the file is malformed; report rather than
  // silently producing output that moves its content around.
  if (fence) {
    throw new Error('Unterminated code fence');
  }

  return out.join('\n');
}

async function main() {
  const args = process.argv.slice(2);
  const check = args.includes('--check');
  const named = args.filter((arg) => !arg.startsWith('--'));
  const files = named.length > 0 ? named : DEFAULT_FILES;

  /** @type {string[]} */
  const changed = [];

  for (const relative of files) {
    const file = path.join(root, relative);
    let source;
    try {
      source = await readFile(file, 'utf8');
    } catch {
      // A file listed in DEFAULT_FILES that does not exist yet is not an error;
      // the list is a convenience, not a manifest.
      if (named.length > 0) throw new Error(`No such file: ${relative}`);
      continue;
    }

    let result;
    try {
      result = unwrap(source);
    } catch (error) {
      throw new Error(`${relative}: ${error.message}`);
    }

    if (result === source) continue;
    changed.push(relative);
    if (!check) await writeFile(file, result, 'utf8');
  }

  if (check) {
    if (changed.length === 0) {
      console.log('\nAll Markdown paragraphs are unwrapped.\n');
      return;
    }
    console.error(
      `\nThese files have hard-wrapped paragraphs:\n${changed
        .map((file) => `  ${file}`)
        .join('\n')}\n\nRun: pnpm run format:md\n`,
    );
    process.exit(1);
  }

  if (changed.length === 0) console.log('\nNothing to unwrap.\n');
  else console.log(`\nUnwrapped ${changed.length} file(s):\n${changed.map((f) => `  ${f}`).join('\n')}\n`);
}

main().catch((error) => {
  console.error(`\n${error.message}\n`);
  process.exit(1);
});
