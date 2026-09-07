# Chrome Web Store submission text

Copy-paste material for the Chrome Web Store dashboard. Edge Add-ons asks the
same questions in a different order and accepts the same answers, so this file
covers both; the differences are noted at the end.

> [!IMPORTANT]
> Upload `dist/chrome-mv3-<version>.zip`, produced by `pnpm run package`. A plain
> `pnpm run build` refreshes the unpacked folder but deletes any existing zip
> rather than updating it, so a stale archive can never be uploaded by mistake.

Related: [`amo-submission.md`](amo-submission.md) for Firefox,
[`publishing.md`](publishing.md) for which build goes where.

---

## Store listing

**Name** (45 characters max)

```text
Volume Booster Tab
```

**Summary** (132 characters max — Chrome's limit is shorter than AMO's)

```text
Boost any tab's volume to 600% with a limiter, equalizer and balance. Every tab is independent. No tracking, open source.
```

**Category:** Tools
**Language:** English

**Description** (16,000 characters max)

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page
itself allows, and gives you real control over how that sound is shaped.

FEATURES

• Boost from 0% to 600%, raisable to 1000% in settings
• Limiter that prevents clipping and painful peaks when boosting
• 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
• Stereo balance, from full left to full right
• Mono downmix for listening with a single earbud
• Bypass switch to compare the processed and untouched sound instantly
• Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own
volume, its own equalizer curve, its own balance. Run a stream at 300% in one
tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can
tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video
can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this
site" in the popup. The settings page lists every site you have saved, lets you
edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to
the next episode or stream, without reloading the page. Many boosters lose the
audio at that moment and keep showing a level they are no longer applying.
This one watches for the swap and reapplies your settings to the new player,
so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not
even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide
their audio from extensions by design, so they cannot be boosted. When a page
cannot be processed the popup says so plainly instead of silently doing
nothing.

Browser pages such as chrome:// and the Web Store are off limits to every
extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with
headphones. The limiter is on by default above 100% and you should leave it
on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

---

## Turkish listing (`tr`)

Both stores let a listing carry translated text per locale: Chrome under
_Store listing_ → the language selector at the top, Edge under _Availability_ →
_Add a language_. The English listing stays the default; this is the `tr`
variant.

Terminology follows [`public/_locales/tr/messages.json`](../public/_locales/tr/messages.json)
so the listing and the interface use the same words — _limitör_, _ekolayzer_,
_denge_, _sekme_. Do not "improve" them in isolation here; change the locale
file and this text together.

**Ad** (45 karakter)

```text
Sekme Ses Yükseltici
```

**Kısa açıklama / Özet** (132 karakter)

```text
Her sekmenin sesini %600’e kadar yükseltin. Limitör, ekolayzer ve denge. Sekmeler birbirinden bağımsız. İzleme yok, açık kaynak.
```

**Açıklama**

