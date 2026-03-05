import type * as React from 'react';
import { SvgIcon } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  title: 'Hospital',
  viewBox: '0 0 32 32',
};

function HospitalIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--hospital ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31.573 1.606C31.573.719 30.855 0 29.97 0H1.604C.718 0 0 .719 0 1.606v28.362c0 .887.718 1.605 1.604 1.605H29.97c.886 0 1.604-.718 1.604-1.605zM7.316 6.16h5.036v6.93h6.869V6.16h5.037v19.252H19.22v-7.701h-6.869v7.7H7.317z"
          fill="#1e3c70"
        />
      </SvgIcon>
    </span>
  );
}

export default HospitalIcon;
