import React from 'react';

const initialValue = {
    availableLocales: ['en'],
    locale: (
        localStorage.getItem('locale') || // Local storage
        import.meta.env.VITE_DEFAULT_LOCALE || // Environment variable
        systemLanguageCode || // System
        'en' // Default
    ),
    get: (key) => key,
    set: (locale) => console.log(locale),
    getNoAccents: (key) => key,
    getCapitalized: (key) => key,
    getLocaleNativeName: () => 'English'
};

const IsoLocalizationContext = React.createContext(initialValue);

module.exports = IsoLocalizationContext;
