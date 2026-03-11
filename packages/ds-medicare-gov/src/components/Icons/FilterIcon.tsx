import type * as React from 'react';
import { SvgIcon } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  title: 'Filter',
  viewBox: '0 0 33 32',
};

function FilterIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--filter ${props.className || ''}`;

  return (
    <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
      <g fill="none" fillRule="evenodd">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.00237 0H29.998C31.7781 0 32.6684 2.158 31.4122 3.41419L20 14.8284V29.9989C20 31.7341 17.9604 32.6218 16.683 31.5041L12.683 28.0051C12.2489 27.6254 12 27.0767 12 26.5V14.8284L0.588123 3.41419C-0.670565 2.15544 0.22581 0 2.00237 0ZM18 30V14L30 2H2L14 14V26.5L18 30Z"
          fill="#404040"
        />
      </g>
    </SvgIcon>
  );
}

export default FilterIcon;
