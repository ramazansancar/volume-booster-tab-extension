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

## `am` — አማርኛ

_Translated from the English description._

```text
Volume Booster Tab ገጹ ራሱ ከሚፈቅደው በላይ የማንኛውንም የአሳሽ ትር ድምፅ ከፍ ያደርጋል፣ እንዲሁም ያ ድምፅ እንዴት እንደሚቀረጽ እውነተኛ ቁጥጥር ይሰጥዎታል።

ባህሪያት

- ከ0% እስከ 600% ማጉላት፣ በቅንብሮች ውስጥ እስከ 1000% ሊጨመር ይችላል
- በማጉላት ጊዜ መዛባትንና የሚያሳምሙ ከፍታዎችን የሚከላከል ሊሚተር
- በላቁ ቅንብሮች ስር ከ60 ሄርዝ እስከ 10 ኪሎሄርዝ ያለው የ6 ባንድ ኢኳላይዘር
- ከሙሉ ግራ እስከ ሙሉ ቀኝ የሚደርስ የስቴሪዮ ሚዛን
- በአንድ ጆሮ ማዳመጫ ለማዳመጥ የሚያገለግል ሞኖ ውህደት
- የተሰራውንና ያልተሰራውን ድምፅ ወዲያውኑ ለማወዳደር የሚያስችል የማለፊያ ማብሪያ
- በ55 ቋንቋዎች ይገኛል፣ ሙሉ በሙሉ ተተርጉሟል

እያንዳንዱ ትር ራሱን የቻለ ነው

አብዛኞቹ የድምፅ ማጉያዎች የሚሳሳቱበት ቦታ ይህ ነው። እያንዳንዱ ትር የራሱን ድምፅ፣ የራሱን የኢኳላይዘር ኩርባ፣ የራሱን ሚዛን ይይዛል። በአንድ ትር ስርጭትን በ300% በሌላው ደግሞ ሙዚቃን በ120% ያሂዱ፤ አንዱን መቀየር ሌላውን ፈጽሞ አይነካም።

የመሳሪያ አሞሌው ምልክት እየተመለከቱት ያለውን ትር ደረጃ ያሳያል፣ ስለዚህ የትኞቹ ትሮች እንደተጋሉ በአንድ እይታ ያውቃሉ።

በነባሪ ጊዜያዊ

ትሩን ሲዘጉ ማጉላቱ ይረሳል። ለአንድ ቪዲዮ የመረጡት ቅንብር ከሳምንታት በኋላ በሌላ ገጽ ላይ ሊያስደንቅዎት አይችልም።

አንድ ጣቢያ ሁልጊዜ በተመሳሳይ ድምፅ እንዲከፈት ከፈለጉ በብቅ-ባዩ ውስጥ "ይህን ጣቢያ አስታውስ" የሚለውን ምልክት ያድርጉ። የቅንብሮች ገጽ ያስቀመጧቸውን ሁሉንም ጣቢያዎች ይዘረዝራል፣ ማንኛውንም እንዲያርትዑ ወይም እንዲያስወግዱ ይፈቅዳል፣ እንዲሁም አዳዲስ ትሮች በራስ-ሰር እንዲያስታውሱ ማድረግ ይችላል።

ከስርጭት ጣቢያዎች ጋር ይራመዳል

እንደ YouTube፣ Twitch እና Kick ያሉ ጣቢያዎች ወደ ቀጣዩ ክፍል ወይም ስርጭት ሲሄዱ ገጹን ሳይጭኑ የቪዲዮ አጫዋቻቸውን ይተካሉ። ብዙ ማጉያዎች በዚያ ቅጽበት ድምፁን ያጣሉ እና ከዚያ በኋላ የማይተገብሩትን ደረጃ ማሳየታቸውን ይቀጥላሉ። ይህኛው ለውጡን ይከታተልና ቅንብሮችዎን በአዲሱ አጫዋች ላይ እንደገና ይተገብራል፣ ስለዚህ ያዘጋጁት ድምፅ የሚሰሙት ድምፅ ሆኖ ይቀራል።

ግላዊነት

ምንም ክትትል የለም። ምንም ትንተና የለም። ምንም መለያ የለም። ለቅርጸ-ቁምፊዎች እንኳ ምንም ዓይነት የአውታረ መረብ ጥያቄ የለም። ቅንብሮችዎ ከራስዎ መሣሪያ ፈጽሞ አይወጡም።

ማድረግ የማይችለው

እንደ Netflix፣ Disney+፣ Prime Video እና Spotify ያሉ በDRM የተጠበቁ አገልግሎቶች ድምፃቸውን ከቅጥያዎች በንድፍ ይደብቃሉ፣ ስለዚህ ማጉላት አይቻልም። አንድ ገጽ መሰራት ካልቻለ ብቅ-ባዩ በዝምታ ምንም ከማድረግ ይልቅ ይህን በግልጽ ይናገራል።

እንደ chrome:// እና የድር መደብር ያሉ የአሳሽ ገጾች ይህን ጨምሮ ለሁሉም ቅጥያዎች ዝግ ናቸው።

እባክዎ በኃላፊነት ያጉሉ

ከፍተኛ ድምፅ በተለይ በጆሮ ማዳመጫ ሲጠቀሙ ሁለቱንም መስሚያዎትንና ድምፅ ማጉያዎችዎን ሊጎዳ ይችላል። ሊሚተሩ ከ100% በላይ በነባሪ በርቷል፣ እንዲሁም እንደበራ ሊተዉት ይገባል። በቅንብሮች ውስጥ ጣሪያውን ከ600% በላይ ማሳደግ በራስዎ ኃላፊነት ነው።

ክፍት ምንጭ

የምንጭ ኮድ፣ የችግር መከታተያ እና የአስተዋጽኦ መመሪያ፦
https://github.com/ramazansancar/volume-booster-tab-extension

በGNU Affero General Public License v3.0 ስር ፈቃድ ተሰጥቶታል።
```

## `ar` — العربية

_Translated from the English description._

```text
يرفع Volume Booster Tab مستوى صوت أي علامة تبويب في المتصفح إلى ما هو أبعد مما تسمح به الصفحة نفسها، ويمنحك تحكمًا حقيقيًا في كيفية تشكيل ذلك الصوت.

المزايا

- تضخيم من 0% إلى 600%، يمكن رفعه إلى 1000% من الإعدادات
- محدِّد يمنع التشويه والقمم المؤلمة عند التضخيم
- معادل صوت من 6 نطاقات، من 60 هرتز إلى 10 كيلوهرتز، ضمن الإعدادات المتقدمة
- توازن ستيريو، من أقصى اليسار إلى أقصى اليمين
- دمج أحادي للاستماع بسماعة أذن واحدة
- مفتاح تجاوز لمقارنة الصوت المعالج بالصوت الأصلي فورًا
- متوفر بـ 55 لغة، مترجم بالكامل

كل علامة تبويب مستقلة

هنا تخطئ معظم إضافات تضخيم الصوت. تحتفظ كل علامة تبويب بمستوى صوتها الخاص، ومنحنى المعادل الخاص بها، وتوازنها الخاص. شغّل بثًا بنسبة 300% في علامة تبويب وموسيقى بنسبة 120% في أخرى؛ تغيير إحداهما لا يمس الأخرى أبدًا.

تعرض شارة شريط الأدوات مستوى علامة التبويب التي تنظر إليها، فتعرف بنظرة واحدة أي علامات التبويب مضخَّمة.

مؤقت بشكل افتراضي

يُنسى التضخيم عند إغلاق علامة التبويب. إعداد اخترته لمقطع فيديو واحد لن يفاجئك أبدًا بعد أسابيع في صفحة أخرى.

إذا أردت أن يُفتح موقع ما دائمًا بالمستوى نفسه، فحدِّد «تذكّر هذا الموقع» في النافذة المنبثقة. تسرد صفحة الإعدادات كل موقع حفظته، وتتيح لك تعديل أي منها أو إزالته، ويمكنها جعل علامات التبويب الجديدة تتذكر تلقائيًا.

يواكب مواقع البث

مواقع مثل YouTube وTwitch وKick تستبدل مشغّل الفيديو لديها عند الانتقال إلى الحلقة أو البث التالي، دون إعادة تحميل الصفحة. تفقد كثير من الإضافات الصوت في تلك اللحظة بالذات وتستمر في عرض مستوى لم تعد تطبّقه. هذه الإضافة تراقب الاستبدال وتعيد تطبيق إعداداتك على المشغّل الجديد، فيبقى المستوى الذي ضبطته هو المستوى الذي تسمعه.

الخصوصية

لا تتبّع. لا تحليلات. لا حساب. لا طلبات شبكة من أي نوع، ولا حتى للخطوط. إعداداتك لا تغادر جهازك أبدًا.

ما لا تستطيع فعله

الخدمات المحمية بـ DRM مثل Netflix وDisney+ وPrime Video وSpotify تخفي صوتها عن الإضافات بحكم التصميم، لذا لا يمكن تضخيمها. وعندما يتعذر معالجة صفحة، تقول النافذة المنبثقة ذلك بوضوح بدلًا من ألا تفعل شيئًا بصمت.

صفحات المتصفح مثل chrome:// والمتجر الإلكتروني محظورة على كل إضافة، بما فيها هذه.

يُرجى التضخيم بمسؤولية

الصوت العالي قد يضر بسمعك وبمكبرات الصوت لديك، خاصة مع السماعات. المحدِّد مفعَّل افتراضيًا فوق 100% ويُستحسن إبقاؤه مفعَّلًا. رفع الحد الأقصى فوق 600% من الإعدادات يقع على مسؤوليتك وحدك.

مفتوح المصدر

الشفرة المصدرية وتتبع المشكلات ودليل المساهمة:
https://github.com/ramazansancar/volume-booster-tab-extension

مرخَّص بموجب رخصة GNU Affero العمومية العامة الإصدار 3.0.
```

## `bg` — Български

_Translated from the English description._

```text
Volume Booster Tab повишава силата на звука на всеки раздел в браузъра отвъд онова, което самата страница позволява, и ви дава истински контрол върху това как се оформя този звук.

ВЪЗМОЖНОСТИ

- Усилване от 0% до 600%, с възможност за повишаване до 1000% в настройките
- Лимитер, който предотвратява изкривяване и болезнени пикове при усилване
- 6-лентов еквалайзер от 60 Hz до 10 kHz, в „Разширени настройки“
- Стерео баланс, от изцяло ляво до изцяло дясно
- Смесване в моно за слушане с една слушалка
- Превключвател за заобикаляне, за мигновено сравнение на обработения и необработения звук
- Достъпно на 55 езика, изцяло преведено

ВСЕКИ РАЗДЕЛ Е НЕЗАВИСИМ

Точно тук грешат повечето усилватели на звука. Всеки раздел запазва собствената си сила на звука, собствената си крива на еквалайзера, собствения си баланс. Пуснете предаване на 300% в един раздел и музика на 120% в друг; промяната на единия никога не засяга другия.

Значката в лентата с инструменти показва нивото на раздела, който гледате, така че с един поглед разбирате кои раздели са усилени.

ВРЕМЕННО ПО ПОДРАЗБИРАНЕ

Усилването се забравя, когато затворите раздела. Настройка, избрана за едно видео, никога не може да ви изненада седмици по-късно на друга страница.

Ако искате даден сайт винаги да се отваря с една и съща сила на звука, отметнете „Запомни този сайт“ в изскачащия прозорец. Страницата с настройки изброява всеки запазен сайт, позволява ви да редактирате или премахнете който и да е от тях и може да накара новите раздели да запомнят автоматично.

СЪОБРАЗЯВА СЕ СЪС СТРИЙМИНГ САЙТОВЕТЕ

Сайтове като YouTube, Twitch и Kick заменят видеоплейъра си, когато преминете към следващия епизод или поток, без да презареждат страницата. Много усилватели губят звука точно в този момент и продължават да показват ниво, което вече не прилагат. Това разширение следи подмяната и прилага отново настройките ви към новия плейър, така че силата на звука, която сте задали, остава силата, която чувате.

ПОВЕРИТЕЛНОСТ

Без проследяване. Без анализи. Без акаунт. Без мрежови заявки от какъвто и да е вид, дори за шрифтове. Вашите настройки никога не напускат собственото ви устройство.

КАКВО НЕ МОЖЕ

Защитените с DRM услуги като Netflix, Disney+, Prime Video и Spotify скриват звука си от разширенията по замисъл, затова не могат да бъдат усилени. Когато дадена страница не може да бъде обработена, изскачащият прозорец го казва ясно, вместо мълчаливо да не прави нищо.

Страниците на браузъра като chrome:// и уеб магазинът са недостъпни за всяко разширение, включително това.

МОЛЯ, УСИЛВАЙТЕ ОТГОВОРНО

Високата сила на звука може да увреди както слуха, така и високоговорителите ви, особено със слушалки. Лимитерът е включен по подразбиране над 100% и е добре да го оставите включен. Повишаването на тавана над 600% в настройките е на ваша собствена отговорност.

ОТВОРЕН КОД

Изходен код, проследяване на проблеми и ръководство за принос:
https://github.com/ramazansancar/volume-booster-tab-extension

Лицензирано под GNU Affero General Public License v3.0.
```

## `bn` — বাংলা

_Translated from the English description._

```text
Volume Booster Tab যেকোনো ব্রাউজার ট্যাবের ভলিউম পৃষ্ঠাটি নিজে যতটা অনুমতি দেয় তার চেয়েও বাড়িয়ে দেয়, এবং সেই শব্দ কীভাবে গঠিত হবে তার ওপর আপনাকে প্রকৃত নিয়ন্ত্রণ দেয়।

বৈশিষ্ট্য

- ০% থেকে ৬০০% পর্যন্ত বৃদ্ধি, সেটিংসে ১০০০% পর্যন্ত বাড়ানো যায়
- লিমিটার, যা বাড়ানোর সময় বিকৃতি ও কানে লাগা তীক্ষ্ণ শিখর ঠেকায়
- উন্নত সেটিংসের অধীনে ৬০ হার্জ থেকে ১০ কিলোহার্জ পর্যন্ত ৬-ব্যান্ড ইকুয়ালাইজার
- সম্পূর্ণ বাঁ থেকে সম্পূর্ণ ডান পর্যন্ত স্টেরিও ব্যালান্স
- একটি ইয়ারবাড দিয়ে শোনার জন্য মনো ডাউনমিক্স
- প্রক্রিয়াকৃত ও অপরিবর্তিত শব্দ সঙ্গে সঙ্গে তুলনা করার জন্য বাইপাস সুইচ
- ৫৫টি ভাষায় উপলব্ধ, সম্পূর্ণ অনূদিত

প্রতিটি ট্যাব স্বাধীন

বেশিরভাগ ভলিউম বুস্টার ঠিক এখানেই ভুল করে। প্রতিটি ট্যাব নিজস্ব ভলিউম, নিজস্ব ইকুয়ালাইজার কার্ভ, নিজস্ব ব্যালান্স ধরে রাখে। একটি ট্যাবে ৩০০%-এ স্ট্রিম আর অন্যটিতে ১২০%-এ গান চালান; একটি বদলালে অন্যটিতে কখনও হাত পড়ে না।

টুলবারের ব্যাজ আপনি যে ট্যাবটি দেখছেন তার মাত্রা দেখায়, তাই এক নজরেই বোঝা যায় কোন ট্যাবগুলো বাড়ানো আছে।

ডিফল্টভাবে অস্থায়ী

ট্যাব বন্ধ করলেই বৃদ্ধি ভুলে যাওয়া হয়। একটি ভিডিওর জন্য বেছে নেওয়া সেটিং কয়েক সপ্তাহ পরে অন্য কোনো পৃষ্ঠায় আপনাকে চমকে দিতে পারে না।

কোনো সাইট সবসময় একই ভলিউমে খুলুক চাইলে পপআপে "এই সাইটটি মনে রাখো" টিক দিন। সেটিংস পৃষ্ঠা আপনার সংরক্ষিত প্রতিটি সাইট তালিকাভুক্ত করে, যেকোনোটি সম্পাদনা বা মুছে ফেলতে দেয়, এবং নতুন ট্যাবগুলোকে স্বয়ংক্রিয়ভাবে মনে রাখাতে পারে।

স্ট্রিমিং সাইটের সঙ্গে তাল মেলায়

YouTube, Twitch ও Kick-এর মতো সাইট পরবর্তী পর্ব বা স্ট্রিমে গেলে পৃষ্ঠা পুনরায় লোড না করেই তাদের ভিডিও প্লেয়ার বদলে ফেলে। অনেক বুস্টার ঠিক সেই মুহূর্তে শব্দ হারায় এবং এমন একটি মাত্রা দেখাতে থাকে যা তারা আর প্রয়োগ করছে না। এটি সেই বদলটি নজরে রাখে এবং নতুন প্লেয়ারে আপনার সেটিংস আবার প্রয়োগ করে, ফলে আপনি যে ভলিউম ঠিক করেছেন সেটিই শোনা ভলিউম হয়ে থাকে।

গোপনীয়তা

কোনো ট্র্যাকিং নেই। কোনো অ্যানালিটিক্স নেই। কোনো অ্যাকাউন্ট নেই। ফন্টের জন্যও কোনো ধরনের নেটওয়ার্ক অনুরোধ নেই। আপনার সেটিংস কখনও আপনার নিজের যন্ত্র ছেড়ে যায় না।

যা করতে পারে না

Netflix, Disney+, Prime Video ও Spotify-এর মতো DRM-সুরক্ষিত পরিষেবা নকশাগতভাবেই এক্সটেনশন থেকে তাদের শব্দ লুকিয়ে রাখে, তাই সেগুলো বাড়ানো যায় না। কোনো পৃষ্ঠা প্রক্রিয়া করা না গেলে পপআপ নীরবে কিছু না করে বরং স্পষ্ট করে তা জানায়।

chrome:// ও ওয়েব স্টোরের মতো ব্রাউজার পৃষ্ঠা এই এক্সটেনশনসহ প্রতিটি এক্সটেনশনের জন্য বন্ধ।

অনুগ্রহ করে দায়িত্বের সঙ্গে বাড়ান

উচ্চ ভলিউম, বিশেষত হেডফোনে, আপনার শ্রবণ ও স্পিকার দুটোরই ক্ষতি করতে পারে। ১০০%-এর ওপরে লিমিটার ডিফল্টভাবে চালু থাকে এবং সেটি চালু রাখাই উচিত। সেটিংসে সীমা ৬০০%-এর ওপরে তোলা সম্পূর্ণ আপনার নিজের ঝুঁকিতে।

উন্মুক্ত উৎস

সোর্স কোড, ইস্যু ট্র্যাকার ও অবদানের নির্দেশিকা:
https://github.com/ramazansancar/volume-booster-tab-extension

GNU Affero General Public License v3.0 অধীনে লাইসেন্সকৃত।
```

## `ca` — Català

_Translated from the English description._

