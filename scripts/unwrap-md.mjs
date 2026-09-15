/**
 * Joins hard-wrapped Markdown prose back into one line per paragraph.
 *
 * Hard wrapping makes a one-word edit rewrap a whole paragraph, so a diff that
 * changed a sentence looks like it changed six lines. One line per paragraph
 * keeps diffs to the sentences that actually moved. Editors soft-wrap for
 * reading, and every Markdown renderer treats a wrapped and an unwrapped
 * paragraph identically.
 *
 * ```text fences are joined too, and for the same reason: they hold the copy
 * pasted into store submission forms, and those forms wrap text themselves. A
 * hard wrap carried into the form shows up as a ragged line break mid-sentence.
 * Inside a text fence the joiner is deliberately conservative, preserving the
 * lines whose breaks carry meaning - ALL-CAPS section headings, numbered steps
 * and their indented continuations, aligned `- key   value` rows, bare URLs and
 * blank lines.
 *
 * What it deliberately does NOT touch, because the line breaks there are the
 * content rather than formatting:
 *
 *   - every fence that is not ```text - code, JSON and shell commands, where a
 *     joined line would be wrong or unrunnable
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
 * True for a line inside a ```text block whose break has to survive.
 *
 * Store copy is not free prose: it carries section headings the reviewer scans
 * for, numbered test steps, and permission rows whose columns are aligned with
 * runs of spaces. Joining any of those produces a paragraph the submitter has
 * to repair by hand, which defeats the point of keeping the copy here.
 *
 * @param {string} line
 */
function isFixedInTextBlock(line) {
  if (line.trim() === '') return true;
  // An ALL-CAPS heading such as FEATURES or HOW TO TEST. Digits, spaces and
  // punctuation are allowed so "WHAT IT CANNOT DO" and "PERMISSIONS" match but
  // an ordinary sentence does not.
  if (/^[A-Z][A-Z0-9 '&/()-]*$/.test(line.trimEnd()) && line.trim().length > 2) return true;
  if (/^\s*\d+[.)]\s/.test(line)) return true; // numbered step
  if (/^\s*[-*•]\s/.test(line)) return true; // bullet or aligned key/value row
  if (/^\s+\S/.test(line)) return true; // indented continuation of either
  if (/^\s*(?:https?:\/\/|www\.)\S+$/.test(line.trim())) return true; // bare URL
  return false;
}

/**
 * Joins the prose paragraphs inside one ```text block, leaving the structural
 * lines above untouched.
 *
 * @param {string[]} body
 * @returns {string[]}
 */
function unwrapTextBlock(body) {
  /** @type {string[]} */
  const out = [];
  /** @type {string[]} */
  let paragraph = [];

  const flush = () => {
    if (paragraph.length > 0) {
      out.push(paragraph.join(' '));
      paragraph = [];
    }
  };

  for (const line of body) {
    if (isFixedInTextBlock(line)) {
      flush();
      out.push(line);
      continue;
    }
    paragraph.push(paragraph.length === 0 ? line.trimEnd() : line.trim());
  }

  flush();
  return out;
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
  /** Lines of the ```text block currently open, or null for any other fence. */
  let textBlock = null;

  const flush = () => {
    if (paragraph.length > 0) {
      out.push(paragraph.join(' '));
      paragraph = [];
    }
  };

  for (const line of lines) {
    const fenceMatch = /^\s{0,3}(`{3,}|~{3,})/.exec(line);

    if (fence) {
      const closes =
        fenceMatch && fenceMatch[1][0] === fence[0] && fenceMatch[1].length >= fence.length;
      if (!closes) {
        // Still inside: buffer a text block, copy anything else verbatim.
        if (textBlock) textBlock.push(line);
        else out.push(line);
        continue;
      }
      if (textBlock) {
        out.push(...unwrapTextBlock(textBlock));
        textBlock = null;
      }
      out.push(line);
      fence = null;
      continue;
    }

    if (fenceMatch) {
      flush();
      fence = fenceMatch[1];
      // Only ```text holds prose meant for a form. Every other language is
      // code, and joining its lines would break it.
      textBlock = /^\s{0,3}(?:`{3,}|~{3,})text\s*$/.test(line) ? [] : null;
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
