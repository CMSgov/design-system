import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['tests/vitest/**/*.spec.tsx'],
    browser: {
      enabled: true,
      provider: 'playwright', 
      instances: [
        { browser: 'chromium' },
      ],
    },
    setupFiles: ['./tests/vitest/setupVitest.ts'],
  },
});

