#!/usr/bin/env node
/**
 * Locale generator.
 *
 * Writes public/_locales/<code>/messages.json for every locale the extension
 * stores accept. Keeping the translations in one table rather than 50 separate
 * files means adding a new UI string is a single edit, and a missing
 * translation is visible at a glance instead of hiding in a file nobody opens.
 *
 * Any string a locale does not translate falls back to English, which is what
 * the browser does automatically when a key is absent. We emit the English text
 * for untranslated keys anyway so the files stay valid and self-describing.
 *
 * Usage: node scripts/locales.mjs
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', '_locales');

/**
 * Every locale code the extension stores accept, taken verbatim from the
 * Chrome i18n locale table:
 * https://developer.chrome.com/docs/extensions/reference/api/i18n#locales
 *
 * Directory names use underscores (pt_BR, zh_CN) on every store. Firefox reads
 * the same layout as Chrome, so one set of folders serves Chrome, Edge, Opera
 * and AMO alike. Note that the runtime `i18n.getUILanguage()` returns the
 * hyphenated tag ("en-US") in both engines; only the folder names differ.
 *
 * Norwegian is `no` in this table rather than `nb`, and `en_US` / `en_AU` are
 * accepted alongside `en_GB`.
 */
const LOCALES = [
  'am', 'ar', 'bg', 'bn', 'ca', 'cs', 'da', 'de', 'el', 'en', 'en_AU', 'en_GB',
  'en_US', 'es', 'es_419', 'et', 'fa', 'fi', 'fil', 'fr', 'gu', 'he', 'hi',
  'hr', 'hu', 'id', 'it', 'ja', 'kn', 'ko', 'lt', 'lv', 'ml', 'mr', 'ms', 'nl',
  'no', 'pl', 'pt_BR', 'pt_PT', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'sw', 'ta',
  'te', 'th', 'tr', 'uk', 'vi', 'zh_CN', 'zh_TW',
];

/** Descriptions shown to translators; emitted only in the English file. */
const DESCRIPTIONS = {
  extensionName: 'Name of the extension shown in the browser.',
  extensionDescription: 'Store listing description, max 132 characters.',
};

/**
 * Translation table, keyed by message name then locale.
 *
 * Locales absent from a key inherit the English text. Contributions that fill
 * in a missing language are very welcome; see CONTRIBUTING.md.
 */
