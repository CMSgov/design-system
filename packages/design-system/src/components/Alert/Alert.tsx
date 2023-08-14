import React from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import mergeRefs from '../utilities/mergeRefs';
import useAutofocus from '../utilities/useAutoFocus';
import useAlertAnalytics from './useAlertAnalytics';
import { InfoCircleIcon, AlertCircleIcon, WarningIcon, CheckCircleIcon } from '../Icons';
import { t } from '../i18n';
import { AnalyticsOverrideProps } from '../analytics';
import useId from '../utilities/useId';

export type AlertHeadingLevel = '1' | '2' | '3' | '4' | '5' | '6';
export type AlertRole = 'alert' | 'alertdialog' | 'region' | 'status';
export type AlertVariation = 'error' | 'warn' | 'success';
export type AlertWeight = 'lightweight';

export interface BaseAlertProps extends AnalyticsOverrideProps {
  /**
   * Access a reference to the `alert` `div` element
   */
  alertRef?: (...args: any[]) => any;
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
}

export type AlertProps = BaseAlertProps &
  Omit<React.ComponentPropsWithRef<'div'>, keyof BaseAlertProps>;

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/alert/).
 */
export const Alert: React.FC<AlertProps> = (props: AlertProps) => {
  const { headingRef, bodyRef } = useAlertAnalytics(props);
  const focusRef = useAutofocus(props.autoFocus);
  const rootId = useId('alert--');
  const headingId = props.headingId ?? `${rootId}__heading`;
  const a11yLabelId = `${rootId}__a11y-label`;

  if (process.env.NODE_ENV !== 'production') {
    if (!props.heading && !props.children) {
      console.warn(
        `Empty <Alert> components are not allowed, please use the 'heading' prop or include children.`
      );
    }
  }

  const {
    children,
    className,
    autoFocus,
    heading,
    headingId: _headingId,
    headingLevel,
    hideIcon,
    alertRef,
    role,
    variation,
    weight,
    analytics,
    analyticsLabelOverride,
    analyticsEventTypeOverride,
    onAnalyticsEvent,
    ...alertProps
  } = props;

  let headingElement;
  if (heading) {
    const Heading = `h${headingLevel}` as const;
    headingElement = <Heading className="ds-c-alert__heading">{heading}</Heading>;
  }

  const classes = classNames(
    'ds-c-alert',
    hideIcon && 'ds-c-alert--hide-icon',
    variation && `ds-c-alert--${variation}`,
    weight && `ds-c-alert--${weight}`,
    className
  );

  const a11yLabelText = t(`alert.${variation ?? 'defaultLabel'}`);
  const a11yLabel = (
    <span className="ds-c-alert__a11y-label ds-u-visibility--screen-reader" id={a11yLabelId}>
      {`${a11yLabelText}: `}
    </span>
  );

  // getting proper icon for alert variation
  function getIcon() {
    const iconClass = 'ds-c-alert__icon';
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

  return (
    <div
      className={classes}
      ref={mergeRefs([alertRef, focusRef])}
      tabIndex={alertRef || autoFocus ? -1 : null}
      role={role}
      aria-labelledby={heading ? headingId : a11yLabelId}
      {...alertProps}
    >
      {getIcon()}
      <div className="ds-c-alert__body" id={headingId} ref={bodyRef}>
        {heading ? (
          <div className="ds-c-alert__header ds-c-alert__heading" ref={headingRef}>
            {a11yLabel}
            {headingElement}
          </div>
        ) : (
          a11yLabel
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
