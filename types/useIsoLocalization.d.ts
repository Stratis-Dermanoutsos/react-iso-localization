import React from 'react';

// Exporting the useIsoLocalization type
export type useIsoLocalization = (localesDictionary: {
    locales: {
        [key: string]: {
            [key: string]: string;
        }
    }
}) => {
    availableLocales: string[],
    locale: string,
    get: (key: string) => string,
    set: (locale: string) => void,
    getNoAccents: (key: string) => string,
    getCapitalized: (key: string) => string,
    getLocaleNativeName: () => string
};
