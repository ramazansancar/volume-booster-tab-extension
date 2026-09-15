# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **The tab-capture fallback now actually works.** It had been declared in the
  manifest but never implemented: nothing in the extension ever created an
  offscreen document or called `tabCapture`. Chromium MV3 builds now mint a
  capture stream in the service worker and process it in an offscreen document,
  which lets pages serving cross-origin media without CORS headers be boosted
  after all. A **Try tab capture** button appears in the popup when — and only
  when — the normal path has failed and the browser can actually capture.
  DRM-protected sites remain unboostable; Encrypted Media Extensions hide the
  audio from tab capture too.

### Changed

- **`tabs` and `activeTab` are no longer requested.** The broad host permissions
  already granted everything they were used for, including a tab's URL, so both
  were pure surface area. Chrome names them as commonly over-requested.
- **`tabCapture` and `offscreen` are requested only by the `chrome-mv3` and
  `edge-mv3` builds**, the only two that implement the fallback. Chromium MV2
  builds previously asked for `tabCapture` and never used it.

### Fixed

- Switching the fallback off in the settings page now releases any capture it is
  already holding, instead of leaving the browser's recording indicator lit.
- A capture is released when its tab navigates or closes, so a new page gets to
  try the normal path first.

## [0.2.0] - 2026-09-07

The first release that works on sites which run their player in an iframe —
which is most of them.

### Added

- **The settings page is now translated.** It had always been hard-coded
  English; its 36 strings go through the same table as the popup's, and all 55
  locales are complete again.
- **A language picker** in the settings page. The interface follows the browser
  by default, but any of the 55 shipped languages can be chosen instead — useful
  when your browser is in one language and you would rather read another. The
  add-on's name in the browser's own add-on list still follows the browser,
  since that text is outside the extension's control.
- **An editor for saved sites.** Each remembered site can now have its volume,
  balance, limiter and mono setting adjusted in place, and its equalizer
  cleared. Changes apply immediately to any tab already open on that site.
- **A reset for the maximum volume**, back to the default 600%.
- **Volume presets that follow the ceiling.** Raising the maximum in settings
  now offers the higher steps as buttons in the popup rather than leaving them
  reachable only by dragging.
- **Left and right labels** on the balance slider.
- **New permission: `webNavigation`.** Used solely to enumerate a tab's frames
  so the volume can be delivered to a player running inside one. It does not
  read page content, and no browsing history is collected or transmitted.
- A second status line in the popup that explains *why* a page cannot be
  boosted. The content script always knew; the answer used to be discarded.
- Frame-aware reporting: the popup shows the total number of connected media
  sources across every frame, not whichever frame reported last.

### Fixed

- **Audio in iframes.** `tabs.sendMessage` without a frame id reaches only the
  top document, so a player in an iframe never received the settings and the
  boost silently did nothing.
- **A detached video going permanently mute.** Setting a volume and switching
  to another stream left playback stalled until a reload. Players such as Kick
  reuse one `<video>` across streams; disconnecting its source node routed the
  audio nowhere rather than back to the browser, and dropping our record of it
  made the next attach throw `InvalidStateError` with no way to recover.
- **Manifest V2 on Chromium.** `tabs.query`, `tabs.sendMessage`, `tabs.get`,
  `storage` and `webNavigation` are callback-only there, so `await` resolved to
  `undefined` immediately. The popup failed outright with "No matching
  signature"; elsewhere replies were dropped silently. Calls now pick the
  callback or promise form per host.
- **An embedded widget relabelling the tab.** Any frame could set the tab's
  origin, so a payment iframe could make a Kick stream read as
  `m.stripe.network` — and "Remember this site" would then have saved the
  setting under that domain instead of the one being watched. Only the top
  document defines the tab's identity now.
- **Console noise.** Chrome logged "The AudioContext was not allowed to start"
  on every attach. That message is written straight to the console rather than
  thrown, so no `catch` could suppress it; `resume()` now checks
  `navigator.userActivation.hasBeenActive` and does not call when it cannot
  succeed.

### Changed

- The bypass control now names the current state — **Active** or **Bypassed** —
  rather than the action. The old label gave no way to tell which state you
  were in. Translated into all 55 locales.

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

[0.2.0]: https://github.com/ramazansancar/volume-booster-tab-extension/releases/tag/v0.2.0
[0.1.1]: https://github.com/ramazansancar/volume-booster-tab-extension/releases/tag/v0.1.1
