import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 32 32',
};

function BrowserIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--browser ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.browser')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 2H29C30.6562 2 32 3.34375 32 5V27C32 28.6562 30.6562 30 29 30H3C1.34375 30 0 28.6562 0 27V5C0 3.34375 1.34375 2 3 2ZM3 4C2.45 4 2 4.45 2 5V8H6V4H3ZM30 27C30 27.55 29.55 28 29 28H3C2.45 28 2 27.55 2 27V10H30V27ZM8 8H30V5C30 4.45 29.55 4 29 4H8V8Z"
        fill="#262626"
      />
    </SvgIcon>
  );
}

export default BrowserIcon;
