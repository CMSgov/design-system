/* eslint-disable filenames/match-exported */
import * as React from 'react';

export type HelpDrawerHeadingLevel = '1' | '2' | '3' | '4' | '5';

export interface HelpDrawerProps {
  /**
   * Analytics events tracking is enabled by default. Set this value to `false` to disable tracking for this component instance.
   */
  analytics?: boolean;
  /**
   * An override for the dynamic content sent to analytics services. By default this content comes from the heading.
   *
   * In cases where this component’s heading may contain **sensitive information**, use this prop to override what is sent to analytics.
   */
  analyticsLabelOverride?: string;
  /**
   * Helps give more context to screen readers on the button that closes the Help Drawer
   */
  ariaLabel?: string;
  closeButtonText?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footerBody?: React.ReactNode;
  footerTitle?: string;
  /**
   * Text for the HelpDrawer title. Required because the `heading` will be focused on mount.
   */
  heading?: React.ReactNode;
  /**
   * Heading type to override default `<h3>`
   */
  headingLevel?: HelpDrawerHeadingLevel;
  onCloseClick: (...args: any[]) => any;
  /**
   * @hide-prop [Deprecated] This prop has been renamed to `heading`.
   */
  title?: React.ReactNode;
}

declare const HelpDrawer: React.FC<HelpDrawerProps>;

export default HelpDrawer;
