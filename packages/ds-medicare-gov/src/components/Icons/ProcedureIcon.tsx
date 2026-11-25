import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 24 24',
};

function ProcedureIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--procedure ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.procedure')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.0528 3.38646L22.1649 3.50319C24.4388 5.82848 24.5369 9.5312 22.5057 12.0059H16.954L15.6653 9.42848C15.3898 8.87751 14.6053 8.87751 14.3299 9.42848L12.0419 13.9997L9.32441 7.96233C9.0536 7.36467 8.20379 7.37867 7.95165 7.98101L6.27539 12.0059H1.49406C-0.537065 9.5312 -0.439011 5.82848 1.83492 3.50319L1.94698 3.39113C4.35165 0.930426 8.29251 0.930426 10.6972 3.39113L11.9999 4.72187L13.3026 3.38646C15.712 0.930426 19.6481 0.930426 22.0528 3.38646ZM12.6769 16.0775L14.9976 11.4363L16.0295 13.5001H21.1236L12.5976 22.2082C12.266 22.5491 11.7291 22.5491 11.3976 22.2082L2.87616 13.5001H7.26994L8.67072 10.1522L11.3275 16.0495C11.5843 16.6238 12.3968 16.6425 12.6769 16.0775Z"
        fill="#262626"
      />
    </SvgIcon>
  );
}

export default ProcedureIcon;
