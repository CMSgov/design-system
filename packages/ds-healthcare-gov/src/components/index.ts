/**
 * This is the main entry file for a child design system's React components. It should
 * contain all exported JS from the core CMS design system and all additional child
 * design system code.
 */

// Export everything from the core design system
export * from '@cmsgov/design-system';

// Export new components that are specific to this child design system
export * from './Footer';
export * from './Header';
export * from './HealthcaregovAccordion';
export * from './HealthcaregovThirdPartyExternalLink';
export * from './Logo';

// The following modules have side effects and must be accounted for in the package
// file's `sideEffects` property in order for build systems to know not to tree-shake
// these modules out of bundles.
export * from './config';
