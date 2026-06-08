/// <reference types="vite/client" />

declare const __APP_VERSION__: string

// Fallback declarations for CSS side-effect imports so that
// `noUncheckedSideEffectImports` does not flag them when the
// `vite/client` types are unavailable.
declare module '*.css';
