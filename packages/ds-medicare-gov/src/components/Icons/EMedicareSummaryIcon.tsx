import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 32 32',
};

function EMedicareSummaryIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--emedicare-summary ${props.className || ''}`;

  return (
    <SvgIcon
      title={t('icons.eMedicareSummary')}
      {...defaultProps}
      {...props}
      className={iconCssClasses}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.8 5.4C28.8 4.08 27.72 3 26.4 3H5.6C4.28 3 3.2 4.08 3.2 5.4V22.2H28.8V5.4ZM31.2 23.8H19.077C19.04 24.7905 18.3415 25.4 17.44 25.4H14.4C13.4655 25.4 12.749 24.5265 12.7615 23.8H0.8C0.36 23.8 0 24.16 0 24.6V25.4C0 27.16 1.44 28.6 3.2 28.6H28.8C30.56 28.6 32 27.16 32 25.4V24.6C32 24.16 31.64 23.8 31.2 23.8ZM6.4 19H25.6V6.2H6.4V19Z"
        fill="#262626"
      />
    </SvgIcon>
  );
}

export default EMedicareSummaryIcon;
