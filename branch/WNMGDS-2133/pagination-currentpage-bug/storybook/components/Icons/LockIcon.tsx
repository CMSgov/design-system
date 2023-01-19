import React from 'react';
import { t } from '../i18n';
import SvgIcon, { IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '0 0 52 64',
};

function LockIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--lock ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.lock')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        fillRule="evenodd"
        d="M26 0c10.493 0 19 8.507 19 19v9h3a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4h3v-9C7 8.507 15.507 0 26 0zm0 8c-5.979 0-10.843 4.77-10.996 10.712L15 19v9h22v-9c0-6.075-4.925-11-11-11z"
      />
    </SvgIcon>
  );
}

export default LockIcon;
