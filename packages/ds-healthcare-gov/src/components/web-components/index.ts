'use strict';

/**
 * Entry point for web-components version of the component library
 *
 * This version necessarily has side-effects because defining custom elements
 * in a web page changes the global state of JavaScript in that page; this
 * module therefore needs to be marked as having side effects in the package
 * file in order to let bundlers know not to remove all the web-component
 * modules during tree-shaking.
 */

import { setErrorPlacementDefault } from '@cmsgov/design-system';

import '@cmsgov/design-system/web-components';

export * from '../flags';

/**
 * Healthcare.gov Flags
 */
setErrorPlacementDefault('bottom');
