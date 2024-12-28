import { useCallback, useEffect } from 'react';
import { TOptions } from 'i18next';
import { useTranslation } from 'react-i18next';
import iso6391 from 'iso-639-1';

/**
 * A hook that detects the device's preferred language and returns the selected localized string.
 * 
 * @example
 * const i18n = useI18n();
 * console.log(i18n.get('hello'));
 * // "Γεια σου" if the device's preferred language is Greek
 * // "Hello" if it's English
 * 
 * @returns An object containing the locales object and the get, getNoAccents and getCapitalized functions.
 */
const useI18n = () => {
    const { i18n, t } = useTranslation();

    /**
     * Gets the string corresponding to the key from the locales object.
     * 
     * @param key The key of the string to get
     * @returns The string corresponding to the key
     */
    const get = (key: string, options?: TOptions): string => {
        if (t(key, options) === key)
            throw new Error(`Locale not found for key: ${key}`);

        return t(key, options);
    };

    /**
     * Sets the locale code to the given value.
     * 
     * @param locale The locale code to set
     * @example
     * i18n.set('en');
     */
    const set = useCallback((locale: string) => {
        if (!iso6391.validate(locale))
            throw new Error(`Invalid locale code: ${locale}`);

        i18n.changeLanguage(locale);
        localStorage.setItem('locale', locale);
    }, [i18n]);

    /**
     * Gets the string corresponding to the key from the locales object, without accents.
     * 
     * @param key The key of the string to get
     * @returns The string corresponding to the key, without accents
     */
    const getNoAccents = (key: string, options?: TOptions): string => {
        return get(key, options).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    /**
     * Gets the string corresponding to the key from the locales object, in uppercase.
     * 
     * @param key The key of the string to get
     * @returns The string corresponding to the key, in uppercase
     */
    const getCapitalized = (key: string, options?: TOptions): string => {
        return getNoAccents(key, options).toUpperCase();
    };

    useEffect(() => {
        // console.log('Local storage: ' + localStorage.getItem('locale')); //? Debug
        // console.log('Environment: ' + import.meta.env.VITE_DEFAULT_LOCALE); //? Debug
        // console.log('System: ' + systemLanguageCode); //? Debug
        // console.log('Default locale: ' + defaultLocale); //? Debug

        if (!localStorage.getItem('locale'))
            set(i18n.language);
    }, [i18n, set]);

    return {
        locale: i18n.language,
        languages: Array.from(i18n.languages).sort(),
        get,
        set,
        getNoAccents,
        getCapitalized
    };
};

export default useI18n;
