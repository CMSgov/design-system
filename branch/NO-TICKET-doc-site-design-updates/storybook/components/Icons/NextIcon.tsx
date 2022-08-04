import React from 'react';
import { t } from '../i18n';
import SvgIcon, { IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '0 0 16 13',
};

function NextIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--next ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.next')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        d="M16 6.667l-6.678 6.666H4.906L9.99 8H0V5.333h9.954L4.897 0h4.436z"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
}

export default NextIcon;
