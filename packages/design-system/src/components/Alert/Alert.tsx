import { EVENT_CATEGORY, MAX_LENGTH, sendAnalyticsEvent } from '../analytics/SendAnalytics';
import React from 'react';
import { alertSendsAnalytics } from '../flags';
import classNames from 'classnames';
import get from 'lodash/get';
import uniqueId from 'lodash.uniqueid';

/* eslint-disable camelcase */
// disable linting since prop names must be in snake case for integration with Blast
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
}
/* eslint-enable camelcase */

export interface AnalyticsObjectShape {
  onComponentDidMount?: boolean | AnalyticsEventShape;
}

export type AlertHeadingLevel = '1' | '2' | '3' | '4' | '5' | '6';

export type AlertRole = 'alert' | 'alertdialog' | 'region' | 'status';

export type AlertVariation = 'error' | 'warn' | 'success';
export interface AlertProps {
  /**
   * Access a reference to the `alert` `div` element
   */
  alertRef?: (...args: any[]) => any;
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
   * Sets the focus on Alert during the first mount
   */
  autoFocus?: boolean;
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
   * Heading type to override default `<h2>`.
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

  [key: string]: any;
}

// Default analytics object
const defaultAnalytics = (heading = '', variation = '') => ({
  onComponentDidMount: {
    event_name: 'alert_impression',
    event_type: EVENT_CATEGORY.uiInteraction,
    ga_eventAction: 'alert impression',
    ga_eventCategory: EVENT_CATEGORY.uiComponents,
    ga_eventLabel: heading,
    heading: heading,
    type: variation,
  },
});

type OmitAlertProps = 'role' | 'children' | 'className' | 'ref';

export class Alert extends React.PureComponent<
  Omit<React.ComponentPropsWithRef<'div'>, OmitAlertProps> & AlertProps,
  any
> {
  static defaultProps = {
    role: 'region',
    headingLevel: '2',
  };

  constructor(props: AlertProps) {
    super(props);
    this.alertTextRef = null;
    this.focusRef = null;
    this.headingId = this.props.headingId || uniqueId('alert_');
    this.eventHeadingText = '';

    if (process.env.NODE_ENV !== 'production') {
      if (!props.heading && !props.children) {
        console.warn(
          `Empty <Alert> components are not allowed, please use the 'heading' prop or include children.`
        );
      }
    }
  }

  componentDidMount(): void {
    // Automatically set focus on alert element when `autoFocus` prop is used
    if (this.props.autoFocus && this.focusRef) {
      this.focusRef.focus();
    }

    if (alertSendsAnalytics()) {
      const eventAction = 'onComponentDidMount';
      const eventHeading: string | React.ReactNode = this.props.heading || this.props.children;

      /* Send analytics event for `error`, `warn`, `success` alert variations */
      if (this.props.variation) {
        if (typeof eventHeading === 'string') {
          this.eventHeadingText = eventHeading.substring(0, MAX_LENGTH);
        } else {
          const eventHeadingTextElement =
            (this.alertTextRef &&
              this.alertTextRef.getElementsByClassName('ds-c-alert__heading')[0]) ||
            (this.alertTextRef && this.alertTextRef.getElementsByClassName('ds-c-alert__body')[0]);
          this.eventHeadingText =
            eventHeadingTextElement && eventHeadingTextElement.textContent
              ? eventHeadingTextElement.textContent.substring(0, MAX_LENGTH)
              : '';
        }

        sendAnalyticsEvent(
          get(this.props.analytics, eventAction),
          get(defaultAnalytics(this.eventHeadingText, this.props.variation), eventAction)
        );
      }
    }
  }

  // Alert class properties
  alertTextRef: any;
  focusRef: any;
  headingId: string;
  eventHeadingText: string;

  heading(): React.ReactElement | void {
    const { headingLevel, heading } = this.props;
    const Heading = `h${headingLevel}`;
    if (heading) {
      const headingProps = {
        className: 'ds-c-alert__heading',
        id: this.headingId,
      };
      return React.createElement(Heading, headingProps, heading);
    }
  }

  render(): JSX.Element {
    const {
      children,
      className,
      autoFocus,
      heading,
      headingId,
      headingLevel,
      hideIcon,
      alertRef,
      role,
      variation,
      analytics,
      ...alertProps
    } = this.props;

    const classes = classNames(
      'ds-c-alert',
      hideIcon && 'ds-c-alert--hide-icon',
      variation && `ds-c-alert--${variation}`,
      className
    );

    return (
      <div
        className={classes}
        /* eslint-disable no-return-assign */
        ref={(ref) => {
          this.alertTextRef = ref;
          if (autoFocus) {
            this.focusRef = ref;
          } else if (alertRef) {
            alertRef(ref);
          }
        }}
        /* eslint-enable no-return-assign */
        tabIndex={alertRef || autoFocus ? -1 : null}
        role={role}
        aria-labelledby={heading ? this.headingId : undefined}
        {...alertProps}
      >
        <div className="ds-c-alert__body">
          {this.heading()}
          {children}
        </div>
      </div>
    );
  }
}

export default Alert;