```text
Sekme Ses Yükseltici, herhangi bir sekmenin sesini sayfanın kendi izin
verdiğinin ötesine taşır ve o sesin nasıl şekilleneceği üzerinde gerçek
denetim verir.

ÖZELLİKLER

• %0 ile %600 arasında yükseltme, ayarlardan %1000’e çıkarılabilir
• Yükseltirken bozulmayı ve ani yüksek tepe sesleri önleyen limitör
• Gelişmiş ayarlar altında 60 Hz – 10 kHz arası 6 bantlı ekolayzer
• Tamamen sola ve tamamen sağa kadar stereo denge
• Tek kulaklıkla dinlemek için mono birleştirme
• İşlenmiş ve ham sesi anında karşılaştırmak için devre dışı bırakma anahtarı
• 55 dilde, eksiksiz çeviri

HER SEKME BAĞIMSIZ

Ses yükseltici eklentilerin çoğunun yanlış yaptığı yer burası. Her sekme kendi
ses seviyesini, kendi ekolayzer eğrisini, kendi dengesini tutar. Bir sekmede
yayını %300’de, başka bir sekmede müziği %120’de çalıştırın; birini değiştirmek
diğerine asla dokunmaz.

Araç çubuğu rozeti baktığınız sekmenin seviyesini gösterir; hangi sekmelerin
yükseltildiğini bir bakışta anlarsınız.

VARSAYILAN OLARAK GEÇİCİ

Sekmeyi kapattığınızda yükseltme unutulur. Bir video için seçtiğiniz ayar,
haftalar sonra bambaşka bir sayfada karşınıza çıkıp sizi şaşırtamaz.

Bir sitenin her zaman aynı ses seviyesiyle açılmasını istiyorsanız açılır
penceredeki “Bu siteyi hatırla” seçeneğini işaretleyin. Ayarlar sayfası
kaydettiğiniz siteleri listeler, herhangi birini düzenlemenize veya
kaldırmanıza izin verir ve yeni sekmelerin otomatik olarak hatırlamasını
sağlayabilir.

YAYIN SİTELERİNE AYAK UYDURUR

YouTube, Twitch ve Kick gibi siteler, sonraki bölüme veya yayına geçtiğinizde
sayfayı yeniden yüklemeden video oynatıcısını değiştirir. Birçok eklenti tam o
anda sesi kaybeder ve artık uygulamadığı bir seviyeyi göstermeyi sürdürür. Bu
eklenti değişimi izler ve ayarlarınızı yeni oynatıcıya yeniden uygular; böylece
ayarladığınız ses, duyduğunuz ses olarak kalır.

GİZLİLİK

İzleme yok. Analiz yok. Hesap yok. Yazı tipleri dahil hiçbir türde ağ isteği
yok. Ayarlarınız kendi cihazınızdan hiç çıkmaz.

YAPAMADIKLARI

Netflix, Disney+, Prime Video ve Spotify gibi DRM korumalı hizmetler seslerini
tasarım gereği eklentilerden gizler, bu yüzden yükseltilemezler. Bir sayfa
işlenemediğinde açılır pencere sessizce hiçbir şey yapmak yerine bunu açıkça
söyler.

chrome:// gibi tarayıcı sayfaları ve mağaza sayfaları, bu eklenti dahil her
eklentiye kapalıdır.

LÜTFEN SORUMLU YÜKSELTİN

Yüksek ses, özellikle kulaklıkla, hem işitmenize hem de hoparlörlerinize zarar
verebilir. Limitör %100 üzerinde varsayılan olarak açıktır ve açık
bırakmalısınız. Ayarlardan tavanı %600’ün üzerine çıkarmak sizin
sorumluluğunuzdadır.

AÇIK KAYNAK

Kaynak kodu, hata takibi ve katkı rehberi:
https://github.com/ramazansancar/volume-booster-tab-extension

GNU Affero Genel Kamu Lisansı v3.0 ile lisanslanmıştır.
```

> [!NOTE]
> Turkish uses `%600`, with the sign _before_ the number — the opposite of
> English. The typographic apostrophe in `%600’e` is the correct Turkish form
> and matches the locale file; do not replace it with `'`.

---

## Privacy practices

This is the tab that blocks most submissions. Every field below is required.

### Single purpose

```text
Amplify and shape the audio of the browser tab the user is currently viewing.
```

Chrome requires a _narrow_ single purpose. Everything the extension does —
gain, limiter, equalizer, balance, mono — serves that one purpose, which is why
they belong in one item rather than several.

### Permission justifications

Each field takes a short paragraph. Chrome rejects justifications that restate
the permission name without explaining the need.

**`storage`**

```text
Stores the user's own preferences — default volume, maximum volume, safety options, chosen interface language, and the per-site volumes they explicitly asked to be remembered. Nothing else is stored, and nothing is transmitted.
```

**`tabs`**

```text
Each tab is boosted independently, so the extension needs to tell tabs apart to keep their settings separate, and needs the tab's URL to apply a volume the user saved for that site. It also sets the per-tab toolbar badge that shows the current level.
```

**`activeTab`**

```text
Applies the boost to the tab the user is looking at when they open the popup and move a slider.
```

**`webNavigation`**

```text
Enumerates the frames within a tab so audio settings can reach a media player running inside an iframe, which is how most video sites embed one. Without it the extension has no effect on those sites. Only frame IDs are read; no browsing history is collected, stored or transmitted.
```

**`tabCapture`**

```text
Fallback path for pages whose audio cannot be read directly through the Web Audio API, such as cross-origin media served without CORS headers. The captured stream is processed locally and played back immediately; it is never recorded, stored or sent anywhere.
```

