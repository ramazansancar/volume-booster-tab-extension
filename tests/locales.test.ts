import { describe, expect, it } from 'vitest';

import { LOCALES, catalogueFor, messagesFor } from '../scripts/locales.mjs';

/**
 * Guards the generated message catalogues.
 *
 * The placeholder rule is not a style preference. A catalogue that uses $NAME$
 * without declaring it makes the browser reject the whole file, and with it the
 * manifest, so the extension fails to install with "Variable $NAME$ used but
 * not defined" - which is how this was found, after it shipped into a dev
 * build and stopped the extension loading at all.
 */
describe('generated locales', () => {
  const PLACEHOLDER = /\$([A-Z0-9_]+)\$/g;

  it('declares every placeholder each message uses', () => {
    for (const locale of LOCALES) {
      const messages = messagesFor(locale);
      for (const [key, entry] of Object.entries(messages)) {
        const used = [...entry.message.matchAll(PLACEHOLDER)].map((match) =>
          match[1].toLowerCase(),
        );
        if (used.length === 0) continue;

        const declared = Object.keys(entry.placeholders ?? {});
        for (const name of used) {
          expect(
            declared,
            `${locale}/${key} uses $${name.toUpperCase()}$ without declaring it`,
          ).toContain(name);
        }
      }
    }
  });

  it('keeps a placeholder in every translation of a message that has one', () => {
    // A translator who drops $STORE$ produces a sentence with a hole in it:
    // "Rate on" with nothing after. English is the reference for which
    // placeholders a message is supposed to carry.
    const english = messagesFor('en');

    for (const locale of LOCALES) {
      const messages = messagesFor(locale);
      for (const [key, entry] of Object.entries(messages)) {
        const expected = [...english[key].message.matchAll(PLACEHOLDER)].map((m) => m[1]);
        if (expected.length === 0) continue;

        for (const name of expected) {
          expect(
            entry.message,
            `${locale}/${key} lost the $${name}$ placeholder`,
          ).toContain(`$${name}$`);
        }
      }
    }
  });

  it('gives every message a non-empty string', () => {
    for (const locale of LOCALES) {
      for (const [key, entry] of Object.entries(messagesFor(locale))) {
        expect(typeof entry.message, `${locale}/${key}`).toBe('string');
        expect(entry.message.trim(), `${locale}/${key} is empty`).not.toBe('');
      }
    }
  });

  it('exposes the same keys through catalogueFor', () => {
    // The popup reads catalogueFor at build time and messages.json at runtime;
    // if the two ever disagree, a string would be present in one and missing in
    // the other depending on which language the user picked.
    const flat = catalogueFor('en');
    expect(Object.keys(flat).sort()).toEqual(Object.keys(messagesFor('en')).sort());
  });
});
