# react-iso-localization

Localization for **ISO 639** language codes. We support the `Set 1` abbreviation codes from <https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes>.

This package is heavily dependent on [i18next](https://www.i18next.com), [iso-639-1](https://www.npmjs.com/package/iso-639-1) and setup to run in a [Vite](https://vitejs.dev) project.

## Features

- No Context or global state needed
- Single-point setup
- Docker ready
- Use your own locales
- 2-step process to support more languages

## Installing

Install through npm.

```shell
npm i react-iso-localization
```

## Getting started

This package accepts files like `en.json` for English, `el.json` for Greek, ...

It was developed with the files exported from [POEditor](https://poeditor.com) (or similar tools) in the **`Key-Value JSON`** format in mind.

Let's say we have 3 JSON files.

1. `en.json`

   ```json
   {
       "HELLO_WORLD": "Hello world!"
   }
   ```

2. `el.json`

   ```json
   {
       "HELLO_WORLD": "Γεια σου, κόσμε!"
   }
   ```

3. `ro.json`

   ```json
   {
       "HELLO_WORLD": "Bună ziua lume!"
   }
   ```

### Setup

> For the sake of this documentation, I save all locale files in the directory `/src/resources/locales/`.

Initialize the library inside `App.js` / `App.jsx` / `App.ts` / `App.tsx`

```ts
import { setupI18n } from 'react-iso-localization';
import el from 'resources/locales/el.json';
import en from 'resources/locales/en.json';
import ro from 'resources/locales/ro.json';

setupI18n({
    el: { translation: el },
    en: { translation: en },
    ro: { translation: ro }
});

export const App = () => {
    ...
};
```

### Get a locale

```tsx
import React from 'react';
import { useI18n } from 'react-iso-localization';

const TestComponent = (): React.JSX.Element => {
    const i18n = useI18n();

    return (
        <React.Fragment>
            {i18n.get('HELLO_WORLD')}
        </React.Fragment>
    );
};

export default TestComponent;
```

### Change language

```tsx
import React from 'react';
import { useI18n } from 'react-iso-localization';

const SetToGreek = (): React.JSX.Element => {
    const i18n = useI18n();

    const onClick = () => i18n.set('el');
    // const onClick = () => i18n.set('xx'); // throws error

    return (
        <button onClick={onClick}>
            Change language
        </button>
    );
};

export default SetToGreek;
```

## Documentation

### `use18n` hook

- `locale` property

  The currently active language code.
- `languages` property

  The languages registered to your app during [Setup](#setup)
- `get(string)` method

  This method accepts a locale's key and returns the value in the selected language.

  E.g.

  ```ts
  console.log(i18n.get('HELLO_WORLD'));
  // Returns Γεια σου, κόσμε!
  ```

- `getNoAccents(string)` method

  This method accepts a locale's key and returns the value with the accents removed in the selected language.

  E.g.

  ```ts
  console.log(i18n.getNoAccents('HELLO_WORLD'));
  // Returns Γεια σου, κοσμε!
  ```

- `getCapitalized(string)` method

  This method accepts a locale's key and returns the value with the accents removed in the selected language.

  E.g.

  ```ts
  console.log(i18n.getCapitalized('HELLO_WORLD'));
  // Returns ΓΕΙΑ ΣΟΥ, ΚΟΣΜΕ!
  ```

- `set(string)` method

  It accepts a language code (e.g. `'en'` for English) and sets the respective language to your app as active. Also, it saves that language code to the local storage.

  > For more, see [Change language](#change-language).

### `i18n` utility

- `defaultLanguage` property

  This property is used for the library to determine the language used when starting the app.

  It uses 3 parameters with different priority for each:

  - `locale` item in the browser's [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
  - `VITE_DEFAULT_LOCALE` variable in your app's [environment](https://vite.dev/guide/env-and-mode)
  - The system's language

  First, it checks in the local storage for the user's preference.
  Then, if that is not defined, the library gets the default language from the environment variables. This is useful for applications that want all users to have a certain language as default.
  Lastly, if nothing is set in the above instances, the user's system's language is used.
- `getShortNativeName(string)` method

  This method simply returns the 2 first characters of a language's native name.
  E.g. `ΕΛ` for Greek, `EN` for English, ...

  ```ts
  import { getShortNativeName } from 'react-iso-localization';

  console.log(getShortNativeName('el'))
  // Returns ΕΛ
  ```

  > Uses `iso-639-1`'s `getNativeName` method in the background.
- `getNativeName(string)` method

  It's simply a wrapper for `iso-639-1`'s `getNativeName` method.

  Returns `Ελληνικά` for Greek, `English` for English, ...

  ```ts
  import { getNativeName } from 'react-iso-localization';

  console.log(getNativeName('el'))
  // Returns Ελληνικά
  ```

- `setupI18n` method

  It does exactly what it says it does. It sets up the whole library.

  It accepts an object with all your locales. For each locale, use the language's code as key and `translation: <locales>` as value.

  > For more, see [Setup](#setup).

## Developer notes

This package was created reading [TypeScript NPM Package Publishing: A Beginner’s Guide](https://pauloe-me.medium.com/typescript-npm-package-publishing-a-beginners-guide-40b95908e69c).
