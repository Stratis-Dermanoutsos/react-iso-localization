# react-iso-localization

Localization for **ISO 639** language codes. We support the `Set 1` abbreviation codes from <https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes>.

This package is heavily dependent on [i18next](https://www.i18next.com), [iso-639-1](https://www.npmjs.com/package/iso-639-1) and setup to run in a [Vite](https://vitejs.dev) project.

## Features

- No Context or global state needed
- Single-point setup
- Use your own locales
- 2-step process to support more languages

## Installing

Simply run `npm i react-iso-localization`

## How to use

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
       "HELLO_WORLD": "Γεια σου κόσμε!"
   }
   ```

3. `ro.json`

   ```json
   {
       "HELLO_WORLD": "Bună ziua lume!"
   }
   ```

### Steps

> For the sake of this documentation, I save all locale files in the directory `/src/resources/locales/`.

1. Initialize the library inside `App.js` / `App.jsx` / `App.ts` / `App.tsx`

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

2. Use it by calling the hook in any of your components

   ```tsx
   import React from 'react';
   import { useI18n } from 'react-iso-localization';

   const TestComponent = (): React.JSX.Element => {
       const i18n = useI18n();

       return (
           <React.Fragment>
               {useI18n.get('HELLO_WORLD')}
           </React.Fragment>
       );
   };

   export default TestComponent;
   ```

## Developer notes

This package was created reading [TypeScript NPM Package Publishing: A Beginner’s Guide](https://pauloe-me.medium.com/typescript-npm-package-publishing-a-beginners-guide-40b95908e69c).
