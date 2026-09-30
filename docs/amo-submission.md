# AMO submission text

Copy-paste material for the addons.mozilla.org submission form. The listing is live at <https://addons.mozilla.org/en-US/firefox/addon/volume-booster-tab/>. For the Chrome Web Store and Edge, see [`chrome-submission.md`](chrome-submission.md); for which build goes where, see [`publishing.md`](publishing.md). Keep this file updated when behaviour changes, so a release never needs the text rewritten from scratch.

> [!NOTE]
> AMO's post-upload checklist asks for two things: **version notes** and, if the add-on needs an account to test, **notes to reviewer**. This add-on needs no account, but the reviewer note below explains how to exercise it, which speeds up review.

---

## Version notes (v0.3.0)

```text
No permission changes. The add-on still requests only "storage" and "webNavigation" alongside its host access, and still makes no network requests of any kind.

Equalizer presets: built-in curves for situations and genres, plus presets the user saves, renames, reorders and deletes. Every built-in curve sums to roughly zero gain, so a preset changes the character of the sound, not its loudness.

Bass, mid and treble controls that drive the same six bands, and named bands (Sub-bass ... Brilliance) with a tooltip explaining each.

The popup can open as a separate window, and lists the tabs currently playing audio through the add-on. Clicking one activates that tab and focuses its window, using tabs.update and windows.update, which need no extra permission.

Settings can be exported to and imported from a local JSON file chosen by the user. Imported content is validated the same way stored settings are; nothing is read or written outside that file and storage.local.

Rating and support links in the popup open the add-on's AMO page and the GitHub issue tracker in a new tab. They are plain links; nothing is sent anywhere.

All new strings are translated into the 55 shipped languages.
```

---

## Notes to reviewer

> [!IMPORTANT]
> The **Notes to Reviewer** field truncates long input silently, without warning or an error. Paste the **compact version** below; the full one is kept here as the reference for what a complete note would say.

### Full version

```text
No account or login is required to test this add-on.

WHAT IT DOES
Routes a page's <video> and <audio> elements through a Web Audio graph (equalizer -> limiter -> gain -> panner) to raise volume beyond what the page itself allows.

HOW TO TEST
1. Open https://www.youtube.com/watch?v=aqz-KE-bpKQ and start playback.
2. Click the toolbar icon, drag the Volume slider or click the 300% preset.
   Volume changes immediately; the toolbar badge shows the level.
3. Open a second tab on another site and set a different level there. The
   two tabs stay independent - that is the main design point.
4. "Advanced settings" in the popup holds the 6-band equalizer.
5. Close a tab and reopen the site: the boost is gone. Settings are per-tab
   and temporary unless the user ticks "Remember this site".

NEW IN 0.3.0 - no permission changes
- Popup > Preset: built-in EQ curves and bass/mid/treble controls. They only
  reshape the six EQ bands already in the graph.
- "Open in a separate window" opens the same popup page
  (popup/index.html?window=1) with windows.create.
- "Tabs playing audio" lists other tabs the add-on is processing. Clicking
  one calls tabs.update + windows.update to focus it.
- Settings page > Export/Import settings: export saves a Blob through an
  <a download> link (not the downloads API); import reads a file the user
  picks with <input type=file>, validated like stored settings.
- Rate/support links open the AMO listing and the GitHub issue tracker
  with tabs.create. Nothing is sent.

EXPECTED LIMITATION
DRM sites (Prime Video, Netflix) are boosted only once playback has started and the player holds its keys: an encrypted element is not routed until the player has attached its MediaKeys, because Firefox refuses setMediaKeys on an element already being captured. If the player later swaps keys on the same element, the boost cannot follow. Cross-origin media without CORS headers cannot be boosted on Firefox at all; the popup reports "This page blocks audio processing" rather than failing silently.

PERMISSIONS
- storage       Saves the user's own preferences locally. Nothing else stored.
- webNavigation Enumerates a tab's frames so the volume reaches a player
                inside an iframe. Used for nothing else - no history is read,
                collected or transmitted.
- <all_urls>    Media can appear on any site, so the content script must run
                on any page. It only looks for <video> and <audio> elements;
                it does not read page content, cookies, form fields or
                credentials.

DATA COLLECTION
None. Declared as data_collection_permissions.required = ["none"]. The add-on makes no network requests of any kind: no telemetry, no analytics, no remote configuration, no external script or font loading. Settings never leave storage.local on the user's own machine.

SOURCE AND BUILD (Node.js 20 or newer, any OS)
  git clone https://github.com/ramazansancar/volume-booster-tab-extension.git
  cd volume-booster-tab-extension
  npm ci
  npm run package

Uploaded file: dist/firefox-mv2-0.3.0.zip The attached source archive contains BUILD.md at its root with the same steps.

Bundler is esbuild with its standard minification. No obfuscation, no name mangling beyond esbuild defaults, no code generated from templates. To read the output unminified with inline sourcemaps:

  node scripts/build.mjs --target=firefox-mv2 --dev

Three files in the package are generated rather than hand-written, each from a single source table, and all are committed so the build does not depend on regenerating them:
  manifest.json        <- scripts/manifest.mjs  (one description, 7 targets)
  _locales/*/          <- scripts/locales.mjs   (55 locales, one table)
  icons/*.png          <- scripts/icons.mjs     (drawn in code, no image lib)
Running `npm run locales` and `npm run icons` reproduces them byte for byte; CI verifies this on every push.

The extension ships zero runtime dependencies. Every npm package is a devDependency used only at build time.

License: AGPL-3.0-only (GNU Affero General Public License v3.0)

NOTE ON THE TWO LINTER WARNINGS
addons-linter reports KEY_FIREFOX_UNSUPPORTED_BY_MIN_VERSION and its Android counterpart because strict_min_version is 91.0, which predates Firefox 140 where data_collection_permissions was introduced. This is deliberate: older releases ignore the unknown key and install normally, and raising the minimum purely to silence the warning would drop every user below 140, ESR included.
```

