import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TooltipIcon = props => {
  return (
    <span
      className={classNames('ds-c-tooltip__icon-container', {
        'trigger-focused': props.showTooltip,
        'trigger-inverse': props.inverse
      })}
    >
      <svg
        className="ds-c-tooltip__icon"
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g
            className={classNames('ds-c-tooltip__icon--fill', props.iconClasses)}
            fillRule="nonzero"
          >
            <g>
              <path d="M8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 Z M9,12.2760417 L9,6.375 L7,6.375 L7,12.2760417 L9,12.2760417 Z M7,4.90625 C7,5.50347521 7.33172745,5.80208333 7.99519231,5.80208333 C8.66506745,5.80208333 9,5.50347521 9,4.90625 C9,4.6076374 8.9198726,4.38194521 8.75961539,4.22916667 C8.59935818,4.07638813 8.34455303,4 7.99519231,4 C7.64583158,4 7.39262899,4.07465203 7.23557692,4.22395833 C7.07852485,4.37326464 7,4.60069292 7,4.90625 Z" />
            </g>
          </g>
        </g>
      </svg>
    </span>
  );
};

TooltipIcon.propTypes = {
  showTooltip: PropTypes.bool.isRequired,
  inverse: PropTypes.bool,
  iconClasses: PropTypes.string
};

export default TooltipIcon;
