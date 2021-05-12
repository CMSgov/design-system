import * as React from 'react';

export type HelpDrawerHeadingLevel = '1' | '2' | '3' | '4' | '5';
/**
 * Defines the shape of an analytics event for tracking that is an object with key-value pairs
 */
 export interface AnalyticsEventShape {
    event_name: string;
    event_type: string;
    ga_eventAction: string;
    ga_eventCategory: string;
    ga_eventLabel: string;
    ga_eventType?: string;
    ga_eventValue?: string;
    heading: string;
    [additional_props: string]: unknown;
  }
  // additional_props?: Record<string, unknown>;

export interface AnalyticsObjectShape {
  onComponentDidMount?: boolean | AnalyticsEventShape;
  onComponentWillUnmount?: boolean | AnalyticsEventShape;
}

export interface HelpDrawerProps {
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
   * Helps give more context to screen readers on the button that closes the Help Drawer
   */
  ariaLabel?: string;
  closeButtonText?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footerBody?: React.ReactNode;
  footerTitle?: string;
  /**
   * Text for the HelpDrawer title. Required because the `heading` will be focused on mount.
   */
  heading?: React.ReactNode;
  /**
   * Heading type to override default `<h3>`
   */
  headingLevel?: HelpDrawerHeadingLevel;
  onCloseClick: (...args: any[]) => any;
  /**
   * @hide-prop [Deprecated] This prop has been renamed to `heading`.
   */
  title?: React.ReactNode;
}

export default class HelpDrawer extends React.Component<HelpDrawerProps, any> {
  render(): JSX.Element;
}
