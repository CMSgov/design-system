import InformationIcon from '../../images/information-new-generic.svg';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TooltipIcon = (props) => {
  return (
    <span className="ds-c-tooltip-icon__container">
      <InformationIcon
        className={classNames('ds-c-tooltip-icon', {
          'ds-c-tooltip-icon--inverse': props.inversed,
        })}
      />
    </span>
  );
};

TooltipIcon.propTypes = {
  inversed: PropTypes.bool,
};

export default TooltipIcon;
