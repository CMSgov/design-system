import React from 'react';
import classNames from 'classnames';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../i18n';

export type BadgeSize = 'big';
export type BadgeVariation = 'info' | 'success' | 'warn' | 'alert';

export interface BadgeProps {
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
   * Sets the font size of the Badge. Only supports 'big'
   */
  size?: BadgeSize;
  /**
   * A string corresponding to the badge-component variation classes
   */
  variation?: BadgeVariation;
}

export const UnwrappedBadge: React.FC<React.ComponentPropsWithRef<'span'> & BadgeProps> = (
  props: BadgeProps
) => {
  const { className = '', children, size, variation, ...others } = props;
  const sizeClasses = { big: 'ds-c-badge--big' };

  const variationClass = variation && `ds-c-badge--${variation}`;
  const classes = classNames('ds-c-badge', variationClass, sizeClasses[size], className);

  const { t } = useTranslation('badge');

  return (
    <span className={classes} {...others}>
      {variation && <span className="ds-u-visibility--screen-reader">{t(variation)}: </span>}
      {children}
    </span>
  );
};

/**
 * A container component responsible for passing an instance
 * of i18next to all child components using react-i18next's
 * `withTranslation` HOC. Note that we use I18nextProvider in order
 * to avoid conflicts with other apps using react-i18next.
 * See https://github.com/i18next/react-i18next/issues/382 for
 * more context on why we need to do it this way.
 */
// eslint-disable-next-line react/no-multi-comp
export const Badge = (props: BadgeProps) => (
  <I18nextProvider i18n={i18n}>
    <UnwrappedBadge {...props} />
  </I18nextProvider>
);

export default Badge;
