import * as React from 'react';

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
  children: React.ReactNode;
  /**
   * Sets the font size of the Badge
   */
  size?: BadgeSize;
  /**
   * A string corresponding to the badge-component variation classes
   */
  variation?: BadgeVariation;
}

declare const Badge: React.FC<React.ComponentPropsWithRef<'span'> & BadgeProps>;

export default Badge;
