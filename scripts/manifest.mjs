/**
 * Manifest generator.
 *
 * One description of the extension is turned into whichever manifest shape the
 * target browser and manifest version expect. Keeping this in a single file is
 * what makes "supports every browser and both manifest versions" maintainable:
 * a permission is added once here rather than in eight hand-edited JSON files.
 *
 * There are really only three engines to support. Everything else is a fork
 * that consumes one of these builds unchanged:
 *
 *   Chromium MV3  chrome-mv3, edge-mv3   Chrome 88+, Edge, Brave, Vivaldi,
 *                                        Arc, Yandex, Opera
 *   Chromium MV2  chrome-mv2, opera-mv2  Chromium builds and forks still on
 *                                        MV2, plus Opera's add-on store
 *   Gecko         firefox-mv2/mv3        Firefox, Firefox for Android, ESR,
 *                                        LibreWolf, Waterfox, Zen, Floorp
 *   WebKit        safari-mv3             Safari 16.4+ on macOS and iOS, after
 *                                        conversion with xcrun (see docs)
 */

import process from 'node:process';

export const TARGETS = /** @type {const} */ ([
  'chrome-mv3',
  'chrome-mv2',
  'edge-mv3',
  'opera-mv2',
  'firefox-mv2',
  'firefox-mv3',
  'safari-mv3',
]);

/** Targets built by `npm run build` when no explicit target is given. */
export const DEFAULT_TARGETS = /** @type {const} */ ([
  'chrome-mv3',
  'chrome-mv2',
  'edge-mv3',
  'opera-mv2',
  'firefox-mv2',
  'firefox-mv3',
  'safari-mv3',
]);

/**
 * Stable add-on id, required by Firefox for storage and update consistency.
 *
 * This value is frozen. addons.mozilla.org binds a listing to the id of its
 * first accepted upload, and rejects any later version whose manifest declares
 * a different one - so changing it would not rename this add-on, it would
 * orphan it and require registering a separate listing under a new slug.
 *
 * It therefore still reads "volume-booster" rather than "volume-booster-tab",
 * from before the add-on was renamed. That mismatch is invisible to users: the
 * id is an internal identity the browser uses for storage and updates, never
 * something shown in the interface or the store.
 */
const FIREFOX_ADDON_ID = 'volume-booster@ramazansancar.dev';

/**
 * First Firefox releases that understand
 * `browser_specific_settings.gecko.data_collection_permissions`.
 *
 * addons-linter emits KEY_FIREFOX_UNSUPPORTED_BY_MIN_VERSION when
 * `strict_min_version` predates these. That warning is informational: older
 * releases ignore the unknown key and install normally, and AMO accepts the
 * submission either way.
 *
 * We deliberately keep the lower minimum by default, because raising it to
 * silence a warning would drop every Firefox user below 140 — including the
 * current ESR. Set STRICT_DATA_CONSENT_MIN=1 to raise it instead, for a
 * warning-free submission when those older users no longer matter.
 */
const DATA_CONSENT_MIN_DESKTOP = '140.0';
const DATA_CONSENT_MIN_ANDROID = '142.0';

const raiseMinForDataConsent = process.env.STRICT_DATA_CONSENT_MIN === '1';

/** Human-readable notes shown by the build script, one per target. */
export const TARGET_NOTES = {
  'chrome-mv3': 'Chrome 88+, Brave, Vivaldi, Arc, Yandex',
  'chrome-mv2': 'Chromium forks still running Manifest V2',
  'edge-mv3': 'Microsoft Edge Add-ons',
  'opera-mv2': 'Opera add-ons store',
  'firefox-mv2': 'Firefox 91+ ESR, LibreWolf, Waterfox, Firefox for Android',
  'firefox-mv3': 'Firefox 109+',
  'safari-mv3': 'Safari 16.4+ (requires xcrun conversion, see docs/safari.md)',
};

/**
 * Splits a target string such as "firefox-mv2" into its parts.
 * @param {string} target
 * @returns {{ browser: 'chrome' | 'edge' | 'opera' | 'firefox' | 'safari', version: 2 | 3 }}
 */
