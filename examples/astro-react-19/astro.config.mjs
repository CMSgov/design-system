// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['@cmsgov/design-system', 'react-transition-group', 'dom-helpers'],
    },
  },

  integrations: [react()],
});