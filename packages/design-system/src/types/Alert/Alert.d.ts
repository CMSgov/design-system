import * as React from 'react';

export type AlertHeadingLevel = '1' | '2' | '3' | '4' | '5';

export type AlertRole = 'alert' | 'alertdialog' | 'region' | 'status';

export type AlertVariation = 'error' | 'warn' | 'success';

export interface AlertProps {
  /**
   * The alert's body content
   */
  children?: React.ReactNode;
  className?: string;
  /**
   * Text for the alert heading
   */
  heading?: string;
  /**
   * Optional id used to link the `aria-labelledby` attribute to the heading. If not provided, a unique id will be automatically generated and used.
   */
  headingId?: string;
  /**
   * Heading type to override default `<h3>`.
   */
  headingLevel?: AlertHeadingLevel;
  /**
   * Boolean to hide the `Alert` icon
   */
  hideIcon?: boolean;
  /**
   * ARIA `role`, defaults to 'region'
   */
  role?: AlertRole;
  /**
   * A string corresponding to the `Alert` variation classes (`error`, `warn`, `success`)
   */
  variation?: AlertVariation;
}

export default class Alert extends React.Component<AlertProps, any> {
  render(): JSX.Element;
}
