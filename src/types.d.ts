// Global type declarations for build-time constants
declare const __BUILD_TIME__: string;

interface ImportMetaEnv {
  readonly GH_TOKEN?: string;
  readonly VITE_GH_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}