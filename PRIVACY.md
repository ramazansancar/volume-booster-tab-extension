# Privacy Policy

**Extension:** Tab Volume Booster (_Sekme Ses Yükseltici_)
**Publisher:** Ramazan Sancar — <https://github.com/ramazansancar>
**Last updated:** 11 September 2026

---

## Summary

Tab Volume Booster does not collect, transmit, sell, or share any personal or
sensitive user data. It makes no network requests of any kind. Everything the
extension stores stays on your own device.

---

## What the extension stores

The extension writes to the browser's local extension storage
(`storage.local`) only, and only in these two cases:

| Stored item | When it is written | What it contains |
| --- | --- | --- |
| Per-site volume preference | Only when you tick **Remember this site** | The origin of the site (for example `https://example.com`) and the gain level you chose |
| Global preferences | When you change a setting in the options page | Default boost level, boost cap, and other interface preferences |

Per-tab boost state is held **in memory only** and is discarded when the tab is
closed or the browser is restarted. It is never written to disk.

You can inspect and delete every saved site from the extension's options page
at any time. Uninstalling the extension removes all stored data.

## What the extension does not do

- It does **not** collect personally identifiable information (name, address,
  email address, age, identification number, or similar).
- It does **not** collect health, financial, or payment information.
- It does **not** collect authentication information (passwords, credentials,
  security questions, PINs).
- It does **not** collect personal communications (email, messages, chats).
- It does **not** collect location data.
- It does **not** collect web history, clicks, mouse position, scroll activity,
  keystrokes, or any other behavioural or usage analytics.
- It does **not** contain analytics, telemetry, crash reporting, advertising, or
  tracking code of any kind.
- It does **not** send data to the developer or to any third party, because it
  performs no network requests at all.
- It does **not** use remote code. All code ships inside the extension package.

## Why the extension asks for its permissions

| Permission | Why it is needed |
| --- | --- |
| `storage` | Saves your volume preferences locally on your device. |
| `tabs` | Identifies which tab is active so the boost is applied to the right one. |
| `activeTab` | Applies the boost to the tab you are currently interacting with. |
| `webNavigation` | Enumerates a tab's sub-frames, so the boost also reaches players running inside an embedded iframe. |
| `tabCapture`, `offscreen` (Chromium only) | Fallback audio path for pages whose media cannot be read directly, such as cross-origin media served without CORS headers. It only ever starts when you press **Try tab capture** in the popup. The captured audio is processed locally in real time and is never recorded, stored, or transmitted, and the capture ends when you close the tab. |
| Host access (`http://*/*`, `https://*/*`) | The content script has to be able to reach the `<audio>` and `<video>` elements on whichever page you choose to boost. It only reads and adjusts media elements; it does not read page content. |

## Audio processing

Audio is amplified locally in your browser using the Web Audio API. On the
Chromium fallback path, tab audio is routed through the same local audio graph.
No audio is recorded, buffered to disk, uploaded, or shared in any form.

## Children's privacy

The extension collects no data from anyone, including children.

## Changes to this policy

Any change to this policy will be published in this file in the project
repository, with an updated date at the top. The revision history is publicly
visible in the repository's commit log.

## Contact

Questions about this policy can be raised as an issue at
<https://github.com/ramazansancar/volume-booster-tab-extension/issues>, or sent
to the publisher through the GitHub profile linked above.
