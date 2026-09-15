# Opera add-ons submission text

Copy-paste material for the Opera add-ons dashboard (<https://addons.opera.com/developer/>).

> [!IMPORTANT]
> Upload `dist/opera-mv2-<version>.zip`, produced by `pnpm run package`. Opera is
> the one store that still takes the **Manifest V2** build — see
> [`publishing.md`](publishing.md) for which build goes where.

Related: [`chrome-submission.md`](chrome-submission.md) for Chrome and Edge, [`amo-submission.md`](amo-submission.md) for Firefox.

---

## What Opera asks that the other stores do not

Five fields have no Chrome or AMO counterpart, and most have a wrong answer that is easy to give by accident:

| Field                 | Answer                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| **Category**          | **Productivity** — Opera's list has no _Tools_. See [Category](#category).                         |
| **License**           | **Custom EULA** — paste the AGPL notice below. Do **not** accept the default CC BY-NC-ND 4.0.      |
| **Screenshots**       | 800×600 maximum, so the 1280×800 set used elsewhere is rejected. Generate the 800×600 set below.   |
| **Icon**              | Exactly 64×64 — `public/icons/icon-64.png`. No other store asks for this size.                     |
| **Promotional image** | Optional, exactly 300×188. Used only if Opera decides to feature the extension.                    |
| **Auto-publishing**   | Opt in. Nothing in this extension needs a human reviewer's judgement.                              |

Everything else — name, summary, description, translations — is the same text as the Chrome listing.

---

## Store listing

**Name**

```text
Volume Booster Tab
```

**Summary**

```text
Boost any tab's volume to 600% with a limiter, equalizer and balance. Every tab is independent. No tracking, open source.
```

**Category:** Productivity **Support site:** `https://github.com/ramazansancar/volume-booster-tab-extension/issues`

**Description**

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

• Boost from 0% to 600%, raisable to 1000% in settings
• Limiter that prevents clipping and painful peaks when boosting
• 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
• Stereo balance, from full left to full right
• Mono downmix for listening with a single earbud
• Bypass switch to compare the processed and untouched sound instantly
• Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as opera:// and the add-ons catalog are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

> [!NOTE]
> The Chrome listing says `chrome://` where this one says `opera://`. That is the
> only difference in the body text; keep the rest identical so the two listings
> do not drift.

---

## Turkish listing (`tr`)

Opera carries one listing per language, added from the language selector on the listing form. The English text stays the default.

Use the Turkish description from [`chrome-submission.md`](chrome-submission.md#turkish-listing-tr) unchanged, with one substitution — `chrome://` becomes `opera://`:

```text
opera:// gibi tarayıcı sayfaları ve mağaza sayfaları, bu eklenti dahil her eklentiye kapalıdır.
```

The same rule applies as everywhere else: the interface words in the listing (_limitör_, _ekolayzer_, _denge_, _sekme_) must match [`public/_locales/tr/messages.json`](../public/_locales/tr/messages.json). Change both together or not at all.

---

## Translations tab

Opera lists the same 55 languages the extension ships. **Description** is the only required field per language; Summary and Changelog are optional.

Opera rejects the submission with `Detailed description missing for <language>` until every language it offers has one, so leaving them empty is not an option. [`store-descriptions.md`](store-descriptions.md) carries all 55, each with real text in that language.

> [!WARNING]
> The form says HTML and BBCode are not supported. The copy in [`store-descriptions.md`](store-descriptions.md) already uses `-` bullets for that reason, and carries all 55 languages. Paste from there rather than from the Chrome file, whose listing still uses `•`.

### Changelog (`en-US`)

```text
The tab-capture fallback now works. On pages whose audio cannot be read directly, such as cross-origin media served without CORS headers, a "Try tab capture" button appears in the popup and routes the tab's audio through the extension instead. DRM-protected sites still cannot be boosted by any path.

Two permissions removed. "tabs" and "activeTab" are no longer requested; the host permissions already covered everything they were used for. The extension now asks for less than it did before.
```

### Changelog (`tr`)

```text
Sekme yakalama yedeği artık çalışıyor. Sesi doğrudan okunamayan sayfalarda - CORS başlığı olmadan sunulan farklı kaynaklı medya gibi - açılır pencerede "Sekme yakalamayı dene" düğmesi çıkıyor ve sekmenin sesi eklenti üzerinden geçiriliyor. DRM korumalı siteler hiçbir yolla yükseltilemiyor.

İki izin kaldırıldı. "tabs" ve "activeTab" artık istenmiyor; ana makine izinleri bunların kullanıldığı her şeyi zaten kapsıyordu. Eklenti eskisinden daha az izin istiyor.
```

Keep both in step with [`CHANGELOG.md`](../CHANGELOG.md) on each release: this is user-facing copy, so it says what changed for a user rather than which functions moved.

---

## Category

Pick **Productivity**.

Opera requires one category, and its list is a third variation — it shares neither Chrome's _Tools_ nor Edge's spelling of the overlapping entries:

```text
Accessibility · Appearance · Blockchain & Cryptocurrency · Developer Tools Downloads · Fun · Music · News & Weather · Privacy & Security · Productivity Search · Shopping · Social · Translation
```

Three entries are plausible; the reasoning:

| Category         | Verdict                                                                                                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Productivity** | **Chosen.** A per-tab audio control is a utility operated on whatever page the user is already on. Closest match to Chrome's _Tools_ and to the Edge listing's _Productivity_, which keeps all three consistent.                                      |
| Music            | Tempting, and Opera has it where Chrome and Edge do not — but it describes what some users boost, not what the extension does. The extension has no opinion about music; it raises the volume of a lecture or a video call just as readily.           |
| Accessibility    | Defensible — amplification genuinely helps hard-of-hearing users, and the category is less crowded. But the listing does not present itself as an assistive tool. Only pick it if the description is rewritten to lead with hearing support.          |

---

## License

> [!WARNING]
> Opera defaults this field to **Creative Commons
> Attribution-NonCommercial-NoDerivatives 4.0**. Accepting it would publish the
> listing under a licence that contradicts the one the code ships under: CC
> BY-NC-ND forbids commercial use and derivative works, both of which the AGPL
> explicitly permits. Choose **custom EULA** and paste the text below.

```text
This extension is free software, licensed under the GNU Affero General Public License, version 3 or later (AGPL-3.0-or-later).

You may use, study, modify, redistribute and fork it, including commercially. If you distribute it, or run a modified version as a network service, you must release your version's complete corresponding source under the same licence.

Full licence text:
https://www.gnu.org/licenses/agpl-3.0.html

Source code:
https://github.com/ramazansancar/volume-booster-tab-extension

The extension is provided WITHOUT ANY WARRANTY, to the extent permitted by applicable law.
```

---

## Screenshots

Opera caps screenshots at **800×600**, so the 1280×800 images the Chrome and AMO listings use are rejected here. Generate the Opera set:

```bash
node scripts/screenshots.mjs --size=800x600 --locale=en,tr
```

That writes six files into `store-assets/`:

| File                             | Listing language |
| -------------------------------- | ---------------- |
| `popup-boost-800x600.png`        | English          |
| `popup-equalizer-800x600.png`    | English          |
| `options-800x600.png`            | English          |
| `popup-boost-800x600-tr.png`     | Turkish          |
| `popup-equalizer-800x600-tr.png` | Turkish          |
| `options-800x600-tr.png`         | Turkish          |

Upload at least two; the boost and equalizer panels are the two that show what the extension is for.

> [!NOTE]
> The guidelines say white backgrounds are preferred. These images use the dark
> backdrop from
> [`scripts/screenshot-templates/background.html`](../scripts/screenshot-templates/background.html),
> matching the extension's own interface and the other two stores' listings.
> "Preferred" is not "required", and consistency across stores is worth more than
> matching a stylistic suggestion.

The generator scales its type with the canvas, so 800×600 stays readable — the unusable size is 640×400, which puts the popup's 13px type at 6px.

---

## Icon

Opera requires exactly **64×64**. Upload:

```text
public/icons/icon-64.png
```

No other store asks for that size, so it exists only for this listing. It is rasterised from the same vector description as every other icon in [`scripts/icons.mjs`](../scripts/icons.mjs) rather than resampled from a larger PNG, so the speaker mark stays crisp at 64px. Regenerate the whole set with:

```bash
pnpm run icons
```

---

## Promotional image

Optional, and used only if Opera's editors decide to feature the extension. The required size is exactly **300×188**.

```bash
pnpm run promo -- --locale=en,tr
```

That writes `store-assets/promo-300x188.png` and `promo-300x188-tr.png`: the extension icon, the name, and one line saying what it does. At 300×188 nothing else fits — the popup shrunk to this size is illegible, which is why this is a purpose-built card rather than a resized screenshot. The wording lives in `COPY` at the top of [`scripts/promo.mjs`](../scripts/promo.mjs); keep each tagline short enough to stay on one line.

---

## Version detail page

These fields are on the **version** page, not the listing form, and none has a Chrome or AMO counterpart.

| Field                                      | Value                                                                               |
| ------------------------------------------ | ----------------------------------------------------------------------------------- |
| Service website URL                        | **Leave empty.** This is for a service the extension connects to; there is none, and the field explicitly excludes GitHub profiles. |
| Extension support page URL                 | `https://github.com/ramazansancar/volume-booster-tab-extension/issues`              |
| Extension source code URL (public)         | `https://github.com/ramazansancar/volume-booster-tab-extension`                     |
| Extension source code URL (moderators)     | `https://github.com/ramazansancar/volume-booster-tab-extension/tree/v<version>`     |
| License URL                                | `https://www.gnu.org/licenses/agpl-3.0.html`                                        |
| Privacy policy URL                         | `https://github.com/ramazansancar/volume-booster-tab-extension/blob/master/PRIVACY.md` |

> [!IMPORTANT]
> The moderator source link must point at a **tag matching the uploaded
> package**, not at `master` — the form asks for source corresponding to this
> version, and `master` will have moved on by the next release. Push the tag
> before submitting, or the link 404s:
>
> ```bash
> git tag v0.2.1
> git push origin v0.2.1
> ```

The moderator field is required here rather than optional: the package is minified by esbuild, which is exactly the case the form calls out.

`License URL` and `Privacy policy URL` are enough on their own — the form takes "this text **or** the URL", so the two full-text boxes can stay empty. The EULA text in [License](#license) is kept for stores that have no URL field.

### Build instructions

```text
1. OS: any (built and verified on Windows 10)

2. Tools:
   - Node.js 20.x or newer
   - pnpm 9.x  (npm and yarn also work; pnpm is what the lockfile targets)

3. Steps:
   git clone https://github.com/ramazansancar/volume-booster-tab-extension
   cd volume-booster-tab-extension
   git checkout v0.2.1
   pnpm install --frozen-lockfile
   pnpm run build:opera

   The unpacked extension is written to dist/opera-mv2/, which is the
   content of the uploaded package.

   To reproduce the uploaded zip exactly:
   pnpm run package

   Minification is esbuild, configured in scripts/build.mjs. No other
   transformation is applied, and no code is fetched at build time or at
   runtime.
```

> [!NOTE]
> Bump the `git checkout` tag in that block on every release. It is the one line
> in this file that goes stale silently — a reviewer following it would build a
> different version than the one they are reviewing.

---

## Permissions

Opera has no permission-justification form: the MV2 manifest is read directly. The build requests:

```json
["storage", "webNavigation", "http://*/*", "https://*/*"]
```

`tabs` and `activeTab` are deliberately absent — the host permissions already cover everything they were used for. `tabCapture` and `offscreen` are absent too: the tab-capture fallback is implemented only for Chromium MV3, and this is the MV2 build. See `buildPermissions` in [`scripts/manifest.mjs`](../scripts/manifest.mjs).

---

## Moderation

**Tick "I want my extension to be available for auto-publishing."** The extension makes no network requests, loads no remote code, and collects no data, so there is nothing an automated check needs a human to adjudicate. Leaving it unticked only adds review latency.

**Leave "Hide the add-on from search results" unticked.** That option is for private distribution by link.

> [!NOTE]
> The **Name** field is editable only until the first publication. After that it
> takes a message to the moderators, so get it right before submitting.
