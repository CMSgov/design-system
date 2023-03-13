import React from 'react';
import { t } from '../i18n';
import { SvgIcon, IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '3 3 18 18',
};

export function AddIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--add ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.add')} {...defaultProps} {...props} className={iconCssClasses}>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </SvgIcon>
  );
}
