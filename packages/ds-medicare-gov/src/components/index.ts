/**
 * This is the main entry file for a child design system's React components.
 * It should contain all exported JS from the core CMS design system
 * and all additional child design system code.
 *
 * The CMSDS build scripts rely on this entry file's location (`src/components/index.js`) to generate
 * CommonJS (`dist/components/`)  and ES module (`dist/esnext/`) versions of components.
 * ES modules code is necessary for webpack tree shaking bundle optimizations
 */
import './Dialog';

export * from '@cmsgov/design-system';

export { default as MedicaregovLogo } from './MedicaregovLogo';
export { default as NavigationMenu } from './NavigationMenu';
export { default as SimpleFooter } from './SimpleFooter';
export { default as Card } from './Card';
export { default as Stars } from './Stars';
export * from './HelpDrawer';
export * from './Dialog';
export * from './Icons';
