import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 24 24',
};

function IncludedYesIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--included-yes ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.includedYes')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        d="M8.15146 20.5505L0.351457 12.7505C-0.117152 12.2819 -0.117152 11.5221 0.351457 11.0534L2.04847 9.35634C2.51708 8.88768 3.27693 8.88768 3.74553 9.35634L8.99999 14.6107L20.2544 3.35634C20.7231 2.88773 21.4829 2.88773 21.9515 3.35634L23.6485 5.0534C24.1171 5.52201 24.1171 6.28181 23.6485 6.75046L9.84852 20.5505C9.37986 21.0191 8.62007 21.0191 8.15146 20.5505Z"
        fill="#12890E"
      />
    </SvgIcon>
  );
}

export default IncludedYesIcon;
