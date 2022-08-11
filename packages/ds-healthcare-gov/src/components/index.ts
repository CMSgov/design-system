'use strict';

// Unfortunately we can't convert this module to TypeScript until we deprecate
// the `secondary` button variation and get rid of its TS definition file.

/**
 * This is the main entry file for a child design system's React components.
 * It should contain all exported JS from the core CMS design system
 * and all additional child design system code.
 *
 * The CMSDS build scripts rely on this entry file's location (`src/components/index.js`) to transpile JS.
 * Modify `babel.config.js` to configure the build files.
 *
 * Also included here are default flag settings for each subsystem
 *
 */

import { setInlineErrorIconDisplay, setErrorPlacementDefault } from '@cmsgov/design-system';

export * from '@cmsgov/design-system';
export * from './Accordion';
export * from './Footer';
export * from './Header';
export * from './Logo';

export * from './flags';

/**
 * Healthcare.gov Flags
 */

setInlineErrorIconDisplay(true);
setErrorPlacementDefault('bottom');
