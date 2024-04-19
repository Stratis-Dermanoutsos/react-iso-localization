import ISO6391 from 'iso-639-1';

/**
 * Determine the system language.
 */
const getSystemIsoCode = () => {
    const systemLanguageCode = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[0];
    if (!ISO6391.validate(systemLanguageCode))
        return 'en';

    return systemLanguageCode;
}

// console.log('Local storage: ' + localStorage.getItem('locale')); //? Debug
// console.log('Environment: ' + import.meta.env.VITE_DEFAULT_LOCALE); //? Debug
// console.log('System: ' + getSystemIsoCode()); //? Debug
// console.log('Default locale: ' + defaultLocale); //? Debug

/**
 * Determine the default locale.
 *
 * The default locale is determined in the following order:
 * 1. Local storage
 * 2. Environment variable
 * 3. System language
 */
const DEFAULT_LOCALE = (
    localStorage.getItem('locale') || // Local storage
    import.meta.env.VITE_DEFAULT_LOCALE || // Environment variable
    getSystemIsoCode() // System
);

module.exports = DEFAULT_LOCALE;
