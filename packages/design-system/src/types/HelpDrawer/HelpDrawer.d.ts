// disabling lint rules until component files are converted to TS
/* eslint-disable react/prefer-stateless-function */
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
   * Enables focus trap functionality within HelpDrawer.
   */
  hasFocusTrap: boolean;
  /**
   * Text for the HelpDrawer title. Required because the `heading` will be focused on mount.
   */
  heading?: React.ReactNode;
  /**
   * A unique `id` to be used on heading element to label multiple instances of HelpDrawer.
   */
  headingId: string;
  /**
   * Heading type to override default `<h3>`
   */
  headingLevel?: HelpDrawerHeadingLevel;
  /**
   * icon to be included at the end of the toggle's text
   */
  icon?: React.ReactNode;
  /**
   * Enables "sticky" position of HelpDrawer header element.
   */
  isHeaderSticky: boolean;
  /**
   * Enables "sticky" position of HelpDrawer footer element.
   */
  isFooterSticky: boolean;
  onCloseClick: (...args: any[]) => any;
  /**
   * @hide-prop [Deprecated] This prop has been renamed to `heading`.
   */
  title?: React.ReactNode;
}

export default class HelpDrawer extends React.Component<HelpDrawerProps, any> {
  render(): JSX.Element;
}