export function parseTarget(target) {
  const [browser, mv] = target.split('-');
  const known = ['chrome', 'edge', 'opera', 'firefox', 'safari'];
  if (!known.includes(browser)) {
    throw new Error(
      `Unknown browser in target "${target}". Known targets: ${TARGETS.join(', ')}`,
    );
  }
  if (mv !== 'mv2' && mv !== 'mv3') {
    throw new Error(`Unknown manifest version in target "${target}"`);
  }
  return {
    browser: /** @type {'chrome' | 'edge' | 'opera' | 'firefox' | 'safari'} */ (browser),
    version: mv === 'mv2' ? 2 : 3,
  };
}

/** True for engines that use the Gecko `browser.*` promise API natively. */
function isGecko(browser) {
  return browser === 'firefox';
}

/** True for engines that only support the callback-style Chromium APIs. */
function isChromium(browser) {
  return browser === 'chrome' || browser === 'edge' || browser === 'opera';
}

/**
 * Builds the manifest object for a target.
 * @param {string} target
 * @param {{ version: string }} pkg
 */
export function buildManifest(target, pkg) {
  const { browser, version } = parseTarget(target);

  /** @type {Record<string, unknown>} */
  const manifest = {
    manifest_version: version,
    name: '__MSG_extensionName__',
    short_name: 'Volume Booster Tab',
    description: '__MSG_extensionDescription__',
    version: pkg.version,
    default_locale: 'en',

    icons: {
      16: 'icons/icon-16.png',
      32: 'icons/icon-32.png',
      48: 'icons/icon-48.png',
      128: 'icons/icon-128.png',
    },

    permissions: buildPermissions(browser, version),

    content_scripts: [
      {
        matches: ['http://*/*', 'https://*/*'],
        js: ['content.js'],
        // Media elements frequently live in embedded player frames, and the
        // boost has to reach those too.
        all_frames: true,
        // document_start means the MutationObserver is watching before the page
        // inserts its player, so a fast-loading video is never missed.
        run_at: 'document_start',
        match_about_blank: true,
      },
    ],

    options_ui: {
      page: 'options/index.html',
      open_in_tab: true,
      ...(isGecko(browser) ? { browser_style: false } : {}),
    },

    ...buildAction(version),
    ...buildBackground(target),
    ...buildCsp(version),
    ...buildHostPermissions(version),
    ...buildBrowserSpecific(browser, version),
  };

  return manifest;
}

/**
 * MV3 splits host access out of `permissions`, so the list differs by version.
 * @param {string} browser
 * @param {2 | 3} version
 */
function buildPermissions(browser, version) {
  // webNavigation is used only to enumerate a tab's sub-frames, so settings can
  // be delivered to a player running inside an iframe. Without it the boost has
  // no effect on sites that embed their player that way, which is most of them.
  //
  // `tabs` and `activeTab` are deliberately NOT requested. The extension needs
  // a tab's URL to key per-origin settings, but the broad host permissions
  // below already grant that: Chrome populates Tab.url for any origin the
  // extension can access. Chrome's permission policy calls out both of these as
  // commonly over-requested for exactly this reason, and asking for a
  // permission that adds nothing is grounds for rejection.
  const shared = ['storage', 'webNavigation'];

  // The tab-capture fallback handles pages whose audio cannot be read directly
  // (cross-origin media served without CORS headers). It is requested only
  // where it is actually implemented and usable:
  //
  //   - Firefox has no tabCapture API at all.
  //   - Safari rejects unknown permissions during review.
  //   - Chromium MV2 has no offscreen API, and the capture path is written
  //     against the MV3 worker + offscreen-document split, so MV2 builds ship
  //     without it rather than carrying a permission they never exercise.
  //
  // tabCapture is also desktop-only on Edge and Chrome for Android, which is
  // why the runtime still feature-detects before offering the fallback.
  const capture = isChromium(browser) && version === 3;

  if (version === 2) {
    // MV2 keeps host permissions in the same array.
    return [...shared, 'http://*/*', 'https://*/*'];
  }

  // `offscreen` is requested together with tabCapture and never alone: the
  // offscreen document exists solely to host the captured stream's audio graph,
  // because an MV3 service worker has no AudioContext of its own.
  if (capture) return [...shared, 'tabCapture', 'offscreen'];
  return shared;
}

