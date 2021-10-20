import React from 'react';
import SvgIcon, { SvgIconProps } from './SvgIcon';

function CloseIconThin(props: SvgIconProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--close ds-c-icon--close-thin ${props.className}`;

  return (
    <SvgIcon {...props} className={iconCssClasses}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="M0 13.0332964L13.0332964 0M13.0332964 13.0332964L0 0"
      />
    </SvgIcon>
  );
}

CloseIconThin.defaultProps = {
  className: '',
  title: 'Close',
  viewBox: '-2 -2 18 18',
};

export default CloseIconThin;
