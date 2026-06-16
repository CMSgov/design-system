import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 32 32',
};

function LeafIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--create-account ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      <SvgIcon
        title={t('icons.createAccount')}
        {...defaultProps}
        {...props}
        className={iconCssClasses}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.2 15.8a6.4 6.4 0 0 0 6.4-6.4A6.4 6.4 0 0 0 11.2 3a6.4 6.4 0 0 0-6.4 6.4 6.4 6.4 0 0 0 6.4 6.4m20-2.4H28v-3.2c0-.44-.36-.8-.8-.8h-1.6c-.44 0-.8.36-.8.8v3.2h-3.2c-.44 0-.8.36-.8.8v1.6c0 .44.36.8.8.8h3.2v3.2c0 .44.36.8.8.8h1.6c.44 0 .8-.36.8-.8v-3.2h3.2c.44 0 .8-.36.8-.8v-1.6c0-.44-.36-.8-.8-.8m-16.355 4h.835c3.71 0 6.72 3.01 6.72 6.72v2.08a2.4 2.4 0 0 1-2.4 2.4H2.4A2.4 2.4 0 0 1 0 26.2v-2.08c0-3.71 3.01-6.72 6.72-6.72h.835a8.71 8.71 0 0 0 7.29 0"
          fill="#262626"
        />
      </SvgIcon>
    </span>
  );
}

export default LeafIcon;
