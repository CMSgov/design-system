import type * as React from 'react';
import { SvgIcon } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  title: 'Get Started',
  viewBox: '0 0 32 32',
};

function GetStartedIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--get-started ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
        <g fill="currentColor" fillRule="nonzero">
          <mask
            id="a"
            style={{ maskType: 'luminance' }}
            maskUnits="userSpaceOnUse"
            x="5"
            y="6"
            width="22"
            height="26"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M5 6.959h21.895v24.807H5z" fill="#fff" />
          </mask>
          <g mask="url(#a)">
            <path
              d="M7.048 21.966c-.49 0-.937.074-1.293.215-.446.175-.72.43-.75.699a.93.93 0 0 0 .58.946c3.277 1.453 5.174 4.773 5.838 6.133a3.24 3.24 0 0 0 2.894 1.808h8.926a3.19 3.19 0 0 0 3.18-2.762c.678-4.74.427-10.575.424-10.633v-.026c0-.341-.086-1.468-1.182-1.631-.362-.055-.724.09-.998.398a1.46 1.46 0 0 0-.377.958v1.421c0 .32-.258.578-.577.578h-.084a.58.58 0 0 1-.577-.578v-2.96c0-.743-.655-1.35-1.46-1.35-.806 0-1.46.607-1.46 1.35v2.61a.58.58 0 0 1-.577.577h-.084a.576.576 0 0 1-.578-.578v-4c0-.745-.656-1.35-1.46-1.35-.805 0-1.46.605-1.46 1.35v3.65c0 .32-.259.578-.578.578h-.042a.58.58 0 0 1-.578-.573l-.082-10.288a1.64 1.64 0 0 0-.42-1.087 1.34 1.34 0 0 0-.998-.462c-.86 0-1.502.827-1.502 1.566v11.46l-.002.038v2.811a.577.577 0 0 1-.986.409c-.751-.752-2.572-1.277-3.737-1.277"
              fill="#1e3c70"
            />
          </g>
          <path
            d="M13.195 3.749A4.76 4.76 0 0 0 8.44 8.504c0 1.435.641 2.725 1.652 3.597v-1.78a3.57 3.57 0 0 1-.495-1.817 3.6 3.6 0 0 1 3.598-3.599 3.603 3.603 0 0 1 3.598 3.599c0 .597-.146 1.16-.406 1.656l.015 1.85a4.74 4.74 0 0 0 1.547-3.506 4.76 4.76 0 0 0-4.754-4.755"
            fill="#1e3c70"
          />
          <mask
            id="b"
            style={{ maskType: 'luminance' }}
            maskUnits="userSpaceOnUse"
            x="5"
            y="0"
            width="16"
            height="16"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.534.842h15.322v14.665H5.534z"
              fill="#fff"
            />
          </mask>
          <g mask="url(#b)">
            <path
              d="M10.092 15.507v-1.288A6.51 6.51 0 0 1 6.69 8.503a6.51 6.51 0 0 1 6.505-6.505A6.513 6.513 0 0 1 19.7 8.503a6.47 6.47 0 0 1-1.214 3.78 3.1 3.1 0 0 1 1.011.57 7.6 7.6 0 0 0 1.359-4.35c0-4.224-3.437-7.661-7.661-7.661S5.534 4.279 5.534 8.503c0 3.12 1.875 5.81 4.558 7.004"
              fill="#1e3c70"
            />
          </g>{' '}
        </g>
      </SvgIcon>
    </span>
  );
}

export default GetStartedIcon;
