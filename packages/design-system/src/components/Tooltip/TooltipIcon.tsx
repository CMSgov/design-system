import { InfoCircleIconThin } from '../Icons';
import React from 'react';
import classNames from 'classnames';

export interface TooltipIconProps {
  /*
   * Renders inversed version of icon
   */
  inversed?: boolean;
}

export const TooltipIcon = (props: TooltipIconProps): React.ReactElement => {
  return (
    <span className="ds-c-tooltip-icon__container">
      <InfoCircleIconThin
        className={classNames('ds-c-tooltip-icon', {
          'ds-c-tooltip-icon--inverse': props.inversed,
        })}
      />
    </span>
  );
};

export default TooltipIcon;
