import type * as React from 'react';
import { SvgIcon } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  title: 'Costs',
  viewBox: '0 0 32 32',
};

function CostsIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--costs ${props.className || ''}`;

  return (
    <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
      <g fill="none" fillRule="evenodd">
        <path
          d="m20.075 14.588-6.75-1.975A1.843 1.843 0 0 1 13.844 9h4.144c.762 0 1.512.231 2.137.656a.974.974 0 0 0 1.219-.125l2.175-2.125c.444-.431.381-1.15-.113-1.531A8.84 8.84 0 0 0 18 4V1c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v3h-.156C9.862 4 6.662 7.419 7.03 11.475c.263 2.881 2.463 5.225 5.238 6.038l6.406 1.874A1.855 1.855 0 0 1 20 21.158 1.843 1.843 0 0 1 18.156 23h-4.143a3.8 3.8 0 0 1-2.138-.656.974.974 0 0 0-1.219.125l-2.175 2.125c-.444.431-.381 1.15.113 1.531A8.84 8.84 0 0 0 14 28v3c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-3.012c2.913-.057 5.644-1.788 6.606-4.544 1.344-3.85-.912-7.8-4.531-8.856"
          fill="#262626"
        />
      </g>
    </SvgIcon>
  );
}

export default CostsIcon;
