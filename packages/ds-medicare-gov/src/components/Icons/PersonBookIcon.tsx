import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 32 32',
};

function PersonWithBookIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--personBook ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      <SvgIcon
        title={t('icons.personBook')}
        {...defaultProps}
        {...props}
        className={iconCssClasses}
      >
        <path
          d="M25.4359 14.478C24.2872 13.2683 22.6461 12.4878 20.8 12.4878H19.8974H12.1846H11.282C9.39486 12.4878 7.7128 13.2683 6.56409 14.5561L15.8359 17.1707L25.4359 14.478Z"
          fill="#1E3C70"
        />
        <path
          d="M16.2052 11.3171C19.4872 11.3171 22.1539 8.78049 22.1539 5.65854C22.1539 2.53659 19.4872 0 16.2052 0C12.9231 0 10.2565 2.53659 10.2565 5.65854C10.2565 8.78049 12.9231 11.3171 16.2052 11.3171Z"
          fill="#1E3C70"
        />
        <path
          d="M27.2 22.0097C27.2 20.6439 28.1846 19.4732 29.5385 19.161V14.8293L16.2052 18.5366L2.87183 14.8293V19.161C4.22567 19.4732 5.21029 20.6439 5.21029 22.0097C5.21029 23.3756 4.22567 24.5463 2.87183 24.8585V28.2927L16.2052 32L29.5385 28.2927V24.8585C28.1846 24.5463 27.2 23.3756 27.2 22.0097Z"
          fill="#1E3C70"
        />
        <path
          d="M31.6718 20.9951C31.2205 19.7463 29.9487 19.1219 29.9487 19.1219V20.2146C28.8 20.2146 27.8975 21.0341 27.8975 22.0098C27.8975 22.9854 28.8 23.8049 29.9487 23.8049C31.0975 23.8049 32 22.9854 32 22.0098C32 21.6195 31.8769 21.3073 31.6718 20.9951Z"
          fill="#1E3C70"
        />
        <path
          d="M4.10256 22.0098C4.10256 21.0341 3.2 20.2146 2.05128 20.2146V19.1219C2.05128 19.1219 0.779487 19.7463 0.328205 20.9951C0.123077 21.3073 0 21.6195 0 22.0098C0 22.9854 0.902564 23.8049 2.05128 23.8049C3.2 23.8049 4.10256 22.9854 4.10256 22.0098Z"
          fill="#1E3C70"
        />
      </SvgIcon>
    </span>
  );
}

export default PersonWithBookIcon;
