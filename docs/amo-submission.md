# AMO submission text

Copy-paste material for the addons.mozilla.org submission form. Keep this file updated when behaviour changes, so a release never needs the text rewritten from scratch.

> [!NOTE]
> AMO's post-upload checklist asks for two things: **version notes** and, if the add-on needs an account to test, **notes to reviewer**. This add-on needs no account, but the reviewer note below explains how to exercise it, which speeds up review.

---

## Version notes (v0.1.1)

```text
First public release.

Amplifies the audio of any browser tab up to 600%, with a limiter, a 6-band
equalizer, stereo balance and a mono downmix. Each tab is controlled
independently, so two tabs can play at different volumes at the same time.

Boosts are temporary by default and are forgotten when the tab closes. A user
can opt a specific site into being remembered from the popup, or change the
default in the options page.

The interface is fully translated into 55 languages.

The add-on makes no network requests, contains no analytics, and stores nothing
beyond the user's own settings in local storage.
```

---

## Notes to reviewer

> [!IMPORTANT]
> AMO's **Notes to Reviewer** field has a length limit that the full text below exceeds. Paste the **short version** into the form; keep the long one here as the reference.
>
> If even the short version is truncated, drop `HOW TO TEST` and `EXPECTED LIMITATION` first. The build instructions and permission justifications are required by AMO policy and must stay.

### Full version

```text
No account or login is required to test this add-on.

WHAT IT DOES
Routes a page's <video> and <audio> elements through a Web Audio graph
(equalizer -> limiter -> gain -> panner) to raise volume beyond what the
page itself allows.

HOW TO TEST
1. Open https://www.youtube.com/watch?v=aqz-KE-bpKQ and start playback.
2. Click the toolbar icon, drag the Volume slider or click the 300% preset.
   Volume changes immediately; the toolbar badge shows the level.
3. Open a second tab on another site and set a different level there. The
   two tabs stay independent - that is the main design point.
4. "Advanced settings" in the popup holds the 6-band equalizer.
5. Close a tab and reopen the site: the boost is gone. Settings are per-tab
   and temporary unless the user ticks "Remember this site".

EXPECTED LIMITATION
DRM sites (Netflix, Spotify) cannot be boosted; Encrypted Media Extensions
hide the audio from page scripts. The popup reports "This page blocks audio
processing" rather than failing silently. Browser security boundary, not a
defect.

PERMISSIONS
- storage    Saves the user's own preferences locally. Nothing else stored.
- tabs       Separate volume per tab; toolbar badge for the active tab.
- activeTab  Applies the boost to the tab being viewed.
- <all_urls> Media can appear on any site, so the content script must run on
             any page. It only looks for <video> and <audio> elements; it
             does not read page content, cookies, form fields or credentials.

DATA COLLECTION
None. Declared as data_collection_permissions.required = ["none"]. The add-on
makes no network requests of any kind: no telemetry, no analytics, no remote
configuration, no external script or font loading. Settings never leave
storage.local on the user's own machine.

SOURCE AND BUILD (Node.js 20 or newer, any OS)
  git clone https://github.com/ramazansancar/volume-booster-tab-extension.git
  cd volume-booster-tab-extension
  npm ci
  npm run package

Uploaded file: dist/firefox-mv2-0.1.1.zip
The attached source archive contains BUILD.md at its root with the same steps.

Bundler is esbuild with its standard minification. No obfuscation, no name
mangling beyond esbuild defaults, no code generated from templates. To read
the output unminified with inline sourcemaps:

  node scripts/build.mjs --target=firefox-mv2 --dev

Three files in the package are generated rather than hand-written, each from
a single source table, and all are committed so the build does not depend on
regenerating them:
  manifest.json        <- scripts/manifest.mjs  (one description, 7 targets)
  _locales/*/          <- scripts/locales.mjs   (55 locales, one table)
  icons/*.png          <- scripts/icons.mjs     (drawn in code, no image lib)
Running `npm run locales` and `npm run icons` reproduces them byte for byte;
CI verifies this on every push.

The extension ships zero runtime dependencies. Every npm package is a
devDependency used only at build time.

License: AGPL-3.0-only (GNU Affero General Public License v3.0)

NOTE ON THE TWO LINTER WARNINGS
addons-linter reports KEY_FIREFOX_UNSUPPORTED_BY_MIN_VERSION and its Android
counterpart because strict_min_version is 91.0, which predates Firefox 140
where data_collection_permissions was introduced. This is deliberate: older
releases ignore the unknown key and install normally, and raising the minimum
purely to silence the warning would drop every user below 140, ESR included.
```

