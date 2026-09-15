<div align="center">

# 🔊 Volume Booster Tab

**Boost any tab's volume up to 600% — with a limiter, equalizer and channel balance.**

Works in Chrome, Firefox, Edge, Opera, Brave, Vivaldi and Safari.
Manifest V2 and V3 from one codebase.

**[⬇️ Install for Firefox](https://addons.mozilla.org/en-US/firefox/addon/volume-booster-tab/)** — Chrome and Edge listings are in review.

[![License: AGPL v3](https://img.shields.io/badge/license-AGPL--3.0-blue.svg)](LICENSE)
[![Manifest V2 + V3](https://img.shields.io/badge/manifest-V2%20%7C%20V3-success.svg)](#browser-support)
[![Browsers](https://img.shields.io/badge/browsers-7%20targets-orange.svg)](#browser-support)
[![Languages](https://img.shields.io/badge/languages-55-brightgreen.svg)](#language-support)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Firefox Add-ons](https://img.shields.io/amo/v/volume-booster-tab?label=firefox%20add-ons&color=orange)](https://addons.mozilla.org/en-US/firefox/addon/volume-booster-tab/)

</div>

---

## Table of contents

- [What it does](#what-it-does)
- [Browser support](#browser-support)
- [What works and what does not](#what-works-and-what-does-not)
- [Language support](#language-support)
- [Install](#install)
- [Build from source](#build-from-source)
- [How it works](#how-it-works)
- [Project layout](#project-layout)
- [Privacy](#privacy)
- [Contributing](#contributing)
- [License](#license)

---

## What it does

| Feature | Description |
| --- | --- |
| 🔊 **Volume boost** | 0–600% per tab, raisable to 1000% in settings |
| 🛡️ **Limiter** | Prevents clipping and painful peaks when boosting |
| 🎚️ **6-band equalizer** | 60 Hz – 10 kHz, ±12 dB, under *Advanced settings* |
| ↔️ **Channel balance** | Full left to full right |
| 🎧 **Mono downmix** | Both channels summed — for single-earbud listening |
| 📑 **Per-tab control** | Every tab has its own volume, independently |
| 🌍 **55 languages** | Interface follows your browser language |
| 🔒 **No tracking** | No network requests, no analytics, no account |

> [!TIP]
> Every tab keeps its own setting. You can run Twitch at 300% and YouTube at 150% at the same time — changing one never touches the other.

> [!NOTE]
> By default a boost is **temporary**: closing the tab forgets it. Tick **Remember this site** in the popup if you want a site to reopen at the same volume, or change the default in the options page.

---

## Browser support

There are only three browser engines. Everything else is a fork that runs one of these builds unchanged.

| Engine | Build target | Browsers | Manifest |
| --- | --- | --- | --- |
| **Chromium** | `chrome-mv3` | Chrome 88+, Brave, Vivaldi, Arc, Yandex | V3 |
| **Chromium** | `edge-mv3` | Microsoft Edge 88+ | V3 |
| **Chromium** | `chrome-mv2` | Chromium forks still on Manifest V2 | V2 |
| **Chromium** | `opera-mv2` | Opera | V2 |
| **Gecko** | `firefox-mv3` | Firefox 109+ | V3 |
| **Gecko** | `firefox-mv2` | Firefox 91+ ESR, LibreWolf, Waterfox, Zen, Floorp, Firefox for Android | V2 |
| **WebKit** | `safari-mv3` | Safari 16.4+ on macOS and iOS | V3 |

> [!IMPORTANT]
> Safari needs an extra conversion step with Xcode before it can be installed. See [`docs/safari.md`](docs/safari.md).

<details>
<summary><b>Why so many targets?</b></summary>

<br>

The two manifest versions differ in ways that cannot be papered over at runtime:

| | Manifest V2 | Manifest V3 |
| --- | --- | --- |
| Toolbar button | `browser_action` | `action` |
| Background | Background page (`scripts`) | Service worker (Chromium) / event page (Firefox) |
| Host access | Inside `permissions` | Separate `host_permissions` |
| CSP | A single string | An object keyed by context |

On top of that, Firefox MV3 does **not** support `service_worker` and needs `background.scripts` instead, so "MV3" alone is not one shape either.

All of this is generated from a single description in [`scripts/manifest.mjs`](scripts/manifest.mjs). Adding a permission is one edit, not seven.

</details>

---

## What works and what does not

Knowing this up front saves a lot of confusion.

### Works everywhere

| Site type | Example | Notes |
| --- | --- | --- |
| ✅ Standard HTML5 video | YouTube, Vimeo, Twitch, Odysee | Full support |
| ✅ HTML5 audio | SoundCloud, Bandcamp, web radio | Full support |
| ✅ Embedded players | Videos inside articles and iframes | Settings are delivered to every frame |
| ✅ Single-page apps | Netflix episode changes, YouTube playlists | The next video is caught automatically |

### Limited or unavailable

> [!WARNING]
> Some pages cannot be boosted at all, and no extension can change that. This is a browser security boundary, not a bug.

| Situation | Why | Workaround |
| --- | --- | --- |
| ⚠️ **Cross-origin media without CORS** | The browser refuses to expose the samples to `createMediaElementSource` | **Try tab capture** in the popup (Chromium only) |
| ❌ **DRM-protected video** (Netflix, Disney+, Prime Video, Spotify) | Encrypted Media Extensions hide the audio from page scripts *and* from tab capture | None — by design |
| ❌ **Browser pages** (`chrome://`, `about:`, the Web Store) | Extensions are not allowed to run there | None — by design |
| ❌ **Local files** (`file://`) | Off by default | Enable file access in the extension's details page |
| ❌ **Firefox + cross-origin media** | Firefox has no `tabCapture` API, so there is no fallback to offer | None currently |
| ❌ **Audio outside the page** (system sound, other apps) | An extension only sees its own browser tabs | Use your OS volume mixer |

<details>
<summary><b>How can I tell which path a tab is using?</b></summary>

<br>

The popup tells you at the bottom:

| Status | Meaning |
| --- | --- |
| *N media sources connected* | Working normally through the Web Audio path |
| *No audio playing yet* | Nothing to boost on this page yet — start playback |
| *Using tab capture* | Fallback path is active (Chromium only) |
| *This page blocks audio processing* | The Web Audio path failed. On Chromium a **Try tab capture** button appears underneath; on DRM pages even that cannot help |
| *Browser pages cannot be boosted* | You are on an internal browser page |

</details>

> [!CAUTION]
> Boosting above 100% can damage speakers and hearing, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in the options page is entirely at your own risk.

---

## Language support

The interface follows your browser's language by default, and you can pick a specific one in the settings page.

All 55 locales are fully translated — every string, in every language, with no English fallbacks. The translations are machine-assisted, so **corrections from native speakers are especially welcome**; see [Contributing](#contributing).

<details>
<summary><b>All 55 languages</b></summary>

<br>

| | | | |
| --- | --- | --- | --- |
| 🇪🇹 አማርኛ (`am`) | 🇸🇦 العربية (`ar`) | 🇧🇬 Български (`bg`) | 🇧🇩 বাংলা (`bn`) |
| 🇪🇸 Català (`ca`) | 🇨🇿 Čeština (`cs`) | 🇩🇰 Dansk (`da`) | 🇩🇪 Deutsch (`de`) |
| 🇬🇷 Ελληνικά (`el`) | 🇬🇧 English (`en`) | 🇦🇺 English AU (`en_AU`) | 🇬🇧 English UK (`en_GB`) |
| 🇺🇸 English US (`en_US`) | 🇪🇸 Español (`es`) | 🇲🇽 Español LatAm (`es_419`) | 🇪🇪 Eesti (`et`) |
| 🇮🇷 فارسی (`fa`) | 🇫🇮 Suomi (`fi`) | 🇵🇭 Filipino (`fil`) | 🇫🇷 Français (`fr`) |
| 🇮🇳 ગુજરાતી (`gu`) | 🇮🇱 עברית (`he`) | 🇮🇳 हिन्दी (`hi`) | 🇭🇷 Hrvatski (`hr`) |
| 🇭🇺 Magyar (`hu`) | 🇮🇩 Indonesia (`id`) | 🇮🇹 Italiano (`it`) | 🇯🇵 日本語 (`ja`) |
| 🇮🇳 ಕನ್ನಡ (`kn`) | 🇰🇷 한국어 (`ko`) | 🇱🇹 Lietuvių (`lt`) | 🇱🇻 Latviešu (`lv`) |
| 🇮🇳 മലയാളം (`ml`) | 🇮🇳 मराठी (`mr`) | 🇲🇾 Melayu (`ms`) | 🇳🇱 Nederlands (`nl`) |
| 🇳🇴 Norsk (`no`) | 🇵🇱 Polski (`pl`) | 🇧🇷 Português BR (`pt_BR`) | 🇵🇹 Português PT (`pt_PT`) |
| 🇷🇴 Română (`ro`) | 🇷🇺 Русский (`ru`) | 🇸🇰 Slovenčina (`sk`) | 🇸🇮 Slovenščina (`sl`) |
| 🇷🇸 Српски (`sr`) | 🇸🇪 Svenska (`sv`) | 🇰🇪 Kiswahili (`sw`) | 🇮🇳 தமிழ் (`ta`) |
| 🇮🇳 తెలుగు (`te`) | 🇹🇭 ไทย (`th`) | 🇹🇷 Türkçe (`tr`) | 🇺🇦 Українська (`uk`) |
| 🇻🇳 Tiếng Việt (`vi`) | 🇨🇳 简体中文 (`zh_CN`) | 🇹🇼 繁體中文 (`zh_TW`) | |

</details>

> [!TIP]
> Spotted a translation that reads awkwardly in your language? Corrections are very welcome and are a great first contribution — see [Contributing](#contributing).

> [!NOTE]
> All translations live in one table in [`scripts/locales.mjs`](scripts/locales.mjs). Add your language there and run `pnpm run locales` — you never edit 55 JSON files by hand.

---

## Install

### From a store

| Store | Status | Link |
| --- | --- | --- |
| 🦊 **Firefox Add-ons** | ✅ Published | **[Volume Booster Tab](https://addons.mozilla.org/en-US/firefox/addon/volume-booster-tab/)** |
| 🌐 **Chrome Web Store** | ⏳ In review | Submitted, awaiting approval |
| 🔵 **Microsoft Edge Add-ons** | ⏳ In review | Submitted, awaiting approval |
| 🧭 **Safari** | ❌ Not planned | Build from source — see [`docs/safari.md`](docs/safari.md) |

> [!NOTE]
> The Firefox listing also covers LibreWolf, Waterfox, Zen, Floorp and Firefox for Android. Chromium forks (Brave, Vivaldi, Opera, Arc) can install the Chrome Web Store build once it is live.

### From source (unpacked)

```bash
git clone https://github.com/ramazansancar/volume-booster-tab-extension.git
cd volume-booster-tab-extension
pnpm install
pnpm run build
```

Then load the folder for your browser:

<details>
<summary><b>Chrome, Edge, Brave, Vivaldi, Opera</b></summary>

<br>

1. Open `chrome://extensions` (or `edge://extensions`, `opera://extensions`)
2. Turn on **Developer mode**
3. Click **Load unpacked**
4. Select `dist/chrome-mv3` (or `dist/edge-mv3`, `dist/opera-mv2`)

</details>

<details>
<summary><b>Firefox</b></summary>

<br>

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select `dist/firefox-mv2/manifest.json`

> [!NOTE]
> Temporary add-ons are removed when Firefox closes. For a permanent install use the signed [AMO listing](https://addons.mozilla.org/en-US/firefox/addon/volume-booster-tab/).

</details>

<details>
<summary><b>Safari</b></summary>

<br>

Safari requires converting the extension into an Xcode project first. See [`docs/safari.md`](docs/safari.md) for the full walkthrough.

</details>

---

## Build from source

> [!NOTE]
> **pnpm is recommended but not required.** npm and yarn work exactly the same — substitute `npm run` or `yarn` for `pnpm run` everywhere below. Node.js 20 or newer is needed.

```bash
pnpm install              # install dev dependencies
pnpm run dev              # watch build for Chrome MV3
pnpm run dev:firefox      # watch build for Firefox MV2
pnpm run build            # build all 7 targets into dist/
pnpm run package          # build all targets AND zip each for store upload
```

> [!IMPORTANT]
> Uploading to a store? Use **`pnpm run package`**, not `pnpm run build`. `build` refreshes the unpacked folders only — it deletes any existing zip rather than updating it, so that a stale archive can never be uploaded by mistake.
>
> Store paperwork lives in [`docs/`](docs/): [publishing](docs/publishing.md) for which build goes where, [AMO](docs/amo-submission.md) for Firefox, [Chrome Web Store](docs/chrome-submission.md) for Chrome and Edge, [Safari](docs/safari.md) for the Xcode conversion.

<details>
<summary><b>All available scripts</b></summary>

<br>

| Script | What it does |
| --- | --- |
| `pnpm run dev` | Watch build, Chrome MV3, unminified with sourcemaps |
| `pnpm run dev:firefox` | Watch build, Firefox MV2 |
| `pnpm run build` | Build every target |
| `pnpm run build:chrome` | Chrome MV3 + MV2 only |
| `pnpm run build:firefox` | Firefox MV3 + MV2 only |
| `pnpm run build:edge` | Edge MV3 only |
| `pnpm run build:opera` | Opera MV2 only |
| `pnpm run build:safari` | Safari MV3 only |
| `pnpm run package` | Build everything and produce store-ready zips |
| `pnpm run icons` | Regenerate the PNG icons from code |
| `pnpm run locales` | Regenerate all 55 locale files from the translation table |
| `pnpm run typecheck` | TypeScript, no emit |
| `pnpm test` | Run the test suite |
| `pnpm run lint` | ESLint |
| `pnpm run format` | Prettier |

You can also target the build script directly:

```bash
node scripts/build.mjs --target=firefox-mv2 --watch
node scripts/build.mjs --target=chrome-mv3,edge-mv3
node scripts/build.mjs --all --zip
node scripts/build.mjs --help
```

</details>

---

## How it works

The extension boosts audio by routing the page's media through a Web Audio graph.

```
 <video> / <audio>
        │
        ▼
  MediaElementSource
        │
        ▼
 ┌──────────────────────────────────────────────┐
 │  6-band equalizer   (BiquadFilterNode × 6)   │  cuts make headroom
 │           ▼                                   │
 │  Limiter            (DynamicsCompressorNode)  │  catches peaks
 │           ▼                                   │
 │  Boost              (GainNode, 0–10×)         │  the actual amplification
 │           ▼                                   │
 │  Balance / mono     (StereoPannerNode)        │  redistributes channels
 └──────────────────────────────────────────────┘
        │
        ▼
   destination  →  your speakers
```

The equalizer sits **before** the boost so that band cuts create headroom, and the limiter sits **before** the gain node so it sees a predictable input level.

<details>
<summary><b>Keeping up with single-page apps</b></summary>

<br>

The hardest part of a volume booster is not the audio — it is noticing when the page swaps its player out. On Netflix, YouTube and Twitch, moving to the next episode does not reload the document: the old `<video>` is removed and a new one is inserted, often before it has any media attached.

A naive extension attaches once, never sees the swap, and leaves you with a popup claiming 400% while the audio plays at 100%. Six mechanisms work together to prevent that:

| Mechanism | Catches |
| --- | --- |
| `MutationObserver` | Elements added to or removed from the DOM |
| Capture-phase media events | Elements inside shadow roots the observer cannot see |
| Re-apply on every attach | The new element inherits the volume you already set |
| Retry with backoff (6 attempts) | Players that insert an empty `<video>` and set `.src` later |
| `pushState` / `replaceState` hooks | SPA route changes that never touch the network |
| Slow periodic sweep (3 s) | Anything the five above somehow missed |

The sweep only runs while a boost is actually applied and the tab is visible, so an idle tab costs nothing.

</details>

<details>
<summary><b>Where settings live</b></summary>

<br>

Per-tab state is held in memory in the background script and is **deliberately not persisted**. That is what makes a boost disappear when its tab closes.

Only when you tick **Remember this site** is a setting written to `storage.local`, keyed by origin. You can review and delete every saved site in the options page.

Nothing is ever sent anywhere. The extension makes no network requests at all.

</details>

---

## Project layout

```
volume-booster-tab-extension/
├── src/
│   ├── lib/                  Shared logic, no browser API assumptions
│   │   ├── audio-engine.ts     The Web Audio graph
│   │   ├── browser.ts          chrome.* / browser.* compatibility layer
│   │   ├── storage.ts          Preferences and per-origin settings
│   │   ├── validate.ts         Coercing untrusted input into safe settings
│   │   └── defaults.ts         Neutral values and safety ceilings
│   ├── background/           Service worker (MV3) / background page (MV2)
│   │   ├── index.ts            Message routing and tab lifecycle
│   │   └── tab-registry.ts     One independent state per tab
│   ├── content/              Injected into pages, finds and routes media
│   ├── popup/                Toolbar UI
│   ├── options/              Settings page
│   └── types/                Cross-context message and state contracts
├── scripts/
│   ├── build.mjs             esbuild bundling, 7 targets, zip packaging
│   ├── manifest.mjs          Generates each target's manifest.json
│   ├── icons.mjs             Renders PNG icons from code, no dependencies
│   └── locales.mjs           Generates all 55 _locales files
├── public/                   Icons and generated locale files
├── tests/                    Vitest unit tests
└── dist/                     Build output, one folder per target
```

---

## Privacy

The extension collects nothing, sends nothing, and makes no network requests at
all. Per-tab boost state lives in memory only; a site preference is written to
`storage.local` solely when you tick **Remember this site**, and you can delete
it from the options page at any time.

Full text: **[PRIVACY.md](PRIVACY.md)**.

---

## Contributing

Pull requests are very welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

**Good first contributions:**

| | |
| --- | --- |
| 🌍 **Translate a language** | One table in `scripts/locales.mjs`, no JSON files to touch |
| 🐛 **Report a site that does not work** | Include the URL and what the popup status said |
| 🎚️ **Suggest equalizer presets** | Bass boost, voice clarity, night mode |
| 📝 **Improve the docs** | If something confused you, it will confuse others |

> [!TIP]
> Before opening a PR, run `pnpm run typecheck && pnpm test && pnpm run lint`. The CI runs the same three commands.

---

## License

[GNU Affero General Public License v3.0](LICENSE)

> [!IMPORTANT]
> **You may** use, study, modify, redistribute and fork this software — including commercially.
>
> **You must**, if you distribute it or run a modified version as a network service, release your version's complete source under the AGPL too. That obligation extends to server-side use, which is what separates the AGPL from the ordinary GPL.
>
> The software is provided **as is, without warranty of any kind**, and the author accepts **no liability** for any damage arising from its use — including damage to hearing or audio equipment from excessive amplification.

Contributions are accepted under the same license.

---

<div align="center">

Made by [Ramazan Sancar](https://github.com/ramazansancar)

</div>
