import React from 'react';
import { IconCommonProps } from '../Icons/SvgIcon';
import classNames from 'classnames';

export interface TooltipIconProps extends IconCommonProps {
  /*
   * Renders inversed version of icon
   */
  inversed?: boolean;
}

export const TooltipIcon = ({ inversed, ...iconProps }: TooltipIconProps): React.ReactElement => {
  return (
    <span className="ds-c-tooltip-icon__container">
      <svg
        {...iconProps}
        aria-hidden="true"
        className={classNames('ds-c-tooltip-icon ds-c-icon ds-c-icon--info-circle-thin', {
          'ds-c-tooltip-icon--inverse': inversed,
        })}
        id="icon-18"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 16c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm1-3.7V6.4H7v5.9h2zM7 4.9c0 .6.3.9 1 .9s1-.3 1-.9c0-.3-.1-.5-.2-.7-.2-.1-.5-.2-.8-.2-.3 0-.6.1-.8.2-.1.2-.2.4-.2.7z"
          fill-rule="nonzero"
        ></path>
      </svg>
    </span>
  );
};

export default TooltipIcon;
