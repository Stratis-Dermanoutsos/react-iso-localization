/**
 * Fetches the locales' key-value pairs from the specified path.
 * 
 * @param {string} locale The ISO 639-1 code of the locale to fetch. E.g. `en`, `el`, etc.
 * @param {string} pathFormat The format of the path to the locales' file. Must end with `{{locale}}.json`.
 * @returns An object containing the locales' key-value pairs.
 * @example
 * // Uses defaut path format - /assets/locales/{{locale}}.json (Inside public folder)
 * const locales = await getLocales('en');
 * // or
 * const locales = await getLocales('en', '/some-folder/{{locale}}.json');
 */
const getLocales = async (locale, pathFormat = '/assets/locales/{{locale}}.json') => {
    const file = await fetch(pathFormat.replace('{{locale}}', locale));

    return await file.json();
};

module.exports = getLocales;
