import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
// import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), /*preact()*/],
  vite: {
    ssr: {
      noExternal: ['@cmsgov/design-system', 'dom-helpers', '@floating-ui/react', '@floating-ui/react-dom'],
    },
  },
});