const MESSAGES = {
  extensionName: {
    en: 'Volume Booster',
    ar: 'مضخم الصوت',
    bg: 'Усилвател на звука',
    bn: 'ভলিউম বুস্টার',
    ca: 'Amplificador de volum',
    cs: 'Zesilovač hlasitosti',
    da: 'Lydforstærker',
    de: 'Lautstärkeverstärker',
    el: 'Ενισχυτής έντασης',
    es: 'Amplificador de volumen',
    es_419: 'Amplificador de volumen',
    et: 'Helitugevuse võimendi',
    fa: 'تقویت‌کننده صدا',
    fi: 'Äänenvoimakkuuden vahvistin',
    fil: 'Volume Booster',
    fr: 'Amplificateur de volume',
    he: 'מגביר עוצמת קול',
    hi: 'वॉल्यूम बूस्टर',
    hr: 'Pojačalo glasnoće',
    hu: 'Hangerő-erősítő',
    id: 'Penguat Volume',
    it: 'Amplificatore volume',
    ja: '音量ブースター',
    ko: '볼륨 부스터',
    lt: 'Garsumo stiprintuvas',
    lv: 'Skaļuma pastiprinātājs',
    ms: 'Penguat Volum',
    nb: 'Volumforsterker',
    nl: 'Volumeversterker',
    pl: 'Wzmacniacz głośności',
    pt_BR: 'Amplificador de volume',
    pt_PT: 'Amplificador de volume',
    ro: 'Amplificator de volum',
    ru: 'Усилитель громкости',
    sk: 'Zosilňovač hlasitosti',
    sl: 'Ojačevalnik glasnosti',
    sr: 'Појачавач звука',
    sv: 'Volymförstärkare',
    sw: 'Kikuza Sauti',
    th: 'ตัวเพิ่มระดับเสียง',
    tr: 'Ses Yükseltici',
    uk: 'Підсилювач гучності',
    vi: 'Bộ khuếch đại âm lượng',
    zh_CN: '音量增强器',
    zh_TW: '音量增強器',
  },

  extensionDescription: {
    en: 'Boost volume up to 600% with a limiter, equalizer and channel balance. Per-tab and open source.',
    ar: 'ارفع مستوى الصوت حتى 600% مع محدد ومعادل وتوازن القنوات. لكل تبويب ومفتوح المصدر.',
    de: 'Verstärke die Lautstärke auf bis zu 600 % mit Limiter, Equalizer und Kanalbalance. Pro Tab, quelloffen.',
    es: 'Aumenta el volumen hasta un 600 % con limitador, ecualizador y balance de canales. Por pestaña y de código abierto.',
    fr: 'Augmentez le volume jusqu’à 600 % avec limiteur, égaliseur et balance. Par onglet et open source.',
    hi: 'लिमिटर, इक्वलाइज़र और चैनल बैलेंस के साथ वॉल्यूम 600% तक बढ़ाएँ। प्रति-टैब और ओपन सोर्स।',
    id: 'Tingkatkan volume hingga 600% dengan limiter, ekualiser, dan keseimbangan kanal. Per tab dan sumber terbuka.',
    it: 'Aumenta il volume fino al 600% con limitatore, equalizzatore e bilanciamento. Per scheda e open source.',
    ja: 'リミッター、イコライザー、チャンネルバランスで音量を最大600%まで増幅。タブ単位、オープンソース。',
    ko: '리미터, 이퀄라이저, 채널 밸런스로 볼륨을 최대 600%까지 높입니다. 탭별 설정, 오픈 소스.',
    nl: 'Versterk het volume tot 600% met limiter, equalizer en kanaalbalans. Per tabblad en open source.',
    pl: 'Zwiększ głośność do 600% z limiterem, korektorem i balansem kanałów. Osobno dla każdej karty, open source.',
    pt_BR: 'Aumente o volume até 600% com limitador, equalizador e balanço de canais. Por aba e código aberto.',
    pt_PT: 'Aumente o volume até 600% com limitador, equalizador e balanço de canais. Por separador e código aberto.',
    ru: 'Увеличьте громкость до 600% с лимитером, эквалайзером и балансом каналов. Для каждой вкладки, открытый код.',
    th: 'เพิ่มระดับเสียงได้ถึง 600% พร้อมลิมิตเตอร์ อีควอไลเซอร์ และสมดุลช่องสัญญาณ แยกตามแท็บ โอเพนซอร์ส',
    tr: 'Sesi %600’e kadar yükseltin. Limitör, ekolayzer ve kanal dengesi. Sekme bazlı ve açık kaynak.',
    uk: 'Збільште гучність до 600% з лімітером, еквалайзером і балансом каналів. Для кожної вкладки, відкритий код.',
    vi: 'Tăng âm lượng lên đến 600% với bộ giới hạn, cân bằng và cân bằng kênh. Theo từng tab, mã nguồn mở.',
    zh_CN: '通过限制器、均衡器和声道平衡将音量提升至 600%。按标签页独立设置，开源。',
    zh_TW: '透過限制器、等化器和聲道平衡將音量提升至 600%。依分頁獨立設定，開放原始碼。',
  },

  popupCurrentSite: {
    en: 'Current tab',
    de: 'Aktueller Tab', es: 'Pestaña actual', fr: 'Onglet actuel',
    it: 'Scheda corrente', ja: '現在のタブ', ko: '현재 탭', nl: 'Huidig tabblad',
    pl: 'Bieżąca karta', pt_BR: 'Aba atual', pt_PT: 'Separador atual',
    ru: 'Текущая вкладка', tr: 'Geçerli sekme', uk: 'Поточна вкладка',
    zh_CN: '当前标签页', zh_TW: '目前分頁', ar: 'علامة التبويب الحالية',
    hi: 'वर्तमान टैब', id: 'Tab saat ini', th: 'แท็บปัจจุบัน', vi: 'Tab hiện tại',
  },

  popupVolume: {
    en: 'Volume',
    de: 'Lautstärke', es: 'Volumen', fr: 'Volume', it: 'Volume', ja: '音量',
    ko: '볼륨', nl: 'Volume', pl: 'Głośność', pt_BR: 'Volume', pt_PT: 'Volume',
    ru: 'Громкость', tr: 'Ses seviyesi', uk: 'Гучність', zh_CN: '音量',
    zh_TW: '音量', ar: 'مستوى الصوت', hi: 'वॉल्यूम', id: 'Volume',
    th: 'ระดับเสียง', vi: 'Âm lượng',
  },

  popupBalance: {
    en: 'Balance',
    de: 'Balance', es: 'Balance', fr: 'Balance', it: 'Bilanciamento',
    ja: 'バランス', ko: '밸런스', nl: 'Balans', pl: 'Balans', pt_BR: 'Balanço',
    pt_PT: 'Balanço', ru: 'Баланс', tr: 'Denge', uk: 'Баланс', zh_CN: '声道平衡',
    zh_TW: '聲道平衡', ar: 'التوازن', hi: 'संतुलन', id: 'Keseimbangan',
    th: 'สมดุลเสียง', vi: 'Cân bằng',
  },

  popupBalanceCenter: {
    en: 'Center',
    de: 'Mitte', es: 'Centro', fr: 'Centre', it: 'Centro', ja: '中央',
    ko: '가운데', nl: 'Midden', pl: 'Środek', pt_BR: 'Centro', pt_PT: 'Centro',
    ru: 'Центр', tr: 'Orta', uk: 'Центр', zh_CN: '居中', zh_TW: '置中',
    ar: 'الوسط', hi: 'केंद्र', id: 'Tengah', th: 'ตรงกลาง', vi: 'Giữa',
  },

  popupMono: {
    en: 'Mono',
    ja: 'モノラル', ko: '모노', ru: 'Моно', uk: 'Моно', zh_CN: '单声道',
    zh_TW: '單聲道', ar: 'أحادي', hi: 'मोनो', th: 'โมโน', tr: 'Mono',
  },

  popupLimiter: {
    en: 'Limiter',
    de: 'Limiter', es: 'Limitador', fr: 'Limiteur', it: 'Limitatore',
    ja: 'リミッター', ko: '리미터', nl: 'Limiter', pl: 'Limiter',
    pt_BR: 'Limitador', pt_PT: 'Limitador', ru: 'Лимитер', tr: 'Limitör',
    uk: 'Лімітер', zh_CN: '限制器', zh_TW: '限制器', ar: 'المحدد',
    hi: 'लिमिटर', id: 'Pembatas', th: 'ลิมิตเตอร์', vi: 'Bộ giới hạn',
  },

  popupRemember: {
    en: 'Remember this site',
    de: 'Diese Website merken', es: 'Recordar este sitio',
    fr: 'Mémoriser ce site', it: 'Ricorda questo sito', ja: 'このサイトを記憶',
    ko: '이 사이트 기억', nl: 'Deze site onthouden', pl: 'Zapamiętaj tę stronę',
    pt_BR: 'Lembrar este site', pt_PT: 'Memorizar este site',
    ru: 'Запомнить этот сайт', tr: 'Bu siteyi hatırla',
    uk: 'Запам’ятати цей сайт', zh_CN: '记住此网站', zh_TW: '記住此網站',
    ar: 'تذكر هذا الموقع', hi: 'इस साइट को याद रखें', id: 'Ingat situs ini',
    th: 'จดจำเว็บไซต์นี้', vi: 'Ghi nhớ trang này',
  },

  popupBypass: {
    en: 'Bypass',
    de: 'Umgehen', es: 'Omitir', fr: 'Contourner', it: 'Bypass',
    ja: 'バイパス', ko: '우회', nl: 'Overslaan', pl: 'Pomiń',
    pt_BR: 'Ignorar', pt_PT: 'Ignorar', ru: 'Обход', tr: 'Devre dışı',
    uk: 'Обхід', zh_CN: '旁路', zh_TW: '旁路', ar: 'تجاوز', hi: 'बायपास',
    id: 'Lewati', th: 'ข้าม', vi: 'Bỏ qua',
  },

  popupBypassTitle: {
    en: 'Pass audio through untouched',
    de: 'Audio unverändert durchleiten', es: 'Dejar el audio sin procesar',
    fr: 'Laisser le son inchangé', ja: '音声を処理せずに通す',
    ko: '오디오를 처리하지 않고 통과', ru: 'Пропустить звук без обработки',
    tr: 'Sesi işlemeden geçir', zh_CN: '不处理直接输出音频',
  },

  popupAdvanced: {
    en: 'Advanced settings',
    de: 'Erweiterte Einstellungen', es: 'Configuración avanzada',
    fr: 'Paramètres avancés', it: 'Impostazioni avanzate', ja: '詳細設定',
    ko: '고급 설정', nl: 'Geavanceerde instellingen', pl: 'Ustawienia zaawansowane',
    pt_BR: 'Configurações avançadas', pt_PT: 'Definições avançadas',
    ru: 'Расширенные настройки', tr: 'Gelişmiş ayarlar',
    uk: 'Розширені налаштування', zh_CN: '高级设置', zh_TW: '進階設定',
    ar: 'الإعدادات المتقدمة', hi: 'उन्नत सेटिंग्स', id: 'Pengaturan lanjutan',
    th: 'การตั้งค่าขั้นสูง', vi: 'Cài đặt nâng cao',
  },

  popupEqualizer: {
    en: 'Equalizer',
    de: 'Equalizer', es: 'Ecualizador', fr: 'Égaliseur', it: 'Equalizzatore',
    ja: 'イコライザー', ko: '이퀄라이저', nl: 'Equalizer', pl: 'Korektor',
    pt_BR: 'Equalizador', pt_PT: 'Equalizador', ru: 'Эквалайзер',
    tr: 'Ekolayzer', uk: 'Еквалайзер', zh_CN: '均衡器', zh_TW: '等化器',
    ar: 'المعادل', hi: 'इक्वलाइज़र', id: 'Ekualiser', th: 'อีควอไลเซอร์',
    vi: 'Bộ chỉnh âm',
  },

  popupEqReset: {
    en: 'Reset',
    de: 'Zurücksetzen', es: 'Restablecer', fr: 'Réinitialiser',
    it: 'Reimposta', ja: 'リセット', ko: '초기화', nl: 'Herstellen',
    pl: 'Resetuj', pt_BR: 'Redefinir', pt_PT: 'Repor', ru: 'Сброс',
    tr: 'Sıfırla', uk: 'Скинути', zh_CN: '重置', zh_TW: '重設',
    ar: 'إعادة تعيين', hi: 'रीसेट', id: 'Atur ulang', th: 'รีเซ็ต',
    vi: 'Đặt lại',
  },

  popupEqOn: {
    en: 'EQ on',
    de: 'EQ an', es: 'EQ activo', fr: 'EQ activé', ja: 'EQ オン',
    ko: 'EQ 켜짐', ru: 'EQ вкл', tr: 'EQ açık', zh_CN: 'EQ 已开启',
  },

  popupResetTab: {
    en: 'Reset tab',
    de: 'Tab zurücksetzen', es: 'Restablecer pestaña',
    fr: 'Réinitialiser l’onglet', it: 'Reimposta scheda', ja: 'タブをリセット',
    ko: '탭 초기화', nl: 'Tabblad herstellen', pl: 'Resetuj kartę',
    pt_BR: 'Redefinir aba', pt_PT: 'Repor separador', ru: 'Сбросить вкладку',
    tr: 'Sekmeyi sıfırla', uk: 'Скинути вкладку', zh_CN: '重置标签页',
    zh_TW: '重設分頁', ar: 'إعادة تعيين التبويب', hi: 'टैब रीसेट करें',
    id: 'Atur ulang tab', th: 'รีเซ็ตแท็บ', vi: 'Đặt lại tab',
  },

  popupOpenOptions: {
    en: 'Open all settings',
    de: 'Alle Einstellungen öffnen', es: 'Abrir todos los ajustes',
    fr: 'Ouvrir tous les paramètres', it: 'Apri tutte le impostazioni',
    ja: 'すべての設定を開く', ko: '모든 설정 열기',
    nl: 'Alle instellingen openen', pl: 'Otwórz wszystkie ustawienia',
    pt_BR: 'Abrir todas as configurações', pt_PT: 'Abrir todas as definições',
    ru: 'Открыть все настройки', tr: 'Tüm ayarları aç',
    uk: 'Відкрити всі налаштування', zh_CN: '打开全部设置',
    zh_TW: '開啟所有設定', ar: 'فتح جميع الإعدادات', hi: 'सभी सेटिंग्स खोलें',
    id: 'Buka semua pengaturan', th: 'เปิดการตั้งค่าทั้งหมด',
    vi: 'Mở tất cả cài đặt',
  },

  popupGainHint: {
    en: 'Above 100% the limiter stays on to prevent distortion.',
    de: 'Über 100 % bleibt der Limiter aktiv, um Verzerrungen zu vermeiden.',
    es: 'Por encima del 100 % el limitador permanece activo para evitar distorsión.',
    fr: 'Au-delà de 100 %, le limiteur reste actif pour éviter la distorsion.',
    it: 'Oltre il 100% il limitatore resta attivo per evitare distorsioni.',
    ja: '100% を超えると歪みを防ぐためリミッターが有効のままになります。',
    ko: '100%를 넘으면 왜곡을 막기 위해 리미터가 켜진 상태로 유지됩니다.',
    nl: 'Boven 100% blijft de limiter aan om vervorming te voorkomen.',
    pl: 'Powyżej 100% limiter pozostaje włączony, aby zapobiec zniekształceniom.',
    pt_BR: 'Acima de 100% o limitador permanece ativo para evitar distorção.',
    ru: 'Выше 100% лимитер остаётся включённым, чтобы избежать искажений.',
    tr: '%100 üzerinde limitör bozulmayı önlemek için açık kalır.',
    uk: 'Понад 100% лімітер залишається увімкненим, щоб уникнути спотворень.',
    zh_CN: '超过 100% 时限制器保持开启以防止失真。',
    zh_TW: '超過 100% 時限制器會保持開啟以避免失真。',
  },

  popupActive: {
    en: 'Boost is active on this tab.',
    de: 'Verstärkung ist in diesem Tab aktiv.',
    es: 'El aumento está activo en esta pestaña.',
    fr: 'L’amplification est active sur cet onglet.',
    ja: 'このタブでブーストが有効です。', ko: '이 탭에서 부스트가 활성화되었습니다.',
    ru: 'Усиление активно на этой вкладке.',
    tr: 'Bu sekmede yükseltme etkin.', zh_CN: '此标签页已启用增强。',
  },

  popupIdle: {
    en: 'No audio playing yet.',
    de: 'Es wird noch kein Ton abgespielt.', es: 'Aún no se reproduce audio.',
    fr: 'Aucun son en cours de lecture.', ja: 'まだ音声が再生されていません。',
    ko: '아직 재생 중인 오디오가 없습니다.', ru: 'Звук пока не воспроизводится.',
    tr: 'Henüz ses çalmıyor.', zh_CN: '尚未播放音频。',
  },

  popupTabCapture: {
    en: 'Using tab capture.',
    de: 'Tab-Aufnahme wird verwendet.', es: 'Usando captura de pestaña.',
    fr: 'Capture d’onglet utilisée.', ja: 'タブキャプチャを使用中。',
    ko: '탭 캡처를 사용 중입니다.', ru: 'Используется захват вкладки.',
    tr: 'Sekme yakalama kullanılıyor.', zh_CN: '正在使用标签页捕获。',
  },

  popupUnavailable: {
    en: 'This page blocks audio processing.',
    de: 'Diese Seite blockiert die Audioverarbeitung.',
    es: 'Esta página bloquea el procesamiento de audio.',
    fr: 'Cette page bloque le traitement audio.',
    ja: 'このページは音声処理をブロックしています。',
    ko: '이 페이지는 오디오 처리를 차단합니다.',
    ru: 'Эта страница блокирует обработку звука.',
    tr: 'Bu sayfa ses işlemeyi engelliyor.', zh_CN: '此页面阻止音频处理。',
  },

  popupNoOrigin: {
    en: 'Browser pages cannot be boosted.',
    de: 'Browser-Seiten können nicht verstärkt werden.',
    es: 'Las páginas del navegador no se pueden amplificar.',
    fr: 'Les pages du navigateur ne peuvent pas être amplifiées.',
    ja: 'ブラウザのページは増幅できません。',
    ko: '브라우저 페이지는 증폭할 수 없습니다.',
    ru: 'Страницы браузера нельзя усилить.',
    tr: 'Tarayıcı sayfaları yükseltilemez.', zh_CN: '无法增强浏览器内部页面。',
  },

  popupNoTab: {
    en: 'No active tab.',
    de: 'Kein aktiver Tab.', es: 'No hay pestaña activa.',
    fr: 'Aucun onglet actif.', ja: 'アクティブなタブがありません。',
    ko: '활성 탭이 없습니다.', ru: 'Нет активной вкладки.',
    tr: 'Etkin sekme yok.', zh_CN: '没有活动标签页。',
  },

  popupUnsupportedPage: {
    en: 'This page',
    de: 'Diese Seite', es: 'Esta página', fr: 'Cette page', ja: 'このページ',
    ko: '이 페이지', ru: 'Эта страница', tr: 'Bu sayfa', zh_CN: '此页面',
  },
};