**`offscreen`**

```text
A Manifest V3 service worker has no DOM and therefore no AudioContext, so the tab-capture fallback needs an offscreen document to host its audio processing graph. The document is never visible and does nothing else.
```

**Host permissions (`http://*/*`, `https://*/*`)**

```text
Media elements can appear on any website, so the content script must be able to run on any page the user opens. It only looks for <video> and <audio> elements and routes their audio through a Web Audio graph. It does not read page text, cookies, form fields, credentials or any other page content.
```

**Remote code**

Select **No, I am not using remote code.**

```text
Everything the extension executes ships inside the package. There is no eval(), no remotely hosted script, no external stylesheet or font, and no runtime code fetching of any kind.
```

### Data usage

**Collected data types:** tick **nothing**. The extension collects no user data
in any of Chrome's categories.

**Certifications** — tick all three:

- [x] I do not sell or transfer user data to third parties, outside of the approved use cases
- [x] I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- [x] I do not use or transfer user data to determine creditworthiness or for lending purposes

**Privacy policy URL:** not required, since no data is collected. If the
dashboard insists on one, link the privacy section of the README:

```text
https://github.com/ramazansancar/volume-booster-tab-extension#privacy
```

---

## Notes for the reviewer

Chrome has no dedicated reviewer-notes field like AMO's. Put this in the
**Justification** box under _Account_ → _Item_ → _Privacy_ if one appears, or
keep it to answer a rejection.

```text
HOW TO TEST
1. Open https://www.youtube.com/watch?v=aqz-KE-bpKQ and start playback.
2. Click the toolbar icon and drag the Volume slider, or click the 300%
   preset. The volume changes immediately and the toolbar badge shows the
   level.
3. Open a second tab on another site and set a different level there. The two
   tabs stay independent - that is the main design point.
4. "Advanced settings" in the popup holds the 6-band equalizer.
5. Close the tab and reopen the site: the boost is gone. Settings are per-tab
   and temporary unless the user ticks "Remember this site".

EXPECTED LIMITATION
DRM sites such as Netflix and Spotify cannot be boosted; Encrypted Media
Extensions hide their audio from page scripts. On those pages the popup
reports "This page blocks audio processing" rather than failing silently.

NO REMOTE CODE, NO DATA COLLECTION
The extension makes no network requests of any kind - no telemetry, no
analytics, no remote configuration, no external scripts or fonts. Settings
never leave storage.local on the user's own machine.

SOURCE
https://github.com/ramazansancar/volume-booster-tab-extension
Licensed AGPL-3.0-only. Built with esbuild (standard minification, no
obfuscation) via `npm ci && npm run package`; the uploaded file is
dist/chrome-mv3-<version>.zip.
```

---

## Store assets

| Asset              | Requirement                        | Notes                                                      |
| ------------------ | ---------------------------------- | ---------------------------------------------------------- |
| Icon               | 128×128 PNG                        | `public/icons/icon-128.png`, generated by `pnpm run icons` |
| Screenshots        | 1280×800, at least one, up to five | Generated: `pnpm run screenshots`                          |
| Small promo tile   | 440×280 PNG                        | Optional, but the listing looks unfinished without it      |
| Marquee promo tile | 1400×560 PNG                       | Optional; only used if the item is featured                |

### Generating the screenshots

```bash
pnpm run screenshots              # English, the default set
pnpm run screenshots -- --locale=tr    # Turkish
pnpm run screenshots -- --locale=all   # both
```

Output lands in `store-assets/`. Three images per language:

| File                    | Shows                                                             |
| ----------------------- | ----------------------------------------------------------------- |
| `popup-boost-*.png`     | The popup boosting a tab to 300%, with the preset row and limiter |
| `popup-equalizer-*.png` | Advanced settings expanded, showing the six-band equalizer        |
| `options-*.png`         | The settings page: defaults, language picker and saved sites      |

English writes the unsuffixed names the listing already points at; every other
language appends its code, so `options-1280x800.png` and
`options-1280x800-tr.png` sit side by side rather than overwriting each other.

Both stores take a separate screenshot set per listing language, next to the
translated text: upload the `-tr` images under the Turkish listing and the
unsuffixed ones under English.

