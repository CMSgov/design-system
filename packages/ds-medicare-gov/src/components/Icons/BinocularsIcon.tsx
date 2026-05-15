import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 32 32',
};

function BinocularsIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--binoculars ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.binoculars')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26 3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3h6zM3.994 10c-.072 2.695-.875 4.42-1.744 6.286C1.228 18.48.117 20.866 0 25.25V28a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V18h2V8H5.99c-1.102 0-1.966.898-1.996 2M26.01 8c1.102 0 1.966.898 1.996 2 .072 2.695.875 4.42 1.744 6.286 1.022 2.194 2.133 4.58 2.25 8.964V28a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V18h-2V8zM11 2H7a1 1 0 0 0-1 1v3h6V3a1 1 0 0 0-1-1m7 16h-4V8h4z"
        fill="#404040"
      />
    </SvgIcon>
  );
}

export default BinocularsIcon;
