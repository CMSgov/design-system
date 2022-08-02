import React from 'react';
import { t } from '../i18n';
import SvgIcon, { IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '0 0 54 54',
};

function LockCircleIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--lock-circle ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.lockCircle')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        fill="currentColor"
        d="M34.72,34.84a1.29,1.29,0,0,1-1.29,1.29H20.57a1.29,1.29,0,0,1-1.29-1.29V27.12a1.29,1.29,0,0,1,1.29-1.29H21V23.26a6,6,0,0,1,12,0v2.57h0.43a1.29,1.29,0,0,1,1.29,1.29v7.72Zm-4.29-9V23.26a3.43,3.43,0,0,0-6.86,0v2.57h6.86Z"
      />
      <circle fill="none" stroke="currentColor" strokeWidth="1" cx="50%" cy="50%" r="47%" />
    </SvgIcon>
  );
}

export default LockCircleIcon;
