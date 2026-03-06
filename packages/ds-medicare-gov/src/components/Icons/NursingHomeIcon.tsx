import type * as React from 'react';
import { SvgIcon } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  title: 'Nursing Home',
  viewBox: '0 0 32 32',
};

function NursingHomeIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--nursing-home ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.918 30.508V11.765l11.416-7.98 11.416 7.98v18.743a1.08 1.08 0 0 1-1.08 1.08H5.998a1.08 1.08 0 0 1-1.08-1.08m10.307-6.8q0 .143-.09.24a.3.3 0 0 1-.233.096H13.44A.47.47 0 0 1 13 23.8l-3.036-4.63v4.55a.3.3 0 0 1-.097.233.34.34 0 0 1-.24.09h-1.64a.3.3 0 0 1-.227-.096.3.3 0 0 1-.096-.227v-8.389q0-.142.09-.239a.3.3 0 0 1 .233-.097h1.46q.297 0 .44.246l3.05 4.821v-4.73q0-.143.09-.24a.3.3 0 0 1 .234-.097h1.642q.142 0 .232.097t.09.24zm1.758-8.376q0-.142.09-.239a.3.3 0 0 1 .232-.097h1.772q.142 0 .239.097a.33.33 0 0 1 .097.24v3.062h3.05v-3.063q0-.142.097-.239a.32.32 0 0 1 .24-.097h1.758q.141 0 .239.097a.33.33 0 0 1 .097.24v8.388a.3.3 0 0 1-.097.233.34.34 0 0 1-.24.09H22.8a.34.34 0 0 1-.239-.09.3.3 0 0 1-.097-.233v-3.167h-3.05v3.167a.3.3 0 0 1-.097.233.34.34 0 0 1-.24.09h-1.77a.3.3 0 0 1-.233-.09.32.32 0 0 1-.09-.233z"
          fill="#1e3c70"
        />
        <mask
          id="a"
          style={{ maskType: 'luminance' }}
          maskUnits="userSpaceOnUse"
          x="1"
          y="0"
          width="31"
          height="13"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M1 .36h30.52v11.835H1z" fill="#fff" />
        </mask>
        <g mask="url(#a)">
          <path
            d="m31.137 10.561-3.51-2.453v-5.71c0-.432-.365-.782-.816-.782h-2.85c-.45 0-.816.35-.816.782v2.576L16.775.521a.9.9 0 0 0-1.029 0L1.383 10.561a.897.897 0 1 0 1.03 1.472L16.26 2.352l13.849 9.68a.896.896 0 0 0 1.25-.22.897.897 0 0 0-.222-1.25"
            fill="#1e3c70"
          />
        </g>
      </SvgIcon>
    </span>
  );
}

export default NursingHomeIcon;