```text
Volume Booster Tab apuja el volum de qualsevol pestanya del navegador més enllà del que permet la mateixa pàgina, i et dona un control real sobre com es modela aquest so.

CARACTERÍSTIQUES

- Amplificació del 0% al 600%, ampliable fins al 1000% a la configuració
- Limitador que evita la distorsió i els pics dolorosos en amplificar
- Equalitzador de 6 bandes, de 60 Hz a 10 kHz, dins de Configuració avançada
- Balanç estèreo, de tot a l'esquerra a tot a la dreta
- Barreja a mono per escoltar amb un sol auricular
- Interruptor de derivació per comparar a l'instant el so processat i l'original
- Disponible en 55 idiomes, totalment traduït

CADA PESTANYA ÉS INDEPENDENT

Aquí és on fallen la majoria d'amplificadors de volum. Cada pestanya conserva el seu propi volum, la seva pròpia corba d'equalització, el seu propi balanç. Posa una emissió al 300% en una pestanya i música al 120% en una altra; canviar-ne una no toca mai l'altra.

La insígnia de la barra d'eines mostra el nivell de la pestanya que estàs mirant, així saps d'un cop d'ull quines pestanyes estan amplificades.

TEMPORAL PER DEFECTE

L'amplificació s'oblida quan tanques la pestanya. Una configuració que vas triar per a un vídeo no et podrà sorprendre mai setmanes després en una altra pàgina.

Si vols que un lloc s'obri sempre amb el mateix volum, marca «Recorda aquest lloc» a la finestra emergent. La pàgina de configuració llista tots els llocs desats, et permet editar-ne o eliminar-ne qualsevol, i pot fer que les pestanyes noves ho recordin automàticament.

SEGUEIX EL RITME DELS LLOCS DE TRANSMISSIÓ

Llocs com YouTube, Twitch i Kick substitueixen el seu reproductor de vídeo quan passes al següent episodi o emissió, sense recarregar la pàgina. Molts amplificadors perden l'àudio justament en aquell moment i continuen mostrant un nivell que ja no apliquen. Aquest vigila el canvi i torna a aplicar la teva configuració al nou reproductor, de manera que el volum que has fixat continua sent el volum que sents.

PRIVADESA

Sense seguiment. Sense analítiques. Sense compte. Sense cap mena de sol·licitud de xarxa, ni tan sols per a tipus de lletra. La teva configuració no surt mai del teu propi dispositiu.

QUÈ NO POT FER

Els serveis protegits amb DRM com Netflix, Disney+, Prime Video i Spotify amaguen el seu àudio a les extensions per disseny, de manera que no es poden amplificar. Quan una pàgina no es pot processar, la finestra emergent ho diu clarament en comptes de no fer res en silenci.

Les pàgines del navegador com chrome:// i la botiga web estan vetades a totes les extensions, inclosa aquesta.

AMPLIFICA AMB RESPONSABILITAT

Un volum alt pot danyar tant l'oïda com els altaveus, sobretot amb auriculars. El limitador està activat per defecte per sobre del 100% i és recomanable deixar-lo activat. Apujar el límit més enllà del 600% a la configuració és sota la teva responsabilitat.

CODI OBERT

Codi font, seguiment d'incidències i guia de contribució:
https://github.com/ramazansancar/volume-booster-tab-extension

Amb llicència GNU Affero General Public License v3.0.
```

## `cs` — Čeština

_Translated from the English description._

```text
Volume Booster Tab zvyšuje hlasitost libovolné karty prohlížeče nad rámec toho, co dovoluje samotná stránka, a dává vám skutečnou kontrolu nad tím, jak je zvuk tvarován.

FUNKCE

- Zesílení od 0 % do 600 %, v nastavení zvýšitelné až na 1000 %
- Limiter, který při zesilování brání zkreslení a bolestivým špičkám
- Šestipásmový ekvalizér od 60 Hz do 10 kHz v Pokročilém nastavení
- Stereo vyvážení, od zcela vlevo po zcela vpravo
- Smíchání do mono pro poslech jedním sluchátkem
- Přepínač obejití pro okamžité porovnání zpracovaného a původního zvuku
- K dispozici v 55 jazycích, kompletně přeloženo

KAŽDÁ KARTA JE NEZÁVISLÁ

Právě v tomhle většina zesilovačů hlasitosti chybuje. Každá karta si drží vlastní hlasitost, vlastní křivku ekvalizéru, vlastní vyvážení. Pusťte si přenos na 300 % v jedné kartě a hudbu na 120 % ve druhé; změna jedné se té druhé nikdy nedotkne.

Odznak na liště nástrojů ukazuje úroveň karty, na kterou se právě díváte, takže na první pohled poznáte, které karty jsou zesílené.

VE VÝCHOZÍM STAVU DOČASNÉ

Zesílení se zapomene, jakmile kartu zavřete. Nastavení zvolené pro jedno video vás nikdy nemůže o týdny později překvapit na jiné stránce.

Pokud chcete, aby se web vždy otevíral se stejnou hlasitostí, zaškrtněte v okně „Zapamatovat si tento web“. Stránka nastavení vypisuje každý uložený web, umožňuje kterýkoli z nich upravit či odebrat a dokáže zařídit, aby si nové karty pamatovaly automaticky.

DRŽÍ KROK SE STREAMOVACÍMI WEBY

Weby jako YouTube, Twitch a Kick vyměňují svůj přehrávač videa, když přejdete na další díl nebo přenos, aniž by znovu načetly stránku. Mnoho zesilovačů v tu chvíli ztratí zvuk a dál zobrazuje úroveň, kterou už neuplatňuje. Tento výměnu sleduje a znovu použije vaše nastavení na nový přehrávač, takže hlasitost, kterou jste nastavili, zůstává hlasitostí, kterou slyšíte.

SOUKROMÍ

Žádné sledování. Žádná analytika. Žádný účet. Žádné síťové požadavky jakéhokoli druhu, ani kvůli písmům. Vaše nastavení nikdy neopustí vaše vlastní zařízení.

CO NEDOKÁŽE

Služby chráněné DRM jako Netflix, Disney+, Prime Video a Spotify skrývají svůj zvuk před rozšířeními už ze své podstaty, takže je zesílit nelze. Když stránku nelze zpracovat, okno to řekne přímo, místo aby tiše nedělalo nic.

Stránky prohlížeče jako chrome:// a internetový obchod jsou zapovězeny každému rozšíření, včetně tohoto.

ZESILUJTE PROSÍM ZODPOVĚDNĚ

Vysoká hlasitost může poškodit jak váš sluch, tak reproduktory, obzvlášť se sluchátky. Limiter je nad 100 % ve výchozím stavu zapnutý a měli byste ho zapnutý nechat. Zvýšení stropu nad 600 % v nastavení je na vaše vlastní riziko.

OTEVŘENÝ ZDROJ

Zdrojový kód, sledování chyb a průvodce přispíváním:
https://github.com/ramazansancar/volume-booster-tab-extension

Licencováno pod GNU Affero General Public License v3.0.
```

## `da` — Dansk

_Translated from the English description._

```text
Volume Booster Tab hæver lydstyrken på enhver browserfane ud over, hvad siden selv tillader, og giver dig reel kontrol over, hvordan den lyd formes.

FUNKTIONER

- Forstærkning fra 0 % til 600 %, kan hæves til 1000 % i indstillingerne
- Limiter, der forhindrer forvrængning og smertefulde spidser ved forstærkning
- 6-bånds equalizer, 60 Hz til 10 kHz, under Avancerede indstillinger
- Stereobalance, fra helt til venstre til helt til højre
- Mononedmix til at lytte med kun én ørepop
- Bypass-kontakt til øjeblikkeligt at sammenligne behandlet og ubehandlet lyd
- Tilgængelig på 55 sprog, fuldt oversat

HVER FANE ER UAFHÆNGIG

Det er her, de fleste lydforstærkere fejler. Hver fane bevarer sin egen lydstyrke, sin egen equalizerkurve, sin egen balance. Kør en stream ved 300 % i én fane og musik ved 120 % i en anden; at ændre den ene rører aldrig den anden.

Mærket på værktøjslinjen viser niveauet for den fane, du kigger på, så du med et blik kan se, hvilke faner der er forstærket.

MIDLERTIDIG SOM STANDARD

En forstærkning glemmes, når du lukker fanen. En indstilling, du valgte til én video, kan aldrig overraske dig uger senere på en anden side.

Hvis du vil have et websted til altid at åbne med samme lydstyrke, skal du markere "Husk dette websted" i pop op-vinduet. Indstillingssiden viser hvert gemt websted, lader dig redigere eller fjerne et hvilket som helst af dem, og kan få nye faner til at huske automatisk.

FØLGER MED STREAMINGSIDER

Sider som YouTube, Twitch og Kick udskifter deres videoafspiller, når du går til næste afsnit eller stream, uden at genindlæse siden. Mange forstærkere mister lyden netop i det øjeblik og bliver ved med at vise et niveau, de ikke længere anvender. Denne holder øje med udskiftningen og anvender dine indstillinger igen på den nye afspiller, så den lydstyrke, du har indstillet, forbliver den lydstyrke, du hører.

PRIVATLIV

Ingen sporing. Ingen analyse. Ingen konto. Ingen netværksanmodninger af nogen art, ikke engang til skrifttyper. Dine indstillinger forlader aldrig din egen maskine.

HVAD DEN IKKE KAN

DRM-beskyttede tjenester som Netflix, Disney+, Prime Video og Spotify skjuler deres lyd for udvidelser som en del af designet, så de kan ikke forstærkes. Når en side ikke kan behandles, siger pop op-vinduet det ligeud i stedet for stille og roligt ikke at gøre noget.

Browsersider som chrome:// og webbutikken er lukket land for enhver udvidelse, også denne.

FORSTÆRK VENLIGST ANSVARLIGT

Høj lydstyrke kan skade både din hørelse og dine højttalere, især med hovedtelefoner. Limiteren er som standard slået til over 100 %, og du bør lade den være slået til. At hæve loftet ud over 600 % i indstillingerne sker på eget ansvar.

OPEN SOURCE

Kildekode, fejlsporing og bidragsvejledning:
https://github.com/ramazansancar/volume-booster-tab-extension

Licenseret under GNU Affero General Public License v3.0.
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

## `fa` — فارسی

_Translated from the English description._

```text
Volume Booster Tab صدای هر زبانهٔ مرورگر را فراتر از آنچه خود صفحه اجازه می‌دهد بالا می‌برد و کنترلی واقعی بر چگونگی شکل‌گیری آن صدا به شما می‌دهد.

ویژگی‌ها

- تقویت از ۰٪ تا ۶۰۰٪، با قابلیت افزایش تا ۱۰۰۰٪ در تنظیمات
- محدودکننده‌ای که هنگام تقویت از اعوجاج و اوج‌های آزاردهنده جلوگیری می‌کند
- اکولایزر ۶ باندی، از ۶۰ هرتز تا ۱۰ کیلوهرتز، در تنظیمات پیشرفته
- توازن استریو، از کاملاً چپ تا کاملاً راست
- ترکیب مونو برای گوش دادن با یک هندزفری
- کلید دور زدن برای مقایسهٔ فوری صدای پردازش‌شده و صدای اصلی
- در دسترس به ۵۵ زبان، کاملاً ترجمه‌شده

هر زبانه مستقل است

بیشتر افزونه‌های تقویت صدا دقیقاً همین‌جا اشتباه می‌کنند. هر زبانه صدای خود، منحنی اکولایزر خود و توازن خود را نگه می‌دارد. در یک زبانه پخش زنده را روی ۳۰۰٪ و در زبانهٔ دیگر موسیقی را روی ۱۲۰٪ اجرا کنید؛ تغییر یکی هرگز به دیگری دست نمی‌زند.

نشان نوار ابزار سطح زبانه‌ای را که می‌بینید نمایش می‌دهد، بنابراین با یک نگاه می‌فهمید کدام زبانه‌ها تقویت شده‌اند.

به‌طور پیش‌فرض موقتی

با بستن زبانه، تقویت فراموش می‌شود. تنظیمی که برای یک ویدئو انتخاب کرده‌اید هرگز نمی‌تواند هفته‌ها بعد در صفحه‌ای دیگر غافلگیرتان کند.

اگر می‌خواهید سایتی همیشه با همان صدا باز شود، در پنجرهٔ بازشو گزینهٔ «این سایت را به خاطر بسپار» را علامت بزنید. صفحهٔ تنظیمات همهٔ سایت‌های ذخیره‌شده را فهرست می‌کند، امکان ویرایش یا حذف هرکدام را می‌دهد و می‌تواند کاری کند که زبانه‌های جدید به‌طور خودکار به خاطر بسپارند.

با سایت‌های پخش هم‌گام است

سایت‌هایی مانند YouTube، Twitch و Kick هنگام رفتن به قسمت یا پخش بعدی، بدون بارگذاری مجدد صفحه، پخش‌کنندهٔ ویدئوی خود را عوض می‌کنند. بسیاری از افزونه‌ها دقیقاً در همان لحظه صدا را از دست می‌دهند و همچنان سطحی را نشان می‌دهند که دیگر اعمال نمی‌کنند. این افزونه تعویض را زیر نظر می‌گیرد و تنظیمات شما را دوباره روی پخش‌کنندهٔ جدید اعمال می‌کند، بنابراین صدایی که تنظیم کرده‌اید همان صدایی می‌ماند که می‌شنوید.

حریم خصوصی

بدون ردیابی. بدون تحلیل. بدون حساب کاربری. بدون هیچ‌گونه درخواست شبکه، حتی برای قلم‌ها. تنظیمات شما هرگز از دستگاه خودتان خارج نمی‌شود.

آنچه نمی‌تواند انجام دهد

سرویس‌های محافظت‌شده با DRM مانند Netflix، Disney+، Prime Video و Spotify صدای خود را از روی طراحی از افزونه‌ها پنهان می‌کنند، پس نمی‌توان آن‌ها را تقویت کرد. وقتی صفحه‌ای قابل پردازش نباشد، پنجرهٔ بازشو به‌جای آنکه در سکوت کاری نکند، این را صریح می‌گوید.

صفحه‌های مرورگر مانند chrome:// و فروشگاه وب برای هر افزونه‌ای، از جمله همین افزونه، ممنوع هستند.

لطفاً مسئولانه تقویت کنید

صدای بلند می‌تواند هم به شنوایی و هم به بلندگوهای شما آسیب بزند، به‌ویژه با هدفون. محدودکننده بالای ۱۰۰٪ به‌طور پیش‌فرض روشن است و بهتر است روشن بماند. بالا بردن سقف فراتر از ۶۰۰٪ در تنظیمات با مسئولیت خودتان است.

متن‌باز

کد منبع، پیگیری مشکلات و راهنمای مشارکت:
https://github.com/ramazansancar/volume-booster-tab-extension

تحت مجوز GNU Affero General Public License v3.0 منتشر شده است.
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

## `gu` — ગુજરાતી

_Translated from the English description._

```text
Volume Booster Tab કોઈપણ બ્રાઉઝર ટૅબનો અવાજ પૃષ્ઠ પોતે જેટલી મંજૂરી આપે તેનાથી પણ વધારે ઊંચો કરે છે, અને એ અવાજ કેવી રીતે ઘડાય તેના પર તમને ખરેખરું નિયંત્રણ આપે છે.

વિશેષતાઓ

- 0% થી 600% સુધી વધારો, સેટિંગ્સમાં 1000% સુધી વધારી શકાય
- લિમિટર જે વધારતી વખતે વિકૃતિ અને કાનને દુખતા શિખરો અટકાવે છે
- અદ્યતન સેટિંગ્સ હેઠળ 60 Hz થી 10 kHz સુધીનું 6-બૅન્ડ ઇક્વલાઇઝર
- સંપૂર્ણ ડાબેથી સંપૂર્ણ જમણે સુધીનું સ્ટીરિયો સંતુલન
- એક જ ઇયરબડથી સાંભળવા માટે મોનો ડાઉનમિક્સ
- પ્રક્રિયા કરેલા અને મૂળ અવાજની તરત સરખામણી કરવા માટે બાયપાસ સ્વિચ
- 55 ભાષાઓમાં ઉપલબ્ધ, સંપૂર્ણપણે અનૂદિત

દરેક ટૅબ સ્વતંત્ર છે

મોટાભાગના વૉલ્યુમ બૂસ્ટર અહીં જ ભૂલ કરે છે. દરેક ટૅબ પોતાનો અવાજ, પોતાનો ઇક્વલાઇઝર વળાંક, પોતાનું સંતુલન જાળવી રાખે છે. એક ટૅબમાં સ્ટ્રીમ 300% પર અને બીજામાં સંગીત 120% પર ચલાવો; એકને બદલવાથી બીજાને ક્યારેય સ્પર્શ થતો નથી.

ટૂલબાર બૅજ તમે જે ટૅબ જોઈ રહ્યા છો તેનું સ્તર બતાવે છે, જેથી એક નજરમાં ખબર પડે કે કયા ટૅબ વધારેલા છે.

મૂળભૂત રીતે કામચલાઉ

ટૅબ બંધ કરતાં જ વધારો ભૂલી જવાય છે. એક વીડિયો માટે પસંદ કરેલું સેટિંગ અઠવાડિયાં પછી બીજા પૃષ્ઠ પર તમને ક્યારેય ચોંકાવી શકતું નથી.

જો તમે ઇચ્છો કે કોઈ સાઇટ હંમેશાં એક જ અવાજે ખૂલે, તો પૉપઅપમાં "આ સાઇટ યાદ રાખો" પર ટિક કરો. સેટિંગ્સ પૃષ્ઠ તમે સાચવેલી દરેક સાઇટની યાદી આપે છે, કોઈપણને સંપાદિત કે દૂર કરવા દે છે, અને નવા ટૅબ આપોઆપ યાદ રાખે એવું કરી શકે છે.

સ્ટ્રીમિંગ સાઇટ્સ સાથે તાલ મિલાવે છે

YouTube, Twitch અને Kick જેવી સાઇટ્સ જ્યારે તમે આગલા એપિસોડ કે સ્ટ્રીમ પર જાઓ ત્યારે પૃષ્ઠ ફરી લોડ કર્યા વિના પોતાનું વીડિયો પ્લેયર બદલી નાખે છે. ઘણા બૂસ્ટર બરાબર એ જ ક્ષણે અવાજ ગુમાવે છે અને એવું સ્તર બતાવતા રહે છે જે તેઓ હવે લાગુ કરતા નથી. આ એક્સ્ટેંશન એ ફેરફાર પર નજર રાખે છે અને તમારાં સેટિંગ્સ નવા પ્લેયર પર ફરી લાગુ કરે છે, જેથી તમે સેટ કરેલો અવાજ એ જ અવાજ રહે જે તમે સાંભળો છો.

ગોપનીયતા

કોઈ ટ્રેકિંગ નહીં. કોઈ એનાલિટિક્સ નહીં. કોઈ ખાતું નહીં. ફૉન્ટ માટે પણ કોઈપણ પ્રકારની નેટવર્ક વિનંતી નહીં. તમારાં સેટિંગ્સ ક્યારેય તમારા પોતાના ઉપકરણમાંથી બહાર જતાં નથી.

જે કરી શકતું નથી

Netflix, Disney+, Prime Video અને Spotify જેવી DRM-સુરક્ષિત સેવાઓ રચનાથી જ પોતાનો અવાજ એક્સ્ટેંશનથી છુપાવે છે, તેથી તેમને વધારી શકાતા નથી. જ્યારે કોઈ પૃષ્ઠ પર પ્રક્રિયા ન થઈ શકે, ત્યારે પૉપઅપ ચૂપચાપ કશું ન કરવાને બદલે એ સ્પષ્ટ કહી દે છે.

chrome:// અને વેબ સ્ટોર જેવાં બ્રાઉઝર પૃષ્ઠો આ સહિત દરેક એક્સ્ટેંશન માટે બંધ છે.

કૃપા કરીને જવાબદારીપૂર્વક વધારો

ઊંચો અવાજ, ખાસ કરીને હેડફોન સાથે, તમારી શ્રવણશક્તિ અને સ્પીકર બંનેને નુકસાન કરી શકે છે. 100% થી ઉપર લિમિટર મૂળભૂત રીતે ચાલુ રહે છે અને તેને ચાલુ જ રાખવું જોઈએ. સેટિંગ્સમાં મર્યાદા 600% થી ઉપર લઈ જવી એ સંપૂર્ણપણે તમારા પોતાના જોખમે છે.

ઓપન સોર્સ

સોર્સ કોડ, ઇશ્યુ ટ્રૅકર અને યોગદાન માર્ગદર્શિકા:
https://github.com/ramazansancar/volume-booster-tab-extension

GNU Affero General Public License v3.0 હેઠળ લાઇસન્સ પ્રાપ્ત.
```

