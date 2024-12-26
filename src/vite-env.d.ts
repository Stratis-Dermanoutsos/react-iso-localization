/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
    readonly VITE_DEFAULT_LOCALE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
