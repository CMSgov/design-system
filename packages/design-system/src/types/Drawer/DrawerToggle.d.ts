// disabling lint rules until component files are converted to TS
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable filenames/match-exported */
import * as React from 'react';

export interface DrawerToggleProps {
  /**
   * Determines if Drawer is open or closed.
   * This value is used to re-focus the toggle that opened the panel when the panel closes.
   */
  drawerOpen: boolean;
  /**
   * DrawerToggle content.
   */
  children: React.ReactNode;
  /**
   * Additional classes for the toggle button anchor element.
   */
  className?: string;
  /**
   * Adds `display: inline` to the DrawerToggle.
   */
  inline?: boolean;
  /**
   * This function is called with an id that the toggle generates.
   * It can be used in implementing the Drawer for keeping track of which panel the toggle controls.
   */
  showPanel: (...args: any[]) => any;
}

export default class DrawerToggle extends React.Component<
  React.ComponentPropsWithRef<'button'> & DrawerToggleProps,
  any
> {
  render(): JSX.Element;
}
