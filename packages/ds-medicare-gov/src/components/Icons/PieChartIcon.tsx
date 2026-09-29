import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 24 24',
};

function PieChartIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--pie-chart ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.pieChart')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7499 0.761059C12.7499 0.332628 13.1099 -0.0278358 13.5374 0.00169498C19.137 0.387939 23.6116 4.86256 23.9983 10.4622C24.0274 10.8892 23.6674 11.2497 23.239 11.2497H12.7499V0.761059ZM10.5 13.4997H21.6228C22.0699 13.4997 22.4379 13.893 22.3756 14.3359C21.5871 19.9177 16.7141 24.1852 10.8717 23.9934C5.05833 23.8027 0.196992 18.9418 0.00621355 13.128C-0.185502 7.28556 4.08193 2.41251 9.66373 1.62408C10.1067 1.56174 10.5 1.92923 10.5 2.37688V13.4997Z"
        fill="#262626"
      />
    </SvgIcon>
  );
}

export default PieChartIcon;
