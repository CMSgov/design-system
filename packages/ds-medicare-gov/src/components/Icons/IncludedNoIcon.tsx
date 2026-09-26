import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 24 24',
};

function IncludedNoIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--included-no ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.includedNo')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.4118 12L20.529 6.88278C21.157 6.25483 21.157 5.2367 20.529 4.60824L19.3918 3.47097C18.7638 2.84301 17.7457 2.84301 17.1172 3.47097L12 8.58818L6.88278 3.47097C6.25483 2.84301 5.2367 2.84301 4.60824 3.47097L3.47097 4.60824C2.84301 5.23619 2.84301 6.25432 3.47097 6.88278L8.58818 12L3.47097 17.1172C2.84301 17.7452 2.84301 18.7633 3.47097 19.3918L4.60824 20.529C5.23619 21.157 6.25483 21.157 6.88278 20.529L12 15.4118L17.1172 20.529C17.7452 21.157 18.7638 21.157 19.3918 20.529L20.529 19.3918C21.157 18.7638 21.157 17.7457 20.529 17.1172L15.4118 12Z"
        fill="#B20000"
      />
    </SvgIcon>
  );
}

export default IncludedNoIcon;
