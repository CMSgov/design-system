import React from 'react';
import classNames from 'classnames';

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
  size?: 'small' | 'big';
}

export const Spinner: React.FunctionComponent<SpinnerProps> = (props: SpinnerProps) => {
  const className = classNames(
    'ds-c-spinner',
    props.size && `ds-c-spinner--${props.size}`,
    props.inversed && 'ds-u-fill--background-inverse ds-u-color--base-inverse',
    props.filled && 'ds-c-spinner--filled',
    props.className
  );

  return <span className={className} aria-valuetext={props['aria-valuetext']} role={props.role} />;
};

Spinner.defaultProps = {
  'aria-valuetext': 'Loading',
  role: 'progressbar',
};

export default Spinner;
