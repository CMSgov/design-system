import React from 'react';
import { t } from '../i18n';
import SvgIcon, { IconCommonProps } from './SvgIcon';
import classNames from 'classnames';

const defaultProps = {
  className: '',
  viewBox: '0 0 20 20',
};

function PlusCircleIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = classNames('ds-c-icon--plus-circle', props.className);

  return (
    <SvgIcon title={t('icons.add')} {...defaultProps} {...props} className={iconCssClasses}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-47.000000, -360.000000)">
          <g transform="translate(49.000000, 362.000000)">
            <circle
              className="ds-c-icon--plus-circle__circle"
              stroke="currentColor"
              strokeWidth="2"
              fill="#FFFFFF"
              cx="8"
              cy="8"
              r="9"
            ></circle>
            <g
              className="ds-c-icon--plus-circle__group"
              transform="translate(2.823529, 2.823529)"
              fill="currentColor"
            >
              <rect x="4.4" y="0" width="1.55294118" height="10.3529412" rx="0.776470588"></rect>
              <path
                d="M5.17647059,-4.70734562e-14 C5.60530345,-4.71522316e-14 5.95294118,0.347637724 5.95294118,0.776470588 L5.95294118,9.57647059 C5.95294118,10.0053035 5.60530345,10.3529412 5.17647059,10.3529412 C4.74763772,10.3529412 4.4,10.0053035 4.4,9.57647059 L4.4,4.53287291 L4.4,0.776470588 C4.4,0.347637724 4.74763772,-4.69946809e-14 5.17647059,-4.70734562e-14 Z"
                transform="translate(5.176471, 5.176471) rotate(-270.000000) translate(-5.176471, -5.176471) "
              ></path>
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  );
}

export default PlusCircleIcon;
