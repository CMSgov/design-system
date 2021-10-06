import { EVENT_CATEGORY, MAX_LENGTH, sendLinkEvent } from '../analytics/SendAnalytics';
import React from 'react';
import { alertSendsAnalytics } from '../flags';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

export type AlertHeadingLevel = '1' | '2' | '3' | '4' | '5' | '6';
export type AlertRole = 'alert' | 'alertdialog' | 'region' | 'status';
export type AlertVariation = 'error' | 'warn' | 'success';

export interface AlertProps {
  /**
   * Access a reference to the `alert` `div` element
   */
  alertRef?: (...args: any[]) => any;
  /**
   * Analytics events tracking is enabled by default. Set this value to `false` to disable tracking for this component instance.
   */
  analytics?: boolean;
  /**
   * An override for the dynamic content sent to analytics services. By default this content comes from the heading.
   *
   * In cases where this component’s heading may contain **sensitive information**, use this prop to override what is sent to analytics.
   */
  analyticsLabelOverride?: string;
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

// Omit props that we override with values from the Alert
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

    const { analytics, analyticsLabelOverride, variation } = this.props;

    if (alertSendsAnalytics() && analytics !== false) {
      /* Send analytics event for `error`, `warn`, `success` alert variations */
      if (variation) {
        const heading = this.props.heading || this.props.children;
        let eventHeadingText;

        if (analyticsLabelOverride) {
          eventHeadingText = analyticsLabelOverride;
        } else if (typeof heading === 'string') {
          eventHeadingText = heading.substring(0, MAX_LENGTH);
        } else {
          const eventHeadingTextElement =
            (this.alertTextRef &&
              this.alertTextRef.getElementsByClassName('ds-c-alert__heading')[0]) ||
            (this.alertTextRef && this.alertTextRef.getElementsByClassName('ds-c-alert__body')[0]);
          eventHeadingText =
            eventHeadingTextElement && eventHeadingTextElement.textContent
              ? eventHeadingTextElement.textContent.substring(0, MAX_LENGTH)
              : '';
        }

        sendLinkEvent({
          event_name: 'alert_impression',
          event_type: EVENT_CATEGORY.uiInteraction,
          ga_eventAction: 'alert impression',
          ga_eventCategory: EVENT_CATEGORY.uiComponents,
          ga_eventLabel: eventHeadingText,
          heading: eventHeadingText,
          type: variation,
        });
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
