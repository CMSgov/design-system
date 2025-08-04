import type * as React from 'react';
import classNames from 'classnames';
import { t } from '../i18n';

export type BadgeSize = 'big';
export type BadgeVariation = 'info' | 'success' | 'warn' | 'alert';

interface BaseBadgeProps {
  /**
   * Additional classes to be added to the root badge element.
   * Useful for adding utility classes.
   */
  className?: string;
  /**
   * Label text or HTML.
   */
  children: string | React.ReactNode;
  /**
   * Optional string that replaces the variation type as the supplementary text read out by screen readers. Note this value will be hidden as well if `hideScreenReaderText` is set to `true`
   */
  screenReaderText?: string;
  /**
   * Optional boolean that when set to `true` will hide supplementary text read out by screen readers. Defaults to `false`.
   */
  hideScreenReaderText?: boolean;
  /**
   * Sets the font size of the Badge. Only supports 'big'
   */
  size?: BadgeSize;
  /**
   * A string corresponding to the badge-component variation classes
   */
  variation?: BadgeVariation;
}

export type BadgeProps = BaseBadgeProps & React.ComponentPropsWithRef<'span'>;

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/badge/).
 */
export const Badge = (props: BadgeProps) => {
  const {
    className = '',
    children,
    hideScreenReaderText = false,
    screenReaderText,
    size,
    variation,
    ...others
  } = props;
  const sizeClasses = { big: 'ds-c-badge--big' };

  const variationClass = variation && `ds-c-badge--${variation}`;
  const classes = classNames('ds-c-badge', variationClass, sizeClasses[size], className);
  const showScreenReaderText = variation && !hideScreenReaderText;
  const variationText = variation && t(`badge.${variation}`) + ': ';

  return (
    <span className={classes} {...others}>
      {showScreenReaderText && (
        <span className="ds-u-visibility--screen-reader">{screenReaderText || variationText}</span>
      )}
      {children}
    </span>
  );
};

export default Badge;