## `he` — עברית

_Translated from the English description._

```text
‏Volume Booster Tab מגביר את עוצמת הקול של כל לשונית בדפדפן מעבר למה שהדף עצמו מתיר, ונותן לך שליטה אמיתית באופן שבו הצליל מעוצב.

תכונות

- הגברה מ‑0% עד 600%, ניתן להעלות עד 1000% בהגדרות
- מגביל שמונע עיוות ושיאים כואבים בעת ההגברה
- אקולייזר 6 רצועות, מ‑60 הרץ עד 10 קילוהרץ, תחת הגדרות מתקדמות
- איזון סטריאו, מקצה שמאל ועד קצה ימין
- מיזוג למונו להאזנה עם אוזנייה אחת
- מתג עקיפה להשוואה מיידית בין הצליל המעובד למקורי
- זמין ב‑55 שפות, מתורגם במלואו

כל לשונית עצמאית

כאן בדיוק טועים רוב מגבירי הקול. כל לשונית שומרת על עוצמת הקול שלה, על עקומת האקולייזר שלה, על האיזון שלה. הרץ שידור ב‑300% בלשונית אחת ומוזיקה ב‑120% באחרת; שינוי באחת לעולם אינו נוגע בשנייה.

התג בסרגל הכלים מציג את הרמה של הלשונית שאתה צופה בה, כך שתדע במבט אחד אילו לשוניות מוגברות.

זמני כברירת מחדל

ההגברה נשכחת כשסוגרים את הלשונית. הגדרה שבחרת לסרטון אחד לא תוכל להפתיע אותך שבועות אחר כך בדף אחר.

אם ברצונך שאתר ייפתח תמיד באותה עוצמה, סמן «זכור אתר זה» בחלון הקופץ. דף ההגדרות מציג את כל האתרים ששמרת, מאפשר לערוך או להסיר כל אחד מהם, ויכול לגרום ללשוניות חדשות לזכור אוטומטית.

עומד בקצב אתרי הסטרימינג

אתרים כמו YouTube, Twitch ו‑Kick מחליפים את נגן הווידאו שלהם כשעוברים לפרק או לשידור הבא, בלי לטעון מחדש את הדף. מגבירים רבים מאבדים את הקול בדיוק באותו רגע וממשיכים להציג רמה שהם כבר אינם מיישמים. התוסף הזה עוקב אחר ההחלפה ומיישם מחדש את ההגדרות שלך על הנגן החדש, כך שעוצמת הקול שקבעת נשארת העוצמה שאתה שומע.

פרטיות

בלי מעקב. בלי אנליטיקה. בלי חשבון. בלי בקשות רשת מכל סוג, אפילו לא לגופנים. ההגדרות שלך לעולם אינן עוזבות את המכשיר שלך.

מה הוא אינו יכול לעשות

שירותים המוגנים ב‑DRM כמו Netflix, Disney+‎, Prime Video ו‑Spotify מסתירים את השמע שלהם מתוספים מעצם התכנון, ולכן לא ניתן להגביר אותם. כשלא ניתן לעבד דף, החלון הקופץ אומר זאת במפורש במקום פשוט לא לעשות דבר.

דפי דפדפן כמו chrome:// וחנות האינטרנט חסומים לכל תוסף, כולל זה.

נא להגביר באחריות

עוצמת קול גבוהה עלולה לפגוע הן בשמיעה שלך והן ברמקולים, במיוחד עם אוזניות. המגביל פועל כברירת מחדל מעל 100% וכדאי להשאיר אותו פועל. העלאת התקרה מעבר ל‑600% בהגדרות היא באחריותך בלבד.

קוד פתוח

קוד מקור, מעקב תקלות ומדריך תרומה:
https://github.com/ramazansancar/volume-booster-tab-extension

מורשה תחת רישיון GNU Affero General Public License v3.0.
```

## `hi` — हिन्दी

_Translated from the English description._

```text
Volume Booster Tab किसी भी ब्राउज़र टैब की आवाज़ को उससे भी ऊपर ले जाता है जितनी पेज खुद अनुमति देता है, और उस ध्वनि को कैसे ढाला जाए इस पर आपको असली नियंत्रण देता है।

विशेषताएँ

- 0% से 600% तक वृद्धि, सेटिंग्स में 1000% तक बढ़ाई जा सकती है
- लिमिटर जो बढ़ाते समय विकृति और कानों को चुभने वाली चोटियों को रोकता है
- उन्नत सेटिंग्स के अंतर्गत 60 Hz से 10 kHz तक 6-बैंड इक्वलाइज़र
- पूरी तरह बाएँ से पूरी तरह दाएँ तक स्टीरियो संतुलन
- एक ही इयरबड से सुनने के लिए मोनो डाउनमिक्स
- संसाधित और मूल ध्वनि की तुरंत तुलना करने के लिए बायपास स्विच
- 55 भाषाओं में उपलब्ध, पूरी तरह अनूदित

हर टैब स्वतंत्र है

अधिकांश वॉल्यूम बूस्टर यहीं चूक जाते हैं। हर टैब अपनी आवाज़, अपना इक्वलाइज़र वक्र, अपना संतुलन बनाए रखता है। एक टैब में स्ट्रीम 300% पर और दूसरे में संगीत 120% पर चलाइए; एक को बदलने से दूसरे पर कभी असर नहीं पड़ता।

टूलबार बैज उस टैब का स्तर दिखाता है जिसे आप देख रहे हैं, इसलिए एक नज़र में पता चल जाता है कि कौन-से टैब बढ़ाए गए हैं।

डिफ़ॉल्ट रूप से अस्थायी

टैब बंद करते ही वृद्धि भुला दी जाती है। एक वीडियो के लिए चुनी गई सेटिंग हफ़्तों बाद किसी दूसरे पेज पर आपको कभी चौंका नहीं सकती।

अगर आप चाहते हैं कि कोई साइट हमेशा एक ही आवाज़ पर खुले, तो पॉपअप में "इस साइट को याद रखें" पर टिक करें। सेटिंग्स पेज आपकी सहेजी हुई हर साइट की सूची देता है, किसी को भी संपादित या हटाने देता है, और नए टैब को स्वतः याद रखने पर सेट कर सकता है।

स्ट्रीमिंग साइटों के साथ कदम मिलाता है

YouTube, Twitch और Kick जैसी साइटें अगले एपिसोड या स्ट्रीम पर जाते समय पेज दोबारा लोड किए बिना अपना वीडियो प्लेयर बदल देती हैं। कई बूस्टर ठीक उसी क्षण आवाज़ खो देते हैं और ऐसा स्तर दिखाते रहते हैं जिसे वे अब लागू नहीं कर रहे। यह एक्सटेंशन उस अदला-बदली पर नज़र रखता है और आपकी सेटिंग्स नए प्लेयर पर दोबारा लागू करता है, ताकि आपने जो आवाज़ तय की वही आवाज़ आपको सुनाई देती रहे।

गोपनीयता

कोई ट्रैकिंग नहीं। कोई एनालिटिक्स नहीं। कोई खाता नहीं। फ़ॉन्ट के लिए भी किसी प्रकार का नेटवर्क अनुरोध नहीं। आपकी सेटिंग्स कभी आपके अपने उपकरण से बाहर नहीं जातीं।

यह क्या नहीं कर सकता

Netflix, Disney+, Prime Video और Spotify जैसी DRM-संरक्षित सेवाएँ डिज़ाइन से ही अपनी ऑडियो एक्सटेंशन से छिपाती हैं, इसलिए उन्हें बढ़ाया नहीं जा सकता। जब किसी पेज को संसाधित नहीं किया जा सकता, तो पॉपअप चुपचाप कुछ न करने के बजाय यह साफ़-साफ़ बता देता है।

chrome:// और वेब स्टोर जैसे ब्राउज़र पेज इस एक्सटेंशन सहित हर एक्सटेंशन के लिए बंद हैं।

कृपया ज़िम्मेदारी से बढ़ाएँ

ऊँची आवाज़ आपकी सुनने की क्षमता और स्पीकर दोनों को नुकसान पहुँचा सकती है, खासकर हेडफ़ोन के साथ। 100% से ऊपर लिमिटर डिफ़ॉल्ट रूप से चालू रहता है और इसे चालू ही रहने देना चाहिए। सेटिंग्स में सीमा को 600% से ऊपर ले जाना पूरी तरह आपके अपने जोखिम पर है।

ओपन सोर्स

सोर्स कोड, इशू ट्रैकर और योगदान मार्गदर्शिका:
https://github.com/ramazansancar/volume-booster-tab-extension

GNU Affero General Public License v3.0 के अंतर्गत लाइसेंस प्राप्त।
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

## `id` — Indonesia

_Translated from the English description._

```text
Volume Booster Tab menaikkan volume tab peramban mana pun melampaui yang diizinkan halaman itu sendiri, dan memberi Anda kendali nyata atas bagaimana suara itu dibentuk.

FITUR

- Penguatan dari 0% hingga 600%, dapat dinaikkan sampai 1000% di pengaturan
- Limiter yang mencegah distorsi dan puncak yang menyakitkan saat menguatkan
- Ekualiser 6 pita, 60 Hz sampai 10 kHz, di bawah Pengaturan lanjutan
- Keseimbangan stereo, dari penuh kiri sampai penuh kanan
- Penggabungan mono untuk mendengarkan dengan satu earbud saja
- Sakelar bypass untuk membandingkan suara yang diproses dan yang asli secara langsung
- Tersedia dalam 55 bahasa, diterjemahkan sepenuhnya

SETIAP TAB BERDIRI SENDIRI

Di sinilah kebanyakan penguat volume keliru. Setiap tab menyimpan volumenya sendiri, kurva ekualisernya sendiri, keseimbangannya sendiri. Jalankan siaran pada 300% di satu tab dan musik pada 120% di tab lain; mengubah yang satu tidak pernah menyentuh yang lain.

Lencana bilah alat menampilkan level tab yang sedang Anda lihat, sehingga Anda langsung tahu tab mana yang dikuatkan.

SEMENTARA SECARA BAWAAN

Penguatan dilupakan saat Anda menutup tab. Pengaturan yang Anda pilih untuk satu video tidak akan pernah mengejutkan Anda berminggu-minggu kemudian di halaman lain.

Jika Anda ingin sebuah situs selalu terbuka dengan volume yang sama, centang "Ingat situs ini" di popup. Halaman pengaturan mencantumkan setiap situs yang Anda simpan, memungkinkan Anda mengubah atau menghapus salah satunya, dan dapat membuat tab baru mengingat secara otomatis.

MENGIKUTI SITUS STREAMING

Situs seperti YouTube, Twitch, dan Kick mengganti pemutar videonya saat Anda beralih ke episode atau siaran berikutnya, tanpa memuat ulang halaman. Banyak penguat kehilangan audio tepat pada saat itu dan terus menampilkan level yang tidak lagi diterapkan. Yang ini mengawasi pergantian tersebut dan menerapkan kembali pengaturan Anda ke pemutar baru, sehingga volume yang Anda atur tetap menjadi volume yang Anda dengar.

PRIVASI

Tanpa pelacakan. Tanpa analitik. Tanpa akun. Tanpa permintaan jaringan dalam bentuk apa pun, bahkan untuk fon. Pengaturan Anda tidak pernah meninggalkan perangkat Anda sendiri.

YANG TIDAK BISA DILAKUKAN

Layanan yang dilindungi DRM seperti Netflix, Disney+, Prime Video, dan Spotify menyembunyikan audionya dari ekstensi secara bawaan rancangan, sehingga tidak dapat dikuatkan. Ketika sebuah halaman tidak dapat diproses, popup mengatakannya dengan jelas alih-alih diam tanpa melakukan apa pun.

Halaman peramban seperti chrome:// dan Web Store tertutup bagi setiap ekstensi, termasuk yang ini.

MOHON KUATKAN DENGAN BIJAK

Volume tinggi dapat merusak pendengaran maupun pengeras suara Anda, terutama dengan headphone. Limiter aktif secara bawaan di atas 100% dan sebaiknya Anda biarkan aktif. Menaikkan batas melampaui 600% di pengaturan adalah risiko Anda sendiri.

SUMBER TERBUKA

Kode sumber, pelacak masalah, dan panduan kontribusi:
https://github.com/ramazansancar/volume-booster-tab-extension

Dilisensikan di bawah GNU Affero General Public License v3.0.
```

## `it` — Italiano

_Translated from the English description._

```text
Volume Booster Tab alza il volume di qualsiasi scheda del browser oltre quanto la pagina stessa consente, e ti dà un controllo reale su come quel suono viene modellato.

FUNZIONALITÀ

- Amplificazione dallo 0% al 600%, elevabile al 1000% nelle impostazioni
- Limitatore che previene la distorsione e i picchi fastidiosi durante l'amplificazione
- Equalizzatore a 6 bande, da 60 Hz a 10 kHz, in Impostazioni avanzate
- Bilanciamento stereo, da tutto a sinistra a tutto a destra
- Riduzione in mono per ascoltare con un solo auricolare
- Interruttore di bypass per confrontare all'istante il suono elaborato e quello originale
- Disponibile in 55 lingue, completamente tradotto

OGNI SCHEDA È INDIPENDENTE

È qui che la maggior parte degli amplificatori di volume sbaglia. Ogni scheda mantiene il proprio volume, la propria curva di equalizzazione, il proprio bilanciamento. Fai andare una diretta al 300% in una scheda e musica al 120% in un'altra; modificare l'una non tocca mai l'altra.

Il badge sulla barra degli strumenti mostra il livello della scheda che stai guardando, così capisci a colpo d'occhio quali schede sono amplificate.

TEMPORANEO PER IMPOSTAZIONE PREDEFINITA

L'amplificazione viene dimenticata quando chiudi la scheda. Un'impostazione scelta per un video non potrà mai sorprenderti settimane dopo su un'altra pagina.

Se vuoi che un sito si apra sempre con lo stesso volume, spunta «Ricorda questo sito» nel popup. La pagina delle impostazioni elenca ogni sito salvato, ti permette di modificarne o rimuoverne uno qualsiasi e può far sì che le nuove schede ricordino automaticamente.

STA AL PASSO CON I SITI DI STREAMING

Siti come YouTube, Twitch e Kick sostituiscono il loro lettore video quando passi all'episodio o alla diretta successiva, senza ricaricare la pagina. Molti amplificatori perdono l'audio proprio in quel momento e continuano a mostrare un livello che non stanno più applicando. Questo sorveglia la sostituzione e riapplica le tue impostazioni al nuovo lettore, così il volume che hai impostato resta il volume che senti.

PRIVACY

Nessun tracciamento. Nessuna analisi. Nessun account. Nessuna richiesta di rete di alcun tipo, nemmeno per i caratteri. Le tue impostazioni non lasciano mai il tuo dispositivo.

COSA NON PUÒ FARE

I servizi protetti da DRM come Netflix, Disney+, Prime Video e Spotify nascondono il proprio audio alle estensioni per progettazione, quindi non possono essere amplificati. Quando una pagina non può essere elaborata, il popup lo dice chiaramente invece di non fare nulla in silenzio.

Le pagine del browser come chrome:// e il Web Store sono precluse a ogni estensione, inclusa questa.

AMPLIFICA CON RESPONSABILITÀ

Un volume elevato può danneggiare sia il tuo udito sia i tuoi altoparlanti, soprattutto con le cuffie. Il limitatore è attivo per impostazione predefinita oltre il 100% e conviene lasciarlo attivo. Alzare il limite oltre il 600% nelle impostazioni è a tuo rischio.

OPEN SOURCE

Codice sorgente, tracciamento dei problemi e guida ai contributi:
https://github.com/ramazansancar/volume-booster-tab-extension

Concesso in licenza con la GNU Affero General Public License v3.0.
```

## `ja` — 日本語

_Translated from the English description._

```text
Volume Booster Tab は、ページ自体が許す範囲を超えてブラウザーの任意のタブの音量を引き上げ、その音をどう整えるかを実際に制御できるようにします。

機能

- 0% から 600% までの増幅。設定で 1000% まで引き上げ可能
- 増幅時の音割れや耳に痛いピークを防ぐリミッター
- 60 Hz から 10 kHz までの 6 バンドイコライザー（詳細設定内）
- 左端から右端までのステレオバランス
- 片耳のイヤホンで聴くためのモノラルミックス
- 処理後の音と元の音を即座に比べられるバイパススイッチ
- 55 言語に対応し、すべて翻訳済み

タブごとに独立

ここを多くの音量ブースターが間違えます。各タブが自分の音量、自分のイコライザーカーブ、自分のバランスを保持します。あるタブで配信を 300%、別のタブで音楽を 120% で再生しても、一方を変更してももう一方には決して影響しません。

ツールバーのバッジには現在見ているタブのレベルが表示されるので、どのタブが増幅されているか一目で分かります。

既定では一時的

タブを閉じると増幅は忘れられます。ある動画のために選んだ設定が、数週間後に別のページで不意に適用されることはありません。

特定のサイトを常に同じ音量で開きたい場合は、ポップアップで「このサイトを記憶する」にチェックを入れてください。設定ページには保存したすべてのサイトが一覧表示され、どれでも編集や削除ができ、新しいタブが自動的に記憶するように設定することもできます。

配信サイトに追随

YouTube、Twitch、Kick などのサイトは、次のエピソードや配信に移るときにページを再読み込みせずに動画プレーヤーを差し替えます。多くのブースターはその瞬間に音声を失い、すでに適用していないレベルを表示し続けます。この拡張機能は差し替えを監視し、新しいプレーヤーに設定を再適用するため、設定した音量がそのまま聞こえる音量であり続けます。

プライバシー

トラッキングなし。解析なし。アカウント不要。フォントを含め、いかなるネットワーク要求も行いません。設定がご自身の端末から出ることは決してありません。

できないこと

Netflix、Disney+、Prime Video、Spotify などの DRM 保護されたサービスは、設計上その音声を拡張機能から隠しているため、増幅できません。ページを処理できない場合、ポップアップは黙って何もしないのではなく、その旨をはっきりと表示します。

