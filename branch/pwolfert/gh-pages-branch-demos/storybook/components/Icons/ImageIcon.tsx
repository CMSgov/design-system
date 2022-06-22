import React from 'react';
import { t } from '../i18n';
import SvgIcon, { IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '0 0 16 12',
};

function ImageIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--image ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.image')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        d="M15 0c.555 0 1 .445 1 1v10c0 .555-.445 1-1 1H1c-.555 0-1-.445-1-1V1c0-.555.445-1 1-1h14zM3.5 2C2.664 2 2 2.664 2 3.5S2.664 5 3.5 5 5 4.336 5 3.5 4.336 2 3.5 2zM14 10l-4-6-3.664 4.664L4 7l-2 3h12z"
        fillRule="nonzero"
      />
    </SvgIcon>
  );
}

export default ImageIcon;
