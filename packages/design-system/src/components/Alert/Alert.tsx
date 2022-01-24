import { EVENT_CATEGORY, MAX_LENGTH, sendLinkEvent } from '../analytics/SendAnalytics';
import React, { useRef, useState, useEffect } from 'react';
import { alertSendsAnalytics } from '../flags';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { InfoCircleIcon, AlertCircleIcon, WarningIcon, CheckCircleIcon } from '../Icons';

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

export const Alert = (props: AlertProps) => {
  const alertTextRef = useRef(null);
  const focusRef = useRef(null);
  const headingId = props.headingId || uniqueId('alert_');

  if (process.env.NODE_ENV !== 'production') {
    if (!props.heading && !props.children) {
      console.warn(
        `Empty <Alert> components are not allowed, please use the 'heading' prop or include children.`
      );
    }
  }

  const [isHighContrastMode, setIsHighContrastMode] = useState(false);
  useEffect(() => {
    // Automatically set focus on alert element when `autoFocus` prop is used
    if (props.autoFocus && focusRef.current) {
      focusRef.current.focus();
    }

    const { analytics, analyticsLabelOverride, variation } = props;

    if (alertSendsAnalytics() && analytics !== false) {
      /* Send analytics event for `error`, `warn`, `success` alert variations */
      if (variation) {
        const heading = props.heading || props.children;
        let eventHeadingText;

        if (analyticsLabelOverride) {
          eventHeadingText = analyticsLabelOverride;
        } else if (typeof heading === 'string') {
          eventHeadingText = heading.substring(0, MAX_LENGTH);
        } else {
          const eventHeadingTextElement =
            (alertTextRef.current &&
              alertTextRef.current.getElementsByClassName('ds-c-alert__heading')[0]) ||
            (alertTextRef.current &&
              alertTextRef.current.getElementsByClassName('ds-c-alert__body')[0]);
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

    if (window) {
      const media = window.matchMedia('(-ms-high-contrast: active)');

      if (media.matches !== isHighContrastMode) {
        setIsHighContrastMode(media.matches);
      }

      const listener = () => {
        setIsHighContrastMode(media.matches);
      };

      media.addEventListener('load', listener);
      return () => media.removeEventListener('load', listener);
    } else {
      setIsHighContrastMode(true);
    }
  }, [isHighContrastMode]);

  function heading(): React.ReactElement | void {
    const { headingLevel, heading } = props;
    const Heading = `h${headingLevel}`;
    if (heading) {
      const headingProps = {
        className: 'ds-c-alert__heading',
        id: headingId,
      };
      return React.createElement(Heading, headingProps, heading);
    }
  }

  // getting proper icon for alert variation
  // eslint-disable-next-line react/no-multi-comp
  const getIcon = (): React.ReactElement | null => {
    const iconClass = 'ds-c-alert__icon';
    // eslint-disable-next-line react/prop-types
    const { hideIcon, variation } = props;
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
  };

  const {
    alertRef,
    autoFocus,
    className,
    children,
    hideIcon,
    role,
    weight,
    variation,
    ...alertProps
  } = props;

  const highContrastModeLabel = {
    success: 'Success',
    warn: 'Warning',
    error: 'Error',
  };

  const classes = classNames(
    'ds-c-alert',
    hideIcon && 'ds-c-alert--hide-icon',
    variation && `ds-c-alert--${variation}`,
    weight && `ds-c-alert--${weight}`,
    className
  );

  return (
    <div
      className={classes}
      /* eslint-disable no-return-assign */
      ref={(ref) => {
        alertTextRef.current = ref;
        if (autoFocus) {
          focusRef.current = ref;
        } else if (alertRef) {
          alertRef(ref);
        }
      }}
      /* eslint-enable no-return-assign */
      tabIndex={alertRef || autoFocus ? -1 : null}
      role={role}
      aria-labelledby={heading ? headingId : undefined}
      {...alertProps}
    >
      {getIcon()}
      <div className="ds-c-alert__body">
        {isHighContrastMode && hideIcon && heading ? (
          <div className="ds-c-alert__heading ds-c-alert--heading__hcm">
            {variation ? highContrastModeLabel[variation] : 'Notice'}: {heading()}
          </div>
        ) : (
          heading()
        )}
        {children}
      </div>
    </div>
  );
};

Alert.defaultProps = {
  role: 'region',
  headingLevel: '2',
};

export default Alert;