chrome:// やウェブストアなどのブラウザーページは、この拡張機能を含むすべての拡張機能が利用できません。

安全に増幅してください

大音量は、特にヘッドホン使用時に聴覚とスピーカーの両方を損なうおそれがあります。リミッターは 100% を超えると既定で有効になり、有効のままにしておくことをお勧めします。設定で上限を 600% より高くする場合は自己責任でお願いします。

オープンソース

ソースコード、問題追跡、貢献ガイド:
https://github.com/ramazansancar/volume-booster-tab-extension

GNU Affero General Public License v3.0 の下でライセンスされています。
```

## `kn` — ಕನ್ನಡ

_Translated from the English description._

```text
Volume Booster Tab ಯಾವುದೇ ಬ್ರೌಸರ್ ಟ್ಯಾಬ್‌ನ ಧ್ವನಿಯನ್ನು ಪುಟವೇ ಅನುಮತಿಸುವುದಕ್ಕಿಂತ ಹೆಚ್ಚು ಏರಿಸುತ್ತದೆ, ಮತ್ತು ಆ ಧ್ವನಿ ಹೇಗೆ ರೂಪುಗೊಳ್ಳಬೇಕು ಎಂಬುದರ ಮೇಲೆ ನಿಮಗೆ ನಿಜವಾದ ನಿಯಂತ್ರಣ ನೀಡುತ್ತದೆ.

ವೈಶಿಷ್ಟ್ಯಗಳು

- 0% ರಿಂದ 600% ವರೆಗೆ ವರ್ಧನೆ, ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ 1000% ವರೆಗೆ ಏರಿಸಬಹುದು
- ವರ್ಧಿಸುವಾಗ ವಿರೂಪ ಮತ್ತು ಕಿವಿಗೆ ನೋವಾಗುವ ಶಿಖರಗಳನ್ನು ತಡೆಯುವ ಲಿಮಿಟರ್
- ಸುಧಾರಿತ ಸೆಟ್ಟಿಂಗ್‌ಗಳ ಅಡಿಯಲ್ಲಿ 60 Hz ನಿಂದ 10 kHz ವರೆಗಿನ 6-ಬ್ಯಾಂಡ್ ಇಕ್ವಲೈಜರ್
- ಸಂಪೂರ್ಣ ಎಡದಿಂದ ಸಂಪೂರ್ಣ ಬಲದವರೆಗೆ ಸ್ಟೀರಿಯೊ ಸಮತೋಲನ
- ಒಂದೇ ಇಯರ್‌ಬಡ್‌ನಿಂದ ಕೇಳಲು ಮೊನೊ ಡೌನ್‌ಮಿಕ್ಸ್
- ಸಂಸ್ಕರಿಸಿದ ಮತ್ತು ಮೂಲ ಧ್ವನಿಯನ್ನು ತಕ್ಷಣ ಹೋಲಿಸಲು ಬೈಪಾಸ್ ಸ್ವಿಚ್
- 55 ಭಾಷೆಗಳಲ್ಲಿ ಲಭ್ಯ, ಸಂಪೂರ್ಣವಾಗಿ ಅನುವಾದಿತ

ಪ್ರತಿ ಟ್ಯಾಬ್ ಸ್ವತಂತ್ರ

ಹೆಚ್ಚಿನ ವಾಲ್ಯೂಮ್ ಬೂಸ್ಟರ್‌ಗಳು ತಪ್ಪುವುದು ಇಲ್ಲಿಯೇ. ಪ್ರತಿ ಟ್ಯಾಬ್ ತನ್ನದೇ ಧ್ವನಿ, ತನ್ನದೇ ಇಕ್ವಲೈಜರ್ ವಕ್ರರೇಖೆ, ತನ್ನದೇ ಸಮತೋಲನವನ್ನು ಉಳಿಸಿಕೊಳ್ಳುತ್ತದೆ. ಒಂದು ಟ್ಯಾಬ್‌ನಲ್ಲಿ ಸ್ಟ್ರೀಮ್ ಅನ್ನು 300% ನಲ್ಲಿ ಮತ್ತು ಇನ್ನೊಂದರಲ್ಲಿ ಸಂಗೀತವನ್ನು 120% ನಲ್ಲಿ ಚಲಾಯಿಸಿ; ಒಂದನ್ನು ಬದಲಾಯಿಸಿದರೆ ಇನ್ನೊಂದಕ್ಕೆ ಎಂದಿಗೂ ತಾಗುವುದಿಲ್ಲ.

ಟೂಲ್‌ಬಾರ್ ಬ್ಯಾಡ್ಜ್ ನೀವು ನೋಡುತ್ತಿರುವ ಟ್ಯಾಬ್‌ನ ಮಟ್ಟವನ್ನು ತೋರಿಸುತ್ತದೆ, ಆದ್ದರಿಂದ ಯಾವ ಟ್ಯಾಬ್‌ಗಳು ವರ್ಧಿಸಲ್ಪಟ್ಟಿವೆ ಎಂಬುದು ಒಂದೇ ನೋಟದಲ್ಲಿ ತಿಳಿಯುತ್ತದೆ.

ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ತಾತ್ಕಾಲಿಕ

ಟ್ಯಾಬ್ ಮುಚ್ಚಿದಾಗ ವರ್ಧನೆ ಮರೆತುಹೋಗುತ್ತದೆ. ಒಂದು ವೀಡಿಯೊಗಾಗಿ ಆಯ್ಕೆ ಮಾಡಿದ ಸೆಟ್ಟಿಂಗ್ ವಾರಗಳ ನಂತರ ಬೇರೆ ಪುಟದಲ್ಲಿ ನಿಮ್ಮನ್ನು ಎಂದಿಗೂ ಬೆಚ್ಚಿಬೀಳಿಸಲಾರದು.

ಒಂದು ಸೈಟ್ ಯಾವಾಗಲೂ ಒಂದೇ ಧ್ವನಿಯಲ್ಲಿ ತೆರೆಯಬೇಕೆಂದು ಬಯಸಿದರೆ, ಪಾಪ್‌ಅಪ್‌ನಲ್ಲಿ "ಈ ಸೈಟ್ ಅನ್ನು ನೆನಪಿಡಿ" ಎಂಬುದನ್ನು ಗುರುತಿಸಿ. ಸೆಟ್ಟಿಂಗ್‌ಗಳ ಪುಟ ನೀವು ಉಳಿಸಿದ ಪ್ರತಿ ಸೈಟ್ ಅನ್ನು ಪಟ್ಟಿ ಮಾಡುತ್ತದೆ, ಯಾವುದನ್ನಾದರೂ ಸಂಪಾದಿಸಲು ಅಥವಾ ತೆಗೆದುಹಾಕಲು ಅವಕಾಶ ನೀಡುತ್ತದೆ, ಮತ್ತು ಹೊಸ ಟ್ಯಾಬ್‌ಗಳು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನೆನಪಿಡುವಂತೆ ಮಾಡಬಲ್ಲದು.

ಸ್ಟ್ರೀಮಿಂಗ್ ಸೈಟ್‌ಗಳೊಂದಿಗೆ ಹೆಜ್ಜೆ ಹಾಕುತ್ತದೆ

YouTube, Twitch ಮತ್ತು Kick ನಂತಹ ಸೈಟ್‌ಗಳು ನೀವು ಮುಂದಿನ ಸಂಚಿಕೆ ಅಥವಾ ಸ್ಟ್ರೀಮ್‌ಗೆ ಹೋದಾಗ ಪುಟವನ್ನು ಮತ್ತೆ ಲೋಡ್ ಮಾಡದೆ ತಮ್ಮ ವೀಡಿಯೊ ಪ್ಲೇಯರ್ ಅನ್ನು ಬದಲಾಯಿಸುತ್ತವೆ. ಅನೇಕ ಬೂಸ್ಟರ್‌ಗಳು ಸರಿಯಾಗಿ ಆ ಕ್ಷಣದಲ್ಲಿ ಧ್ವನಿಯನ್ನು ಕಳೆದುಕೊಳ್ಳುತ್ತವೆ ಮತ್ತು ಈಗ ಅನ್ವಯಿಸದ ಮಟ್ಟವನ್ನು ತೋರಿಸುತ್ತಲೇ ಇರುತ್ತವೆ. ಇದು ಆ ಬದಲಾವಣೆಯನ್ನು ಗಮನಿಸಿ ನಿಮ್ಮ ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಹೊಸ ಪ್ಲೇಯರ್‌ಗೆ ಮತ್ತೆ ಅನ್ವಯಿಸುತ್ತದೆ, ಆದ್ದರಿಂದ ನೀವು ಹೊಂದಿಸಿದ ಧ್ವನಿಯೇ ನೀವು ಕೇಳುವ ಧ್ವನಿಯಾಗಿ ಉಳಿಯುತ್ತದೆ.

ಗೌಪ್ಯತೆ

ಯಾವುದೇ ಟ್ರ್ಯಾಕಿಂಗ್ ಇಲ್ಲ. ಯಾವುದೇ ಅನಾಲಿಟಿಕ್ಸ್ ಇಲ್ಲ. ಯಾವುದೇ ಖಾತೆ ಇಲ್ಲ. ಫಾಂಟ್‌ಗಳಿಗೂ ಸೇರಿದಂತೆ ಯಾವುದೇ ಬಗೆಯ ನೆಟ್‌ವರ್ಕ್ ವಿನಂತಿ ಇಲ್ಲ. ನಿಮ್ಮ ಸೆಟ್ಟಿಂಗ್‌ಗಳು ನಿಮ್ಮ ಸ್ವಂತ ಸಾಧನವನ್ನು ಎಂದಿಗೂ ಬಿಟ್ಟು ಹೋಗುವುದಿಲ್ಲ.

ಇದು ಏನು ಮಾಡಲಾರದು

Netflix, Disney+, Prime Video ಮತ್ತು Spotify ನಂತಹ DRM-ರಕ್ಷಿತ ಸೇವೆಗಳು ವಿನ್ಯಾಸದಿಂದಲೇ ತಮ್ಮ ಧ್ವನಿಯನ್ನು ವಿಸ್ತರಣೆಗಳಿಂದ ಮರೆಮಾಡುತ್ತವೆ, ಆದ್ದರಿಂದ ಅವುಗಳನ್ನು ವರ್ಧಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ಪುಟವನ್ನು ಸಂಸ್ಕರಿಸಲು ಸಾಧ್ಯವಾಗದಿದ್ದಾಗ, ಪಾಪ್‌ಅಪ್ ಮೌನವಾಗಿ ಏನೂ ಮಾಡದಿರುವ ಬದಲು ಅದನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಹೇಳುತ್ತದೆ.

chrome:// ಮತ್ತು ವೆಬ್ ಸ್ಟೋರ್‌ನಂತಹ ಬ್ರೌಸರ್ ಪುಟಗಳು ಇದೂ ಸೇರಿದಂತೆ ಪ್ರತಿ ವಿಸ್ತರಣೆಗೂ ನಿಷಿದ್ಧ.

ದಯವಿಟ್ಟು ಜವಾಬ್ದಾರಿಯಿಂದ ವರ್ಧಿಸಿ

ಹೆಚ್ಚಿನ ಧ್ವನಿ ನಿಮ್ಮ ಶ್ರವಣ ಮತ್ತು ಸ್ಪೀಕರ್‌ಗಳೆರಡಕ್ಕೂ ಹಾನಿ ಮಾಡಬಹುದು, ವಿಶೇಷವಾಗಿ ಹೆಡ್‌ಫೋನ್‌ಗಳೊಂದಿಗೆ. 100% ಗಿಂತ ಮೇಲೆ ಲಿಮಿಟರ್ ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಆನ್ ಆಗಿರುತ್ತದೆ ಮತ್ತು ಅದನ್ನು ಆನ್ ಆಗಿಯೇ ಬಿಡಬೇಕು. ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಮಿತಿಯನ್ನು 600% ಗಿಂತ ಮೇಲೆ ಏರಿಸುವುದು ಸಂಪೂರ್ಣವಾಗಿ ನಿಮ್ಮ ಸ್ವಂತ ಅಪಾಯದಲ್ಲಿ.

ಓಪನ್ ಸೋರ್ಸ್

ಮೂಲ ಕೋಡ್, ಸಮಸ್ಯೆ ಟ್ರ್ಯಾಕರ್ ಮತ್ತು ಕೊಡುಗೆ ಮಾರ್ಗದರ್ಶಿ:
https://github.com/ramazansancar/volume-booster-tab-extension

GNU Affero General Public License v3.0 ಅಡಿಯಲ್ಲಿ ಪರವಾನಗಿ ಪಡೆದಿದೆ.
```

## `ko` — 한국어

_Translated from the English description._

```text
Volume Booster Tab은 페이지 자체가 허용하는 수준을 넘어 모든 브라우저 탭의 음량을 높이고, 그 소리가 어떻게 다듬어지는지를 실제로 제어할 수 있게 해 줍니다.

기능

- 0%에서 600%까지 증폭, 설정에서 1000%까지 상향 가능
- 증폭 시 클리핑과 귀 아픈 피크를 막아 주는 리미터
- 고급 설정에 있는 60Hz~10kHz 6밴드 이퀄라이저
- 완전 왼쪽부터 완전 오른쪽까지의 스테레오 밸런스
- 이어버드 하나로 들을 때 유용한 모노 다운믹스
- 처리된 소리와 원래 소리를 즉시 비교하는 바이패스 스위치
- 55개 언어 지원, 전부 번역 완료

모든 탭이 독립적입니다

대부분의 음량 증폭 확장 프로그램이 놓치는 부분입니다. 각 탭은 자신만의 음량, 자신만의 이퀄라이저 곡선, 자신만의 밸런스를 유지합니다. 한 탭에서 방송을 300%로 틀고 다른 탭에서 음악을 120%로 틀어도, 한쪽을 바꾼다고 다른 쪽이 바뀌는 일은 없습니다.

도구 모음 배지는 지금 보고 있는 탭의 레벨을 보여 주므로, 어떤 탭이 증폭되고 있는지 한눈에 알 수 있습니다.

기본적으로 일시적입니다

탭을 닫으면 증폭은 잊힙니다. 어떤 영상을 위해 고른 설정이 몇 주 뒤 다른 페이지에서 갑자기 적용되는 일은 없습니다.

특정 사이트를 항상 같은 음량으로 열고 싶다면 팝업에서 "이 사이트 기억하기"를 선택하세요. 설정 페이지에는 저장한 모든 사이트가 나열되며, 각 항목을 수정하거나 삭제할 수 있고, 새 탭이 자동으로 기억하도록 설정할 수도 있습니다.

스트리밍 사이트를 따라갑니다

YouTube, Twitch, Kick 같은 사이트는 다음 회차나 방송으로 넘어갈 때 페이지를 새로 고치지 않고 동영상 플레이어를 교체합니다. 많은 확장 프로그램이 바로 그 순간 소리를 잃고, 더 이상 적용하지 않는 레벨을 계속 표시합니다. 이 확장 프로그램은 교체를 감지해 새 플레이어에 설정을 다시 적용하므로, 설정한 음량이 곧 듣게 되는 음량으로 유지됩니다.

개인정보 보호

추적 없음. 분석 없음. 계정 없음. 글꼴을 포함해 어떤 종류의 네트워크 요청도 없음. 설정은 사용자의 기기를 절대 벗어나지 않습니다.

할 수 없는 것

Netflix, Disney+, Prime Video, Spotify 같은 DRM 보호 서비스는 설계상 오디오를 확장 프로그램으로부터 숨기므로 증폭할 수 없습니다. 페이지를 처리할 수 없을 때는 조용히 아무것도 하지 않는 대신 팝업이 그 사실을 분명히 알려 줍니다.

chrome:// 및 웹 스토어 같은 브라우저 페이지는 이 확장 프로그램을 포함한 모든 확장 프로그램에 닫혀 있습니다.

책임감 있게 사용하세요

큰 음량은 특히 헤드폰 사용 시 청력과 스피커 모두를 손상시킬 수 있습니다. 리미터는 100%를 넘으면 기본으로 켜지며, 켜 둔 채로 사용하시기 바랍니다. 설정에서 상한을 600% 이상으로 올리는 것은 전적으로 사용자 책임입니다.

오픈 소스

소스 코드, 이슈 트래커, 기여 안내:
https://github.com/ramazansancar/volume-booster-tab-extension

GNU Affero General Public License v3.0에 따라 배포됩니다.
```

## `lt` — Lietuvių

_Translated from the English description._

```text
„Volume Booster Tab“ pakelia bet kurios naršyklės kortelės garsumą aukščiau nei leidžia pats puslapis ir suteikia tikrą galimybę valdyti, kaip tas garsas formuojamas.

FUNKCIJOS

- Stiprinimas nuo 0 % iki 600 %, nustatymuose pakeliamas iki 1000 %
- Ribotuvas, saugantis nuo iškraipymų ir skausmingų smailių stiprinant
- 6 juostų glodintuvas nuo 60 Hz iki 10 kHz, skiltyje „Išplėstiniai nustatymai“
- Stereo balansas nuo kraštutinio kairiojo iki kraštutinio dešiniojo
- Suliejimas į mono, kai klausomasi vienu ausinuku
- Apėjimo jungiklis, leidžiantis akimirksniu palyginti apdorotą ir neapdorotą garsą
- Prieinama 55 kalbomis, visiškai išversta

KIEKVIENA KORTELĖ NEPRIKLAUSOMA

Būtent čia klysta dauguma garso stiprintuvų. Kiekviena kortelė išlaiko savo garsumą, savo glodintuvo kreivę, savo balansą. Paleiskite transliaciją 300 % vienoje kortelėje ir muziką 120 % kitoje; pakeitus vieną, kita niekada nepaliečiama.

Įrankių juostos ženklelis rodo peržiūrimos kortelės lygį, todėl iš karto matote, kurios kortelės sustiprintos.

PAGAL NUTYLĖJIMĄ LAIKINA

Uždarius kortelę stiprinimas pamirštamas. Vienam vaizdo įrašui parinktas nustatymas niekada nenustebins jūsų po kelių savaičių kitame puslapyje.

Jei norite, kad svetainė visada atsidarytų tuo pačiu garsumu, iššokančiajame lange pažymėkite „Įsiminti šią svetainę“. Nustatymų puslapyje išvardijamos visos įsimintos svetainės, leidžiama bet kurią redaguoti ar pašalinti, taip pat galima nustatyti, kad naujos kortelės įsimintų automatiškai.

NEATSILIEKA NUO TRANSLIACIJŲ SVETAINIŲ

Tokios svetainės kaip „YouTube“, „Twitch“ ir „Kick“ pakeičia savo vaizdo grotuvą, kai pereinate prie kitos serijos ar transliacijos, neįkeldamos puslapio iš naujo. Daugelis stiprintuvų būtent tuo metu praranda garsą ir toliau rodo lygį, kurio nebetaiko. Šis stebi pakeitimą ir iš naujo pritaiko jūsų nustatymus naujam grotuvui, todėl nustatytas garsumas išlieka tuo garsumu, kurį girdite.

PRIVATUMAS

Jokio sekimo. Jokios analitikos. Jokios paskyros. Jokių tinklo užklausų, net ir šriftams. Jūsų nustatymai niekada nepalieka jūsų įrenginio.