### Compact version — use this when the form truncates

The field silently cuts long input. This version fits and still carries everything AMO policy requires.

```text
No account or login is required to test this add-on.

WHAT IT DOES
Routes a page's <video> and <audio> elements through a Web Audio graph (equalizer -> limiter -> gain -> panner) to raise volume beyond what the page allows. Each tab is boosted independently.

NEW IN 0.3.0 - no permission changes
- Popup > Preset: built-in EQ curves and bass/mid/treble controls. They only
  reshape the six EQ bands already in the graph.
- "Open in a separate window" opens the same popup page
  (popup/index.html?window=1) with windows.create.
- "Tabs playing audio" lists other tabs the add-on is processing. Clicking
  one calls tabs.update + windows.update to focus it.
- Settings page > Export/Import settings: export saves a Blob through an
  <a download> link (not the downloads API); import reads a file the user
  picks with <input type=file>, validated like stored settings.
- Rate/support links open the AMO listing and the GitHub issue tracker
  with tabs.create. Nothing is sent.

PERMISSIONS
- storage       Saves the user's own preferences locally. Nothing else stored.
- webNavigation Enumerates a tab's frames so the volume reaches a player
                inside an iframe. Used for nothing else - no history is read,
                collected or transmitted.
- <all_urls>    Media can appear on any site, so the content script must run
                on any page. It only looks for <video> and <audio> elements;
                it does not read page content, cookies, form fields or
                credentials.

DATA COLLECTION
None. Declared as data_collection_permissions.required = ["none"]. No network requests of any kind: no telemetry, no analytics, no remote code or fonts.

SOURCE AND BUILD (Node.js 20+, any OS)
  git clone https://github.com/ramazansancar/volume-booster-tab-extension.git
  cd volume-booster-tab-extension
  npm ci
  npm run package

Uploaded file: dist/firefox-mv2-0.3.0.zip BUILD.md at the root of the source archive repeats these steps.

esbuild with standard minification; no obfuscation. Unminified output:
  node scripts/build.mjs --target=firefox-mv2 --dev

manifest.json, _locales/ and icons/ are generated from single source tables by scripts/manifest.mjs, scripts/locales.mjs and scripts/icons.mjs, and are reproducible byte for byte. Zero runtime dependencies.

License: AGPL-3.0-only

The two KEY_FIREFOX_UNSUPPORTED_BY_MIN_VERSION warnings are deliberate: strict_min_version 91 predates Firefox 140 where data_collection_permissions was introduced. Older releases ignore the key and install normally; raising the minimum would drop ESR users.
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
Boost any tab's volume up to 600% with a limiter, 6-band equalizer, stereo balance and mono downmix. Every tab is independent. No tracking, open source.
```

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
• Available in 55 languages, fully translated, switchable in settings

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The options page lists every site you have saved and lets you remove any of them, or change the default so that new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube and Twitch replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as about: and the add-ons site are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0. Translation corrections from native speakers are especially welcome.
```

### Turkish listing

> [!NOTE]
> Store listing text is **not** taken from `_locales/`. The bundled locale
> files translate the add-on name and the interface; the Summary and
> Description on the store page live in AMO's own database and are entered per
> language in the submission form, using the language selector beside each
> field.

**Summary (tr)**

```text
Herhangi bir sekmenin sesini %600'e kadar yükseltin. Limitör, 6 bantlı ekolayzer, kanal dengesi ve mono. Her sekme bağımsız. Takip yok, açık kaynak.
```

**Description (tr)**

```text
Volume Booster Tab, herhangi bir tarayıcı sekmesinin sesini sayfanın kendi izin verdiği seviyenin ötesine çıkarır ve o sesi nasıl şekillendireceğiniz üzerinde gerçek kontrol verir.

