# AMO submission text

Copy-paste material for the addons.mozilla.org submission form. Keep this file updated when behaviour changes, so a release never needs the text rewritten from scratch.

> [!NOTE]
> AMO's post-upload checklist asks for two things: **version notes** and, if the add-on needs an account to test, **notes to reviewer**. This add-on needs no account, but the reviewer note below explains how to exercise it, which speeds up review.

---

## Version notes (v0.1.0)

```text
First release.

Amplifies the audio of any browser tab up to 600%, with a limiter, a 6-band
equalizer, stereo balance and a mono downmix. Each tab is controlled
independently, so two tabs can play at different volumes at the same time.

Boosts are temporary by default and are forgotten when the tab closes. A user
can opt a specific site into being remembered from the popup, or change the
default in the options page.

The add-on makes no network requests, contains no analytics, and stores nothing
beyond the user's own settings in local storage.
```

---

## Notes to reviewer

> [!IMPORTANT]
> AMO's **Notes to Reviewer** field has a length limit that the full text below exceeds. Paste the **short version** into the form; keep the long one here as the reference.
>
> If even the short version is truncated, drop `HOW TO TEST` and `EXPECTED LIMITATION` first. The build instructions and permission justifications are required by AMO policy and must stay.

### Short version — paste this into the form

```text
No account or login is required to test this add-on.

WHAT IT DOES
Routes a page's <video> and <audio> elements through a Web Audio graph
(equalizer -> limiter -> gain -> panner) to raise volume beyond what the
page allows.

HOW TO TEST
1. Open https://www.youtube.com/watch?v=aqz-KE-bpKQ and start playback.
2. Click the toolbar icon, drag the Volume slider or click the 300% preset.
   Volume changes immediately; the toolbar badge shows the level.
3. Open a second tab on another site and set a different level. The two tabs
   stay independent - this is the main design point.
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
             any page. It only looks for <video> and <audio> elements; it does
             not read page content, cookies, form fields or credentials.

DATA COLLECTION
None. Declared as data_collection_permissions.required = ["none"]. No network
requests of any kind, no telemetry, no analytics, no remote code.

SOURCE AND BUILD (Node.js 20+)
  git clone https://github.com/ramazansancar/volume-booster-extension.git
  cd volume-booster-extension
  npm install
  npm run package
Uploaded file: dist/firefox-mv2-0.1.0.zip

esbuild with standard minification, no obfuscation. manifest.json is generated
by scripts/manifest.mjs, the 56 _locales files by scripts/locales.mjs, and the
icons by scripts/icons.mjs - all from single source tables.
License: AGPL-3.0-only

LINTER WARNINGS
The two KEY_FIREFOX_UNSUPPORTED_BY_MIN_VERSION warnings are intentional:
strict_min_version 91 predates Firefox 140, where data_collection_permissions
was introduced. Older releases ignore the key and install normally. Raising the
minimum would drop ESR users.
```

### Long version — reference only

```text
No account or login is required to test this add-on.

WHAT IT DOES
Routes a page's <video> and <audio> elements through a Web Audio graph
(equalizer -> limiter -> gain -> stereo panner) to raise the volume beyond
what the page itself allows.

HOW TO TEST
1. Open any page with HTML5 audio or video, for example:
   https://www.youtube.com/watch?v=aqz-KE-bpKQ
2. Start playback.
3. Click the toolbar icon and drag the Volume slider, or click a preset
   such as 300%. The volume changes immediately and the toolbar badge shows
   the current level.
4. Open a second tab on a different site and set a different level there.
   The two tabs stay independent - this is the main design point.
5. Open "Advanced settings" in the popup for the 6-band equalizer.
6. Close a tab and reopen the site: the boost is gone, because settings are
   per-tab and temporary unless the user ticks "Remember this site".

EXPECTED LIMITATION
DRM-protected sites (Netflix, Spotify) cannot be boosted, because Encrypted
Media Extensions hide the audio from page scripts. On those pages the popup
reports "This page blocks audio processing" rather than failing silently.
This is a browser security boundary, not a defect.

PERMISSIONS AND WHY
- storage    Saves the user's own preferences locally. Nothing else is stored.
- tabs       Applies a separate volume per tab and shows the level on the
             toolbar badge for the active tab.
- activeTab  Applies the boost to the tab the user is looking at.
- <all_urls> Media can appear on any website, so the content script must be
             able to run on any page the user opens. It only looks for
             <video> and <audio> elements; it does not read page content,
             cookies, form fields or credentials.

DATA COLLECTION
None. Declared in the manifest as
  browser_specific_settings.gecko.data_collection_permissions.required = ["none"]
The add-on performs no network requests of any kind. There is no telemetry,
no analytics, no remote configuration and no external script loading.

SOURCE CODE AND BUILD
Source: https://github.com/ramazansancar/volume-booster-extension
License: AGPL-3.0-only

The submitted package is produced from source with:
  pnpm install
  pnpm run package
and the uploaded file is dist/firefox-mv2-<version>.zip

Build tooling is esbuild; no minifier obfuscation is applied beyond standard
esbuild minification. The manifest is generated by scripts/manifest.mjs, which
emits the correct shape for each browser and manifest version from a single
description.

NOTE ON THE TWO LINTER WARNINGS
addons-linter reports KEY_FIREFOX_UNSUPPORTED_BY_MIN_VERSION because
strict_min_version is 91.0, which predates Firefox 140 where
data_collection_permissions was introduced. This is intentional: the add-on
supports Firefox ESR and older releases, which ignore the unknown key and
install normally. Lowering compatibility purely to silence the warning would
exclude ESR users.
```

---

## Store listing

**Name**

```text
Volume Booster
```

**Summary** (250 characters max)

```text
Boost any tab's volume up to 600% with a limiter, 6-band equalizer, stereo balance and mono downmix. Every tab is controlled independently. No tracking, no network requests, fully open source.
```

**Description**

```text
Volume Booster raises the volume of any browser tab beyond what the page itself
allows, and gives you real control over how that sound is shaped.

FEATURES

• Boost from 0% to 600% (raisable to 1000% in settings)
• Limiter that prevents clipping and painful peaks when boosting
• 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
• Stereo balance, from full left to full right
• Mono downmix for listening with a single earbud
• Independent control for every tab - run one site at 300% and another at 150%
• Available in 56 languages

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
https://github.com/ramazansancar/volume-booster-extension

Licensed under the GNU Affero General Public License v3.0.
```

**Categories:** Audio & Video (primary), Appearance or Other (secondary)

**Tags:** volume, audio, sound, equalizer, booster, amplifier

**License in the AMO form:** pick **GNU Affero General Public License v3.0 only** from the preset list.

> [!NOTE]
> The AGPL permits commercial use. What it requires is reciprocity: anyone who distributes the add-on or runs a modified version as a network service must publish their complete corresponding source under the AGPL as well.