KO NEGALI

DRM apsaugotos paslaugos, tokios kaip „Netflix“, „Disney+“, „Prime Video“ ir „Spotify“, savo garsą nuo plėtinių slepia pagal sumanymą, todėl jų sustiprinti neįmanoma. Kai puslapio apdoroti nepavyksta, iššokantysis langas tai pasako aiškiai, o ne tyliai nieko nedaro.

Naršyklės puslapiai, tokie kaip chrome:// ir internetinė parduotuvė, yra uždrausti visiems plėtiniams, įskaitant šį.

STIPRINKITE ATSAKINGAI

Didelis garsumas gali pakenkti tiek klausai, tiek garsiakalbiams, ypač su ausinėmis. Ribotuvas virš 100 % įjungtas pagal nutylėjimą ir jį verta palikti įjungtą. Viršutinės ribos kėlimas virš 600 % nustatymuose yra jūsų pačių atsakomybė.

ATVIRASIS KODAS

Pirminis kodas, klaidų seklys ir prisidėjimo vadovas:
https://github.com/ramazansancar/volume-booster-tab-extension

Licencijuota pagal GNU Affero bendrąją viešąją licenciją v3.0.
```

## `lv` — Latviešu

_Translated from the English description._

```text
Volume Booster Tab paaugstina jebkuras pārlūka cilnes skaļumu pāri tam, ko atļauj pati lapa, un dod jums patiesu kontroli pār to, kā šī skaņa tiek veidota.

FUNKCIJAS

- Pastiprinājums no 0 % līdz 600 %, iestatījumos paceļams līdz 1000 %
- Limiters, kas pastiprināšanas laikā novērš kropļojumus un sāpīgas virsotnes
- 6 joslu ekvalaizers no 60 Hz līdz 10 kHz sadaļā Papildu iestatījumi
- Stereo balanss no galēji kreisās līdz galēji labajai pusei
- Monosajaukums klausīšanai ar vienu austiņu
- Apiešanas slēdzis, lai uzreiz salīdzinātu apstrādāto un neapstrādāto skaņu
- Pieejams 55 valodās, pilnībā tulkots

KATRA CILNE IR NEATKARĪGA

Tieši šeit vairums skaļuma pastiprinātāju kļūdās. Katra cilne saglabā savu skaļumu, savu ekvalaizera līkni, savu balansu. Atskaņojiet straumi ar 300 % vienā cilnē un mūziku ar 120 % citā; vienas mainīšana nekad neskar otru.

Rīkjoslas nozīmīte rāda tās cilnes līmeni, kuru skatāties, tāpēc ar vienu acu uzmetienu redzat, kuras cilnes ir pastiprinātas.

PĒC NOKLUSĒJUMA ĪSLAICĪGS

Pastiprinājums tiek aizmirsts, kad aizverat cilni. Iestatījums, ko izvēlējāties vienam video, nekad nevar jūs pārsteigt nedēļas vēlāk citā lapā.

Ja vēlaties, lai vietne vienmēr tiktu atvērta ar vienu un to pašu skaļumu, uznirstošajā logā atzīmējiet “Atcerēties šo vietni”. Iestatījumu lapā uzskaitītas visas saglabātās vietnes, ļauts jebkuru no tām rediģēt vai noņemt, kā arī var panākt, lai jaunās cilnes atcerētos automātiski.

IET KOPSOLĪ AR STRAUMĒŠANAS VIETNĒM

Tādas vietnes kā YouTube, Twitch un Kick nomaina savu video atskaņotāju, kad pārejat uz nākamo sēriju vai straumi, nepārlādējot lapu. Daudzi pastiprinātāji tieši tajā brīdī zaudē skaņu un turpina rādīt līmeni, ko vairs nepiemēro. Šis paplašinājums seko nomaiņai un no jauna piemēro jūsu iestatījumus jaunajam atskaņotājam, tāpēc iestatītais skaļums paliek tas skaļums, ko dzirdat.

PRIVĀTUMS

Nekādas izsekošanas. Nekādas analītikas. Nekāda konta. Nekādu tīkla pieprasījumu, pat ne fontiem. Jūsu iestatījumi nekad neatstāj jūsu pašu ierīci.

KO TAS NESPĒJ

Ar DRM aizsargāti pakalpojumi, piemēram, Netflix, Disney+, Prime Video un Spotify, jau pēc uzbūves slēpj savu audio no paplašinājumiem, tāpēc tos pastiprināt nevar. Ja lapu nevar apstrādāt, uznirstošais logs to pasaka tieši, nevis klusējot nedara neko.

Pārlūka lapas, piemēram, chrome:// un tīmekļa veikals, ir liegtas ikvienam paplašinājumam, arī šim.

LŪDZU, PASTIPRINIET ATBILDĪGI

Liels skaļums var kaitēt gan jūsu dzirdei, gan skaļruņiem, īpaši ar austiņām. Limiters virs 100 % pēc noklusējuma ir ieslēgts, un to vajadzētu atstāt ieslēgtu. Griestu celšana iestatījumos virs 600 % notiek uz jūsu pašu atbildību.

ATVĒRTAIS KODS

Pirmkods, problēmu izsekotājs un ieguldījuma ceļvedis:
https://github.com/ramazansancar/volume-booster-tab-extension

Licencēts saskaņā ar GNU Affero General Public License v3.0.
```

## `ml` — മലയാളം

_Translated from the English description._

```text
പേജ് തന്നെ അനുവദിക്കുന്നതിലും അപ്പുറത്തേക്ക് ഏതൊരു ബ്രൗസർ ടാബിന്റെയും ശബ്ദം Volume Booster Tab ഉയർത്തുന്നു, ആ ശബ്ദം എങ്ങനെ രൂപപ്പെടണം എന്നതിൽ യഥാർത്ഥ നിയന്ത്രണം നിങ്ങൾക്ക് നൽകുന്നു.

സവിശേഷതകൾ

- 0% മുതൽ 600% വരെ വർധന, ക്രമീകരണങ്ങളിൽ 1000% വരെ ഉയർത്താം
- വർധിപ്പിക്കുമ്പോൾ വക്രീകരണവും കാതിന് വേദനിപ്പിക്കുന്ന ഉയർച്ചകളും തടയുന്ന ലിമിറ്റർ
- വിപുലമായ ക്രമീകരണങ്ങൾക്ക് കീഴിൽ 60 Hz മുതൽ 10 kHz വരെയുള്ള 6-ബാൻഡ് ഇക്വലൈസർ
- പൂർണമായും ഇടത്തുനിന്ന് പൂർണമായും വലത്തേക്ക് സ്റ്റീരിയോ ബാലൻസ്
- ഒരൊറ്റ ഇയർബഡ് ഉപയോഗിച്ച് കേൾക്കാൻ മോണോ ഡൗൺമിക്സ്
- പ്രോസസ് ചെയ്ത ശബ്ദവും യഥാർത്ഥ ശബ്ദവും ഉടനടി താരതമ്യം ചെയ്യാൻ ബൈപാസ് സ്വിച്ച്
- 55 ഭാഷകളിൽ ലഭ്യം, പൂർണമായും വിവർത്തനം ചെയ്തത്

ഓരോ ടാബും സ്വതന്ത്രമാണ്

മിക്ക വോളിയം ബൂസ്റ്ററുകളും പിഴവ് വരുത്തുന്നത് ഇവിടെയാണ്. ഓരോ ടാബും അതിന്റെ സ്വന്തം ശബ്ദം, സ്വന്തം ഇക്വലൈസർ വക്രം, സ്വന്തം ബാലൻസ് നിലനിർത്തുന്നു. ഒരു ടാബിൽ സ്ട്രീം 300%-ലും മറ്റൊന്നിൽ സംഗീതം 120%-ലും പ്ലേ ചെയ്യുക; ഒന്ന് മാറ്റുന്നത് മറ്റൊന്നിനെ ഒരിക്കലും സ്പർശിക്കില്ല.

ടൂൾബാർ ബാഡ്ജ് നിങ്ങൾ നോക്കുന്ന ടാബിന്റെ നില കാണിക്കുന്നു, അതിനാൽ ഏതൊക്കെ ടാബുകൾ വർധിപ്പിച്ചിരിക്കുന്നു എന്ന് ഒറ്റനോട്ടത്തിൽ അറിയാം.

സ്ഥിരസ്ഥിതിയായി താൽക്കാലികം

ടാബ് അടയ്ക്കുമ്പോൾ വർധന മറക്കപ്പെടുന്നു. ഒരു വീഡിയോയ്ക്കായി തിരഞ്ഞെടുത്ത ക്രമീകരണം ആഴ്ചകൾക്കുശേഷം മറ്റൊരു പേജിൽ നിങ്ങളെ ഒരിക്കലും അമ്പരപ്പിക്കില്ല.

ഒരു സൈറ്റ് എപ്പോഴും ഒരേ ശബ്ദത്തിൽ തുറക്കണമെങ്കിൽ, പോപ്പ്അപ്പിൽ "ഈ സൈറ്റ് ഓർക്കുക" അടയാളപ്പെടുത്തുക. ക്രമീകരണ പേജ് നിങ്ങൾ സംരക്ഷിച്ച എല്ലാ സൈറ്റുകളും പട്ടികപ്പെടുത്തുന്നു, ഏതെങ്കിലും എഡിറ്റ് ചെയ്യാനോ നീക്കം ചെയ്യാനോ അനുവദിക്കുന്നു, കൂടാതെ പുതിയ ടാബുകൾ സ്വയമേവ ഓർക്കാൻ സജ്ജമാക്കാനും കഴിയും.

സ്ട്രീമിംഗ് സൈറ്റുകൾക്കൊപ്പം നീങ്ങുന്നു

YouTube, Twitch, Kick പോലുള്ള സൈറ്റുകൾ അടുത്ത എപ്പിസോഡിലേക്കോ സ്ട്രീമിലേക്കോ പോകുമ്പോൾ പേജ് വീണ്ടും ലോഡ് ചെയ്യാതെ അവരുടെ വീഡിയോ പ്ലേയർ മാറ്റിവയ്ക്കുന്നു. പല ബൂസ്റ്ററുകളും കൃത്യം ആ നിമിഷം ശബ്ദം നഷ്ടപ്പെടുത്തുകയും ഇനി പ്രയോഗിക്കാത്ത ഒരു നില കാണിച്ചുകൊണ്ടിരിക്കുകയും ചെയ്യുന്നു. ഇത് ആ മാറ്റം നിരീക്ഷിക്കുകയും നിങ്ങളുടെ ക്രമീകരണങ്ങൾ പുതിയ പ്ലേയറിൽ വീണ്ടും പ്രയോഗിക്കുകയും ചെയ്യുന്നു, അതിനാൽ നിങ്ങൾ സജ്ജമാക്കിയ ശബ്ദം തന്നെ നിങ്ങൾ കേൾക്കുന്ന ശബ്ദമായി തുടരുന്നു.

സ്വകാര്യത

ട്രാക്കിംഗ് ഇല്ല. അനലിറ്റിക്സ് ഇല്ല. അക്കൗണ്ട് ഇല്ല. ഫോണ്ടുകൾക്ക് പോലും ഒരുതരത്തിലുള്ള നെറ്റ്‌വർക്ക് അഭ്യർത്ഥനയും ഇല്ല. നിങ്ങളുടെ ക്രമീകരണങ്ങൾ ഒരിക്കലും നിങ്ങളുടെ സ്വന്തം ഉപകരണം വിട്ടുപോകുന്നില്ല.

ഇതിന് ചെയ്യാൻ കഴിയാത്തത്

Netflix, Disney+, Prime Video, Spotify പോലുള്ള DRM-സംരക്ഷിത സേവനങ്ങൾ രൂപകൽപ്പനയാൽ തന്നെ തങ്ങളുടെ ഓഡിയോ വിപുലീകരണങ്ങളിൽനിന്ന് മറയ്ക്കുന്നു, അതിനാൽ അവ വർധിപ്പിക്കാനാകില്ല. ഒരു പേജ് പ്രോസസ് ചെയ്യാൻ കഴിയാത്തപ്പോൾ, നിശ്ശബ്ദമായി ഒന്നും ചെയ്യാതിരിക്കുന്നതിനുപകരം പോപ്പ്അപ്പ് അത് വ്യക്തമായി പറയുന്നു.

chrome:// പോലുള്ള ബ്രൗസർ പേജുകളും വെബ് സ്റ്റോറും ഇതുൾപ്പെടെ എല്ലാ വിപുലീകരണങ്ങൾക്കും വിലക്കപ്പെട്ടതാണ്.

ദയവായി ഉത്തരവാദിത്തത്തോടെ വർധിപ്പിക്കുക

ഉയർന്ന ശബ്ദം നിങ്ങളുടെ കേൾവിക്കും സ്പീക്കറുകൾക്കും ഒരുപോലെ ദോഷം ചെയ്യാം, പ്രത്യേകിച്ച് ഹെഡ്‌ഫോണുകളിൽ. 100%-ന് മുകളിൽ ലിമിറ്റർ സ്ഥിരസ്ഥിതിയായി ഓണായിരിക്കും, അത് ഓണായിത്തന്നെ വയ്ക്കണം. ക്രമീകരണങ്ങളിൽ പരിധി 600%-ന് മുകളിലേക്ക് ഉയർത്തുന്നത് പൂർണമായും നിങ്ങളുടെ സ്വന്തം ഉത്തരവാദിത്തത്തിലാണ്.

ഓപ്പൺ സോഴ്സ്

സോഴ്സ് കോഡ്, ഇഷ്യൂ ട്രാക്കർ, സംഭാവന മാർഗനിർദേശം:
https://github.com/ramazansancar/volume-booster-tab-extension

GNU Affero General Public License v3.0 പ്രകാരം ലൈസൻസ് ചെയ്തത്.
```

## `mr` — मराठी

_Translated from the English description._

```text
Volume Booster Tab कोणत्याही ब्राउझर टॅबचा आवाज पान स्वतः जितकी परवानगी देते त्यापेक्षाही वर नेतो, आणि तो आवाज कसा घडवायचा यावर तुम्हाला खरे नियंत्रण देतो.

वैशिष्ट्ये

- 0% ते 600% पर्यंत वाढ, सेटिंग्जमध्ये 1000% पर्यंत वाढवता येते
- वाढवताना विकृती आणि कानाला त्रास देणारी शिखरे रोखणारा लिमिटर
- प्रगत सेटिंग्जखाली 60 Hz ते 10 kHz पर्यंतचा 6-बँड इक्वलायझर
- पूर्ण डावीकडून पूर्ण उजवीकडे स्टीरिओ संतुलन
- एकाच इयरबडने ऐकण्यासाठी मोनो डाउनमिक्स
- प्रक्रिया केलेला आणि मूळ आवाज तत्काळ तुलना करण्यासाठी बायपास स्विच
- 55 भाषांमध्ये उपलब्ध, पूर्णपणे भाषांतरित

प्रत्येक टॅब स्वतंत्र आहे

बहुतेक व्हॉल्यूम बूस्टर नेमके इथेच चुकतात. प्रत्येक टॅब स्वतःचा आवाज, स्वतःचा इक्वलायझर वक्र, स्वतःचे संतुलन राखतो. एका टॅबमध्ये स्ट्रीम 300% वर आणि दुसऱ्यात संगीत 120% वर चालवा; एक बदलल्याने दुसऱ्याला कधीही स्पर्श होत नाही.

टूलबार बॅज तुम्ही पाहत असलेल्या टॅबची पातळी दाखवतो, त्यामुळे कोणते टॅब वाढवलेले आहेत हे एका नजरेत कळते.

पूर्वनिर्धारितपणे तात्पुरते

टॅब बंद केल्यावर वाढ विसरली जाते. एका व्हिडिओसाठी निवडलेली सेटिंग आठवड्यांनंतर दुसऱ्या पानावर तुम्हाला कधीही चकित करू शकत नाही.

एखादी साइट नेहमी त्याच आवाजात उघडावी असे वाटत असेल, तर पॉपअपमध्ये "ही साइट लक्षात ठेवा" खूण करा. सेटिंग्ज पान तुम्ही जतन केलेली प्रत्येक साइट सूचीबद्ध करते, कोणतीही संपादित किंवा काढून टाकू देते, आणि नवीन टॅब आपोआप लक्षात ठेवतील असे करू शकते.

स्ट्रीमिंग साइट्सशी ताळमेळ राखतो

YouTube, Twitch आणि Kick सारख्या साइट्स पुढच्या भागावर किंवा स्ट्रीमवर जाताना पान पुन्हा लोड न करता त्यांचा व्हिडिओ प्लेयर बदलतात. अनेक बूस्टर नेमक्या त्याच क्षणी आवाज गमावतात आणि यापुढे लागू न होणारी पातळी दाखवत राहतात. हा विस्तार तो बदल टिपतो आणि तुमच्या सेटिंग्ज नव्या प्लेयरवर पुन्हा लागू करतो, त्यामुळे तुम्ही ठरवलेला आवाज हाच तुम्हाला ऐकू येणारा आवाज राहतो.

गोपनीयता

कोणताही मागोवा नाही. कोणतेही विश्लेषण नाही. कोणतेही खाते नाही. फॉन्टसाठीही कोणत्याही प्रकारची नेटवर्क विनंती नाही. तुमच्या सेटिंग्ज कधीही तुमचे स्वतःचे उपकरण सोडत नाहीत.

हे काय करू शकत नाही

Netflix, Disney+, Prime Video आणि Spotify सारख्या DRM-संरक्षित सेवा रचनेनेच त्यांचा ऑडिओ विस्तारांपासून लपवतात, त्यामुळे त्या वाढवता येत नाहीत. एखादे पान प्रक्रिया करता येत नसेल, तेव्हा पॉपअप गप्प बसून काहीही न करण्याऐवजी ते स्पष्टपणे सांगतो.

chrome:// आणि वेब स्टोअरसारखी ब्राउझर पाने या विस्तारासह प्रत्येक विस्तारासाठी बंद आहेत.

कृपया जबाबदारीने वाढवा

मोठा आवाज तुमच्या श्रवणशक्तीला आणि स्पीकरना दोन्हींना हानी पोहोचवू शकतो, विशेषतः हेडफोनसह. 100% च्या वर लिमिटर पूर्वनिर्धारितपणे चालू असतो आणि तो चालूच ठेवावा. सेटिंग्जमध्ये मर्यादा 600% च्या वर नेणे पूर्णपणे तुमच्या स्वतःच्या जबाबदारीवर आहे.

मुक्त स्रोत

स्रोत कोड, समस्या ट्रॅकर आणि योगदान मार्गदर्शक:
https://github.com/ramazansancar/volume-booster-tab-extension

GNU Affero General Public License v3.0 अंतर्गत परवानाकृत.
```

## `ms` — Melayu

_Translated from the English description._

```text
Volume Booster Tab menaikkan kelantangan mana-mana tab pelayar melebihi apa yang dibenarkan oleh halaman itu sendiri, dan memberi anda kawalan sebenar terhadap bagaimana bunyi itu dibentuk.

CIRI-CIRI

