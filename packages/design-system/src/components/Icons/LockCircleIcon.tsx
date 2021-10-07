import React from 'react';
import SvgIcon, { SvgIconProps } from './SvgIcon';

function LockCircleIcon(props: SvgIconProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--alert-circle ${props.className}`;

  return (
    <SvgIcon {...props} className={iconCssClasses}>
      <path
        fill="#719f2a"
        d="M34.72,34.84a1.29,1.29,0,0,1-1.29,1.29H20.57a1.29,1.29,0,0,1-1.29-1.29V27.12a1.29,1.29,0,0,1,1.29-1.29H21V23.26a6,6,0,0,1,12,0v2.57h0.43a1.29,1.29,0,0,1,1.29,1.29v7.72Zm-4.29-9V23.26a3.43,3.43,0,0,0-6.86,0v2.57h6.86Z"
      />
      <circle fill="none" stroke="#538200" strokeWidth="2px" cx="50%" cy="50%" r="47%" />
    </SvgIcon>
  );
}

LockCircleIcon.defaultProps = {
  className: '',
  title: 'Lock in circle',
  viewBox: '0 0 54 54',
};

export default LockCircleIcon;
