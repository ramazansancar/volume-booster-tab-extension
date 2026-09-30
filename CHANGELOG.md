# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-09-30

A critical fix for streaming services: Prime Video would not play at all with the extension installed. It now plays, and can be boosted.

### Added

- **DRM-protected video can be boosted.** Prime Video, and other services using Encrypted Media Extensions, now get louder like any other page. Earlier versions, and this README, said that was impossible; it was not. The browser hands over the decrypted audio once the player has its keys, and the boost now waits for exactly that. Tested on Prime Video in Firefox and Brave.

### Fixed

- **DRM players no longer break.** Prime Video showed "Video unavailable" whenever the extension was installed, even with no boost set: every `<video>` was captured the moment it loaded, before the player attached its decryption keys, and Firefox refuses keys on an element whose audio is already being captured. Media is now left untouched until a boost is actually set, and is captured only once it is playing.
- The popup no longer grows a horizontal scrollbar on Firefox when Advanced is open; the vertical scrollbar is given room instead of pushing the right edge out of view.

## [0.3.0] - 2026-09-30

The equalizer becomes something most people will actually use: named presets, tone controls and bands that say what they do. No new permissions.

### Added

- **Equalizer presets.** Built-in curves for situations (Speech, Cinema, Night) and genres (Rock, Pop, Jazz, Classical, Electronic, Hip-hop, Acoustic, Vocal boost, Bass reducer) sit above the advanced controls. Every curve sums to roughly nothing, so switching preset changes the character of the sound, not how loud it is — which matters on top of a 600% boost.
- **Saved presets of your own**, from the popup, with rename, reorder and delete on the settings page. Each row shows its curve so two similar names can be told apart.
- **Bass, mid and treble controls** that drive the same six bands, so the two views are one setting at two resolutions and never disagree.
- **Named bands** (Sub-bass … Brilliance), with what each one does in a tooltip.
- **Two reset buttons:** *Use my defaults* applies your saved defaults, *Reset to neutral* goes back to 100% and flat.
- **A detached panel.** The popup can open as a separate window that stays put while you work in the page.
- **A list of the tabs currently playing audio** through the extension, loudest first. Clicking one brings its tab and window forward.
- **Export and import settings** as a versioned file carrying defaults, saved sites and presets. Older files still import; a file from a newer build is refused rather than half-applied. Import replaces the current setup and confirms first.
- **Rating and support links** in the popup. The stars open the review form of the store the build was made for; builds without a live listing show only the support link.
- An FAQ in the README.

### Changed

- The settings and help actions are icons on one row with the rating stars, instead of a full-width button and a text link.
- All new strings are translated into the 55 languages; coverage is 55/55 with no English fallback.

### Fixed

- The source archive no longer includes store screenshots and translation staging files, bringing it from 3966 KB back to 477 KB.

## [0.2.1] - 2026-09-15

The tab-capture fallback stops being a promise in the manifest and becomes a feature, and the permission list shrinks to what the code actually uses.

### Added

- **The tab-capture fallback now actually works.** It had been declared in the
  manifest but never implemented: nothing in the extension ever created an offscreen document or called `tabCapture`. Chromium MV3 builds now mint a capture stream in the service worker and process it in an offscreen document, which lets pages serving cross-origin media without CORS headers be boosted after all. A **Try tab capture** button appears in the popup when — and only when — the normal path has failed and the browser can actually capture. DRM-protected sites remain unboostable; Encrypted Media Extensions hide the audio from tab capture too.

### Changed

- **`tabs` and `activeTab` are no longer requested.** The broad host permissions
  already granted everything they were used for, including a tab's URL, so both were pure surface area. Chrome names them as commonly over-requested.
- **`tabCapture` and `offscreen` are requested only by the `chrome-mv3` and
  `edge-mv3` builds**, the only two that implement the fallback. Chromium MV2 builds previously asked for `tabCapture` and never used it.

### Fixed

- Switching the fallback off in the settings page now releases any capture it is
  already holding, instead of leaving the browser's recording indicator lit.
- A capture is released when its tab navigates or closes, so a new page gets to
  try the normal path first.

