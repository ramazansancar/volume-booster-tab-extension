# Building for Safari

Safari supports Manifest V3 WebExtensions, but it cannot load an unpacked folder the way Chrome and Firefox can. Every Safari extension has to be wrapped in a native macOS or iOS app bundle and signed.

> [!NOTE]
> This requires **macOS** with **Xcode 15 or newer**. There is no way to build a Safari extension on Windows or Linux.

---

## 1. Build the Safari target

```bash
pnpm run build:safari
```

This produces `dist/safari-mv3/`.

---

## 2. Convert it to an Xcode project

Apple ships a converter with Xcode:

```bash
xcrun safari-web-extension-converter dist/safari-mv3 \
  --project-location build/safari \
  --app-name "Volume Booster Tab" \
  --bundle-identifier dev.ramazansancar.volumeboostertab \
  --macos-only \
  --no-open
```

| Flag | Purpose |
| --- | --- |
| `--project-location` | Where to write the generated Xcode project |
| `--app-name` | The name of the containing app |
| `--bundle-identifier` | Your reverse-DNS identifier |
| `--macos-only` | Drop for a universal macOS + iOS project |
| `--no-open` | Do not launch Xcode automatically |

The converter reports any manifest keys Safari does not understand. For this extension it should report nothing: the Safari target deliberately omits `tabCapture` and `offscreen`, which Safari does not implement.

---

## 3. Build and run

1. Open `build/safari/Volume Booster Tab/Volume Booster Tab.xcodeproj`
2. Select the **Volume Booster Tab** scheme
3. Set your development team under **Signing & Capabilities** (a free Apple ID works for local testing)
4. Press **Run**

The containing app launches and tells you to enable the extension.

---

## 4. Enable it in Safari

1. Safari → **Settings** → **Advanced** → tick **Show features for web developers**
2. **Settings** → **Developer** → tick **Allow unsigned extensions**
3. **Settings** → **Extensions** → enable **Volume Booster Tab**
4. Grant it access to the sites you want to boost

> [!IMPORTANT]
> **Allow unsigned extensions resets every time Safari restarts.** You have to re-enable it after each restart during development. A signed and notarized build does not have this problem.

---

## Safari-specific limitations

| Limitation | Effect |
| --- | --- |
| No `tabCapture` API | The DRM fallback path is unavailable. DRM sites cannot be boosted at all on Safari. |
| Stricter site permissions | Safari asks per-site rather than granting broad host access. Users must allow each site. |
| Service worker lifecycle | Safari terminates the background service worker more aggressively than Chromium. The extension is written to tolerate this — per-tab state is rebuilt on demand. |
| No unpacked loading | Every install goes through Xcode or the App Store. |

---

## Distributing on the App Store

Shipping to the Mac App Store requires:

- A paid Apple Developer Program membership ($99/year)
- A Distribution certificate and provisioning profile
- App Store Connect metadata, screenshots, and a privacy policy
- App review

> [!IMPORTANT]
> This project is licensed under the [GNU Affero General Public License v3.0](../LICENSE). You may publish your own build, including commercially, but you must make your complete corresponding source available under the AGPL as well. Apple's App Store terms have historically conflicted with GPL-family licenses, so check both carefully before submitting, and consider opening an issue to coordinate rather than shipping a parallel listing.

---

## Troubleshooting

<details>
<summary><b>The converter warns about unsupported manifest keys</b></summary>

<br>

Check that you built the `safari-mv3` target and not a Chromium one. The Chromium targets declare `tabCapture` and `offscreen`, which Safari rejects.

```bash
node -e "console.log(require('./dist/safari-mv3/manifest.json').permissions)"
# → [ 'storage', 'tabs', 'activeTab' ]
```

</details>

<details>
<summary><b>The extension does not appear in Safari's Extensions list</b></summary>

<br>

1. Make sure the containing app was actually run at least once
2. Check that **Allow unsigned extensions** is still ticked — it resets on restart
3. Quit and reopen Safari

</details>

<details>
<summary><b>Audio is not boosted on any site</b></summary>

<br>

Safari grants site access per-site. Open the extension's settings in Safari → **Settings** → **Extensions** → **Volume Booster Tab** and set the site permission to **Allow**.

</details>
