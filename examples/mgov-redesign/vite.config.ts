import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // The design system's `@floating-ui/react` (used by Tooltip) resolves React
    // from the repo-root node_modules, while the app has its own copy. Without
    // deduping, that's two React instances → "invalid hook call". Force a single copy.
    dedupe: ['react', 'react-dom'],
  },
});