### Compact version — use this when the form truncates

The field silently cuts long input. This version fits and still carries
everything AMO policy requires.

```text
No account or login is required to test this add-on.

WHAT IT DOES
Routes a page's <video> and <audio> elements through a Web Audio graph
(equalizer -> limiter -> gain -> panner) to raise volume beyond what the
page allows. Each tab is boosted independently.

PERMISSIONS
- storage    Saves the user's own preferences locally. Nothing else stored.
- tabs       Separate volume per tab; toolbar badge for the active tab.
- activeTab  Applies the boost to the tab being viewed.
- <all_urls> Media can appear on any site, so the content script must run on
             any page. It only looks for <video> and <audio> elements; it
             does not read page content, cookies, form fields or credentials.

DATA COLLECTION
None. Declared as data_collection_permissions.required = ["none"]. No network
requests of any kind: no telemetry, no analytics, no remote code or fonts.

SOURCE AND BUILD (Node.js 20+, any OS)
  git clone https://github.com/ramazansancar/volume-booster-tab-extension.git
  cd volume-booster-tab-extension
  npm ci
  npm run package

Uploaded file: dist/firefox-mv2-0.1.1.zip
BUILD.md at the root of the source archive repeats these steps.

esbuild with standard minification; no obfuscation. Unminified output:
  node scripts/build.mjs --target=firefox-mv2 --dev

manifest.json, _locales/ and icons/ are generated from single source tables
by scripts/manifest.mjs, scripts/locales.mjs and scripts/icons.mjs, and are
reproducible byte for byte. Zero runtime dependencies.

License: AGPL-3.0-only

The two KEY_FIREFOX_UNSUPPORTED_BY_MIN_VERSION warnings are deliberate:
strict_min_version 91 predates Firefox 140 where data_collection_permissions
was introduced. Older releases ignore the key and install normally; raising
the minimum would drop ESR users.
```

> [!IMPORTANT]
> Trim order if even this is cut: `WHAT IT DOES` first. Never drop
> `SOURCE AND BUILD` or `PERMISSIONS` - AMO policy requires build
> instructions and permission justifications.

---

## Store listing

**Name**

```text
Volume Booster Tab
```

**Summary** (250 characters max)

```text
Boost any tab's volume up to 600% with a limiter, 6-band equalizer, stereo balance and mono downmix. Every tab is controlled independently. No tracking, no network requests, fully open source.
```

**Description**

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself
allows, and gives you real control over how that sound is shaped.

FEATURES

• Boost from 0% to 600% (raisable to 1000% in settings)
• Limiter that prevents clipping and painful peaks when boosting
• 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
• Stereo balance, from full left to full right
• Mono downmix for listening with a single earbud
• Independent control for every tab - run one site at 300% and another at 150%
• Available in 55 languages

PER-TAB AND TEMPORARY BY DEFAULT

Every tab keeps its own volume. Changing one tab never affects another.

By default a boost is forgotten when you close the tab, so a loud setting can
never surprise you later. If you want a site to always open at the same volume,
tick "Remember this site" in the popup - or change the default in the options
page, where you can also review and delete every site you have saved.

PRIVACY

No tracking. No analytics. No account. The extension makes no network requests
at all, and your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide
their audio from extensions by design, so they cannot be boosted. The popup
tells you plainly when a page cannot be processed instead of silently doing
nothing.

Please boost responsibly: high volume can damage both hearing and speakers,
especially with headphones. Leave the limiter on.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

**Categories:** Audio & Video (primary), Appearance or Other (secondary)

**Tags:** volume, audio, sound, equalizer, booster, amplifier

**License in the AMO form:** pick **GNU Affero General Public License v3.0 only** from the preset list.

> [!NOTE]
> The AGPL permits commercial use. What it requires is reciprocity: anyone who distributes the add-on or runs a modified version as a network service must publish their complete corresponding source under the AGPL as well.
