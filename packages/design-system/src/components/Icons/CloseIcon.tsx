import React from 'react';
import { t } from '../i18n';
import { SvgIcon, IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '0 0 16 16',
};

export function CloseIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--close ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.close')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        d="M14.647 11.213c.235.235.353.521.353.858 0 .337-.118.624-.353.859l-1.717 1.717a1.17 1.17 0 01-.86.354c-.336 0-.622-.118-.857-.354l-3.714-3.712-3.712 3.712A1.166 1.166 0 012.93 15c-.337 0-.622-.118-.859-.354L.353 12.93A1.165 1.165 0 010 12.07c0-.337.117-.623.353-.858L4.065 7.5.353 3.789A1.168 1.168 0 010 2.929c0-.336.117-.622.353-.857L2.07.353C2.307.118 2.592 0 2.93 0c.337 0 .623.118.858.353L7.5 4.065 11.213.353c.235-.235.521-.353.857-.353.337 0 .623.118.86.353l1.717 1.719c.235.235.353.521.353.857 0 .338-.118.623-.353.86L10.935 7.5l3.712 3.712z"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
}
