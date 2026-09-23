import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 24 24',
};

function EllipsesIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--ellipses ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.ellipses')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 12.0002C0 10.5279 1.19444 9.3335 2.66667 9.3335C4.13889 9.3335 5.33333 10.5279 5.33333 12.0002C5.33333 13.4724 4.13889 14.6668 2.66667 14.6668C1.19444 14.6668 0 13.4724 0 12.0002ZM14.6666 12.0002C14.6666 13.4724 13.4721 14.6668 11.9999 14.6668C10.5277 14.6668 9.33325 13.4724 9.33325 12.0002C9.33325 10.5279 10.5277 9.3335 11.9999 9.3335C13.4721 9.3335 14.6666 10.5279 14.6666 12.0002ZM21.3334 9.3335C19.8611 9.3335 18.6667 10.5279 18.6667 12.0002C18.6667 13.4724 19.8611 14.6668 21.3334 14.6668C22.8056 14.6668 24 13.4724 24 12.0002C24 10.5279 22.8056 9.3335 21.3334 9.3335Z"
        fill="#262626"
      />
    </SvgIcon>
  );
}

export default EllipsesIcon;
