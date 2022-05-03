import React from 'react';
import { t } from '../i18n';
import SvgIcon, { IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '0 0 16 16',
};

function InfoCircleIconThin(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--info-circle-thin ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.infoCircle')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        d="M8 16c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm1-3.7V6.4H7v5.9h2zM7 4.9c0 .6.3.9 1 .9s1-.3 1-.9c0-.3-.1-.5-.2-.7-.2-.1-.5-.2-.8-.2-.3 0-.6.1-.8.2-.1.2-.2.4-.2.7z"
        fillRule="nonzero"
      />
    </SvgIcon>
  );
}

export default InfoCircleIconThin;
