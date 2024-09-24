/**
 * Entry point for web-components version of the component library
 *
 * This version necessarily has side-effects because defining custom elements
 * in a web page changes the global state of JavaScript in that page; this
 * module therefore needs to be marked as having side effects in the package
 * file in order to let bundlers know not to remove all the web-component
 * modules during tree-shaking.
 */

export * from '../analytics';
export * from '../config';
export * from '../i18n';

import './ds-accordion';
import './ds-alert';
import './ds-badge';
import './ds-button';
import './ds-choice';
import './ds-date-field';
import './ds-dropdown';
import './ds-month-picker';
import './ds-skip-nav';
import './ds-spinner';
import './ds-tabs';
import './ds-text-field';
import './ds-usa-banner';
