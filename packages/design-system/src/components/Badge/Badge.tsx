import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

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

export const Badge: React.FC<React.ComponentPropsWithRef<'span'> & BadgeProps> = (
  props: BadgeProps
) => {
  const { className = '', children, size, variation, ...others } = props;
  const sizeClasses = { big: 'ds-c-badge--big' };

  const variationClass = variation && `ds-c-badge--${variation}`;
  const classes = classNames('ds-c-badge', variationClass, sizeClasses[size], className);

  const HighContrastModeLabel = {
    info: 'Notice',
    success: 'Success',
    warn: 'Warning',
    alert: 'Alert',
  };

  const [isHighContrastMode, setIsHighContrastMode] = useState(false);
  useEffect(() => {
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

  return (
    <span className={classes} {...others}>
      {isHighContrastMode && HighContrastModeLabel[variation] && (
        <span>{HighContrastModeLabel[variation]}: </span>
      )}
      {children}
    </span>
  );
};

export default Badge;
