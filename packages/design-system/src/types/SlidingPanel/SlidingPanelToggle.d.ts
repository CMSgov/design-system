// disabling lint rules until component files are converted to TS
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable filenames/match-exported */
import * as React from 'react';

export interface SlidingPanelToggleProps {
  /**
   * Determines if SlidingPanel is open or closed.
   * This value is used to re-focus the toggle that opened the panel when the panel closes.
   */
  panelOpen: boolean;
  /**
   * SlidingPanelToggle content.
   */
  children: React.ReactNode;
  /**
   * Additional classes for the toggle button anchor element.
   */
  className?: string;
  /**
   * Adds `display: inline` to the SlidingPanelToggle.
   */
  inline?: boolean;
  /**
   * This function is called with an id that the toggle generates.
   * It can be used in implementing the SlidingPanel for keeping track of which panel the toggle controls.
   */
  showPanel: (...args: any[]) => any;
}

export default class SlidingPanelToggle extends React.Component<
  React.ComponentPropsWithRef<'button'> & SlidingPanelToggleProps,
  any
> {
  render(): JSX.Element;
}
