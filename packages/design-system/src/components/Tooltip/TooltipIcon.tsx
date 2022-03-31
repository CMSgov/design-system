import { InfoCircleIconThin } from '../Icons';
import { IconCommonProps } from '../Icons/SvgIcon';
import React from 'react';
import classNames from 'classnames';

export interface TooltipIconProps extends IconCommonProps {
  /**
   * Optional way to provide an accessible name to the tooltip icon that is not the <title> element.
   * Use only if the tooltip icon is not contained in an element that has an accessible name.
   */
  ariaLabel?: string;
  /*
   * Renders inversed version of icon
   */
  inversed?: boolean;
}

export const TooltipIcon = ({
  ariaLabel,
  inversed,
  ...iconProps
}: TooltipIconProps): React.ReactElement => {
  return (
    <span className="ds-c-tooltip-icon__container">
      <InfoCircleIconThin
        className={classNames('ds-c-tooltip-icon', {
          'ds-c-tooltip-icon--inverse': inversed,
        })}
        {...iconProps}
      />
      {ariaLabel && <span className="ds-u-visibility--screen-reader">{ariaLabel}</span>}
    </span>
  );
};

export default TooltipIcon;
