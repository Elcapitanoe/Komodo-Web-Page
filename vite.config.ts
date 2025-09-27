import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repositoryName = '{REPO_NAME}';

export default defineConfig({
  plugins: [react()],
  base: `/${repositoryName}/`,
  build: {
    outDir: '{BUILD_DIR}',
    emptyOutDir: true,
  },
  server: {
    open: true,
    port: 3000,
  },
  preview: {
    port: 4173,
  },
});

/*
 * When deploying to https://{GITHUB_USERNAME}.github.io or to a custom domain,
 * change `base` above to '/' so that asset URLs resolve correctly.
 */
