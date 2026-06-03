import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 32 32',
};

function MyAccountIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--my-account ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      <SvgIcon title={t('icons.myAccount')} {...defaultProps} {...props} className={iconCssClasses}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 8a8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8m-3.444 10H21.6c4.637 0 8.4 3.762 8.4 8.4V29a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-2.6c0-4.637 3.763-8.4 8.4-8.4h1.044c1.393.637 2.931 1 4.556 1s3.169-.363 4.556-1"
          fill="#262626"
        />
      </SvgIcon>
    </span>
  );
}

export default MyAccountIcon;
