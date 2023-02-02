/**
 * This is the main entry file for a child design system's React components.
 * It should contain all exported JS from the core CMS design system
 * and all additional child design system code.
 *
 * The CMSDS build scripts rely on this entry file's location (`src/components/index.js`) to generate
 * CommonJS (`dist/components/`)  and ES module (`dist/esnext/`) versions of components.
 * ES modules code is necessary for webpack tree shaking bundle optimizations
 */
export * from '@cmsgov/design-system';
