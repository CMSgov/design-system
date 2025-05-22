import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        "@astrojs/react/client.js": "@astrojs/react/client-v17.js"
      }
    }
  }
});
