import { EventCategory, MAX_LENGTH, sendLinkEvent } from '../analytics';
import React from 'react';
import { alertSendsAnalytics } from '../flags';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { InfoCircleIcon, AlertCircleIcon, WarningIcon, CheckCircleIcon } from '../Icons';
import { t } from '../i18n';

export type AlertHeadingLevel = '1' | '2' | '3' | '4' | '5' | '6';
export type AlertRole = 'alert' | 'alertdialog' | 'region' | 'status';
export type AlertVariation = 'error' | 'warn' | 'success';
export type AlertWeight = 'lightweight';

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
   * A string corresponding to the `Alert` weight classes (`lightweight`)
   */
  weight?: AlertWeight;
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

  // Alert class properties
  alertTextRef: any;
  focusRef: any;
  headingId: string;
  a11yLabelId: string;
  eventHeadingText: string;

  constructor(props: AlertProps) {
    super(props);
    this.alertTextRef = null;
    this.focusRef = null;
    this.headingId = this.props.headingId || uniqueId('alert_');
    this.a11yLabelId = this.props.a11yLabelId || uniqueId('alert_a11y_label_');

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
          event_type: EventCategory.UI_INTERACTION,
          ga_eventAction: 'alert impression',
          ga_eventCategory: EventCategory.UI_COMPONENTS,
          ga_eventLabel: eventHeadingText,
          heading: eventHeadingText,
          type: variation,
        });
      }
    }
  }

  heading(): React.ReactElement | void {
    const { headingLevel, heading } = this.props;
    if (heading) {
      const Heading = `h${headingLevel}` as const;
      return <Heading className="ds-c-alert__heading">{heading}</Heading>;
    }
  }

  // getting proper icon for alert variation
  getIcon(): React.ReactElement | null {
    const iconClass = 'ds-c-alert__icon';
    const { hideIcon, variation } = this.props;
    if (hideIcon) {
      return null;
    }

    switch (variation) {
      case 'error':
        return <AlertCircleIcon className={iconClass} />;
      case 'success':
        return <CheckCircleIcon className={iconClass} />;
      case 'warn':
        return <WarningIcon className={iconClass} />;
      default:
        return <InfoCircleIcon className={iconClass} />;
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
      weight,
      analytics,
      analyticsLabelOverride,
      ...alertProps
    } = this.props;

    const classes = classNames(
      'ds-c-alert',
      hideIcon && 'ds-c-alert--hide-icon',
      variation && `ds-c-alert--${variation}`,
      weight && `ds-c-alert--${weight}`,
      className,
      'ds-u-border--2'
    );

    const a11yLabel = (
      <span className="ds-c-alert__a11y-label ds-u-visibility--screen-reader" id={this.a11yLabelId}>
        {t(`alert.${variation ?? 'defaultLabel'}`)}:{' '}
      </span>
    );

    return (
      <div
        className={classes}
        ref={(ref) => {
          this.alertTextRef = ref;
          if (autoFocus) {
            this.focusRef = ref;
          } else if (alertRef) {
            alertRef(ref);
          }
        }}
        tabIndex={alertRef || autoFocus ? -1 : null}
        role={role}
        aria-labelledby={heading ? this.headingId : this.a11yLabelId}
        {...alertProps}
      >
        {this.getIcon()}
        <div className="ds-c-alert__body" id={this.headingId}>
          {heading ? (
            <div className="ds-c-alert__header ds-c-alert__heading">
              {a11yLabel}
              {this.heading()}
            </div>
          ) : (
            a11yLabel
          )}
          {children}
        </div>
      </div>
    );
  }
}

export default Alert;
