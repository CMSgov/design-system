import * as React from 'react';

export interface HelpDrawerToggleProps {
  /**
   * Whether or not the Help Drawer controlled by this toggle is open or closed.
   * This value is used to re-focus the toggle that opened the drawer when the drawer closes.
   */
  helpDrawerOpen: boolean;
  /**
   * The HelpDrawerToggle content
   */
  children: React.ReactNode;
  /**
   * Additional classes for the toggle button anchor element.
   */
  className?: string;
  /**
   * Adds `display: inline` to the HelpDrawerToggle.
   */
  inline?: boolean;
  /**
   * This function is called with an id that the toggle generates.
   * It can be used in implementing the help drawer for keeping track of the drawer the toggle controls
   */
  showDrawer: (...args: any[]) => any;
}

export default class HelpDrawerToggle extends React.Component<
  React.ComponentPropsWithRef<'button'> & HelpDrawerToggleProps,
  any
> {
  render(): JSX.Element;
}
