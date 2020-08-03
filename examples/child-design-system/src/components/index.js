/**
 * This is the main entry file for a child design system's React components.
 * It should contain all exported JS from the core CMS design system
 * and all additional child design system code.
 *
 * The CMSDS build scripts rely on this entry file's location (`src/components/index.js`) to transpile JS.
 * Modify `babel.config.js` to configure the build files.
 */

export * from '@cmsgov/design-system';

// Overriden design system component
export { Button } from './Button/Button';

// New child design system component
export { Card } from './Card/Card';
