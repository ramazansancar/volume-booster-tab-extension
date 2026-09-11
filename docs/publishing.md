# Publishing to the stores

Per-store copy lives alongside this file: [`amo-submission.md`](amo-submission.md)
for Firefox, [`chrome-submission.md`](chrome-submission.md) for Chrome and Edge,
[`safari.md`](safari.md) for Safari.

> [!IMPORTANT]
> Always upload a **zip produced by `pnpm run package`**, never one left over from an earlier build. A plain `pnpm run build` refreshes `dist/<target>/` but deletes any existing archive rather than updating it, precisely so a stale zip can never be uploaded by mistake.

```bash
pnpm run package     # builds every target AND writes fresh zips
```

Upload artifacts land in `dist/<target>-<version>.zip`.

---

## Which build goes where

| Store                  | Upload                                   | Why                                                                                                                                          |
| ---------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **addons.mozilla.org** | `firefox-mv2-<version>.zip`              | Supports Firefox 91+, including ESR and Firefox for Android. Mozilla continues to support MV2, so there is no reason to narrow the audience. |
| **Chrome Web Store**   | `chrome-mv3-<version>.zip`               | MV3 is mandatory for new Chrome submissions.                                                                                                 |
| **Edge Add-ons**       | `edge-mv3-<version>.zip`                 | Same as Chrome, with Edge metadata.                                                                                                          |
| **Opera add-ons**      | `opera-mv2-<version>.zip`                | Opera's store still accepts MV2.                                                                                                             |
| **App Store (Safari)** | Not a zip — see [`safari.md`](safari.md) | Requires Xcode conversion and signing.                                                                                                       |

`chrome-mv2` and `firefox-mv3` are not for store submission. They exist for users on Chromium forks still running MV2, and as a ready migration path if Mozilla ever retires MV2.

---

## Firefox: data collection consent

Every new AMO submission must declare what data it collects. This extension collects nothing, which is declared in the manifest as:

```json
"browser_specific_settings": {
  "gecko": {
    "data_collection_permissions": { "required": ["none"] }
  }
}
```

This is generated automatically for both Firefox targets. `none` stands alone — it cannot be combined with a specific data category.

> [!NOTE]
> `addons-linter` reports two warnings on the default build:
>
> ```
> KEY_FIREFOX_UNSUPPORTED_BY_MIN_VERSION
> KEY_FIREFOX_ANDROID_UNSUPPORTED_BY_MIN_VERSION
> ```
>
> These are informational, not blocking. They say `strict_min_version` (91) predates the Firefox release that introduced the consent key (140). Older Firefox simply ignores the key and installs normally, and **AMO accepts the upload**.
>
> Keeping the lower minimum is deliberate: raising it would drop every Firefox user below 140, including the current ESR.

To produce a warning-free build that only targets modern Firefox:

```bash
STRICT_DATA_CONSENT_MIN=1 pnpm run package
```

This raises the minimum to Firefox 140 / Firefox for Android 142.

### Validate before uploading

```bash
pnpm run lint:addon
```

This runs the exact checks AMO runs on upload. Zero errors means the submission will be accepted.

You can also lint the archive itself, which is what actually gets uploaded:

```bash
pnpm exec addons-linter dist/firefox-mv2-0.2.0.zip
```

---

## Chromium: privacy disclosures

Chrome, Edge and Opera have no manifest equivalent of `data_collection_permissions`. The declaration is made in the store listing form instead, and the manifest deliberately omits `browser_specific_settings` — Chromium would flag it as an unrecognised key.

Fill in the dashboard forms as follows.

### Chrome Web Store → Privacy practices

| Field                       | Answer                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Single purpose description  | Amplify and shape the audio of the current browser tab.                                                                  |
| Permission: `storage`       | Saves the user's own volume and equalizer preferences locally.                                                           |
| Permission: `tabs`          | Applies a separate volume to each tab and shows the level on the toolbar icon.                                           |
| Permission: `activeTab`     | Applies the boost to the tab the user is viewing.                                                                        |
| Permission: `webNavigation` | Enumerates a tab's frames so the boost reaches a player embedded in an iframe. No browsing history is read or collected. |
| Permission: `tabCapture`    | Fallback path for pages whose audio cannot be read directly.                                                             |
| Permission: `offscreen`     | Hosts the audio graph for that fallback path.                                                                            |
| Host permissions            | Media elements can appear on any site, so the boost must be able to reach any page the user opens.                       |
| Remote code                 | **No.** Everything ships in the package.                                                                                 |

**Data usage certifications** — tick all three:

- [x] Does not sell or transfer user data to third parties outside of approved use cases
- [x] Does not use or transfer user data for purposes unrelated to the item's single purpose
- [x] Does not use or transfer user data to determine creditworthiness or for lending purposes

**Collected data types:** none. The extension makes no network requests, and settings never leave `storage.local` on the user's own machine.

### Edge Add-ons

Edge asks the same questions in its **Availability and properties** step. The answers above apply unchanged.

Two fields have no Chrome counterpart:

| Field                         | Answer                                                                                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Category (required)           | **Productivity** — Edge's list has no _Tools_ entry. See [`chrome-submission.md`](chrome-submission.md#category) for why not Accessibility or Entertainment. |
| Privacy policy URL (required) | `https://github.com/ramazansancar/volume-booster-tab-extension/blob/master/PRIVACY.md` — a README anchor is rejected as invalid; use the standalone [`PRIVACY.md`](../PRIVACY.md) page. Chrome requires it too.                             |

---

## Release checklist

- [ ] Bump `version` in `package.json` (all manifests read it from there)
- [ ] `pnpm run typecheck && pnpm test && pnpm run lint`
- [ ] `pnpm run lint:addon` — zero errors
- [ ] `pnpm run package` — fresh zips for every target
- [ ] Load `dist/chrome-mv3` and `dist/firefox-mv2` unpacked and smoke-test both
- [ ] Confirm the uploaded zip's timestamp is newer than your last source change
- [ ] Tag the release: `git tag v<version> && git push --tags`

> [!TIP]
> To confirm a zip really contains what you expect before uploading:
>
> ```bash
> unzip -p dist/firefox-mv2-0.2.0.zip manifest.json | grep -A3 data_collection
> ```
