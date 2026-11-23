/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** REST API base URL including the version prefix, e.g. http://localhost:4000/api/v1 */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
