import React from 'react';

const initialValue = {
    availableLocales: ['en'],
    locale: (import.meta.env.VITE_DEFAULT_LOCALE || 'en'),
    get: (key: string): string => key,
    set: (locale: string): void => console.log(locale),
    getNoAccents: (key: string): string => key,
    getCapitalized: (key: string): string => key,
    getLocaleNativeName: (): string => 'English'
};

const IsoLocalizationContext = React.createContext(initialValue);

export default IsoLocalizationContext;
