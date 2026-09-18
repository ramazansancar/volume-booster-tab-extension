/**
 * Types for the locale generator, which is plain JavaScript because the build
 * scripts run straight from node with no compile step. Declaring the shape here
 * lets the tests consume it without loosening allowJs across the project.
 */

/** One entry of a generated messages.json. */
export interface LocaleMessage {
  message: string;
  description?: string;
  /** Declared for every $NAME$ the message uses; the browser requires it. */
  placeholders?: Record<string, { content: string }>;
}

/** Every locale code the extension ships. */
export declare const LOCALES: string[];

/** Each language's name in its own script, keyed by locale code. */
export declare const LOCALE_NAMES: Record<string, string>;

/** Flattened key/text pairs for one locale, as the bundle inlines them. */
export declare function catalogueFor(locale: string): Record<string, string>;

/** Every locale's flattened catalogue, keyed by locale code. */
export declare function allCatalogues(): Record<string, Record<string, string>>;

/** The messages.json body for one locale. */
export declare function messagesFor(locale: string): Record<string, LocaleMessage>;
