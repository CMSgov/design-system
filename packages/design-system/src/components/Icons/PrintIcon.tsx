import type * as React from 'react';
import { t } from '../i18n';
import { SvgIcon, IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '0 0 32 32',
};

export function PrintIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--print ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.print')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 4.82812V12C30.2094 12 32 13.7906 32 16V23C32 23.5525 31.5525 24 31 24H28V30C28 31.1044 27.1044 32 26 32H6C4.89563 32 4 31.1044 4 30V24H1C0.4475 24 0 23.5525 0 23V16C0 13.7906 1.79063 12 4 12V2C4 0.895625 4.89563 0 6 0H23.1712C23.7019 0 24.2106 0.210625 24.5856 0.585625L27.4144 3.41375C27.7894 3.78937 28 4.2975 28 4.82812ZM8 28H24V22H8V28ZM24 14H8V4H20V7C20 7.5525 20.4475 8 21 8H24V14ZM25.5 17C25.5 17.8281 26.1719 18.5 27 18.5C27.8281 18.5 28.5 17.8281 28.5 17C28.5 16.1712 27.8281 15.5 27 15.5C26.1719 15.5 25.5 16.1712 25.5 17Z"
      />
    </SvgIcon>
  );
}
