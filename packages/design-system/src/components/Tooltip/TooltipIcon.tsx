import { InfoCircleIconThin } from '../Icons';
import React from 'react';
import classNames from 'classnames';

export interface ITooltipIcon {
  inversed?: boolean;
}

export const TooltipIcon = (props: ITooltipIcon): React.ReactElement => {
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
