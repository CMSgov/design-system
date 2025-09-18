import type * as React from 'react';
import { t } from '../i18n';
import { SvgIcon, IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '0 0 32 32',
};

export function SearchIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--search ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.search')} {...defaultProps} {...props} className={iconCssClasses}>
      <path d="M24.1926 21.7177L31.7797 29.3048C32.0734 29.5986 32.0734 30.0735 31.7797 30.3673L30.3673 31.7797C30.0735 32.0734 29.5986 32.0734 29.3048 31.7797L21.7177 24.1926C21.5802 24.0488 21.499 23.8613 21.499 23.6613V22.8364C19.2178 24.805 16.2492 25.9987 12.9994 25.9987C5.81847 25.9987 0 20.1803 0 12.9994C0 5.81847 5.81847 0 12.9994 0C20.1803 0 25.9987 5.81847 25.9987 12.9994C25.9987 16.2492 24.805 19.2178 22.8364 21.499H23.6613C23.8613 21.499 24.0488 21.5739 24.1926 21.7177ZM2.99985 12.9994C2.99985 18.5241 7.47464 22.9989 12.9994 22.9989C18.5241 22.9989 22.9989 18.5241 22.9989 12.9994C22.9989 7.47464 18.5241 2.99985 12.9994 2.99985C7.47464 2.99985 2.99985 7.47464 2.99985 12.9994Z" />
    </SvgIcon>
  );
}
