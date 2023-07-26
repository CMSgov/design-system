import React from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import mergeRefs from '../utilities/mergeRefs';
import uniqueId from 'lodash/uniqueId';
import useAutofocus from '../utilities/useAutoFocus';
import useAlertAnalytics from './useAlertAnalytics';
import { AlertCircleIcon } from '../Icons';
import { t } from '../i18n';
import { AnalyticsOverrideProps } from '../analytics';

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
        return (
          <svg
            aria-hidden="true"
            className="ds-c-icon ds-c-icon--check-circle "
            id="icon-10"
            viewBox="38 7 135 135"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M162.18 41.592c-5.595-9.586-13.185-17.176-22.771-22.771-9.588-5.595-20.055-8.392-31.408-8.392-11.352 0-21.822 2.797-31.408 8.392-9.587 5.594-17.177 13.184-22.772 22.771-5.596 9.587-8.393 20.057-8.393 31.408 0 11.352 2.798 21.82 8.392 31.408 5.595 9.585 13.185 17.176 22.772 22.771 9.587 5.595 20.056 8.392 31.408 8.392s21.822-2.797 31.408-8.392c9.586-5.594 17.176-13.185 22.771-22.771 5.594-9.587 8.391-20.057 8.391-31.408 0-11.352-2.797-21.822-8.39-31.408zm-13.608 21.876l-44.239 44.239c-1.032 1.032-2.281 1.549-3.748 1.549-1.412 0-2.634-.517-3.666-1.549L67.425 78.215c-.977-.979-1.466-2.199-1.466-3.666 0-1.521.488-2.771 1.466-3.749l7.414-7.332c1.033-1.032 2.254-1.548 3.667-1.548s2.635.516 3.667 1.548l18.413 18.413 33.241-33.16c1.032-1.032 2.254-1.548 3.666-1.548 1.411 0 2.635.516 3.666 1.548l7.414 7.333c.979.977 1.467 2.226 1.467 3.747 0 1.467-.488 2.689-1.468 3.667z"></path>
          </svg>
        );
      case 'warn':
        return (
          <svg
            aria-hidden="true"
            className="ds-c-icon ds-c-icon--warning "
            id="icon-31"
            viewBox="27 0 160 135"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M179.695 125.388L117.126 10.673a10.39 10.39 0 00-3.832-3.992 10.1 10.1 0 00-5.295-1.467c-1.901 0-3.667.49-5.296 1.467s-2.906 2.308-3.829 3.992L36.303 125.388c-1.901 3.423-1.847 6.845.163 10.267a10.24 10.24 0 003.789 3.746 10.188 10.188 0 005.174 1.387H170.57c1.849 0 3.572-.463 5.175-1.387a10.24 10.24 0 003.789-3.746c2.01-3.423 2.064-6.844.161-10.267zm-61.265-8.148c0 .76-.259 1.398-.773 1.914-.516.516-1.127.773-1.834.773H100.18c-.706 0-1.317-.257-1.833-.773-.516-.517-.774-1.154-.774-1.914v-15.48c0-.76.258-1.397.774-1.914.516-.516 1.126-.773 1.833-.773h15.642c.707 0 1.318.257 1.834.773.515.517.773 1.154.773 1.914v15.48zm-.162-30.47c-.056.543-.341.991-.856 1.344-.517.354-1.154.529-1.915.529h-15.073c-.76 0-1.412-.176-1.955-.529-.544-.354-.815-.801-.815-1.346l-1.385-37.231c0-.761.272-1.331.815-1.711.706-.597 1.358-.896 1.956-.896h17.924c.598 0 1.25.298 1.956.896.543.38.813.896.813 1.548l-1.465 37.396z"></path>
          </svg>
        );
      default:
        return (
          <svg
            aria-hidden="true"
            className="ds-c-icon ds-c-icon--info-circle "
            id="icon-17"
            viewBox="37 2 135 135"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M162.18 41.592c-5.595-9.586-13.185-17.176-22.771-22.771-9.588-5.595-20.055-8.392-31.408-8.392-11.352 0-21.822 2.797-31.408 8.392-9.587 5.594-17.177 13.184-22.772 22.771-5.596 9.587-8.393 20.057-8.393 31.408 0 11.352 2.798 21.82 8.392 31.408 5.595 9.585 13.185 17.176 22.772 22.771 9.587 5.595 20.056 8.392 31.408 8.392s21.822-2.797 31.408-8.392c9.586-5.594 17.176-13.185 22.771-22.771 5.594-9.587 8.391-20.057 8.391-31.408 0-11.352-2.797-21.822-8.39-31.408zM97.572 26.071c0-.761.244-1.385.733-1.874.489-.488 1.114-.733 1.874-.733h15.644c.76 0 1.385.245 1.872.733.488.489.734 1.113.734 1.874v13.036c0 .76-.246 1.385-.734 1.873-.487.489-1.112.733-1.872.733h-15.644c-.76 0-1.385-.244-1.874-.733-.489-.488-.733-1.113-.733-1.873V26.071zm31.285 86.036c0 .76-.246 1.385-.733 1.872-.487.489-1.112.733-1.874.733h-36.5c-.761 0-1.385-.244-1.874-.733-.489-.488-.733-1.113-.733-1.873V99.07c0-.762.244-1.385.733-1.874.489-.488 1.114-.733 1.874-.733h7.822V70.392H89.75c-.761 0-1.385-.244-1.874-.733-.489-.488-.733-1.113-.733-1.874V54.75c0-.761.244-1.385.733-1.874.489-.489 1.114-.733 1.874-.733h26.073c.76 0 1.385.244 1.872.733.488.489.734 1.113.734 1.874v41.714h7.82c.761 0 1.386.245 1.874.733.487.488.733 1.113.733 1.874v13.036z"></path>
          </svg>
        );
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
