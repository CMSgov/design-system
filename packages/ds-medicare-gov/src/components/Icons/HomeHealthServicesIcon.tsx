import type * as React from 'react';
import { SvgIcon } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  title: 'Home Health Services',
  viewBox: '0 0 32 32',
};

function HomeHealthServicesIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--home-health-services ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.756 21.138H10.49c-.57 0-1.144.13-1.66.374l-1.7.81v-12.25a.43.43 0 0 1 .176-.348l8.245-6.01a.43.43 0 0 1 .508 0l8.245 6.01a.43.43 0 0 1 .177.348v8.856l-3.866 2.78-.014-.037a.4.4 0 0 0-.028-.063.94.94 0 0 0-.817-.47M15.81 10.864c-.237-.347-1.398-1.864-3.203-1.27-2.695.888-2.93 5.308 3.157 8.648v.052l.04-.023.005-.003.046.026v-.052c6.087-3.34 5.852-7.76 3.157-8.647-1.805-.595-2.965.922-3.202 1.269"
          fill="#1e3c70"
        />
        <mask
          id="a"
          style={{ maskType: 'luminance' }}
          maskUnits="userSpaceOnUse"
          x="4"
          y="0"
          width="24"
          height="11"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.125.36h23.36v9.654H4.125z"
            fill="#fff"
          />
        </mask>
        <g mask="url(#a)">
          <path
            d="m5.552 9.842 10.253-7.474 10.253 7.474a.896.896 0 0 0 1.254-.197.9.9 0 0 0-.196-1.254L23.67 5.879V1.257a.43.43 0 0 0-.431-.431H20.13a.43.43 0 0 0-.43.43v1.728L16.333.531a.9.9 0 0 0-1.058 0l-10.78 7.86a.897.897 0 1 0 1.057 1.45"
            fill="#1e3c70"
          />
        </g>
        <mask
          id="b"
          style={{ maskType: 'luminance' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="18"
          width="31"
          height="14"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M0 18.16h30.84v13.485H0z" fill="#fff" />
        </mask>
        <g mask="url(#b)">
          <path
            d="m30.532 18.816-.523-.262a3.6 3.6 0 0 0-1.018-.325 3.55 3.55 0 0 0-1.88.133l-2.546 1.832-.084.07v-.01l-4.463 3.21-.006.004c-.916 1.206-2.598 2.1-4.058 2.1h-4.048l-1.1.77a.536.536 0 0 1-.75-.133.54.54 0 0 1 .132-.75l1.24-.868a.54.54 0 0 1 .309-.097h4.217c1.234 0 2.795-.907 3.408-1.981l.167-.294H10.49c-.41 0-.824.093-1.196.27l-5.32 2.53a4.9 4.9 0 0 1-2.095.472h-1.88v6.136h.432l-.053.022h7.368c.772 0 1.54-.11 2.281-.326l9.747-2.844a7.35 7.35 0 0 0 2.82-1.558c2.535-2.248 8.02-7.15 8.02-7.15a.56.56 0 0 0-.082-.95"
            fill="#1e3c70"
          />
        </g>
      </SvgIcon>
    </span>
  );
}

export default HomeHealthServicesIcon;