- Penguatan dari 0% hingga 600%, boleh dinaikkan sehingga 1000% dalam tetapan
- Penghad yang mencegah herotan dan puncak yang menyakitkan telinga semasa menguatkan
- Penyama 6 jalur, 60 Hz hingga 10 kHz, di bawah Tetapan lanjutan
- Imbangan stereo, dari kiri penuh ke kanan penuh
- Campuran mono untuk mendengar dengan satu fon telinga sahaja
- Suis pintas untuk membandingkan bunyi yang diproses dan yang asal serta-merta
- Tersedia dalam 55 bahasa, diterjemah sepenuhnya

SETIAP TAB BERDIRI SENDIRI

Di sinilah kebanyakan penguat kelantangan tersilap. Setiap tab mengekalkan kelantangannya sendiri, lengkung penyamanya sendiri, imbangannya sendiri. Mainkan siaran pada 300% dalam satu tab dan muzik pada 120% dalam tab lain; mengubah satu tidak pernah menyentuh yang lain.

Lencana bar alat memaparkan aras tab yang sedang anda lihat, jadi anda tahu sepintas lalu tab mana yang dikuatkan.

SEMENTARA SECARA LALAI

Penguatan dilupakan apabila anda menutup tab. Tetapan yang anda pilih untuk satu video tidak akan mengejutkan anda berminggu-minggu kemudian pada halaman lain.

Jika anda mahu sesebuah tapak sentiasa dibuka pada kelantangan yang sama, tandakan "Ingat tapak ini" dalam tetingkap timbul. Halaman tetapan menyenaraikan setiap tapak yang anda simpan, membolehkan anda menyunting atau membuang mana-mana daripadanya, dan boleh membuat tab baharu mengingat secara automatik.

SEIRING DENGAN TAPAK PENSTRIMAN

Tapak seperti YouTube, Twitch dan Kick menggantikan pemain videonya apabila anda beralih ke episod atau siaran seterusnya, tanpa memuat semula halaman. Banyak penguat kehilangan audio tepat pada saat itu dan terus memaparkan aras yang tidak lagi digunakannya. Sambungan ini memerhatikan pertukaran tersebut dan menggunakan semula tetapan anda pada pemain baharu, jadi kelantangan yang anda tetapkan kekal sebagai kelantangan yang anda dengar.

PRIVASI

Tiada penjejakan. Tiada analitis. Tiada akaun. Tiada permintaan rangkaian dalam apa jua bentuk, walaupun untuk fon. Tetapan anda tidak pernah meninggalkan mesin anda sendiri.

APA YANG TIDAK BOLEH DILAKUKAN

Perkhidmatan dilindungi DRM seperti Netflix, Disney+, Prime Video dan Spotify menyembunyikan audionya daripada sambungan secara reka bentuk, jadi ia tidak boleh dikuatkan. Apabila sesebuah halaman tidak dapat diproses, tetingkap timbul menyatakannya dengan jelas dan bukannya berdiam diri tanpa berbuat apa-apa.

Halaman pelayar seperti chrome:// dan Kedai Web tertutup kepada setiap sambungan, termasuk yang ini.

SILA KUATKAN SECARA BERTANGGUNGJAWAB

Kelantangan tinggi boleh merosakkan pendengaran dan pembesar suara anda, terutamanya dengan fon kepala. Penghad dihidupkan secara lalai melebihi 100% dan anda patut membiarkannya hidup. Menaikkan had melebihi 600% dalam tetapan adalah atas risiko anda sendiri.

SUMBER TERBUKA

Kod sumber, penjejak isu dan panduan sumbangan:
https://github.com/ramazansancar/volume-booster-tab-extension

Dilesenkan di bawah GNU Affero General Public License v3.0.
```

## `nl` — Nederlands

_Translated from the English description._

```text
Volume Booster Tab verhoogt het volume van elk browsertabblad verder dan de pagina zelf toestaat, en geeft je echte controle over hoe dat geluid wordt gevormd.

FUNCTIES

- Versterking van 0% tot 600%, in de instellingen te verhogen tot 1000%
- Limiter die vervorming en pijnlijke pieken bij het versterken voorkomt
- 6-bands equalizer, 60 Hz tot 10 kHz, onder Geavanceerde instellingen
- Stereobalans, van volledig links tot volledig rechts
- Monodownmix om met één oordopje te luisteren
- Bypass-schakelaar om bewerkt en onbewerkt geluid direct te vergelijken
- Beschikbaar in 55 talen, volledig vertaald

ELK TABBLAD IS ONAFHANKELIJK

Hier gaan de meeste volumeversterkers de mist in. Elk tabblad behoudt zijn eigen volume, zijn eigen equalizercurve, zijn eigen balans. Laat een stream op 300% lopen in het ene tabblad en muziek op 120% in het andere; het ene wijzigen raakt het andere nooit.

De badge op de werkbalk toont het niveau van het tabblad waar je naar kijkt, zodat je in één oogopslag ziet welke tabbladen versterkt zijn.

STANDAARD TIJDELIJK

Een versterking wordt vergeten zodra je het tabblad sluit. Een instelling die je voor één video koos, kan je weken later nooit verrassen op een andere pagina.

Wil je dat een site altijd op hetzelfde volume opent, vink dan "Deze site onthouden" aan in het pop-upvenster. De instellingenpagina toont elke opgeslagen site, laat je er een bewerken of verwijderen, en kan nieuwe tabbladen automatisch laten onthouden.

HOUDT STREAMINGSITES BIJ

Sites als YouTube, Twitch en Kick vervangen hun videospeler wanneer je naar de volgende aflevering of stream gaat, zonder de pagina opnieuw te laden. Veel versterkers verliezen op dat moment het geluid en blijven een niveau tonen dat ze niet meer toepassen. Deze houdt de wissel in de gaten en past je instellingen opnieuw toe op de nieuwe speler, zodat het volume dat je instelde het volume blijft dat je hoort.

PRIVACY

Geen tracking. Geen analytics. Geen account. Geen enkel netwerkverzoek, zelfs niet voor lettertypen. Je instellingen verlaten nooit je eigen apparaat.

WAT HET NIET KAN

Met DRM beveiligde diensten zoals Netflix, Disney+, Prime Video en Spotify verbergen hun audio van nature voor extensies, dus die kunnen niet worden versterkt. Wanneer een pagina niet verwerkt kan worden, zegt het pop-upvenster dat ronduit in plaats van stilzwijgend niets te doen.

Browserpagina's zoals chrome:// en de Web Store zijn verboden terrein voor elke extensie, ook voor deze.

VERSTERK VERANTWOORD

Hoog volume kan zowel je gehoor als je luidsprekers beschadigen, zeker met een koptelefoon. De limiter staat boven 100% standaard aan en je kunt hem beter aan laten staan. Het plafond in de instellingen boven 600% brengen is op eigen risico.

OPEN SOURCE

Broncode, issue tracker en bijdragegids:
https://github.com/ramazansancar/volume-booster-tab-extension

Gelicentieerd onder de GNU Affero General Public License v3.0.
```

## `no` — Norsk

_Translated from the English description._

```text
Volume Booster Tab hever lydstyrken i enhver nettleserfane utover det siden selv tillater, og gir deg reell kontroll over hvordan lyden formes.

FUNKSJONER

- Forsterkning fra 0 % til 600 %, kan heves til 1000 % i innstillingene
- Limiter som hindrer forvrengning og smertefulle topper ved forsterkning
- 6-bånds equalizer, 60 Hz til 10 kHz, under Avanserte innstillinger
- Stereobalanse, fra helt til venstre til helt til høyre
- Mononedmiks for å lytte med bare én øreplugg
- Forbikoblingsbryter for å sammenligne bearbeidet og ubearbeidet lyd umiddelbart
- Tilgjengelig på 55 språk, fullstendig oversatt

HVER FANE ER UAVHENGIG

Det er her de fleste lydforsterkere bommer. Hver fane beholder sin egen lydstyrke, sin egen equalizerkurve, sin egen balanse. Kjør en sending på 300 % i én fane og musikk på 120 % i en annen; å endre den ene rører aldri den andre.

Merket på verktøylinjen viser nivået for fanen du ser på, så du vet med ett blikk hvilke faner som er forsterket.

MIDLERTIDIG SOM STANDARD

En forsterkning glemmes når du lukker fanen. En innstilling du valgte for én video, kan aldri overraske deg uker senere på en annen side.

Vil du at et nettsted alltid skal åpnes med samme lydstyrke, kryss av for "Husk dette nettstedet" i popup-vinduet. Innstillingssiden viser hvert lagrede nettsted, lar deg redigere eller fjerne hvilket som helst av dem, og kan få nye faner til å huske automatisk.

HOLDER TRITT MED STRØMMETJENESTER

Nettsteder som YouTube, Twitch og Kick bytter ut videospilleren når du går til neste episode eller sending, uten å laste siden på nytt. Mange forsterkere mister lyden akkurat da og fortsetter å vise et nivå de ikke lenger bruker. Denne følger med på byttet og bruker innstillingene dine på nytt på den nye spilleren, slik at lydstyrken du satte, forblir lydstyrken du hører.

PERSONVERN

Ingen sporing. Ingen analyse. Ingen konto. Ingen nettverksforespørsler av noe slag, ikke engang for skrifttyper. Innstillingene dine forlater aldri din egen maskin.

HVA DEN IKKE KAN

DRM-beskyttede tjenester som Netflix, Disney+, Prime Video og Spotify skjuler lyden sin for utvidelser av design, så de kan ikke forsterkes. Når en side ikke kan behandles, sier popup-vinduet det rett ut i stedet for stille å ikke gjøre noe.

Nettlesersider som chrome:// og nettbutikken er stengt for enhver utvidelse, også denne.

FORSTERK ANSVARLIG

Høy lydstyrke kan skade både hørselen og høyttalerne dine, særlig med hodetelefoner. Limiteren er på som standard over 100 %, og du bør la den være på. Å heve taket over 600 % i innstillingene skjer på eget ansvar.

ÅPEN KILDEKODE

Kildekode, feilsporing og bidragsveiledning:
https://github.com/ramazansancar/volume-booster-tab-extension

Lisensiert under GNU Affero General Public License v3.0.
```

## `pl` — Polski

_Translated from the English description._

```text
Volume Booster Tab podnosi głośność dowolnej karty przeglądarki ponad to, na co pozwala sama strona, i daje realną kontrolę nad tym, jak ten dźwięk jest kształtowany.

FUNKCJE

- Wzmocnienie od 0% do 600%, w ustawieniach podnoszone do 1000%
- Limiter zapobiegający zniekształceniom i bolesnym szczytom podczas wzmacniania
- 6-pasmowy korektor od 60 Hz do 10 kHz w Ustawieniach zaawansowanych
- Balans stereo, od skrajnie lewego do skrajnie prawego
- Zmiksowanie do mono do słuchania jedną słuchawką
- Przełącznik obejścia do natychmiastowego porównania dźwięku przetworzonego i oryginalnego
- Dostępne w 55 językach, w pełni przetłumaczone

KAŻDA KARTA JEST NIEZALEŻNA

Właśnie tu myli się większość wzmacniaczy głośności. Każda karta zachowuje własną głośność, własną krzywą korektora, własny balans. Puść transmisję na 300% w jednej karcie i muzykę na 120% w drugiej; zmiana jednej nigdy nie dotyka drugiej.

Plakietka na pasku narzędzi pokazuje poziom karty, na którą patrzysz, więc na pierwszy rzut oka wiesz, które karty są wzmocnione.

DOMYŚLNIE TYMCZASOWE

Wzmocnienie zostaje zapomniane po zamknięciu karty. Ustawienie wybrane do jednego filmu nigdy nie zaskoczy cię tygodnie później na innej stronie.

Jeśli chcesz, by witryna zawsze otwierała się z tą samą głośnością, zaznacz „Zapamiętaj tę witrynę” w oknie podręcznym. Strona ustawień wymienia każdą zapisaną witrynę, pozwala dowolną edytować lub usunąć i może sprawić, by nowe karty zapamiętywały automatycznie.

DOTRZYMUJE KROKU SERWISOM STREAMINGOWYM

Serwisy takie jak YouTube, Twitch i Kick podmieniają swój odtwarzacz wideo przy przejściu do kolejnego odcinka lub transmisji, bez przeładowania strony. Wiele wzmacniaczy traci wtedy dźwięk i nadal pokazuje poziom, którego już nie stosuje. To rozszerzenie śledzi podmianę i ponownie stosuje twoje ustawienia do nowego odtwarzacza, więc ustawiona głośność pozostaje głośnością, którą słyszysz.

PRYWATNOŚĆ

Bez śledzenia. Bez analityki. Bez konta. Bez żadnych żądań sieciowych, nawet po czcionki. Twoje ustawienia nigdy nie opuszczają twojego urządzenia.

CZEGO NIE POTRAFI

Usługi chronione DRM, takie jak Netflix, Disney+, Prime Video i Spotify, z założenia ukrywają swój dźwięk przed rozszerzeniami, więc nie da się ich wzmocnić. Gdy strony nie można przetworzyć, okno podręczne mówi to wprost, zamiast po cichu nie robić nic.

Strony przeglądarki takie jak chrome:// i sklep internetowy są niedostępne dla każdego rozszerzenia, również dla tego.

WZMACNIAJ ODPOWIEDZIALNIE

Duża głośność może uszkodzić zarówno słuch, jak i głośniki, zwłaszcza przy słuchawkach. Limiter powyżej 100% jest domyślnie włączony i warto go tak zostawić. Podniesienie pułapu powyżej 600% w ustawieniach odbywa się na własne ryzyko.

OTWARTE ŹRÓDŁO

Kod źródłowy, śledzenie zgłoszeń i przewodnik dla współtwórców:
https://github.com/ramazansancar/volume-booster-tab-extension

Na licencji GNU Affero General Public License v3.0.
```

## `pt-BR` — Português (Brasil)

_Translated from the English description._

```text
O Volume Booster Tab aumenta o volume de qualquer aba do navegador além do que a própria página permite, e dá a você controle real sobre como esse som é moldado.

RECURSOS

- Amplificação de 0% a 600%, elevável a 1000% nas configurações
- Limitador que evita distorção e picos incômodos ao amplificar
- Equalizador de 6 bandas, de 60 Hz a 10 kHz, em Configurações avançadas
- Balanço estéreo, de todo à esquerda a todo à direita
- Mixagem em mono para ouvir com apenas um fone
- Botão de bypass para comparar na hora o som processado e o original
- Disponível em 55 idiomas, totalmente traduzido

CADA ABA É INDEPENDENTE

É aqui que a maioria dos amplificadores de volume erra. Cada aba mantém o próprio volume, a própria curva de equalização, o próprio balanço. Deixe uma transmissão a 300% em uma aba e música a 120% em outra; mudar uma nunca toca na outra.

O selo na barra de ferramentas mostra o nível da aba que você está vendo, então você sabe num relance quais abas estão amplificadas.

TEMPORÁRIO POR PADRÃO

A amplificação é esquecida quando você fecha a aba. Uma configuração escolhida para um vídeo nunca poderá surpreender você semanas depois em outra página.

Se quiser que um site sempre abra no mesmo volume, marque "Lembrar deste site" no popup. A página de configurações lista todos os sites salvos, permite editar ou remover qualquer um deles e pode fazer com que novas abas lembrem automaticamente.

ACOMPANHA OS SITES DE STREAMING

Sites como YouTube, Twitch e Kick trocam o player de vídeo quando você passa para o próximo episódio ou transmissão, sem recarregar a página. Muitos amplificadores perdem o áudio exatamente nesse momento e continuam exibindo um nível que já não aplicam. Este observa a troca e reaplica suas configurações ao novo player, de modo que o volume que você definiu continua sendo o volume que você ouve.

PRIVACIDADE

Sem rastreamento. Sem analytics. Sem conta. Sem requisições de rede de qualquer tipo, nem para fontes. Suas configurações nunca saem da sua própria máquina.

O QUE ELE NÃO PODE FAZER

Serviços protegidos por DRM como Netflix, Disney+, Prime Video e Spotify escondem o áudio das extensões por design, então não podem ser amplificados. Quando uma página não pode ser processada, o popup diz isso com clareza em vez de silenciosamente não fazer nada.

Páginas do navegador como chrome:// e a Web Store são inacessíveis a qualquer extensão, inclusive esta.

AMPLIFIQUE COM RESPONSABILIDADE

Volume alto pode danificar tanto sua audição quanto suas caixas de som, principalmente com fones. O limitador fica ligado por padrão acima de 100% e convém deixá-lo ligado. Elevar o teto além de 600% nas configurações é por sua conta e risco.

CÓDIGO ABERTO

Código-fonte, rastreador de problemas e guia de contribuição:
https://github.com/ramazansancar/volume-booster-tab-extension

Licenciado sob a GNU Affero General Public License v3.0.
```

## `pt-PT` — Português (Portugal)

_Translated from the English description._

```text
O Volume Booster Tab aumenta o volume de qualquer separador do navegador para além do que a própria página permite, e dá-lhe controlo real sobre a forma como esse som é moldado.

FUNCIONALIDADES

- Amplificação de 0% a 600%, elevável a 1000% nas definições
- Limitador que evita distorção e picos incómodos ao amplificar
- Equalizador de 6 bandas, de 60 Hz a 10 kHz, nas Definições avançadas
- Balanço estéreo, de todo à esquerda a todo à direita
- Mistura em mono para ouvir com apenas um auricular
- Interruptor de derivação para comparar de imediato o som processado e o original
- Disponível em 55 idiomas, totalmente traduzido

CADA SEPARADOR É INDEPENDENTE

É aqui que a maioria dos amplificadores de volume falha. Cada separador mantém o seu próprio volume, a sua própria curva de equalização, o seu próprio balanço. Deixe uma transmissão a 300% num separador e música a 120% noutro; alterar um nunca toca no outro.

O emblema na barra de ferramentas mostra o nível do separador que está a ver, pelo que sabe num relance quais os separadores amplificados.

TEMPORÁRIO POR PREDEFINIÇÃO

A amplificação é esquecida quando fecha o separador. Uma definição escolhida para um vídeo nunca o poderá surpreender semanas depois noutra página.

Se quiser que um site abra sempre com o mesmo volume, assinale «Memorizar este site» na janela instantânea. A página de definições lista todos os sites guardados, permite editar ou remover qualquer um deles e pode fazer com que os novos separadores memorizem automaticamente.

ACOMPANHA OS SITES DE STREAMING

Sites como o YouTube, o Twitch e o Kick substituem o leitor de vídeo quando passa para o episódio ou transmissão seguinte, sem recarregar a página. Muitos amplificadores perdem o áudio exatamente nesse momento e continuam a mostrar um nível que já não aplicam. Esta extensão vigia a substituição e volta a aplicar as suas definições ao novo leitor, pelo que o volume que definiu continua a ser o volume que ouve.

PRIVACIDADE

Sem rastreio. Sem análises. Sem conta. Sem pedidos de rede de qualquer tipo, nem sequer para tipos de letra. As suas definições nunca saem da sua própria máquina.

O QUE NÃO CONSEGUE FAZER

Serviços protegidos por DRM como o Netflix, o Disney+, o Prime Video e o Spotify escondem o áudio das extensões por concepção, pelo que não podem ser amplificados. Quando uma página não pode ser processada, a janela instantânea di-lo com clareza em vez de silenciosamente não fazer nada.

