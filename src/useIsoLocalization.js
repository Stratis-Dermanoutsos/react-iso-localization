import { useEffect, useState } from 'react';
import ISO6391 from 'iso-639-1';
import DEFAULT_LOCALE from './default-locale';

/**
 * A hook that detects the device's preferred language and returns the selected localized string.
 * 
 * @param localesDictionary An object containing the locales object for each supported language.
 * 
 * @example
 * const translator = useLocalization();
 * console.log(translator.get('hello'));
 * // "Γεια σου" if the device's preferred language is Greek
 * // "Hello" if it's English
 * 
 * @returns An object containing the locales object and the get, getNoAccents and getCapitalized functions.
 */
const useIsoLocalization = (localesDictionary) => {
    // Check if the provided locales are valid
    const availableLocales = Object.keys(localesDictionary);
    availableLocales.forEach(locale => {
        if (!ISO6391.validate(locale))
            throw new Error(`INVALID PROVIDED LOCALE: ${locale}`);
    });

    const defaultLocale = availableLocales.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : 'en';

    // Get selected locale
    const [selectedLocale, setSelectedLocale] = useState(defaultLocale);
    if (!ISO6391.validate(selectedLocale))
        throw new Error(`INVALID SELECTED LOCALE: ${selectedLocale}`);

    const locales = localesDictionary[selectedLocale];

    useEffect(() => {
        if (!localStorage.getItem('locale'))
            set(defaultLocale);
    }, [defaultLocale]);

    /**
     * Gets the string corresponding to the key from the locales object.
     * 
     * @param key The key of the string to get.
     * @returns The string corresponding to the key.
     */
    const get = (key) => {
        if (!locales[key])
            throw new Error(`INVALID KEY: ${key}`);

        return locales[key];
    };

    /**
     * Sets the locale code to the given value.
     * 
     * @param locale The locale code to set.
     */
    const set = (locale) => {
        setSelectedLocale(prev => {
            if (prev === locale)
                return prev;

            localStorage.setItem('locale', locale);
            return locale;
        });
    }

    /**
     * Gets the string corresponding to the key from the locales object, without accents.
     * 
     * @param key The key of the string to get
     * @returns The string corresponding to the key, without accents
     */
    const getNoAccents = (key) => {
        return get(key).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    /**
     * Gets the string corresponding to the key from the locales object, in uppercase.
     * 
     * @param key The key of the string to get
     * @returns The string corresponding to the key, in uppercase
     */
    const getCapitalized = (key) => {
        return getNoAccents(key).toUpperCase();
    };

    /**
     * Gets the native name of the selected locale.
     * 
     * @returns The native name of the selected locale.
     */
    const getLocaleNativeName = () => {
        return ISO6391.getNativeName(selectedLocale);
    }

    return {
        availableLocales,
        locale: selectedLocale,
        get,
        set,
        getNoAccents,
        getCapitalized,
        getLocaleNativeName
    };
};

module.exports = useIsoLocalization;
