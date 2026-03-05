import type * as React from 'react';
import { SvgIcon } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  title: 'Apple',
  viewBox: '0 0 32 32',
};

function AppleIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--apple ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
        <path
          d="M13.404 9.404c-2.939-1.894-7.51-.784-9.012 3.33-.98 2.678-.196 8.556 3.07 13.52 1.828 2.807 4.244 4.962 5.29 4.766 1.044-.13 1.762-.653 3.134-.457.849.13.783.13 1.828.653s3.2-.457 4.245-1.24c1.045-.784 5.617-8.882 4.833-14.107-.653-4.375-1.894-4.898-4.572-6.073s-4.18-.13-5.485.588c-.588.26-1.894 0-3.33-.98m2.938-1.175c-.719-1.829-.13-3.788-3.135-5.813C9.29-.26 6.351.066 6.351.066l.588 1.697s-.065.588 3.526 3.266c1.502 1.11 3.527 1.502 4.376 2.155.98.653 1.502 1.045 1.502 1.045"
          fill="#1e3c70"
        />
        <path
          d="M15.167 11.886q.196-.588.196-1.176c.261-2.024.066-4.245 1.306-6.661.784-1.502 2.351-3.657 2.547-3.722.262-.066.066.457.653 1.502.85 1.502-.98 1.763-1.959 3.526-1.436 2.678-1.502 4.702-1.632 6.335 0 .13-.98.261-.98.392"
          fill="#1e3c70"
        />
      </SvgIcon>
    </span>
  );
}

export default AppleIcon;
