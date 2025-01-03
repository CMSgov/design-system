import type * as React from 'react';
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
  heading?: React.ReactNode;
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
   * A unique ID for this element. A unique ID will be generated if one isn't provided.
   */
  id?: string;
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
export const Alert = (props: AlertProps) => {
  const { headingRef, bodyRef } = useAlertAnalytics(props);
  const focusRef = useAutofocus(props.autoFocus);
  const rootId = useId('alert--', props.id);
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

  const variationConfig = {
    error: { role: 'alert', icon: AlertCircleIcon },
    success: { role: 'status', icon: CheckCircleIcon },
    warn: { role: 'alert', icon: WarningIcon },
    default: { role: 'region', icon: InfoCircleIcon },
  };

  const dynamicRole = role ?? (variationConfig[variation]?.role || variationConfig.default.role);

  function getIcon() {
    if (hideIcon) {
      return null;
    }

    const IconComponent = variationConfig[variation]?.icon || variationConfig.default.icon;
    return <IconComponent className="ds-c-alert__icon" />;
  }

  return (
    <div
      className={classes}
      ref={mergeRefs([alertRef, focusRef])}
      tabIndex={alertRef || autoFocus ? -1 : null}
      role={dynamicRole}
      aria-labelledby={heading ? headingId : a11yLabelId}
      {...alertProps}
    >
      {getIcon()}
      <div className="ds-c-alert__body" ref={bodyRef}>
        {heading ? (
          <div id={headingId} className="ds-c-alert__header ds-c-alert__heading" ref={headingRef}>
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
  headingLevel: '2',
};

export default Alert;