/** Builds the messages.json body for one locale. */
function messagesFor(locale) {
  const output = {};
  for (const [key, translations] of Object.entries(MESSAGES)) {
    const message = translations[locale] ?? translations.en;
    output[key] = { message };
    if (locale === 'en' && DESCRIPTIONS[key]) {
      output[key].description = DESCRIPTIONS[key];
    }
  }
  return output;
}

/** Reports how much of the UI each locale actually covers. */
function coverage(locale) {
  const keys = Object.keys(MESSAGES);
  const translated = keys.filter((key) => MESSAGES[key][locale] !== undefined);
  return { translated: translated.length, total: keys.length };
}

async function main() {
  const summary = [];

  for (const locale of LOCALES) {
    const dir = path.join(outDir, locale);
    await mkdir(dir, { recursive: true });
    await writeFile(
      path.join(dir, 'messages.json'),
      `${JSON.stringify(messagesFor(locale), null, 2)}\n`,
      'utf8',
    );
    const { translated, total } = coverage(locale);
    summary.push({ locale, translated, total });
  }

  const complete = summary.filter((s) => s.translated === s.total).length;
  console.log(`\nWrote ${LOCALES.length} locales to ${path.relative(root, outDir)}`);
  console.log(`  ${complete} fully translated, ${LOCALES.length - complete} falling back to English for some strings`);
  console.log('\nPartial locales (contributions welcome):');
  for (const { locale, translated, total } of summary) {
    if (translated < total) {
      const percent = Math.round((translated / total) * 100);
      console.log(`  ${locale.padEnd(8)} ${String(percent).padStart(3)}%  (${translated}/${total})`);
    }
  }
  console.log('');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
