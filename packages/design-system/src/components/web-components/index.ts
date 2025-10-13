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
import './ds-autocomplete';
import './ds-badge';
import './ds-button';
import './ds-choice';
import './ds-date-field';
import './ds-drawer';
import './ds-dropdown';
import './ds-filter-chip';
import './ds-hint';
import './ds-icons';
import './ds-inline-error';
import './ds-label';
import './ds-modal-dialog';
import './ds-month-picker';
import './ds-pagination';
import './ds-review';
import './ds-skip-nav';
import './ds-spinner';
import './ds-step-list';
import './ds-tabs';
import './ds-text-field';
import './ds-third-party-external-link';
import './ds-tooltip';
import './ds-usa-banner';
