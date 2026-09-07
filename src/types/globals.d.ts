/**
 * Build-time constants substituted by esbuild. Declared here so the TypeScript
 * compiler knows their shapes; the values come from scripts/build.mjs.
 */
declare const __TARGET__: string;
declare const __BROWSER__: string;
declare const __MANIFEST_VERSION__: 2 | 3;
declare const __DEV__: boolean;

/** Locale codes shipped in this build. */
declare const __LOCALE_CODES__: string[];
/** Each language's name in its own script, keyed by locale code. */
declare const __LOCALE_NAMES__: Record<string, string>;
/** Message catalogues, keyed by locale code then message key. */
/** The English catalogue, inlined so the first paint needs no fetch. */
declare const __LOCALE_MESSAGES_EN__: Record<string, string>;