Páginas do navegador como chrome:// e a Web Store estão vedadas a qualquer extensão, incluindo esta.

AMPLIFIQUE COM RESPONSABILIDADE

O volume elevado pode danificar tanto a sua audição como as suas colunas, sobretudo com auscultadores. O limitador está ligado por predefinição acima dos 100% e deve deixá-lo ligado. Elevar o limite para além dos 600% nas definições é por sua conta e risco.

CÓDIGO ABERTO

Código-fonte, registo de problemas e guia de contribuição:
https://github.com/ramazansancar/volume-booster-tab-extension

Licenciado sob a GNU Affero General Public License v3.0.
```

## `ro` — Română

_Translated from the English description._

```text
Volume Booster Tab ridică volumul oricărei file din browser dincolo de ceea ce permite pagina însăși și vă oferă control real asupra modului în care este modelat acel sunet.

FUNCȚII

- Amplificare de la 0% la 600%, care poate fi ridicată la 1000% din setări
- Limitator care previne distorsiunea și vârfurile dureroase la amplificare
- Egalizator cu 6 benzi, de la 60 Hz la 10 kHz, în Setări avansate
- Balans stereo, de la extrema stângă la extrema dreaptă
- Mixare în mono pentru ascultare cu o singură cască
- Comutator de ocolire pentru a compara instantaneu sunetul procesat cu cel original
- Disponibil în 55 de limbi, tradus integral

FIECARE FILĂ ESTE INDEPENDENTĂ

Aici greșesc majoritatea amplificatoarelor de volum. Fiecare filă își păstrează propriul volum, propria curbă de egalizare, propriul balans. Rulați o transmisiune la 300% într-o filă și muzică la 120% în alta; modificarea uneia nu o atinge niciodată pe cealaltă.

Insigna din bara de instrumente afișează nivelul filei pe care o priviți, așa că vedeți dintr-o privire care file sunt amplificate.

TEMPORAR ÎN MOD IMPLICIT

Amplificarea este uitată când închideți fila. O setare aleasă pentru un videoclip nu vă poate surprinde niciodată săptămâni mai târziu pe o altă pagină.

Dacă doriți ca un site să se deschidă mereu la același volum, bifați „Reține acest site” în fereastra pop-up. Pagina de setări listează fiecare site salvat, vă permite să editați sau să eliminați oricare dintre ele și poate face ca filele noi să rețină automat.

ȚINE PASUL CU SITE-URILE DE STREAMING

Site-uri precum YouTube, Twitch și Kick își înlocuiesc playerul video când treceți la episodul sau transmisiunea următoare, fără a reîncărca pagina. Multe amplificatoare pierd sunetul exact în acel moment și continuă să afișeze un nivel pe care nu îl mai aplică. Această extensie urmărește schimbarea și reaplică setările dumneavoastră noului player, astfel încât volumul pe care l-ați stabilit rămâne volumul pe care îl auziți.

CONFIDENȚIALITATE

Fără urmărire. Fără analize. Fără cont. Fără cereri de rețea de niciun fel, nici măcar pentru fonturi. Setările dumneavoastră nu părăsesc niciodată propriul dispozitiv.

CE NU POATE FACE

Serviciile protejate prin DRM precum Netflix, Disney+, Prime Video și Spotify își ascund sunetul de extensii prin concepție, așa că nu pot fi amplificate. Când o pagină nu poate fi procesată, fereastra pop-up o spune direct, în loc să nu facă nimic în tăcere.

Paginile browserului precum chrome:// și magazinul web sunt interzise oricărei extensii, inclusiv acesteia.

VĂ RUGĂM SĂ AMPLIFICAȚI RESPONSABIL

Volumul ridicat vă poate afecta atât auzul, cât și difuzoarele, mai ales cu căștile. Limitatorul este pornit implicit peste 100% și ar trebui lăsat pornit. Ridicarea plafonului peste 600% din setări se face pe propria răspundere.

SURSĂ DESCHISĂ

Cod sursă, urmărirea problemelor și ghid de contribuție:
https://github.com/ramazansancar/volume-booster-tab-extension

Licențiat sub GNU Affero General Public License v3.0.
```

## `ru` — Русский

_Translated from the English description._

```text
Volume Booster Tab повышает громкость любой вкладки браузера сверх того, что допускает сама страница, и даёт вам реальный контроль над тем, как этот звук формируется.

ВОЗМОЖНОСТИ

- Усиление от 0% до 600%, в настройках поднимается до 1000%
- Лимитер, предотвращающий искажения и болезненные пики при усилении
- 6-полосный эквалайзер от 60 Гц до 10 кГц в разделе «Дополнительные настройки»
- Стереобаланс, от крайнего левого до крайнего правого
- Сведение в моно для прослушивания одним наушником
- Переключатель обхода для мгновенного сравнения обработанного и исходного звука
- Доступно на 55 языках, переведено полностью

КАЖДАЯ ВКЛАДКА НЕЗАВИСИМА

Именно здесь ошибается большинство усилителей громкости. Каждая вкладка хранит собственную громкость, собственную кривую эквалайзера, собственный баланс. Запустите трансляцию на 300% в одной вкладке и музыку на 120% в другой; изменение одной никогда не затрагивает другую.

Значок на панели инструментов показывает уровень вкладки, которую вы смотрите, поэтому с первого взгляда видно, какие вкладки усилены.

ПО УМОЛЧАНИЮ ВРЕМЕННО

Усиление забывается при закрытии вкладки. Настройка, выбранная для одного видео, никогда не застанет вас врасплох через несколько недель на другой странице.

Если вы хотите, чтобы сайт всегда открывался с одной и той же громкостью, отметьте «Запомнить этот сайт» во всплывающем окне. Страница настроек перечисляет каждый сохранённый сайт, позволяет изменить или удалить любой из них и может заставить новые вкладки запоминать автоматически.

ПОСПЕВАЕТ ЗА СТРИМИНГОВЫМИ САЙТАМИ

Сайты вроде YouTube, Twitch и Kick подменяют свой видеоплеер при переходе к следующей серии или трансляции, не перезагружая страницу. Многие усилители именно в этот момент теряют звук и продолжают показывать уровень, который уже не применяют. Это расширение следит за подменой и заново применяет ваши настройки к новому плееру, так что заданная громкость остаётся той громкостью, которую вы слышите.

КОНФИДЕНЦИАЛЬНОСТЬ

Никакого отслеживания. Никакой аналитики. Никакой учётной записи. Никаких сетевых запросов любого рода, даже за шрифтами. Ваши настройки никогда не покидают ваше собственное устройство.

ЧЕГО ОНО НЕ МОЖЕТ

Защищённые DRM сервисы вроде Netflix, Disney+, Prime Video и Spotify скрывают свой звук от расширений по самой своей конструкции, поэтому усилить их нельзя. Когда страницу невозможно обработать, всплывающее окно прямо об этом сообщает, вместо того чтобы молча ничего не делать.

Страницы браузера вроде chrome:// и интернет-магазина закрыты для любого расширения, включая это.

ПОЖАЛУЙСТА, УСИЛИВАЙТЕ ОТВЕТСТВЕННО

Высокая громкость может повредить и слух, и динамики, особенно в наушниках. Лимитер по умолчанию включён выше 100%, и его стоит оставить включённым. Поднятие потолка выше 600% в настройках — на ваш собственный риск.

ОТКРЫТЫЙ ИСХОДНЫЙ КОД

Исходный код, трекер задач и руководство для участников:
https://github.com/ramazansancar/volume-booster-tab-extension

Распространяется по лицензии GNU Affero General Public License v3.0.
```

## `sk` — Slovenčina

_Translated from the English description._

```text
Volume Booster Tab zvyšuje hlasitosť ľubovoľnej karty prehliadača nad rámec toho, čo dovoľuje samotná stránka, a dáva vám skutočnú kontrolu nad tým, ako je zvuk tvarovaný.

FUNKCIE

- Zosilnenie od 0 % do 600 %, v nastaveniach zvýšiteľné až na 1000 %
- Limiter, ktorý pri zosilňovaní bráni skresleniu a bolestivým špičkám
- Šesťpásmový ekvalizér od 60 Hz do 10 kHz v Rozšírených nastaveniach
- Stereo vyváženie, od úplne vľavo po úplne vpravo
- Zmiešanie do mono na počúvanie jedným slúchadlom
- Prepínač obídenia na okamžité porovnanie spracovaného a pôvodného zvuku
- Dostupné v 55 jazykoch, kompletne preložené

KAŽDÁ KARTA JE NEZÁVISLÁ

Práve v tomto väčšina zosilňovačov hlasitosti chybuje. Každá karta si drží vlastnú hlasitosť, vlastnú krivku ekvalizéra, vlastné vyváženie. Pustite si prenos na 300 % v jednej karte a hudbu na 120 % v druhej; zmena jednej sa tej druhej nikdy nedotkne.

Odznak na paneli nástrojov ukazuje úroveň karty, na ktorú sa práve pozeráte, takže na prvý pohľad viete, ktoré karty sú zosilnené.

V PREDVOLENOM STAVE DOČASNÉ

Zosilnenie sa zabudne, len čo kartu zavriete. Nastavenie zvolené pre jedno video vás nikdy nemôže o týždne neskôr prekvapiť na inej stránke.

Ak chcete, aby sa stránka vždy otvárala s rovnakou hlasitosťou, začiarknite v okne „Zapamätať si túto stránku“. Stránka nastavení vypisuje každú uloženú stránku, umožňuje ktorúkoľvek upraviť či odstrániť a dokáže zariadiť, aby si nové karty pamätali automaticky.

DRŽÍ KROK SO STREAMOVACÍMI STRÁNKAMI

Stránky ako YouTube, Twitch a Kick vymieňajú svoj videoprehrávač, keď prejdete na ďalšiu časť alebo prenos, bez opätovného načítania stránky. Mnohé zosilňovače v tej chvíli stratia zvuk a ďalej zobrazujú úroveň, ktorú už neuplatňujú. Toto rozšírenie výmenu sleduje a znova použije vaše nastavenia na nový prehrávač, takže hlasitosť, ktorú ste nastavili, zostáva hlasitosťou, ktorú počujete.

SÚKROMIE

Žiadne sledovanie. Žiadna analytika. Žiadny účet. Žiadne sieťové požiadavky akéhokoľvek druhu, ani kvôli písmam. Vaše nastavenia nikdy neopustia vaše vlastné zariadenie.

ČO NEDOKÁŽE

Služby chránené DRM ako Netflix, Disney+, Prime Video a Spotify skrývajú svoj zvuk pred rozšíreniami už zo svojej podstaty, takže ich zosilniť nemožno. Keď stránku nemožno spracovať, okno to povie priamo, namiesto toho, aby ticho nerobilo nič.

Stránky prehliadača ako chrome:// a internetový obchod sú zakázané každému rozšíreniu vrátane tohto.

ZOSILŇUJTE PROSÍM ZODPOVEDNE

Vysoká hlasitosť môže poškodiť sluch aj reproduktory, najmä pri slúchadlách. Limiter je nad 100 % predvolene zapnutý a mali by ste ho nechať zapnutý. Zvýšenie stropu nad 600 % v nastaveniach je na vaše vlastné riziko.

OTVORENÝ ZDROJ

Zdrojový kód, sledovanie chýb a sprievodca prispievaním:
https://github.com/ramazansancar/volume-booster-tab-extension

Licencované pod GNU Affero General Public License v3.0.
```

## `sl` — Slovenščina

_Translated from the English description._

```text
Volume Booster Tab dvigne glasnost katerega koli zavihka brskalnika prek tega, kar dovoljuje sama stran, in vam da resničen nadzor nad tem, kako se ta zvok oblikuje.

ZMOŽNOSTI

- Ojačitev od 0 % do 600 %, v nastavitvah dvignljiva do 1000 %
- Omejevalnik, ki pri ojačevanju prepreči popačenje in boleče vrhove
- Šestpasovni izenačevalnik od 60 Hz do 10 kHz v Naprednih nastavitvah
- Stereo ravnotežje, od skrajno levo do skrajno desno
- Zmiks v mono za poslušanje z eno samo slušalko
- Stikalo za obhod za takojšnjo primerjavo obdelanega in izvirnega zvoka
- Na voljo v 55 jezikih, v celoti prevedeno

VSAK ZAVIHEK JE NEODVISEN

Prav tu se večina ojačevalnikov glasnosti zmoti. Vsak zavihek ohrani svojo glasnost, svojo krivuljo izenačevalnika, svoje ravnotežje. Predvajajte prenos pri 300 % v enem zavihku in glasbo pri 120 % v drugem; sprememba enega se drugega nikoli ne dotakne.

Značka v orodni vrstici prikazuje raven zavihka, ki ga gledate, zato na prvi pogled veste, kateri zavihki so ojačeni.

PRIVZETO ZAČASNO

Ojačitev se pozabi, ko zavihek zaprete. Nastavitev, izbrana za en videoposnetek, vas čez tedne nikoli ne more presenetiti na drugi strani.

Če želite, da se spletno mesto vedno odpre z enako glasnostjo, v pojavnem oknu označite »Zapomni si to spletno mesto«. Stran z nastavitvami našteje vsako shranjeno spletno mesto, omogoča urejanje ali odstranitev katerega koli od njih in lahko poskrbi, da si novi zavihki zapomnijo samodejno.

SLEDI PRETOČNIM SPLETNIM MESTOM

Spletna mesta, kot so YouTube, Twitch in Kick, zamenjajo svoj predvajalnik videa, ko preidete na naslednjo epizodo ali prenos, brez ponovnega nalaganja strani. Mnogi ojačevalniki prav takrat izgubijo zvok in še naprej prikazujejo raven, ki je ne uporabljajo več. Ta razširitev zamenjavo opazuje in vaše nastavitve znova uporabi na novem predvajalniku, tako da glasnost, ki ste jo nastavili, ostane glasnost, ki jo slišite.

ZASEBNOST

Brez sledenja. Brez analitike. Brez računa. Brez omrežnih zahtev kakršne koli vrste, niti za pisave. Vaše nastavitve nikoli ne zapustijo vaše lastne naprave.

ČESA NE ZMORE

Storitve, zaščitene z DRM, kot so Netflix, Disney+, Prime Video in Spotify, svoj zvok pred razširitvami skrivajo že po zasnovi, zato jih ni mogoče ojačiti. Kadar strani ni mogoče obdelati, pojavno okno to jasno pove, namesto da bi tiho ne naredilo nič.

Strani brskalnika, kot so chrome:// in spletna trgovina, so zaprte za vsako razširitev, tudi za to.

PROSIMO, OJAČUJTE ODGOVORNO

Visoka glasnost lahko poškoduje tako sluh kot zvočnike, zlasti s slušalkami. Omejevalnik je nad 100 % privzeto vklopljen in naj ostane vklopljen. Dvig zgornje meje nad 600 % v nastavitvah je na vašo lastno odgovornost.

ODPRTA KODA

Izvorna koda, sledilnik težav in vodnik za prispevanje:
https://github.com/ramazansancar/volume-booster-tab-extension

Licencirano pod GNU Affero General Public License v3.0.
```

## `sr` — Српски

_Translated from the English description._

```text
Volume Booster Tab подиже јачину звука било које картице прегледача изнад онога што сама страница дозвољава и даје вам стварну контролу над тим како се тај звук обликује.

МОГУЋНОСТИ

- Појачање од 0% до 600%, у подешавањима подизиво до 1000%
- Лимитер који при појачавању спречава изобличење и болне вршне вредности
- Шестопојасни еквилајзер од 60 Hz до 10 kHz, у Напредним подешавањима
- Стерео баланс, од крајње лево до крајње десно
- Мешање у моно за слушање једном слушалицом
- Прекидач за заобилажење ради тренутног поређења обрађеног и изворног звука
- Доступно на 55 језика, у потпуности преведено

СВАКА КАРТИЦА ЈЕ НЕЗАВИСНА

Управо ту греши већина појачивача звука. Свака картица задржава сопствену јачину звука, сопствену криву еквилајзера, сопствени баланс. Пустите пренос на 300% у једној картици и музику на 120% у другој; промена једне никада не дира другу.

Ознака на траци са алаткама приказује ниво картице коју гледате, па на први поглед знате које су картице појачане.

ПОДРАЗУМЕВАНО ПРИВРЕМЕНО

Појачање се заборавља када затворите картицу. Подешавање изабрано за један видео никада вас не може изненадити недељама касније на другој страници.

Ако желите да се сајт увек отвара са истом јачином звука, означите „Запамти овај сајт” у искачућем прозору. Страница подешавања наводи сваки сачувани сајт, омогућава да било који измените или уклоните и може учинити да нове картице памте аутоматски.

ПРАТИ САЈТОВЕ ЗА СТРИМОВАЊЕ

Сајтови попут YouTube-а, Twitch-а и Kick-а замењују свој видео плејер када пређете на следећу епизоду или пренос, без поновног учитавања странице. Многи појачивачи баш тада изгубе звук и настављају да приказују ниво који више не примењују. Ово проширење прати замену и поново примењује ваша подешавања на нови плејер, тако да јачина звука коју сте поставили остаје јачина коју чујете.

ПРИВАТНОСТ

Без праћења. Без аналитике. Без налога. Без мрежних захтева било које врсте, чак ни за фонтове. Ваша подешавања никада не напуштају ваш сопствени уређај.

ШТА НЕ МОЖЕ

Услуге заштићене DRM-ом попут Netflix-а, Disney+-а, Prime Video-а и Spotify-ја скривају свој звук од проширења већ по замисли, па их није могуће појачати. Када страницу није могуће обрадити, искачући прозор то каже јасно уместо да тихо не уради ништа.

Странице прегледача попут chrome:// и веб продавнице затворене су за свако проширење, укључујући и ово.

МОЛИМО ВАС, ПОЈАЧАВАЈТЕ ОДГОВОРНО

Велика јачина звука може оштетити и слух и звучнике, нарочито са слушалицама. Лимитер је изнад 100% подразумевано укључен и требало би да га оставите укљученим. Подизање горње границе изнад 600% у подешавањима је на вашу сопствену одговорност.

ОТВОРЕНИ КОД

Изворни код, праћење проблема и водич за доприносе:
https://github.com/ramazansancar/volume-booster-tab-extension

Лиценцирано под GNU Affero General Public License v3.0.
```

## `sv` — Svenska

_Translated from the English description._

```text
Volume Booster Tab höjer volymen i vilken webbläsarflik som helst bortom vad sidan själv tillåter, och ger dig verklig kontroll över hur ljudet formas.

FUNKTIONER

- Förstärkning från 0 % till 600 %, kan höjas till 1000 % i inställningarna
- Limiter som förhindrar distorsion och smärtsamma toppar vid förstärkning
- 6-bands equalizer, 60 Hz till 10 kHz, under Avancerade inställningar
- Stereobalans, från helt vänster till helt höger
- Mononedmixning för att lyssna med bara en öronsnäcka
- Förbikopplingsknapp för att direkt jämföra bearbetat och obearbetat ljud
- Tillgänglig på 55 språk, fullständigt översatt

VARJE FLIK ÄR OBEROENDE

