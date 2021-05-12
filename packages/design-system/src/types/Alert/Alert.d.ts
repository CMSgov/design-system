import * as React from 'react';

export type AlertHeadingLevel = '1' | '2' | '3' | '4' | '5' | '6';

export type AlertRole = 'alert' | 'alertdialog' | 'region' | 'status';

export type AlertVariation = 'error' | 'warn' | 'success';

export interface AnalyticsEventShape {
  event_name: string;
  event_type: string;
  ga_eventAction: string;
  ga_eventCategory: string;
  ga_eventLabel: string;
  ga_eventType?: string;
  ga_eventValue?: string;
  heading: string;
  type: string;
  [additional_props: string]: unknown;
}
// additional_props?: Record<string, unknown>;

export interface AnalyticsObjectShape {
  onComponentDidMount?: boolean | AnalyticsEventShape;
}

export interface AlertProps {
  /**
   * Analytics events tracking is enabled by default.
   * The `analytics` prop is an object of events that is either a nested `objects` with key-value
   * pairs, or `boolean` for disabling the event tracking. To disable an event tracking, set the
   * event object value to `false`.
   * When an event is triggered, the object value is populated and sent to google analytics
   * if `window.utag` instance is loaded.
   */
  analytics?: AnalyticsObjectShape;
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
