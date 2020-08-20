import * as React from 'react';

export type SkipNavChildren = string | React.ReactNode;

export interface SkipNavProps {
  /**
   * Skip nav label
   */
  children: SkipNavChildren;
  /**
   * The anchor or target for the link (where the link will jump the user to)
   */
  href: string;
  /**
   * An onClick handler used for manually setting focus on the content.
   * Sometimes it's necessary to manually set focus, like when an app uses hash
   * routing and element-id links will be mistaken for routes.
   */
  onClick?: (...args: any[]) => any;
}

declare const SkipNav: React.FC<SkipNavProps>;

export default SkipNav;