## [0.2.0] - 2026-09-07

The first release that works on sites which run their player in an iframe — which is most of them.

### Added

- **The settings page is now translated.** It had always been hard-coded
  English; its 36 strings go through the same table as the popup's, and all 55 locales are complete again.
- **A language picker** in the settings page. The interface follows the browser
  by default, but any of the 55 shipped languages can be chosen instead — useful when your browser is in one language and you would rather read another. The add-on's name in the browser's own add-on list still follows the browser, since that text is outside the extension's control.
- **An editor for saved sites.** Each remembered site can now have its volume,
  balance, limiter and mono setting adjusted in place, and its equalizer cleared. Changes apply immediately to any tab already open on that site.
- **A reset for the maximum volume**, back to the default 600%.
- **Volume presets that follow the ceiling.** Raising the maximum in settings
  now offers the higher steps as buttons in the popup rather than leaving them reachable only by dragging.
- **Left and right labels** on the balance slider.
- **New permission: `webNavigation`.** Used solely to enumerate a tab's frames
  so the volume can be delivered to a player running inside one. It does not read page content, and no browsing history is collected or transmitted.
- A second status line in the popup that explains *why* a page cannot be
  boosted. The content script always knew; the answer used to be discarded.
- Frame-aware reporting: the popup shows the total number of connected media
  sources across every frame, not whichever frame reported last.

### Fixed

- **Audio in iframes.** `tabs.sendMessage` without a frame id reaches only the
  top document, so a player in an iframe never received the settings and the boost silently did nothing.
- **A detached video going permanently mute.** Setting a volume and switching
  to another stream left playback stalled until a reload. Players such as Kick reuse one `<video>` across streams; disconnecting its source node routed the audio nowhere rather than back to the browser, and dropping our record of it made the next attach throw `InvalidStateError` with no way to recover.
- **Manifest V2 on Chromium.** `tabs.query`, `tabs.sendMessage`, `tabs.get`,
  `storage` and `webNavigation` are callback-only there, so `await` resolved to `undefined` immediately. The popup failed outright with "No matching signature"; elsewhere replies were dropped silently. Calls now pick the callback or promise form per host.
- **An embedded widget relabelling the tab.** Any frame could set the tab's
  origin, so a payment iframe could make a Kick stream read as `m.stripe.network` — and "Remember this site" would then have saved the setting under that domain instead of the one being watched. Only the top document defines the tab's identity now.
- **Console noise.** Chrome logged "The AudioContext was not allowed to start"
  on every attach. That message is written straight to the console rather than thrown, so no `catch` could suppress it; `resume()` now checks `navigator.userActivation.hasBeenActive` and does not call when it cannot succeed.

### Changed

- The bypass control now names the current state — **Active** or **Bypassed** —
  rather than the action. The old label gave no way to tell which state you were in. Translated into all 55 locales.

## [0.1.1] - 2026-09-07

First public release.

### Added

- Volume boost from 0% to 600%, raisable to 1000% in settings.
- Limiter, on by default above 100%, to prevent clipping.
- 6-band equalizer (60 Hz – 10 kHz) under Advanced settings.
- Stereo balance and mono downmix.
- Independent settings per tab, temporary by default, with an opt-in
  "Remember this site" per origin.
- Toolbar badge showing the active tab's level.
- Interface fully translated into 55 languages.
- Builds for seven targets from one source tree: Chrome MV3/MV2, Edge MV3,
  Opera MV2, Firefox MV3/MV2, Safari MV3.
- Source package builder for store submissions requiring reproducible builds.

[0.4.0]: https://github.com/ramazansancar/volume-booster-tab-extension/releases/tag/v0.4.0
[0.3.0]: https://github.com/ramazansancar/volume-booster-tab-extension/releases/tag/v0.3.0
[0.2.1]: https://github.com/ramazansancar/volume-booster-tab-extension/releases/tag/v0.2.1
[0.2.0]: https://github.com/ramazansancar/volume-booster-tab-extension/releases/tag/v0.2.0
[0.1.1]: https://github.com/ramazansancar/volume-booster-tab-extension/releases/tag/v0.1.1
