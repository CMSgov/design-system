import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 24 24',
};

function MapPinIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--map-pin ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.mapPin')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.93593 19.0133C8.82207 20.2757 9.86035 21.7548 11.0751 23.5158C11.522 24.1614 12.478 24.1614 12.9249 23.5158C14.1396 21.7548 15.1779 20.2757 16.0641 19.0133C20.1465 13.1974 21 11.9816 21 9C21 4.02942 16.9706 0 12 0C7.02942 0 3 4.02942 3 9C3 11.9816 3.85349 13.1974 7.93593 19.0133ZM15.75 9C15.75 11.0711 14.0711 12.75 12 12.75C9.92892 12.75 8.25 11.0711 8.25 9C8.25 6.92892 9.92892 5.25 12 5.25C14.0711 5.25 15.75 6.92892 15.75 9Z"
        fill="#262626"
      />
    </SvgIcon>
  );
}

export default MapPinIcon;
