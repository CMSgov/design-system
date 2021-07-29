import * as React from 'react';

export type SpinnerSize = 'small' | 'big';

export interface SpinnerProps {
  /**
   * The text announced to screen readers
   */
  'aria-valuetext'?: string;
  /**
   * Additional classes to be added to the spinner element.
   * Useful for adding utility classes.
   */
  className?: string;
  /**
   * Applies the inverse theme styling
   */
  inversed?: boolean;
  /**
   * Adds a background behind the spinner for extra contrast
   */
  filled?: boolean;
  /**
   * Landmark role so the spinner can receive keyboard focus
   */
  role?: string;
  /**
   * Smaller or larger variant
   */
  size?: SpinnerSize;
}

declare const Spinner: React.FC<SpinnerProps>;

export default Spinner;