Det är här de flesta volymförstärkare går fel. Varje flik behåller sin egen volym, sin egen equalizerkurva, sin egen balans. Kör en sändning på 300 % i en flik och musik på 120 % i en annan; att ändra den ena rör aldrig den andra.

Märket i verktygsfältet visar nivån för fliken du tittar på, så du ser med en blick vilka flikar som är förstärkta.

TILLFÄLLIG SOM STANDARD

En förstärkning glöms bort när du stänger fliken. En inställning du valde för en video kan aldrig överraska dig veckor senare på en annan sida.

Vill du att en webbplats alltid ska öppnas med samma volym markerar du ”Kom ihåg den här webbplatsen” i popup-fönstret. Inställningssidan listar varje sparad webbplats, låter dig redigera eller ta bort någon av dem, och kan få nya flikar att komma ihåg automatiskt.

HÅLLER JÄMNA STEG MED STRÖMNINGSTJÄNSTER

Webbplatser som YouTube, Twitch och Kick byter ut sin videospelare när du går till nästa avsnitt eller sändning, utan att ladda om sidan. Många förstärkare tappar ljudet just då och fortsätter visa en nivå de inte längre tillämpar. Den här bevakar bytet och tillämpar dina inställningar på nytt på den nya spelaren, så att volymen du ställde in förblir volymen du hör.

INTEGRITET

Ingen spårning. Ingen analys. Inget konto. Inga nätverksförfrågningar av något slag, inte ens för teckensnitt. Dina inställningar lämnar aldrig din egen maskin.

VAD DEN INTE KAN

DRM-skyddade tjänster som Netflix, Disney+, Prime Video och Spotify döljer sitt ljud för tillägg redan genom sin konstruktion, så de kan inte förstärkas. När en sida inte kan bearbetas säger popup-fönstret det rakt ut i stället för att tyst inte göra något.

Webbläsarsidor som chrome:// och webbutiken är stängda för varje tillägg, även det här.

FÖRSTÄRK ANSVARSFULLT

Hög volym kan skada både din hörsel och dina högtalare, särskilt med hörlurar. Limitern är påslagen som standard över 100 % och bör lämnas påslagen. Att höja taket över 600 % i inställningarna sker på egen risk.

ÖPPEN KÄLLKOD

Källkod, ärendehantering och bidragsguide:
https://github.com/ramazansancar/volume-booster-tab-extension

Licensierad under GNU Affero General Public License v3.0.
```

## `sw` — Kiswahili

_Translated from the English description._

```text
Volume Booster Tab hupandisha sauti ya kichupo chochote cha kivinjari zaidi ya kile ukurasa wenyewe unavyoruhusu, na hukupa udhibiti halisi wa jinsi sauti hiyo inavyoundwa.

VIPENGELE

- Ukuzaji kutoka 0% hadi 600%, unaoweza kupandishwa hadi 1000% katika mipangilio
- Kikomo kinachozuia upotoshaji na vilele vinavyoumiza wakati wa kukuza
- Kisawazishaji cha bendi 6, kutoka 60 Hz hadi 10 kHz, chini ya Mipangilio ya kina
- Usawa wa stereo, kutoka kushoto kabisa hadi kulia kabisa
- Uchanganyaji wa mono kwa kusikiliza kwa kipokea sikio kimoja
- Swichi ya kupitisha ili kulinganisha papo hapo sauti iliyochakatwa na ile ya awali
- Inapatikana katika lugha 55, imetafsiriwa kikamilifu

KILA KICHUPO KIPO PEKE YAKE

Hapa ndipo vikuza sauti vingi hukosea. Kila kichupo huhifadhi sauti yake, mkunjo wake wa kisawazishaji, usawa wake. Endesha matangazo kwa 300% katika kichupo kimoja na muziki kwa 120% katika kingine; kubadilisha kimoja hakigusi kingine kamwe.

Beji ya upau wa vidhibiti huonyesha kiwango cha kichupo unachotazama, hivyo unajua kwa mtazamo mmoja ni vichupo vipi vimekuzwa.

KWA CHAGUO-MSINGI NI KWA MUDA

Ukuzaji husahaulika unapofunga kichupo. Mpangilio uliouchagua kwa video moja hauwezi kamwe kukushtua wiki kadhaa baadaye kwenye ukurasa mwingine.

Ukitaka tovuti ifunguke daima kwa sauti ileile, tiki "Kumbuka tovuti hii" katika kidirisha ibukizi. Ukurasa wa mipangilio huorodhesha kila tovuti uliyohifadhi, hukuruhusu kuhariri au kuondoa yoyote kati yake, na unaweza kufanya vichupo vipya vikumbuke kiotomatiki.

HUENDANA NA TOVUTI ZA UTIRIRISHAJI

Tovuti kama YouTube, Twitch na Kick hubadilisha kichezaji chao cha video unapohamia kipindi au tangazo linalofuata, bila kupakia ukurasa upya. Vikuza vingi hupoteza sauti wakati huohuo na huendelea kuonyesha kiwango ambacho hakitumii tena. Kiendelezi hiki hufuatilia ubadilishaji huo na hutumia mipangilio yako tena kwenye kichezaji kipya, hivyo sauti uliyoiweka hubaki kuwa sauti unayoisikia.

FARAGHA

Hakuna ufuatiliaji. Hakuna uchanganuzi. Hakuna akaunti. Hakuna maombi ya mtandao ya aina yoyote, hata kwa fonti. Mipangilio yako haiondoki kamwe kwenye kifaa chako mwenyewe.

KISICHOWEZA KUFANYA

Huduma zinazolindwa na DRM kama Netflix, Disney+, Prime Video na Spotify huficha sauti yao dhidi ya viendelezi kwa muundo wenyewe, hivyo haziwezi kukuzwa. Ukurasa usipoweza kuchakatwa, kidirisha ibukizi husema hivyo wazi badala ya kunyamaza bila kufanya chochote.

Kurasa za kivinjari kama chrome:// na Duka la Wavuti zimefungwa kwa kila kiendelezi, likiwemo hili.

TAFADHALI KUZA KWA UWAJIBIKAJI

Sauti kubwa inaweza kuharibu usikivu wako na spika zako, hasa kwa vipokea sauti vya kichwani. Kikomo huwa kimewashwa kwa chaguo-msingi zaidi ya 100% na unapaswa kukiacha kikiwa kimewashwa. Kupandisha kikomo zaidi ya 600% katika mipangilio ni kwa hatari yako mwenyewe.

CHANZO HURIA

Msimbo wa chanzo, kifuatiliaji cha masuala na mwongozo wa kuchangia:
https://github.com/ramazansancar/volume-booster-tab-extension

Ina leseni chini ya GNU Affero General Public License v3.0.
```

## `ta` — தமிழ்

_Translated from the English description._

```text
பக்கம் தானே அனுமதிப்பதற்கு அப்பால் எந்தவொரு உலாவி தாவலின் ஒலியளவையும் Volume Booster Tab உயர்த்துகிறது, மேலும் அந்த ஒலி எவ்வாறு வடிவமைக்கப்படுகிறது என்பதில் உங்களுக்கு உண்மையான கட்டுப்பாட்டை வழங்குகிறது.

அம்சங்கள்

- 0% முதல் 600% வரை பெருக்கம், அமைப்புகளில் 1000% வரை உயர்த்தலாம்
- பெருக்கும்போது சிதைவையும் காதை வலிக்கும் உச்சங்களையும் தடுக்கும் லிமிட்டர்
- மேம்பட்ட அமைப்புகளின் கீழ் 60 Hz முதல் 10 kHz வரையிலான 6-பட்டை சமனிப்பான்
- முழு இடமிருந்து முழு வலம் வரை ஸ்டீரியோ சமநிலை
- ஒரே காதணியில் கேட்பதற்கான மோனோ கலவை
- செயலாக்கப்பட்ட மற்றும் அசல் ஒலியை உடனடியாக ஒப்பிட பைபாஸ் சுவிட்ச்
- 55 மொழிகளில் கிடைக்கிறது, முழுமையாக மொழிபெயர்க்கப்பட்டது

ஒவ்வொரு தாவலும் தனித்தன்மையுடையது

பெரும்பாலான ஒலி பெருக்கிகள் தவறு செய்வது இங்குதான். ஒவ்வொரு தாவலும் தனது சொந்த ஒலியளவு, தனது சொந்த சமனிப்பான் வளைவு, தனது சொந்த சமநிலையைத் தக்கவைக்கிறது. ஒரு தாவலில் நேரலையை 300% இலும் மற்றொன்றில் இசையை 120% இலும் இயக்குங்கள்; ஒன்றை மாற்றுவது மற்றொன்றைத் தொடுவதே இல்லை.

கருவிப்பட்டை பேட்ஜ் நீங்கள் பார்க்கும் தாவலின் அளவைக் காட்டுகிறது, எனவே எந்தத் தாவல்கள் பெருக்கப்பட்டுள்ளன என்பது ஒரே பார்வையில் தெரியும்.

இயல்பாகவே தற்காலிகம்

தாவலை மூடும்போது பெருக்கம் மறக்கப்படுகிறது. ஒரு காணொளிக்காக நீங்கள் தேர்ந்தெடுத்த அமைப்பு வாரங்களுக்குப் பிறகு வேறொரு பக்கத்தில் உங்களை ஒருபோதும் திடுக்கிடச் செய்யாது.

ஒரு தளம் எப்போதும் ஒரே ஒலியளவில் திறக்க வேண்டுமெனில், பாப்அப்பில் "இந்தத் தளத்தை நினைவில் கொள்" என்பதைத் தேர்வுசெய்யுங்கள். அமைப்புகள் பக்கம் நீங்கள் சேமித்த ஒவ்வொரு தளத்தையும் பட்டியலிடுகிறது, எதையும் திருத்தவோ அகற்றவோ அனுமதிக்கிறது, மேலும் புதிய தாவல்கள் தானாகவே நினைவில் கொள்ளச் செய்ய முடியும்.

ஸ்ட்ரீமிங் தளங்களுடன் ஒத்துப்போகிறது

YouTube, Twitch மற்றும் Kick போன்ற தளங்கள் அடுத்த அத்தியாயத்திற்கோ நேரலைக்கோ செல்லும்போது பக்கத்தை மீண்டும் ஏற்றாமல் தங்கள் காணொளி இயக்கியை மாற்றுகின்றன. பல பெருக்கிகள் சரியாக அந்தத் தருணத்தில் ஒலியை இழந்து, இனி பயன்படுத்தாத ஒரு அளவைக் காட்டிக்கொண்டே இருக்கின்றன. இந்த நீட்டிப்பு அந்த மாற்றத்தைக் கண்காணித்து உங்கள் அமைப்புகளை புதிய இயக்கியில் மீண்டும் பயன்படுத்துகிறது, எனவே நீங்கள் அமைத்த ஒலியளவே நீங்கள் கேட்கும் ஒலியளவாக நீடிக்கிறது.

தனியுரிமை

கண்காணிப்பு இல்லை. பகுப்பாய்வு இல்லை. கணக்கு இல்லை. எழுத்துருக்களுக்குக் கூட எந்தவிதமான வலையமைப்பு கோரிக்கையும் இல்லை. உங்கள் அமைப்புகள் உங்கள் சொந்த சாதனத்தை ஒருபோதும் விட்டு வெளியேறுவதில்லை.

இதனால் செய்ய முடியாதவை

Netflix, Disney+, Prime Video மற்றும் Spotify போன்ற DRM-பாதுகாக்கப்பட்ட சேவைகள் வடிவமைப்பாலேயே தங்கள் ஒலியை நீட்டிப்புகளிடமிருந்து மறைக்கின்றன, எனவே அவற்றைப் பெருக்க முடியாது. ஒரு பக்கத்தைச் செயலாக்க முடியாதபோது, அமைதியாக எதுவும் செய்யாமல் இருப்பதற்குப் பதிலாக பாப்அப் அதைத் தெளிவாகக் கூறுகிறது.

chrome:// மற்றும் வலைக் கடை போன்ற உலாவி பக்கங்கள் இது உட்பட ஒவ்வொரு நீட்டிப்புக்கும் தடைசெய்யப்பட்டவை.

பொறுப்புடன் பெருக்குங்கள்

அதிக ஒலியளவு உங்கள் கேட்கும் திறனையும் ஒலிபெருக்கிகளையும் சேதப்படுத்தலாம், குறிப்பாக ஹெட்ஃபோன்களுடன். 100% க்கு மேல் லிமிட்டர் இயல்பாகவே இயக்கப்பட்டிருக்கும், அதை இயக்கத்திலேயே விட்டுவிட வேண்டும். அமைப்புகளில் உச்ச வரம்பை 600% க்கு மேல் உயர்த்துவது முற்றிலும் உங்கள் சொந்தப் பொறுப்பில்.

திறந்த மூலம்

மூலக் குறியீடு, சிக்கல் கண்காணிப்பு மற்றும் பங்களிப்பு வழிகாட்டி:
https://github.com/ramazansancar/volume-booster-tab-extension

GNU Affero General Public License v3.0 இன் கீழ் உரிமம் பெற்றது.
```

## `te` — తెలుగు

_Translated from the English description._

```text
పేజీ స్వయంగా అనుమతించే దానికంటే ఎక్కువగా Volume Booster Tab ఏ బ్రౌజర్ ట్యాబ్ ధ్వనినైనా పెంచుతుంది, మరియు ఆ ధ్వని ఎలా రూపుదిద్దుకోవాలో మీకు నిజమైన నియంత్రణ ఇస్తుంది.

లక్షణాలు

- 0% నుండి 600% వరకు పెంపు, సెట్టింగ్‌లలో 1000% వరకు పెంచవచ్చు
- పెంచేటప్పుడు వక్రీకరణను, చెవికి నొప్పి కలిగించే శిఖరాలను నివారించే లిమిటర్
- అధునాతన సెట్టింగ్‌ల కింద 60 Hz నుండి 10 kHz వరకు 6-బ్యాండ్ ఈక్వలైజర్
- పూర్తి ఎడమ నుండి పూర్తి కుడి వరకు స్టీరియో సమతుల్యత
- ఒకే ఇయర్‌బడ్‌తో వినడానికి మోనో డౌన్‌మిక్స్
- ప్రాసెస్ చేసిన, అసలు ధ్వనిని వెంటనే పోల్చడానికి బైపాస్ స్విచ్
- 55 భాషలలో అందుబాటులో, పూర్తిగా అనువదించబడింది

ప్రతి ట్యాబ్ స్వతంత్రం

చాలా వాల్యూమ్ బూస్టర్లు పొరపాటు చేసేది ఇక్కడే. ప్రతి ట్యాబ్ తన సొంత ధ్వని, తన సొంత ఈక్వలైజర్ వక్రరేఖ, తన సొంత సమతుల్యతను నిలుపుకుంటుంది. ఒక ట్యాబ్‌లో ప్రసారాన్ని 300% వద్ద, మరొకదానిలో సంగీతాన్ని 120% వద్ద నడపండి; ఒకదాన్ని మార్చడం మరొకదాన్ని ఎన్నడూ తాకదు.

టూల్‌బార్ బ్యాడ్జ్ మీరు చూస్తున్న ట్యాబ్ స్థాయిని చూపుతుంది, కాబట్టి ఏ ట్యాబ్‌లు పెంచబడ్డాయో ఒక్క చూపులో తెలుస్తుంది.

అప్రమేయంగా తాత్కాలికం

ట్యాబ్ మూసివేసినప్పుడు పెంపు మరచిపోబడుతుంది. ఒక వీడియో కోసం మీరు ఎంచుకున్న సెట్టింగ్ వారాల తర్వాత మరో పేజీలో మిమ్మల్ని ఎన్నడూ ఆశ్చర్యపరచలేదు.

ఒక సైట్ ఎల్లప్పుడూ ఒకే ధ్వనితో తెరవాలంటే, పాప్‌అప్‌లో "ఈ సైట్‌ను గుర్తుంచుకో" టిక్ చేయండి. సెట్టింగ్‌ల పేజీ మీరు సేవ్ చేసిన ప్రతి సైట్‌ను జాబితా చేస్తుంది, వాటిలో దేనినైనా సవరించడానికి లేదా తీసివేయడానికి అనుమతిస్తుంది, మరియు కొత్త ట్యాబ్‌లు స్వయంచాలకంగా గుర్తుంచుకునేలా చేయగలదు.

స్ట్రీమింగ్ సైట్‌లతో అడుగు కలుపుతుంది

YouTube, Twitch మరియు Kick వంటి సైట్‌లు తదుపరి ఎపిసోడ్‌కు లేదా ప్రసారానికి వెళ్లినప్పుడు పేజీని మళ్లీ లోడ్ చేయకుండానే తమ వీడియో ప్లేయర్‌ను మార్చేస్తాయి. చాలా బూస్టర్లు సరిగ్గా ఆ క్షణంలోనే ధ్వనిని కోల్పోతాయి, ఇకపై వర్తింపజేయని స్థాయిని చూపిస్తూనే ఉంటాయి. ఈ పొడిగింపు ఆ మార్పును గమనించి మీ సెట్టింగ్‌లను కొత్త ప్లేయర్‌కు మళ్లీ వర్తింపజేస్తుంది, కాబట్టి మీరు సెట్ చేసిన ధ్వనే మీరు వినే ధ్వనిగా మిగిలిపోతుంది.

గోప్యత

ట్రాకింగ్ లేదు. విశ్లేషణలు లేవు. ఖాతా లేదు. ఫాంట్‌ల కోసం కూడా ఎలాంటి నెట్‌వర్క్ అభ్యర్థనలు లేవు. మీ సెట్టింగ్‌లు మీ సొంత పరికరాన్ని ఎన్నడూ విడిచిపెట్టవు.

ఇది చేయలేనివి

Netflix, Disney+, Prime Video మరియు Spotify వంటి DRM-రక్షిత సేవలు రూపకల్పన ద్వారానే తమ ఆడియోను పొడిగింపుల నుండి దాచిపెడతాయి, కాబట్టి వాటిని పెంచలేము. ఒక పేజీని ప్రాసెస్ చేయలేనప్పుడు, నిశ్శబ్దంగా ఏమీ చేయకుండా ఉండే బదులు పాప్‌అప్ దానిని స్పష్టంగా చెబుతుంది.

chrome:// మరియు వెబ్ స్టోర్ వంటి బ్రౌజర్ పేజీలు ఇది సహా ప్రతి పొడిగింపుకు నిషేధించబడ్డాయి.

దయచేసి బాధ్యతతో పెంచండి

అధిక ధ్వని మీ వినికిడికి, స్పీకర్లకు రెండింటికీ హాని కలిగించవచ్చు, ముఖ్యంగా హెడ్‌ఫోన్‌లతో. 100% కంటే ఎక్కువగా లిమిటర్ అప్రమేయంగా ఆన్‌లో ఉంటుంది, దానిని ఆన్‌లోనే ఉంచాలి. సెట్టింగ్‌లలో పరిమితిని 600% కంటే పైకి పెంచడం పూర్తిగా మీ సొంత బాధ్యతపై.

ఓపెన్ సోర్స్

సోర్స్ కోడ్, సమస్య ట్రాకర్ మరియు సహకార మార్గదర్శి:
https://github.com/ramazansancar/volume-booster-tab-extension

GNU Affero General Public License v3.0 కింద లైసెన్స్ పొందింది.
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
