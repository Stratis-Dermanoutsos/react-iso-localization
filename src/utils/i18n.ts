import i18n, { Resource } from 'i18next';
import iso6391 from 'iso-639-1';
import { initReactI18next } from 'react-i18next';
import { stringHasValue } from './string';

const systemLanguageCode = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[0];
export const defaultLanguage = (
    localStorage.getItem('locale') || ( // Local storage
    stringHasValue(import.meta.env.VITE_DEFAULT_LOCALE) ?
    import.meta.env.VITE_DEFAULT_LOCALE : // Environment variable
    systemLanguageCode // System
));

/**
 * Returns the short native name for the provided language code.
 * 
 * @param code The language code.
 * @returns The short native name for the provided language code.
 * @example
 * getShortNativeName('el'); // Returns 'ΕΛ'
 */
export const getShortNativeName = (code: string) => {
    const nativeName = iso6391.getNativeName(code); // Get the native name
    if (!nativeName) return code.toUpperCase(); // Fallback if no native name is found
    return nativeName.substring(0, 2).toUpperCase(); // Take the first 2 letters
};

/**
 * Returns the native name for the provided language code.
 * 
 * @param code The language code.
 * @returns The native name for the provided language code.
 * @example
 * getNativeName('el'); // Returns 'Ελληνικά'
 */
export const getNativeName = (code: string) => iso6391.getNativeName(code);

/**
 * Returns the maximized locale for the provided language code.
 * 
 * @param code The language code.
 * @returns The maximized locale for the provided language code.
 * @example
 * getMaximizedLocale('el'); // Returns 'el-Grek-GR'
 * getMaximizedLocale('en'); // Returns 'en-Latn-US'
 */
export const getMaximizedLocale = (code: string): string => {
    try {
        return new Intl.Locale(code).maximize().toString();
    } catch {
        return code;
    }
};

/**
 * Returns the language tag for the provided language code.
 * 
 * @param code The language code.
 * @returns The language tag for the provided language code.
 * @example
 * getLanguageTag('el'); // Returns 'el-GR'
 * getLanguageTag('en'); // Returns 'en'
 */
export const getLanguageTag = (code: string): string => {
    const localeMaximized = new Intl.Locale(code).maximize();
    const region = localeMaximized.region;

    return region ? `${code}-${region}` : code;
};

/**
 * Sets the locale for the application to the provided language code.
 * 
 * @param code The language code.
 * @example
 * setLocale('el'); // Set the locale to 'el'
 */
export const setLocale = (code: string) => {
    if (!iso6391.validate(code))
        throw new Error(`Invalid locale code: ${code}`);

    i18n.changeLanguage(code);
    localStorage.setItem('locale', code);
};

/**
 * Sets up the i18n instance to use the given resources.
 * 
 * @param resources The resources to use. The keys are the language codes and the values are the corresponding resources.
 * @example
 * import el from 'resources/locales/el.json';
 * import en from 'resources/locales/en.json';
 * 
 * setupI18n({
 *    en: { translation: en },
 *    el: { translation: el }
 * });
 */
const setupI18n = (resources?: Resource) => {
    // Fallback to the available languages if the resources are not provided
    const fallback = resources !== undefined ?
        Object.keys(resources) :
        ['en'];

    i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: defaultLanguage, // If you're using a language detector, do not define the lng option
        fallbackLng: fallback,
        interpolation: {
            escapeValue: false // React is already safe from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }});
};

export default setupI18n;