/** @param {2 | 3} version */
function buildHostPermissions(version) {
  if (version === 2) return {};
  return { host_permissions: ['http://*/*', 'https://*/*'] };
}

/**
 * MV2 calls the toolbar button `browser_action`; MV3 renamed it to `action`.
 * @param {2 | 3} version
 */
function buildAction(version) {
  const definition = {
    default_title: '__MSG_extensionName__',
    default_popup: 'popup/index.html',
    default_icon: {
      16: 'icons/icon-16.png',
      32: 'icons/icon-32.png',
      48: 'icons/icon-48.png',
      128: 'icons/icon-128.png',
    },
  };
  return version === 2 ? { browser_action: definition } : { action: definition };
}

/**
 * The single biggest divergence between targets.
 *
 * MV2 uses a background page declared with `scripts`. Chromium MV3 requires a
 * service worker. Firefox MV3 supports `background.scripts` as an event page
 * and does *not* support `service_worker`. Safari MV3 accepts the service
 * worker form, matching Chromium.
 *
 * @param {string} target
 */
function buildBackground(target) {
  const { browser, version } = parseTarget(target);

  if (version === 2) {
    return {
      background: {
        scripts: ['background.js'],
        // A non-persistent event page keeps memory use low and mirrors the
        // service-worker lifecycle of the MV3 build, so both behave alike.
        persistent: false,
      },
    };
  }
  if (isGecko(browser)) {
    return { background: { scripts: ['background.js'] } };
  }
  return { background: { service_worker: 'background.js', type: 'module' } };
}

/**
 * CSP is a plain string in MV2 and an object keyed by context in MV3.
 * @param {2 | 3} version
 */
function buildCsp(version) {
  if (version === 2) {
    return { content_security_policy: "script-src 'self'; object-src 'self'" };
  }
  return {
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'self'",
    },
  };
}

/**
 * Per-browser metadata. Chromium ignores these keys, so they are only emitted
 * where they carry meaning.
 *
 * @param {string} browser
 * @param {2 | 3} version
 */
function buildBrowserSpecific(browser, version) {
  if (isGecko(browser)) {
    // MV3 landed in Firefox 109; MV2 works much further back.
    const baseMinDesktop = version === 3 ? '109.0' : '91.0';
    const baseMinAndroid = version === 3 ? '120.0' : '113.0';

    return {
      browser_specific_settings: {
        gecko: {
          id: FIREFOX_ADDON_ID,
          strict_min_version: raiseMinForDataConsent
            ? DATA_CONSENT_MIN_DESKTOP
            : baseMinDesktop,
          // Required by addons.mozilla.org for all new submissions. This
          // extension makes no network requests and stores nothing beyond the
          // user's own settings in local storage, so it collects no data at
          // all, which `none` is the declaration for. `none` stands alone; it
          // cannot be combined with any specific data category.
          //
          // Firefox ignores an unknown key, so declaring it does not raise the
          // effective minimum version (desktop 140 / Android 142) needed to
          // show the consent UI.
          data_collection_permissions: {
            required: ['none'],
          },
        },
        // Firefox for Android reads its own key and needs an explicit minimum.
        gecko_android: {
          strict_min_version: raiseMinForDataConsent
            ? DATA_CONSENT_MIN_ANDROID
            : baseMinAndroid,
        },
      },
    };
  }
  if (browser === 'safari') {
    // Safari refuses to load an extension whose service worker declares
    // `type: module` in some releases, and it has no tabCapture at all. The
    // rest of the manifest is standard MV3.
    return {};
  }
  return {};
}
