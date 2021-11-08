// disabling lint rules until component files are converted to TS
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable filenames/match-exported */
import * as React from 'react';

export type SlidingPanelHeadingLevel = '1' | '2' | '3' | '4' | '5';

export interface SlidingPanelProps {
  /**
   * Gives more context to screen readers on the SlidingPanel close button.
   */
  ariaLabel?: string;
  closeButtonText?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footerBody?: React.ReactNode;
  footerTitle?: string;
  /**
   * Enables focus trap functionality within SlidingPanel.
   */
  hasFocusTrap?: boolean;
  /**
   * Text for the SlidingPanel heading. Required because the `heading` will be focused on mount.
   */
  heading?: React.ReactNode;
  /**
   * A unique `id` to be used on heading element to label multiple instances of SlidingPanel.
   */
  headingId?: string;
  /**
   * Heading type to override default `<h3>`
   */
  headingLevel?: SlidingPanelHeadingLevel;
  /**
   * Enables "sticky" position of SlidingPanel header element.
   */
  isHeaderSticky?: boolean;
  /**
   * Enables "sticky" position of SlidingPanel footer element.
   */
  isFooterSticky?: boolean;
  onCloseClick: (...args: any[]) => any;
}

export default class SlidingPanel extends React.Component<SlidingPanelProps, any> {
  render(): JSX.Element;
}
