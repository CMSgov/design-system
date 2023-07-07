import React from 'react';
import { t } from '../i18n';

export interface SkipNavProps {
  /**
   * Skip nav label
   */
  children?: React.ReactNode;
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

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/skip-nav/).
 */
export const SkipNav = ({ children, href, onClick }: SkipNavProps) => {
  return (
    <a className="ds-c-skip-nav" href={href} onClick={onClick}>
      {children ?? t('skipNav.default')}
    </a>
  );
};

export default SkipNav;
