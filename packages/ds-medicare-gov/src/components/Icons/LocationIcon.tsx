import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 30 30',
};

function LocationIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--location ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.location')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.7976 3.21229L4.30395 12.2071C2.12333 13.2135 2.84108 16.5 5.24685 16.5H13.5V24.7497C13.5 27.1744 16.7888 27.8681 17.7929 25.6926L26.7834 6.19804C27.6696 4.27799 25.67 2.34805 23.7976 3.21229Z"
        fill="#262626"
      />
    </SvgIcon>
  );
}

export default LocationIcon;
