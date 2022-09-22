import React, { useRef } from 'react';
import classNames from 'classnames';
import mergeRefs from '../utilities/mergeRefs';
import uniqueId from 'lodash/uniqueId';
import useAutofocus from '../utilities/useAutoFocus';
import useAlertAnalytics from './useAlertAnalytics';
import { InfoCircleIcon, AlertCircleIcon, WarningIcon, CheckCircleIcon } from '../Icons';
import { t } from '../i18n';

export type AlertHeadingLevel = '1' | '2' | '3' | '4' | '5' | '6';
export type AlertRole = 'alert' | 'alertdialog' | 'region' | 'status';
export type AlertVariation = 'error' | 'warn' | 'success';
export type AlertWeight = 'lightweight';

export interface BaseAlertProps {
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
}

export type AlertProps = BaseAlertProps &
  Omit<React.ComponentPropsWithRef<'div'>, keyof BaseAlertProps>;

export const Alert: React.FC<AlertProps> = (props: AlertProps) => {
  const { headingRef, bodyRef } = useAlertAnalytics(props);
  const focusRef = useAutofocus(props.autoFocus);
  const headingId = useRef(props.headingId ?? uniqueId('alert_')).current;
  const a11yLabelId = useRef(uniqueId('alert_a11y_label_')).current;

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
    ...alertProps
  } = props;

  let headingElement;
  if (heading) {
    const Heading = `h${headingLevel}` as const;
    headingElement = (
      <Heading className="ds-c-alert__heading" ref={headingRef}>
        {heading}
      </Heading>
    );
  }

  const classes = classNames(
    'ds-c-alert',
    hideIcon && 'ds-c-alert--hide-icon',
    variation && `ds-c-alert--${variation}`,
    weight && `ds-c-alert--${weight}`,
    className
  );

  const a11yLabel = (
    <span className="ds-c-alert__a11y-label ds-u-visibility--screen-reader" id={a11yLabelId}>
      {t(`alert.${variation ?? 'defaultLabel'}`)}:{' '}
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
          <div className="ds-c-alert__header ds-c-alert__heading">
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
