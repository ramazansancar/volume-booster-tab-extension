# Store descriptions, per language

Every store that accepts a translated listing asks for the same thing: a description per language. This file holds them in one place so the Chrome, Edge, Opera and AMO listings cannot drift apart, and so a translator has somewhere to contribute that is not a submission form.

Opera is the reason this exists. It lists all 55 languages the extension ships and rejects a submission with `Detailed description missing for <language>` until each one it is offered has text, so the English placeholder below is what keeps that check satisfied without publishing a translation nobody has read.

> [!IMPORTANT]
> Sections marked **TRANSLATION NEEDED** carry the English text deliberately. They are not translations and must not be presented as one. Replacing any of them with real text in that language is a welcome pull request — see [Improve a translation](../CONTRIBUTING.md#-improve-a-translation).

Sections carrying _Translated from the English description._ have real text in that language. To add one, put the translation in a file and run:

```bash
pnpm run describe -- <tag> < translation.txt
```

The tag is the heading's hyphenated form (`pt-BR`, not `pt_BR`). The script rewrites that one section, drops the placeholder note and leaves the language name alone, so 55 near-identical blocks cannot drift apart by hand.

## Conventions

- **Headings use the store's language tag** (`en-US`, `pt-BR`, `zh-CN`), not the underscore form used by `public/_locales/`. Opera, Chrome and AMO all show the hyphenated tag, so this file matches what you see in the form.
- **Bullets are hyphens, not `•`.** Opera states that HTML and BBCode are unsupported and has no documented behaviour for the bullet character the other listings render.
- **The text is the same copy as the per-store files.** Change it in [`chrome-submission.md`](chrome-submission.md) and here together, or the listings drift.

---

## `am` — አማርኛ — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `ar` — العربية — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `bg` — Български — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `bn` — বাংলা — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `ca` — Català — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `cs` — Čeština — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `da` — Dansk — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `de` — Deutsch

_Translated from the English description._

```text
Volume Booster Tab hebt die Lautstärke jedes Browser-Tabs über das hinaus an, was die Seite selbst zulässt, und gibt Ihnen echte Kontrolle darüber, wie dieser Klang geformt wird.

FUNKTIONEN

- Verstärkung von 0 % bis 600 %, in den Einstellungen bis 1000 % erweiterbar
- Limiter, der Übersteuerung und schmerzhafte Pegelspitzen beim Verstärken verhindert
- 6-Band-Equalizer von 60 Hz bis 10 kHz unter „Erweiterte Einstellungen“
- Stereo-Balance, von ganz links bis ganz rechts
- Mono-Zusammenmischung zum Hören mit nur einem Ohrhörer
- Bypass-Schalter, um bearbeiteten und unbearbeiteten Klang sofort zu vergleichen
- Verfügbar in 55 Sprachen, vollständig übersetzt

JEDER TAB IST UNABHÄNGIG

Das ist der Punkt, den die meisten Lautstärke-Verstärker falsch machen. Jeder Tab behält seine eigene Lautstärke, seine eigene Equalizer-Kurve, seine eigene Balance. Lassen Sie einen Stream in einem Tab mit 300 % laufen und Musik in einem anderen mit 120 %; das eine zu ändern berührt das andere nie.

Das Symbol in der Symbolleiste zeigt den Pegel des Tabs an, den Sie gerade ansehen, sodass Sie auf einen Blick erkennen, welche Tabs verstärkt werden.

STANDARDMÄSSIG VORÜBERGEHEND

Eine Verstärkung wird vergessen, sobald Sie den Tab schließen. Eine Einstellung, die Sie für ein Video gewählt haben, kann Sie Wochen später nie auf einer anderen Seite überraschen.

Wenn eine Website immer mit derselben Lautstärke öffnen soll, aktivieren Sie im Popup „Diese Website merken“. Die Einstellungsseite listet jede gespeicherte Website auf, lässt Sie jede davon bearbeiten oder entfernen und kann neue Tabs automatisch merken lassen.

HÄLT MIT STREAMING-SEITEN SCHRITT

Seiten wie YouTube, Twitch und Kick tauschen ihren Videoplayer aus, wenn Sie zur nächsten Folge oder zum nächsten Stream wechseln, ohne die Seite neu zu laden. Viele Verstärker verlieren in diesem Moment den Ton und zeigen weiterhin einen Pegel an, den sie längst nicht mehr anwenden. Diese Erweiterung erkennt den Wechsel und wendet Ihre Einstellungen erneut auf den neuen Player an, sodass die eingestellte Lautstärke die Lautstärke bleibt, die Sie hören.

DATENSCHUTZ

Kein Tracking. Keine Analyse. Kein Konto. Keinerlei Netzwerkanfragen, nicht einmal für Schriftarten. Ihre Einstellungen verlassen niemals Ihr eigenes Gerät.

WAS NICHT MÖGLICH IST

DRM-geschützte Dienste wie Netflix, Disney+, Prime Video und Spotify verbergen ihren Ton konstruktionsbedingt vor Erweiterungen und lassen sich daher nicht verstärken. Wenn eine Seite nicht verarbeitet werden kann, sagt das Popup dies deutlich, statt stillschweigend nichts zu tun.

Browserseiten wie chrome:// und der Web Store sind für jede Erweiterung gesperrt, auch für diese.

BITTE VERANTWORTUNGSVOLL VERSTÄRKEN

Hohe Lautstärke kann sowohl Ihrem Gehör als auch Ihren Lautsprechern schaden, besonders mit Kopfhörern. Der Limiter ist oberhalb von 100 % standardmäßig aktiv und Sie sollten ihn aktiviert lassen. Die Obergrenze in den Einstellungen über 600 % hinaus anzuheben, geschieht auf eigene Gefahr.

OPEN SOURCE

Quellcode, Fehlerverfolgung und Beitragsleitfaden:
https://github.com/ramazansancar/volume-booster-tab-extension

Lizenziert unter der GNU Affero General Public License v3.0.
```

## `el` — Ελληνικά

_Translated from the English description._

```text
Το Volume Booster Tab αυξάνει την ένταση οποιασδήποτε καρτέλας του προγράμματος περιήγησης πέρα από όσο επιτρέπει η ίδια η σελίδα και σας δίνει πραγματικό έλεγχο στο πώς διαμορφώνεται αυτός ο ήχος.

ΔΥΝΑΤΟΤΗΤΕΣ

- Ενίσχυση από 0% έως 600%, με δυνατότητα αύξησης έως 1000% στις ρυθμίσεις
- Limiter που αποτρέπει την παραμόρφωση και τις οδυνηρές κορυφές κατά την ενίσχυση
- Ισοσταθμιστής 6 ζωνών, από 60 Hz έως 10 kHz, στις Σύνθετες ρυθμίσεις
- Στερεοφωνική ισορροπία, από τέρμα αριστερά έως τέρμα δεξιά
- Σύμπτυξη σε μονοφωνικό για ακρόαση με ένα μόνο ακουστικό
- Διακόπτης παράκαμψης για άμεση σύγκριση επεξεργασμένου και ανεπεξέργαστου ήχου
- Διαθέσιμο σε 55 γλώσσες, πλήρως μεταφρασμένο

ΚΑΘΕ ΚΑΡΤΕΛΑ ΕΙΝΑΙ ΑΝΕΞΑΡΤΗΤΗ

Εδώ κάνουν λάθος οι περισσότερες επεκτάσεις ενίσχυσης ήχου. Κάθε καρτέλα διατηρεί τη δική της ένταση, τη δική της καμπύλη ισοσταθμιστή, τη δική της ισορροπία. Αφήστε μια ζωντανή μετάδοση στο 300% σε μία καρτέλα και μουσική στο 120% σε άλλη· η αλλαγή της μίας δεν αγγίζει ποτέ την άλλη.

Το σήμα στη γραμμή εργαλείων δείχνει το επίπεδο της καρτέλας που βλέπετε, ώστε να καταλαβαίνετε με μια ματιά ποιες καρτέλες είναι ενισχυμένες.

ΠΡΟΣΩΡΙΝΟ ΑΠΟ ΠΡΟΕΠΙΛΟΓΗ

Η ενίσχυση ξεχνιέται όταν κλείσετε την καρτέλα. Μια ρύθμιση που επιλέξατε για ένα βίντεο δεν μπορεί να σας αιφνιδιάσει εβδομάδες αργότερα σε διαφορετική σελίδα.

Αν θέλετε μια ιστοσελίδα να ανοίγει πάντα με την ίδια ένταση, επιλέξτε «Απομνημόνευση αυτού του ιστότοπου» στο αναδυόμενο παράθυρο. Η σελίδα ρυθμίσεων παραθέτει κάθε αποθηκευμένο ιστότοπο, σας επιτρέπει να επεξεργαστείτε ή να αφαιρέσετε οποιονδήποτε και μπορεί να κάνει τις νέες καρτέλες να θυμούνται αυτόματα.

ΣΥΜΒΑΔΙΖΕΙ ΜΕ ΤΙΣ ΣΕΛΙΔΕΣ ΡΟΗΣ

Ιστότοποι όπως το YouTube, το Twitch και το Kick αντικαθιστούν το πρόγραμμα αναπαραγωγής τους όταν περνάτε στο επόμενο επεισόδιο ή στην επόμενη μετάδοση, χωρίς να φορτώσουν ξανά τη σελίδα. Πολλές επεκτάσεις χάνουν τον ήχο εκείνη ακριβώς τη στιγμή και συνεχίζουν να δείχνουν ένα επίπεδο που δεν εφαρμόζουν πια. Αυτή παρακολουθεί την αλλαγή και εφαρμόζει ξανά τις ρυθμίσεις σας στο νέο πρόγραμμα αναπαραγωγής, ώστε η ένταση που ορίσατε να παραμένει η ένταση που ακούτε.

ΑΠΟΡΡΗΤΟ

Καμία παρακολούθηση. Καμία ανάλυση. Κανένας λογαριασμός. Κανένα αίτημα δικτύου οποιουδήποτε είδους, ούτε καν για γραμματοσειρές. Οι ρυθμίσεις σας δεν φεύγουν ποτέ από τη συσκευή σας.

ΤΙ ΔΕΝ ΜΠΟΡΕΙ ΝΑ ΚΑΝΕΙ

Υπηρεσίες με προστασία DRM όπως το Netflix, το Disney+, το Prime Video και το Spotify κρύβουν τον ήχο τους από τις επεκτάσεις εκ σχεδιασμού, οπότε δεν μπορούν να ενισχυθούν. Όταν μια σελίδα δεν μπορεί να επεξεργαστεί, το αναδυόμενο παράθυρο το λέει καθαρά αντί να μην κάνει σιωπηλά τίποτα.

Σελίδες του προγράμματος περιήγησης όπως chrome:// και το Web Store είναι απρόσιτες για κάθε επέκταση, συμπεριλαμβανομένης αυτής.

ΕΝΙΣΧΥΣΤΕ ΜΕ ΥΠΕΥΘΥΝΟΤΗΤΑ

Η υψηλή ένταση μπορεί να βλάψει τόσο την ακοή σας όσο και τα ηχεία σας, ιδίως με ακουστικά. Ο limiter είναι ενεργός από προεπιλογή πάνω από το 100% και καλό είναι να τον αφήσετε ενεργό. Η αύξηση του ορίου πέρα από το 600% στις ρυθμίσεις γίνεται με δική σας ευθύνη.

ΑΝΟΙΧΤΟΣ ΚΩΔΙΚΑΣ

Πηγαίος κώδικας, καταγραφή σφαλμάτων και οδηγός συνεισφοράς:
https://github.com/ramazansancar/volume-booster-tab-extension

Υπό την άδεια GNU Affero General Public License v3.0.
```

## `en` — English

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `en-AU` — English (Australia)

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `en-GB` — English (UK)

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `en-US` — English (US)

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `es` — Español

_Translated from the English description._

```text
Volume Booster Tab eleva el volumen de cualquier pestaña del navegador más allá de lo que permite la propia página, y te da control real sobre cómo se moldea ese sonido.

CARACTERÍSTICAS

- Amplificación del 0 % al 600 %, ampliable hasta el 1000 % en los ajustes
- Limitador que evita la saturación y los picos dolorosos al amplificar
- Ecualizador de 6 bandas, de 60 Hz a 10 kHz, en Ajustes avanzados
- Balance estéreo, de todo a la izquierda a todo a la derecha
- Mezcla a mono para escuchar con un solo auricular
- Interruptor de derivación para comparar al instante el sonido procesado y el original
- Disponible en 55 idiomas, totalmente traducido

CADA PESTAÑA ES INDEPENDIENTE

Aquí es donde fallan la mayoría de los amplificadores de volumen. Cada pestaña conserva su propio volumen, su propia curva de ecualización, su propio balance. Pon una retransmisión al 300 % en una pestaña y música al 120 % en otra; cambiar una nunca afecta a la otra.

La insignia de la barra de herramientas muestra el nivel de la pestaña que estás viendo, así que sabes de un vistazo qué pestañas están amplificadas.

TEMPORAL DE FORMA PREDETERMINADA

La amplificación se olvida al cerrar la pestaña. Un ajuste que elegiste para un vídeo nunca podrá sorprenderte semanas después en otra página.

Si quieres que un sitio se abra siempre con el mismo volumen, marca «Recordar este sitio» en la ventana emergente. La página de ajustes enumera todos los sitios guardados, te deja editar o eliminar cualquiera de ellos y puede hacer que las pestañas nuevas lo recuerden automáticamente.

SIGUE EL RITMO DE LOS SITIOS DE STREAMING

Sitios como YouTube, Twitch y Kick sustituyen su reproductor de vídeo cuando pasas al siguiente episodio o retransmisión, sin recargar la página. Muchos amplificadores pierden el audio en ese momento y siguen mostrando un nivel que ya no aplican. Este detecta el cambio y vuelve a aplicar tus ajustes al nuevo reproductor, de modo que el volumen que fijaste sigue siendo el volumen que oyes.

PRIVACIDAD

Sin seguimiento. Sin analíticas. Sin cuenta. Sin solicitudes de red de ningún tipo, ni siquiera para fuentes. Tus ajustes nunca salen de tu propio equipo.

LO QUE NO PUEDE HACER

Los servicios protegidos con DRM como Netflix, Disney+, Prime Video y Spotify ocultan su audio a las extensiones por diseño, así que no se pueden amplificar. Cuando una página no se puede procesar, la ventana emergente lo dice con claridad en lugar de no hacer nada en silencio.

Las páginas del navegador como chrome:// y la Web Store están vedadas a todas las extensiones, incluida esta.

AMPLIFICA CON RESPONSABILIDAD

Un volumen alto puede dañar tanto tu audición como tus altavoces, sobre todo con auriculares. El limitador está activado de forma predeterminada por encima del 100 % y conviene dejarlo activado. Subir el límite más allá del 600 % en los ajustes es bajo tu propia responsabilidad.

CÓDIGO ABIERTO

Código fuente, seguimiento de incidencias y guía de contribución:
https://github.com/ramazansancar/volume-booster-tab-extension

Publicado bajo la Licencia Pública General Affero de GNU v3.0.
```

## `es-419` — Español (Latinoamérica)

_Translated from the English description._

```text
Volume Booster Tab sube el volumen de cualquier pestaña del navegador más allá de lo que permite la propia página, y te da control real sobre cómo se moldea ese sonido.

CARACTERÍSTICAS

- Amplificación del 0 % al 600 %, ampliable hasta el 1000 % en la configuración
- Limitador que evita la saturación y los picos dolorosos al amplificar
- Ecualizador de 6 bandas, de 60 Hz a 10 kHz, en Configuración avanzada
- Balance estéreo, de todo a la izquierda a todo a la derecha
- Mezcla a mono para escuchar con un solo audífono
- Interruptor de derivación para comparar al instante el sonido procesado y el original
- Disponible en 55 idiomas, totalmente traducido

CADA PESTAÑA ES INDEPENDIENTE

Aquí es donde fallan la mayoría de los amplificadores de volumen. Cada pestaña conserva su propio volumen, su propia curva de ecualización, su propio balance. Pon una transmisión al 300 % en una pestaña y música al 120 % en otra; cambiar una nunca afecta a la otra.

La insignia de la barra de herramientas muestra el nivel de la pestaña que estás viendo, así que sabes de un vistazo cuáles están amplificadas.

TEMPORAL DE FORMA PREDETERMINADA

La amplificación se olvida al cerrar la pestaña. Una configuración que elegiste para un video nunca podrá sorprenderte semanas después en otra página.

Si quieres que un sitio se abra siempre con el mismo volumen, marca «Recordar este sitio» en la ventana emergente. La página de configuración enumera todos los sitios guardados, te permite editar o eliminar cualquiera de ellos y puede hacer que las pestañas nuevas lo recuerden automáticamente.

SIGUE EL RITMO DE LOS SITIOS DE STREAMING

Sitios como YouTube, Twitch y Kick reemplazan su reproductor de video cuando pasas al siguiente episodio o transmisión, sin recargar la página. Muchos amplificadores pierden el audio en ese momento y siguen mostrando un nivel que ya no aplican. Este detecta el cambio y vuelve a aplicar tu configuración al nuevo reproductor, de modo que el volumen que fijaste sigue siendo el volumen que escuchas.

PRIVACIDAD

Sin rastreo. Sin analíticas. Sin cuenta. Sin solicitudes de red de ningún tipo, ni siquiera para fuentes. Tu configuración nunca sale de tu propio equipo.

LO QUE NO PUEDE HACER

Los servicios protegidos con DRM como Netflix, Disney+, Prime Video y Spotify ocultan su audio a las extensiones por diseño, así que no se pueden amplificar. Cuando una página no se puede procesar, la ventana emergente lo dice con claridad en lugar de no hacer nada en silencio.

Las páginas del navegador como chrome:// y la Web Store están vedadas a todas las extensiones, incluida esta.

AMPLIFICA CON RESPONSABILIDAD

Un volumen alto puede dañar tanto tu audición como tus bocinas, sobre todo con audífonos. El limitador está activado de forma predeterminada por encima del 100 % y conviene dejarlo activado. Subir el límite más allá del 600 % en la configuración es bajo tu propia responsabilidad.

CÓDIGO ABIERTO

Código fuente, seguimiento de incidencias y guía de contribución:
https://github.com/ramazansancar/volume-booster-tab-extension

Publicado bajo la Licencia Pública General Affero de GNU v3.0.
```

## `et` — Eesti

_Translated from the English description._

```text
Volume Booster Tab tõstab mis tahes brauserikaardi helitugevust kõrgemale, kui leht ise lubab, ja annab teile tõelise kontrolli selle üle, kuidas heli kujundatakse.

VÕIMALUSED

- Võimendus 0%-st 600%-ni, seadetes tõstetav kuni 1000%-ni
- Limiiter, mis hoiab ära moonutused ja valusad tipud võimendamisel
- 6-ribaline ekvalaiser 60 Hz kuni 10 kHz, jaotises Täpsemad seaded
- Stereotasakaal, täiesti vasakult täiesti paremale
- Monomiks ühe kõrvaklapiga kuulamiseks
- Möödaviigulüliti töödeldud ja töötlemata heli kohe võrdlemiseks
- Saadaval 55 keeles, täielikult tõlgitud

IGA KAART ON ISESEISEV

Just selle saab enamik helivõimendeid valesti. Iga kaart säilitab oma helitugevuse, oma ekvalaiserikõvera, oma tasakaalu. Laske ühel kaardil voog 300% peal ja teisel muusika 120% peal; ühe muutmine ei puuduta kunagi teist.

Tööriistariba märgis näitab vaadatava kaardi taset, nii et näete ühe pilguga, millised kaardid on võimendatud.

VAIKIMISI AJUTINE

Võimendus unustatakse kaardi sulgemisel. Ühe video jaoks valitud säte ei saa teid nädalaid hiljem teisel lehel üllatada.

Kui soovite, et sait avaneks alati sama helitugevusega, märkige hüpikaknas „Jäta see sait meelde“. Seadete leht loetleb kõik salvestatud saidid, võimaldab neist igaüht muuta või eemaldada ning võib panna uued kaardid automaatselt meelde jätma.

PEAB SAMMU VOOGEDASTUSSAITIDEGA

Saidid nagu YouTube, Twitch ja Kick asendavad oma videomängija, kui liigute järgmisele osale või voole, lehte uuesti laadimata. Paljud võimendid kaotavad sel hetkel heli ja näitavad edasi taset, mida nad enam ei rakenda. See jälgib vahetust ja rakendab teie sätted uuele mängijale uuesti, nii et seatud helitugevus jääb helitugevuseks, mida kuulete.

PRIVAATSUS

Ei mingit jälgimist. Ei mingit analüütikat. Ei mingit kontot. Ei mingeid võrgupäringuid, isegi mitte fontide jaoks. Teie sätted ei lahku kunagi teie enda seadmest.

MIDA SEE EI SAA TEHA

DRM-kaitsega teenused nagu Netflix, Disney+, Prime Video ja Spotify varjavad oma heli laienduste eest juba disaini poolest, mistõttu neid ei saa võimendada. Kui lehte ei õnnestu töödelda, ütleb hüpikaken seda otse, selle asemel et vaikides mitte midagi teha.

Brauserilehed nagu chrome:// ja veebipood on suletud kõigile laiendustele, sealhulgas sellele.

VÕIMENDAGE VASTUTUSTUNDLIKULT

Vali heli võib kahjustada nii teie kuulmist kui ka kõlareid, eriti kõrvaklappidega. Limiiter on üle 100% vaikimisi sees ja see tasub sisse jätta. Ülempiiri tõstmine seadetes üle 600% toimub teie enda vastutusel.

AVATUD LÄHTEKOOD

Lähtekood, veateadete jälgija ja panustamisjuhend:
https://github.com/ramazansancar/volume-booster-tab-extension

Litsentsitud GNU Affero üldise avaliku litsentsi v3.0 alusel.
```

## `fa` — فارسی — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `fi` — Suomi

_Translated from the English description._

```text
Volume Booster Tab nostaa minkä tahansa selainvälilehden äänenvoimakkuutta yli sen, mitä sivu itse sallii, ja antaa sinulle todellisen hallinnan siitä, miten ääntä muokataan.

OMINAISUUDET

- Vahvistus 0 %:sta 600 %:iin, nostettavissa 1000 %:iin asetuksissa
- Rajoitin, joka estää säröytymisen ja kipeät huiput vahvistettaessa
- 6-kaistainen taajuuskorjain, 60 Hz – 10 kHz, Lisäasetukset-kohdassa
- Stereotasapaino, täysin vasemmalta täysin oikealle
- Monomiksaus yhdellä kuulokkeella kuuntelua varten
- Ohituskytkin käsitellyn ja käsittelemättömän äänen välittömään vertailuun
- Saatavilla 55 kielellä, täysin käännetty

JOKAINEN VÄLILEHTI ON ITSENÄINEN

Tässä useimmat äänenvahvistimet menevät pieleen. Jokainen välilehti säilyttää oman äänenvoimakkuutensa, oman taajuuskorjainkäyränsä, oman tasapainonsa. Anna suoratoiston soida 300 %:lla yhdellä välilehdellä ja musiikin 120 %:lla toisella; toisen muuttaminen ei koskaan koske toista.

Työkalurivin merkki näyttää katselemasi välilehden tason, joten näet yhdellä silmäyksellä, mitkä välilehdet on vahvistettu.

OLETUKSENA TILAPÄINEN

Vahvistus unohtuu, kun suljet välilehden. Yhtä videota varten valitsemasi asetus ei voi koskaan yllättää sinua viikkoja myöhemmin toisella sivulla.

Jos haluat sivuston avautuvan aina samalla äänenvoimakkuudella, valitse ponnahdusikkunassa ”Muista tämä sivusto”. Asetussivu luettelee kaikki tallentamasi sivustot, antaa muokata tai poistaa minkä tahansa niistä, ja voi saada uudet välilehdet muistamaan automaattisesti.

PYSYY SUORATOISTOSIVUSTOJEN PERÄSSÄ

YouTuben, Twitchin ja Kickin kaltaiset sivustot vaihtavat videosoittimensa, kun siirryt seuraavaan jaksoon tai lähetykseen, lataamatta sivua uudelleen. Monet vahvistimet menettävät äänen juuri sillä hetkellä ja näyttävät edelleen tasoa, jota ne eivät enää käytä. Tämä tarkkailee vaihtoa ja ottaa asetuksesi uudelleen käyttöön uudessa soittimessa, joten asettamasi äänenvoimakkuus pysyy sinä äänenvoimakkuutena, jonka kuulet.

TIETOSUOJA

Ei seurantaa. Ei analytiikkaa. Ei tiliä. Ei minkäänlaisia verkkopyyntöjä, ei edes fontteja varten. Asetuksesi eivät koskaan poistu omalta laitteeltasi.

MITÄ SE EI VOI TEHDÄ

DRM-suojatut palvelut kuten Netflix, Disney+, Prime Video ja Spotify piilottavat äänensä laajennuksilta jo suunnittelultaan, joten niitä ei voi vahvistaa. Kun sivua ei voida käsitellä, ponnahdusikkuna sanoo sen suoraan sen sijaan, että se jättäisi hiljaa tekemättä mitään.

Selaimen omat sivut kuten chrome:// ja verkkokauppa ovat kiellettyjä kaikilta laajennuksilta, myös tältä.

VAHVISTA VASTUULLISESTI

Kova äänenvoimakkuus voi vahingoittaa sekä kuuloasi että kaiuttimiasi, erityisesti kuulokkeilla. Rajoitin on oletuksena päällä yli 100 %:n vahvistuksella, ja se kannattaa jättää päälle. Ylärajan nostaminen yli 600 %:n asetuksissa tapahtuu omalla vastuullasi.

AVOIN LÄHDEKOODI

Lähdekoodi, virheseuranta ja osallistumisopas:
https://github.com/ramazansancar/volume-booster-tab-extension

Lisensoitu GNU Affero General Public License v3.0 -lisenssillä.
```

## `fil` — Filipino

_Translated from the English description._

```text
Itinataas ng Volume Booster Tab ang lakas ng tunog ng kahit anong tab ng browser nang lampas sa pinapayagan ng mismong pahina, at binibigyan ka ng tunay na kontrol sa kung paano hinuhubog ang tunog na iyon.

MGA TAMPOK

- Pagpapalakas mula 0% hanggang 600%, maitataas hanggang 1000% sa mga setting
- Limiter na pumipigil sa pagkabasag at masakit na peak kapag nagpapalakas
- 6-band na equalizer, 60 Hz hanggang 10 kHz, sa ilalim ng Advanced settings
- Stereo balance, mula sa ganap na kaliwa hanggang ganap na kanan
- Mono downmix para sa pakikinig gamit ang isang earbud lamang
- Bypass switch upang agad na ihambing ang naprosesong tunog at ang orihinal
- Available sa 55 wika, ganap na naisalin

MALAYA ANG BAWAT TAB

Dito nagkakamali ang karamihan sa mga volume booster. Pinapanatili ng bawat tab ang sarili nitong lakas ng tunog, sarili nitong equalizer curve, sarili nitong balanse. Patakbuhin ang isang stream sa 300% sa isang tab at musika sa 120% sa iba; ang pagbabago sa isa ay hindi kailanman gumagalaw sa isa pa.

Ipinapakita ng badge sa toolbar ang antas ng tab na tinitingnan mo, kaya makikita mo agad kung aling mga tab ang pinalakas.

PANSAMANTALA BILANG DEFAULT

Nakakalimutan ang pagpapalakas kapag isinara mo ang tab. Ang setting na pinili mo para sa isang video ay hindi kailanman makagugulat sa iyo makalipas ang mga linggo sa ibang pahina.

Kung gusto mong palaging bumukas ang isang site sa parehong lakas ng tunog, lagyan ng tsek ang "Tandaan ang site na ito" sa popup. Nakalista sa pahina ng mga setting ang bawat site na na-save mo, pinapayagan kang baguhin o alisin ang alinman sa mga ito, at maaaring gawing awtomatikong tumatandaan ang mga bagong tab.

NAKAKASABAY SA MGA STREAMING SITE

Ang mga site tulad ng YouTube, Twitch at Kick ay pinapalitan ang kanilang video player kapag lumipat ka sa susunod na episode o stream, nang hindi nire-reload ang pahina. Maraming booster ang nawawalan ng audio sa sandaling iyon at patuloy na nagpapakita ng antas na hindi na nila inilalapat. Binabantayan nito ang pagpapalit at muling inilalapat ang iyong mga setting sa bagong player, kaya ang lakas ng tunog na itinakda mo ay nananatiling ang lakas ng tunog na naririnig mo.

PRIVACY

Walang pagsubaybay. Walang analytics. Walang account. Walang anumang uri ng kahilingan sa network, kahit para sa mga font. Hindi kailanman umaalis ang iyong mga setting sa sarili mong makina.

ANG HINDI NITO KAYANG GAWIN

Ang mga serbisyong protektado ng DRM tulad ng Netflix, Disney+, Prime Video at Spotify ay itinatago ang kanilang audio mula sa mga extension bilang disenyo, kaya hindi sila mapapalakas. Kapag hindi maproseso ang isang pahina, malinaw itong sinasabi ng popup sa halip na tahimik na walang gawin.

Ang mga pahina ng browser tulad ng chrome:// at ang Web Store ay sarado sa bawat extension, kabilang ang isang ito.

MANGYARING MAGPALAKAS NANG MAY PANANAGUTAN

Ang malakas na tunog ay maaaring makasira sa iyong pandinig at sa iyong mga speaker, lalo na sa headphone. Naka-on ang limiter bilang default sa itaas ng 100% at dapat mo itong iwanang naka-on. Ang pagtaas ng limitasyon nang lampas sa 600% sa mga setting ay nasa sarili mong panganib.

OPEN SOURCE

Source code, issue tracker at gabay sa pag-ambag:
https://github.com/ramazansancar/volume-booster-tab-extension

Lisensyado sa ilalim ng GNU Affero General Public License v3.0.
```

## `fr` — Français

_Translated from the English description._

```text
Volume Booster Tab augmente le volume de n'importe quel onglet du navigateur au-delà de ce que la page elle-même autorise, et vous donne un véritable contrôle sur la façon dont ce son est façonné.

FONCTIONNALITÉS

- Amplification de 0 % à 600 %, extensible à 1000 % dans les paramètres
- Limiteur qui évite la saturation et les pics douloureux lors de l'amplification
- Égaliseur 6 bandes, de 60 Hz à 10 kHz, dans les Paramètres avancés
- Balance stéréo, de tout à gauche à tout à droite
- Mixage en mono pour écouter avec un seul écouteur
- Interrupteur de contournement pour comparer instantanément le son traité et le son d'origine
- Disponible en 55 langues, intégralement traduit

CHAQUE ONGLET EST INDÉPENDANT

C'est là que la plupart des amplificateurs de volume se trompent. Chaque onglet conserve son propre volume, sa propre courbe d'égalisation, sa propre balance. Lancez un direct à 300 % dans un onglet et de la musique à 120 % dans un autre ; modifier l'un ne touche jamais l'autre.

Le badge de la barre d'outils affiche le niveau de l'onglet que vous regardez, ce qui vous permet de voir d'un coup d'œil quels onglets sont amplifiés.

TEMPORAIRE PAR DÉFAUT

Une amplification est oubliée dès que vous fermez l'onglet. Un réglage choisi pour une vidéo ne pourra jamais vous surprendre des semaines plus tard sur une autre page.

Si vous voulez qu'un site s'ouvre toujours au même volume, cochez « Mémoriser ce site » dans la fenêtre contextuelle. La page des paramètres répertorie chaque site enregistré, vous permet de modifier ou de supprimer n'importe lequel, et peut faire en sorte que les nouveaux onglets mémorisent automatiquement.

SUIT LE RYTHME DES SITES DE STREAMING

Des sites comme YouTube, Twitch et Kick remplacent leur lecteur vidéo lorsque vous passez à l'épisode ou au direct suivant, sans recharger la page. Beaucoup d'amplificateurs perdent le son à cet instant précis et continuent d'afficher un niveau qu'ils n'appliquent plus. Celui-ci surveille le remplacement et réapplique vos réglages au nouveau lecteur, de sorte que le volume que vous avez défini reste le volume que vous entendez.

CONFIDENTIALITÉ

Aucun suivi. Aucune analyse. Aucun compte. Aucune requête réseau d'aucune sorte, pas même pour les polices. Vos réglages ne quittent jamais votre propre appareil.

CE QU'IL NE PEUT PAS FAIRE

Les services protégés par DRM comme Netflix, Disney+, Prime Video et Spotify masquent leur audio aux extensions par conception, ils ne peuvent donc pas être amplifiés. Lorsqu'une page ne peut pas être traitée, la fenêtre contextuelle le dit clairement au lieu de ne rien faire en silence.

Les pages du navigateur comme chrome:// et le Web Store sont interdites à toute extension, y compris celle-ci.

AMPLIFIEZ DE MANIÈRE RESPONSABLE

Un volume élevé peut endommager à la fois votre audition et vos haut-parleurs, en particulier avec un casque. Le limiteur est activé par défaut au-dessus de 100 % et il vaut mieux le laisser activé. Relever le plafond au-delà de 600 % dans les paramètres se fait à vos propres risques.

OPEN SOURCE

Code source, suivi des problèmes et guide de contribution :
https://github.com/ramazansancar/volume-booster-tab-extension

Distribué sous la licence publique générale GNU Affero v3.0.
```

## `gu` — ગુજરાતી — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `he` — עברית — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `hi` — हिन्दी — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `hr` — Hrvatski

_Translated from the English description._

```text
Volume Booster Tab podiže glasnoću bilo koje kartice preglednika iznad onoga što sama stranica dopušta i daje vam stvarnu kontrolu nad time kako se taj zvuk oblikuje.

ZNAČAJKE

- Pojačanje od 0 % do 600 %, u postavkama povisivo do 1000 %
- Limiter koji sprječava izobličenje i bolne vrhove pri pojačavanju
- Šestopojasni ekvilizator, od 60 Hz do 10 kHz, u Naprednim postavkama
- Stereo balans, od krajnje lijevo do krajnje desno
- Mono miks za slušanje jednom slušalicom
- Prekidač za zaobilaženje radi trenutne usporedbe obrađenog i neobrađenog zvuka
- Dostupno na 55 jezika, u potpunosti prevedeno

SVAKA JE KARTICA NEOVISNA

Upravo to većina pojačala glasnoće radi pogrešno. Svaka kartica zadržava vlastitu glasnoću, vlastitu krivulju ekvilizatora, vlastiti balans. Pustite prijenos na 300 % u jednoj kartici i glazbu na 120 % u drugoj; promjena jedne nikada ne dira drugu.

Oznaka na alatnoj traci prikazuje razinu kartice koju gledate, pa na prvi pogled znate koje su kartice pojačane.

PREMA ZADANOME PRIVREMENO

Pojačanje se zaboravlja kada zatvorite karticu. Postavka koju ste odabrali za jedan videozapis ne može vas tjednima kasnije iznenaditi na drugoj stranici.

Ako želite da se stranica uvijek otvara s istom glasnoćom, označite „Zapamti ovu stranicu” u skočnom prozoru. Stranica s postavkama navodi svaku spremljenu stranicu, omogućuje uređivanje ili uklanjanje bilo koje od njih i može učiniti da nove kartice pamte automatski.

PRATI STREAMING STRANICE

Stranice poput YouTubea, Twitcha i Kicka zamjenjuju svoj videoreproduktor kada prijeđete na sljedeću epizodu ili prijenos, bez ponovnog učitavanja stranice. Mnoga pojačala u tom trenutku izgube zvuk i nastave prikazivati razinu koju više ne primjenjuju. Ovo prati zamjenu i ponovno primjenjuje vaše postavke na novi reproduktor, pa glasnoća koju ste postavili ostaje glasnoća koju čujete.

PRIVATNOST

Bez praćenja. Bez analitike. Bez računa. Bez ikakvih mrežnih zahtjeva, čak ni za fontove. Vaše postavke nikada ne napuštaju vaš vlastiti uređaj.

ŠTO NE MOŽE

Usluge zaštićene DRM-om poput Netflixa, Disneyja+, Prime Videa i Spotifyja svoj zvuk skrivaju od proširenja po samoj zamisli, pa ih nije moguće pojačati. Kada se stranica ne može obraditi, skočni prozor to jasno kaže umjesto da tiho ne učini ništa.

Stranice preglednika poput chrome:// i trgovine zatvorene su za svako proširenje, uključujući i ovo.

POJAČAVAJTE ODGOVORNO

Velika glasnoća može oštetiti i vaš sluh i vaše zvučnike, osobito sa slušalicama. Limiter je prema zadanome uključen iznad 100 % i trebali biste ga ostaviti uključenim. Podizanje gornje granice iznad 600 % u postavkama na vlastitu je odgovornost.

OTVORENI KOD

Izvorni kod, praćenje problema i vodič za doprinose:
https://github.com/ramazansancar/volume-booster-tab-extension

Licencirano pod GNU Affero General Public License v3.0.
```

## `hu` — Magyar

_Translated from the English description._

```text
A Volume Booster Tab bármely böngészőlap hangerejét az oldal által megengedett szint fölé emeli, és valódi irányítást ad afölött, hogyan formálódik ez a hang.

FUNKCIÓK

- Erősítés 0%-tól 600%-ig, a beállításokban 1000%-ig emelhető
- Limiter, amely megakadályozza a torzítást és a fájdalmas csúcsokat erősítéskor
- 6 sávos hangszínszabályzó, 60 Hz-től 10 kHz-ig, a Speciális beállítások alatt
- Sztereó balansz, teljesen balról teljesen jobbra
- Monó lekeverés egyetlen fülhallgatóval való hallgatáshoz
- Megkerülő kapcsoló a feldolgozott és az eredeti hang azonnali összehasonlításához
- 55 nyelven elérhető, teljesen lefordítva

MINDEN LAP FÜGGETLEN

A legtöbb hangerőnövelő pontosan ezt rontja el. Minden lap megőrzi a saját hangerejét, a saját hangszínszabályzó-görbéjét, a saját balanszát. Futtasson egy adást 300%-on az egyik lapon és zenét 120%-on a másikon; az egyik módosítása soha nem érinti a másikat.

Az eszköztár jelvénye az éppen nézett lap szintjét mutatja, így egy pillantással látja, mely lapok vannak felerősítve.

ALAPÉRTELMEZÉS SZERINT IDEIGLENES

Az erősítés elfelejtődik, amint bezárja a lapot. Egy videóhoz választott beállítás soha nem lepheti meg hetekkel később egy másik oldalon.

Ha azt szeretné, hogy egy webhely mindig ugyanazzal a hangerővel nyíljon meg, jelölje be az „Emlékezz erre a webhelyre” lehetőséget a felugró ablakban. A beállítások oldal felsorolja az összes mentett webhelyet, lehetővé teszi bármelyik szerkesztését vagy eltávolítását, és beállítható, hogy az új lapok automatikusan emlékezzenek.

LÉPÉST TART A STREAMINGOLDALAKKAL

Az olyan oldalak, mint a YouTube, a Twitch és a Kick, lecserélik a videolejátszójukat, amikor a következő epizódra vagy adásra vált, az oldal újratöltése nélkül. Sok erősítő pontosan ekkor veszíti el a hangot, és továbbra is olyan szintet mutat, amelyet már nem alkalmaz. Ez figyeli a cserét, és újra alkalmazza a beállításait az új lejátszóra, így a beállított hangerő marad az a hangerő, amelyet hall.

ADATVÉDELEM

Semmilyen nyomkövetés. Semmilyen analitika. Semmilyen fiók. Semmilyen hálózati kérés, még betűtípusokért sem. A beállításai soha nem hagyják el a saját gépét.

AMIT NEM TUD

A DRM-mel védett szolgáltatások, például a Netflix, a Disney+, a Prime Video és a Spotify, tervezésüknél fogva elrejtik a hangjukat a bővítmények elől, ezért nem erősíthetők. Ha egy oldal nem dolgozható fel, a felugró ablak ezt világosan kimondja ahelyett, hogy csendben semmit sem tenne.

A böngésző saját oldalai, például a chrome:// és a Web Store, minden bővítmény elől el vannak zárva, beleértve ezt is.

KÉRJÜK, FELELŐSSÉGGEL ERŐSÍTSEN

A nagy hangerő károsíthatja a hallását és a hangszóróit is, különösen fejhallgatóval. A limiter 100% felett alapértelmezés szerint be van kapcsolva, és érdemes bekapcsolva hagyni. A felső határ 600% fölé emelése a beállításokban saját felelősségre történik.

NYÍLT FORRÁSKÓD

Forráskód, hibakövető és közreműködési útmutató:
https://github.com/ramazansancar/volume-booster-tab-extension

A GNU Affero General Public License v3.0 alatt licencelve.
```

## `id` — Indonesia — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `it` — Italiano — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `ja` — 日本語 — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `kn` — ಕನ್ನಡ — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `ko` — 한국어 — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `lt` — Lietuvių — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `lv` — Latviešu — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `ml` — മലയാളം — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `mr` — मराठी — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `ms` — Melayu — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `nl` — Nederlands — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `no` — Norsk — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `pl` — Polski — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `pt-BR` — Português (Brasil) — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `pt-PT` — Português (Portugal) — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `ro` — Română — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `ru` — Русский — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `sk` — Slovenčina — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `sl` — Slovenščina — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `sr` — Српски — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `sv` — Svenska — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `sw` — Kiswahili — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `ta` — தமிழ் — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `te` — తెలుగు — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `th` — ไทย — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `tr` — Türkçe

```text
Sekme Ses Yükseltici, herhangi bir sekmenin sesini sayfanın kendi izin verdiğinin ötesine taşır ve o sesin nasıl şekilleneceği üzerinde gerçek denetim verir.

ÖZELLİKLER

- %0 ile %600 arasında yükseltme, ayarlardan %1000’e çıkarılabilir
- Yükseltirken bozulmayı ve ani yüksek tepe sesleri önleyen limitör
- Gelişmiş ayarlar altında 60 Hz – 10 kHz arası 6 bantlı ekolayzer
- Tamamen sola ve tamamen sağa kadar stereo denge
- Tek kulaklıkla dinlemek için mono birleştirme
- İşlenmiş ve ham sesi anında karşılaştırmak için devre dışı bırakma anahtarı
- 55 dilde, eksiksiz çeviri

HER SEKME BAĞIMSIZ

Ses yükseltici eklentilerin çoğunun yanlış yaptığı yer burası. Her sekme kendi ses seviyesini, kendi ekolayzer eğrisini, kendi dengesini tutar. Bir sekmede yayını %300’de, başka bir sekmede müziği %120’de çalıştırın; birini değiştirmek diğerine asla dokunmaz.

Araç çubuğu rozeti baktığınız sekmenin seviyesini gösterir; hangi sekmelerin yükseltildiğini bir bakışta anlarsınız.

VARSAYILAN OLARAK GEÇİCİ

Sekmeyi kapattığınızda yükseltme unutulur. Bir video için seçtiğiniz ayar, haftalar sonra bambaşka bir sayfada karşınıza çıkıp sizi şaşırtamaz.

Bir sitenin her zaman aynı ses seviyesiyle açılmasını istiyorsanız açılır penceredeki “Bu siteyi hatırla” seçeneğini işaretleyin. Ayarlar sayfası kaydettiğiniz siteleri listeler, herhangi birini düzenlemenize veya kaldırmanıza izin verir ve yeni sekmelerin otomatik olarak hatırlamasını sağlayabilir.

YAYIN SİTELERİNE AYAK UYDURUR

YouTube, Twitch ve Kick gibi siteler, sonraki bölüme veya yayına geçtiğinizde sayfayı yeniden yüklemeden video oynatıcısını değiştirir. Birçok eklenti tam o anda sesi kaybeder ve artık uygulamadığı bir seviyeyi göstermeyi sürdürür. Bu eklenti değişimi izler ve ayarlarınızı yeni oynatıcıya yeniden uygular; böylece ayarladığınız ses, duyduğunuz ses olarak kalır.

GİZLİLİK

İzleme yok. Analiz yok. Hesap yok. Yazı tipleri dahil hiçbir türde ağ isteği yok. Ayarlarınız kendi cihazınızdan hiç çıkmaz.

YAPAMADIKLARI

Netflix, Disney+, Prime Video ve Spotify gibi DRM korumalı hizmetler seslerini tasarım gereği eklentilerden gizler, bu yüzden yükseltilemezler. Bir sayfa işlenemediğinde açılır pencere sessizce hiçbir şey yapmak yerine bunu açıkça söyler.

chrome:// gibi tarayıcı sayfaları ve mağaza sayfaları, bu eklenti dahil her eklentiye kapalıdır.

LÜTFEN SORUMLU YÜKSELTİN

Yüksek ses, özellikle kulaklıkla, hem işitmenize hem de hoparlörlerinize zarar verebilir. Limitör %100 üzerinde varsayılan olarak açıktır ve açık bırakmalısınız. Ayarlardan tavanı %600’ün üzerine çıkarmak sizin sorumluluğunuzdadır.

AÇIK KAYNAK

Kaynak kodu, hata takibi ve katkı rehberi:
https://github.com/ramazansancar/volume-booster-tab-extension

GNU Affero Genel Kamu Lisansı v3.0 ile lisanslanmıştır.
```

## `uk` — Українська — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `vi` — Tiếng Việt — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `zh-CN` — 简体中文 — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```

## `zh-TW` — 繁體中文 — TRANSLATION NEEDED

_English text, shown because this language has no description yet._

```text
Volume Booster Tab raises the volume of any browser tab beyond what the page itself allows, and gives you real control over how that sound is shaped.

FEATURES

- Boost from 0% to 600%, raisable to 1000% in settings
- Limiter that prevents clipping and painful peaks when boosting
- 6-band equalizer, 60 Hz to 10 kHz, under Advanced settings
- Stereo balance, from full left to full right
- Mono downmix for listening with a single earbud
- Bypass switch to compare the processed and untouched sound instantly
- Available in 55 languages, fully translated

EVERY TAB IS INDEPENDENT

This is the part most volume boosters get wrong. Every tab keeps its own volume, its own equalizer curve, its own balance. Run a stream at 300% in one tab and music at 120% in another; changing one never touches the other.

The toolbar badge shows the level of the tab you are looking at, so you can tell at a glance which tabs are amplified.

TEMPORARY BY DEFAULT

A boost is forgotten when you close the tab. A setting you chose for one video can never surprise you weeks later on a different page.

If you do want a site to always open at the same volume, tick "Remember this site" in the popup. The settings page lists every site you have saved, lets you edit or remove any of them, and can make new tabs remember automatically.

KEEPS UP WITH STREAMING SITES

Sites like YouTube, Twitch and Kick replace their video player when you move to the next episode or stream, without reloading the page. Many boosters lose the audio at that moment and keep showing a level they are no longer applying. This one watches for the swap and reapplies your settings to the new player, so the volume you set stays the volume you get.

PRIVACY

No tracking. No analytics. No account. No network requests of any kind, not even for fonts. Your settings never leave your own machine.

WHAT IT CANNOT DO

DRM-protected services such as Netflix, Disney+, Prime Video and Spotify hide their audio from extensions by design, so they cannot be boosted. When a page cannot be processed the popup says so plainly instead of silently doing nothing.

Browser pages such as chrome:// and the Web Store are off limits to every extension, including this one.

PLEASE BOOST RESPONSIBLY

High volume can damage both your hearing and your speakers, especially with headphones. The limiter is on by default above 100% and you should leave it on. Raising the ceiling past 600% in settings is at your own risk.

OPEN SOURCE

Source code, issue tracker and contribution guide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensed under the GNU Affero General Public License v3.0.
```
