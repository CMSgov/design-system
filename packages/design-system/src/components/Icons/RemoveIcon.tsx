import React from 'react';
import { t } from '../i18n';
import { SvgIcon, IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '0 0 24 24',
};

export function RemoveIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--remove ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.remove')} {...defaultProps} {...props} className={iconCssClasses}>
      <path d="M19 13H5v-2h14v2z" />
    </SvgIcon>
  );
}
