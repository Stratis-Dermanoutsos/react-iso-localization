# react-iso-localization

Localization for **ISO 639** language codes. We support the `Set 1` abbreviation codes from <https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes>.

This package is heavily dependent on [i18next](https://www.i18next.com), [iso-639-1](https://www.npmjs.com/package/iso-639-1) and setup to run in a [Vite](https://vitejs.dev) project.

## Installing
<!-- TODO -->

## How to use

This package accepts files like `en.json` for English, `el.json` for Greek, ...

It was developed with the files exported from [POEditor](https://poeditor.com) in the **`Key-Value JSON`** format in mind.

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

1. Import the files and provide the `JavaScript` / `TypeScript` object.

   ```ts
   import el from 'resources/locales/el.json';
   import en from 'resources/locales/en.json';
   import ro from 'resources/locales/ro.json';

   // TypeScript
   const LOCALES: { [key: string]: { [key: string]: string } } = {
       el, en, ro
   };

   // JavaScript
   const LOCALES = {
       el, en, ro
   };

   export default LOCALES;
   ```

## Examples

<!-- TODO: Structure the data required for the hook -->

<!-- TODO: Local state -->

<!-- TODO: Context provider and global state -->