### Adding a language

The strings live in the `STRINGS` table at the top of
[`scripts/screenshots.mjs`](../scripts/screenshots.mjs) — one entry per locale,
holding both the marketing copy (headings, blurbs, feature lists) and the
interface labels the rendered panels show. Add an entry keyed by locale code and
`--locale=<code>` starts working; an unknown code fails with the list of what is
available rather than rendering English under a translated name.

Two things do not come out of a plain string swap, so they have their own
fields:

- **Percentages.** English writes `600%`, Turkish writes `%600`. Every number
  the images show goes through `pct()`, which places the sign per locale.
- **The balance readout.** English shortens Left and Right to `L` and `R`.
  Turkish cannot: _Sol_ and _Sağ_ share a first letter, so `leftShort` and
  `rightShort` spell them out instead.

> [!IMPORTANT]
> The interface half of each entry must match
> [`public/_locales/<code>/messages.json`](../public/_locales/tr/messages.json)
> word for word. They are separate files because the locale file has no place
> for marketing copy — but if they drift, the listing shows an interface the
> user will never see. Change both together.

The images render the extension's real stylesheets against a backdrop defined
in [`scripts/screenshot-templates/background.html`](../scripts/screenshot-templates/background.html) —
edit that file to change the look without touching the generator.

> [!NOTE]
> The panels are driven by fixed sample state rather than a live tab, so the
> output is identical on every run. They deliberately show no third-party page
> content: a listing image must not carry another site's material.

> [!TIP]
> Chrome also accepts 640×400, and the generator will produce it, but do not.
> Everything halves, which puts the popup's 13px type at 6px and makes the
> interface unreadable — the whole point of the image.

---

## Differences from Edge Add-ons

Edge accepts `dist/edge-mv3-<version>.zip` and asks the same questions under
**Availability** and **Properties** rather than a Privacy tab. The answers above
apply unchanged, with these differences:

- Edge asks for a **short description** (limit 200 characters) — the Summary
  above fits.
- Edge requires the **privacy policy URL** field to be filled even when no data
  is collected. Use the README link above.
- Edge has its own **category** list, which does not include Chrome's _Tools_.

### Category

Pick **Productivity**.

Edge offers a single required category from a fixed list, and it is not the same
list Chrome uses:

```text
Accessibility · Blogging · Developer Tools · Entertainment · News And Weather
Photos · Productivity · Search Tools · Shopping · Social · Communication · Sports
```

_Tools_, the Chrome category for this listing, does not exist here. Three
entries are plausible substitutes; the reasoning for choosing between them:

| Category         | Verdict                                                                                                                                                                                                                                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Productivity** | **Chosen.** A per-tab audio control is a utility the user operates on whatever page they are already on. It is the closest match to Chrome's _Tools_, which keeps the two listings consistent.                                                                                                                                          |
| Accessibility    | Defensible — amplification genuinely helps hard-of-hearing users, and the category is less crowded. But the listing does not present itself as an assistive tool, and a reviewer comparing the description against the category could reasonably disagree. Only choose it if the description is rewritten to lead with hearing support. |
| Entertainment    | Describes what users boost, not what the extension does. Crowded with media and streaming items, so discoverability is worse rather than better.                                                                                                                                                                                        |

The category can be changed later from the dashboard without resubmitting the
package, so this is not a decision worth agonising over — but changing it resets
the listing to review.

---

## Differences from AMO

Firefox's submission differs enough to keep in its own file
([`amo-submission.md`](amo-submission.md)), but the notable divergences are:

|                 | Chrome Web Store          | addons.mozilla.org                                      |
| --------------- | ------------------------- | ------------------------------------------------------- |
| Package         | `chrome-mv3`              | `firefox-mv2` (wider version support)                   |
| Summary limit   | 132 characters            | 250 characters                                          |
| Data collection | Declared in the dashboard | Declared in the manifest, `data_collection_permissions` |
| Reviewer notes  | No dedicated field        | Dedicated field, silently truncated                     |
| Source code     | Not requested             | Required whenever the build is bundled or minified      |
| License         | Not asked                 | Chosen from a preset list — pick AGPL v3.0 only         |