ÖZELLİKLER

• %0 ile %600 arası yükseltme, ayarlardan %1000'e çıkarılabilir
• Yükseltirken bozulmayı ve rahatsız edici tepe seslerini önleyen limitör
• 60 Hz - 10 kHz arası 6 bantlı ekolayzer, Gelişmiş ayarlar altında
• Tam soldan tam sağa kanal dengesi
• Tek kulaklıkla dinlemek için mono birleştirme
• İşlenmiş ve ham sesi anında karşılaştırmak için devre dışı bırakma anahtarı
• 55 dilde, tamamen çevrilmiş arayüz; ayarlardan değiştirilebilir

HER SEKME BAĞIMSIZ

Çoğu ses yükselticinin atladığı nokta burası. Her sekme kendi ses seviyesini, kendi ekolayzer eğrisini, kendi dengesini tutar. Bir sekmede yayını %300'de, diğerinde müziği %120'de çalıştırın; birini değiştirmek diğerine dokunmaz.

Araç çubuğu rozeti baktığınız sekmenin seviyesini gösterir, böylece hangi sekmelerin yükseltildiğini bir bakışta görürsünüz.

VARSAYILAN OLARAK GEÇİCİ

Yükseltme, sekmeyi kapattığınızda unutulur. Bir video için seçtiğiniz ayar, haftalar sonra başka bir sayfada sizi şaşırtamaz.

Bir sitenin her zaman aynı seviyede açılmasını istiyorsanız açılır penceredeki "Bu siteyi hatırla" seçeneğini işaretleyin. Ayarlar sayfası kaydettiğiniz tüm siteleri listeler, istediğinizi kaldırmanıza izin verir ve yeni sekmelerin otomatik hatırlaması için varsayılanı değiştirebilirsiniz.

YAYIN SİTELERİYLE UYUMLU

YouTube ve Twitch gibi siteler, bir sonraki bölüme veya yayına geçtiğinizde sayfayı yeniden yüklemeden video oynatıcısını değiştirir. Birçok yükseltici o anda sesi kaybeder ve artık uygulamadığı bir seviyeyi göstermeye devam eder. Bu eklenti değişimi izler ve ayarlarınızı yeni oynatıcıya yeniden uygular; böylece ayarladığınız ses, duyduğunuz ses olarak kalır.

GİZLİLİK

Takip yok. Analitik yok. Hesap yok. Hiçbir türde ağ isteği yok, yazı tipleri için bile. Ayarlarınız kendi cihazınızdan hiç çıkmaz.

YAPAMADIKLARI

Netflix, Disney+, Prime Video ve Spotify gibi DRM korumalı servisler seslerini eklentilerden tasarım gereği gizler, bu yüzden yükseltilemezler. Bir sayfa işlenemediğinde açılır pencere sessizce hiçbir şey yapmak yerine bunu açıkça söyler.

about: gibi tarayıcı sayfaları ve eklenti mağazası, bu eklenti dahil her eklentiye kapalıdır.

LÜTFEN SORUMLU KULLANIN

Yüksek ses hem işitmenize hem hoparlörlerinize zarar verebilir, özellikle kulaklıkla. Limitör %100 üzerinde varsayılan olarak açıktır ve açık bırakmalısınız. Ayarlardan tavanı %600'ün üzerine çıkarmak tamamen kendi sorumluluğunuzdadır.

AÇIK KAYNAK

Kaynak kodu, hata takibi ve katkı rehberi:
https://github.com/ramazansancar/volume-booster-tab-extension

GNU Affero General Public License v3.0 ile lisanslanmıştır. Anadili Türkçe olanlardan gelen çeviri düzeltmeleri özellikle memnuniyetle karşılanır.
```

**Categories:** Audio & Video (primary), Appearance or Other (secondary)

**Tags:** volume, audio, sound, equalizer, booster, amplifier

**License in the AMO form:** pick **GNU Affero General Public License v3.0 only** from the preset list.

> [!NOTE]
> The AGPL permits commercial use. What it requires is reciprocity: anyone who distributes the add-on or runs a modified version as a network service must publish their complete corresponding source under the AGPL as well.
