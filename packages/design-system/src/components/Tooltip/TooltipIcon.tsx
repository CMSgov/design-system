import { InfoCircleIconThin } from '../Icons';
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
      <InfoCircleIconThin
        className={classNames('ds-c-tooltip-icon', {
          'ds-c-tooltip-icon--inverse': inversed,
        })}
        {...iconProps}
      />
    </span>
  );
};

export default TooltipIcon;
