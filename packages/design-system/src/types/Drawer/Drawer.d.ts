// disabling lint rules until component files are converted to TS
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable filenames/match-exported */
import * as React from 'react';

export type DrawerHeadingLevel = '1' | '2' | '3' | '4' | '5';

export interface DrawerProps {
  /**
   * Gives more context to screen readers on the Drawer close button.
   */
  ariaLabel?: string;
  closeButtonText?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footerBody?: React.ReactNode;
  footerTitle?: string;
  /**
   * Enables focus trap functionality within Drawer.
   */
  hasFocusTrap?: boolean;
  /**
   * Text for the Drawer heading. Required because the `heading` will be focused on mount.
   */
  heading?: React.ReactNode;
  /**
   * A unique `id` to be used on heading element to label multiple instances of Drawer.
   */
  headingId?: string;
  /**
   * Heading type to override default `<h3>`
   */
  headingLevel?: DrawerHeadingLevel;
  /**
   * Enables "sticky" position of Drawer header element.
   */
  isHeaderSticky?: boolean;
  /**
   * Enables "sticky" position of Drawer footer element.
   */
  isFooterSticky?: boolean;
  onCloseClick: (...args: any[]) => any;
}

export default class Drawer extends React.Component<DrawerProps, any> {
  render(): JSX.Element;
}
