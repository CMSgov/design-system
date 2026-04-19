import type * as React from 'react';
import { SvgIcon } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  title: 'Dialysis Services',
  viewBox: '0 0 32 32',
};

function DialysisServicesIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--dialysis-services ${props.className || ''}`;

  return (
    <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
      <mask
        id="a"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="17"
        y="1"
        width="15"
        height="31"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.187 1.374h14.647V31.49H17.187z"
          fill="#fff"
        />
      </mask>
      <g mask="url(#a)">
        <path
          d="M21.832 1.395c-2.849-.25-4.46 1.763-4.615 3.542-.376 4.293 2.88 4.859 4.095 6.51-2.296.559-4.021 2.85-4.021 5.585v13.525a.934.934 0 1 0 1.868 0V17.032c0-1.695.927-3.135 2.209-3.647a.56.56 0 0 1 .52-.353h1.091a1.017 1.017 0 0 0 0-2.032h-.262a.56.56 0 0 1 0-1.12h.262c1.179 0 2.137.958 2.137 2.136a2.14 2.14 0 0 1-2.137 2.137h-1.091q-.013 0-.025-.003c-.15 1.188-.637 2.378-.752 3.686-.249 2.849 1.345 5.141 4.193 5.39 2.849.25 5.884-1.638 6.476-8.403.623-7.121-4.25-12.93-9.948-13.428"
          fill="#1e3c70"
        />
      </g>
      <path
        d="M14.618 4.938c-.156-1.78-1.767-3.792-4.616-3.543C4.305 1.893-.568 7.7.054 14.823c.592 6.765 3.627 8.652 6.476 8.403 2.849-.25 4.442-2.541 4.193-5.39-.115-1.308-.601-2.498-.753-3.686l-.024.003H8.855a2.14 2.14 0 0 1-2.137-2.137A2.14 2.14 0 0 1 8.855 9.88h.262a.56.56 0 1 1 0 1.12h-.262a1.017 1.017 0 0 0 0 2.032h1.091a.56.56 0 0 1 .52.353c1.282.512 2.21 1.952 2.21 3.647v13.525a.934.934 0 1 0 1.868 0V17.032c0-2.735-1.726-5.026-4.022-5.584 1.216-1.652 4.47-2.218 4.095-6.51"
        fill="#1e3c70"
      />{' '}
    </SvgIcon>
  );
}

export default DialysisServicesIcon;
