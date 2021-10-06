import React from 'react';
import SvgIcon, { SvgIconProps } from './SvgIcon';

function CloseIconThin(props: SvgIconProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--close ds-c-icon--close-thin ${props.className}`;

  return (
    <SvgIcon {...props} className={iconCssClasses}>
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeWidth="2"
        d="M0 13.0332964L13.0332964 0M13.0332964 13.0332964L0 0"
        transform="translate(1 1)"
      />
    </SvgIcon>
  );
}

CloseIconThin.defaultProps = {
  className: '',
  title: 'Close',
};

export default CloseIconThin;
