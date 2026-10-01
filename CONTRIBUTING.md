# Contributing

Thanks for considering a contribution. Pull requests are genuinely welcome — this project accepts them and reviews them.

> [!NOTE]
> This project is licensed under the [GNU Affero General Public License v3.0](LICENSE). By contributing you agree that your contribution is licensed under the same terms.

---

## Quick start

```bash
git clone https://github.com/ramazansancar/volume-booster-tab-extension.git
cd volume-booster-tab-extension
pnpm install
pnpm run dev
```

Then load `dist/chrome-mv3` unpacked in Chrome (`chrome://extensions` → Developer mode → Load unpacked). The watch build rebuilds on save; click the reload icon on the extension card to pick up changes.

> [!TIP]
> **pnpm is recommended but not required.** `npm install` and `yarn` work identically. Node.js 20+ is the only hard requirement.

---

## Before you open a PR

Run the same three checks CI runs:

```bash
pnpm run typecheck
pnpm test
pnpm run lint
```

If all three pass locally, CI will pass too.

---

## Good first contributions

### 🌍 Improve a translation

All 55 locales are already translated, but a machine-assisted translation is no substitute for a native speaker. If something reads awkwardly in your language, fixing it is a genuinely useful contribution.

**All translations live in one table** in [`scripts/locales.mjs`](scripts/locales.mjs) — you never edit the 55 JSON files under `public/_locales/`, those are generated.

1. Find your language code in the `MESSAGES` table
2. Correct or refine the strings:

```js
popupVolume: {
  en: 'Volume',
  tr: 'Ses seviyesi',
  fi: 'Äänenvoimakkuus',   // ← your addition
  ...
},
```

3. Run `pnpm run locales` and commit both the script and the generated files

Any key a locale omits falls back to English automatically, so even a partial pass is useful.

### 🐛 Report a site that does not work

Open an issue with:

- The URL (or the kind of site, if the URL is private)
- What the popup status line said at the bottom
- Your browser and version

> [!IMPORTANT]
> Netflix, Disney+, Prime Video and Spotify use DRM that deliberately hides audio from page scripts. These are documented limitations, not bugs — see [What works and what does not](README.md#what-works-and-what-does-not) before filing.

### 🎚️ Equalizer presets

Bass boost, voice clarity, night mode — a set of 6 band values with a name. Small, self-contained, and useful.

---

## Project structure

Read this before changing anything non-trivial.

| Directory | Rule |
| --- | --- |
| `src/lib/` | Shared logic. Should not assume a specific browser or manifest version. |
| `src/background/` | One state per tab, held in memory. Owns all message routing. |
| `src/content/` | Injected into pages. Finds media elements and routes them to the engine. |
| `src/popup/`, `src/options/` | UI. Never writes settings directly — always sends a message to the background. |
| `src/types/` | Every cross-context contract. Change here first, then fix what breaks. |
| `scripts/` | Build tooling. `manifest.mjs` is where per-browser differences belong. |

### Rules that matter

**Per-tab state must stay per-tab.** Two tabs boosting two sites must never affect each other. There is a test for this in `tests/tab-registry.test.ts` — keep it passing.

**Untrusted input goes through `sanitizeSettings`.** Anything from storage or a message could be corrupt or hostile. A `NaN` reaching an `AudioParam` silences the entire graph.

**Browser differences belong in `scripts/manifest.mjs` or `src/lib/browser.ts`.** Not scattered through feature code with `if (isFirefox)` checks.

**Every new UI string goes in `scripts/locales.mjs`.** Never hardcode English into HTML or TypeScript.

---

## Testing across browsers

```bash
pnpm run build
```

| Browser | Load this |
| --- | --- |
| Chrome / Brave / Vivaldi | `dist/chrome-mv3` |
| Edge | `dist/edge-mv3` |
| Opera | `dist/opera-mv3` |
| Firefox | `dist/firefox-mv2/manifest.json` via `about:debugging` |
| Firefox 109+ | `dist/firefox-mv3/manifest.json` |
| Safari | See [`docs/safari.md`](docs/safari.md) |

> [!TIP]
> A change to the audio path should be tested on at least one Chromium browser **and** Firefox. The two engines differ most in `AudioContext` autoplay behaviour and in how `createMediaElementSource` fails.

### Sites worth testing against

| Site | Tests |
| --- | --- |
| YouTube | Baseline, plus playlist auto-advance |
| Twitch | Live stream, player rebuilds on quality change |
| SoundCloud | `<audio>` rather than `<video>` |
| A news site with an embedded video | Frame handling |
| Netflix | Should report *This page blocks audio processing* |

---

## Commit messages

Conventional Commits, imperative mood:

```
feat: add bass boost equalizer preset
fix: reattach audio after Netflix episode change
docs: document Safari conversion steps
refactor: extract retry backoff into its own helper
test: cover equalizer clamping
```

Keep the subject under 50 characters. Add a body only when the *why* is not obvious from the diff.

---

## Pull request checklist

- [ ] `pnpm run typecheck` passes
- [ ] `pnpm test` passes
- [ ] `pnpm run lint` passes
- [ ] Tested in at least one Chromium browser and Firefox
- [ ] New UI strings added to `scripts/locales.mjs`, not hardcoded
- [ ] New cross-context messages added to `src/types/index.ts`
- [ ] README updated if behaviour or support changed

---

## Code style

Prettier and ESLint are configured; `pnpm run format` fixes formatting.

Beyond that:

- **Markdown paragraphs are one line each.** Do not hard-wrap prose at a column. A hard wrap makes a one-word edit rewrap the whole paragraph, so a diff that changed a sentence looks like it changed six lines. Editors soft-wrap for reading and every renderer treats the two identically. Run `pnpm run format:md` to fix a file, or `pnpm run format:md:check` to see which files need it. Tables, lists, callouts and every code fence except ```` ```text ```` are left alone — the line breaks there are content, not formatting. ```` ```text ```` blocks hold store listing copy that gets pasted into submission forms, and those forms wrap text themselves, so their prose is joined too; the lines whose breaks carry meaning are kept — ALL-CAPS headings, numbered steps with their indented continuations, aligned `- key   value` rows and bare URLs.
- Comments explain **why**, not what. If a line needs a comment to say what it does, rename something instead.
- Prefer explicit over clever. This code runs in seven browser configurations; obvious beats short.
- No new runtime dependencies without discussion. The extension currently ships zero.

---

## Questions

Open an issue. A question is a perfectly good issue — if something was unclear to you, the documentation needs fixing.
