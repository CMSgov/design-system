import type * as React from 'react';
import { SvgIcon } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  title: 'Wheelchair',
  viewBox: '0 0 33 32',
};

function AboutIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--about ${props.className || ''}`;

  return (
    <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
      <g fill="none" fillRule="evenodd">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31.2 20.783h-2.4V7.197A3.2 3.2 0 0 0 25.6 4H6.4a3.2 3.2 0 0 0-3.2 3.197v13.586H.8a.8.8 0 0 0-.8.799v2.397a4 4 0 0 0 4 3.996h24c2.206 0 4-1.792 4-3.996v-2.397a.8.8 0 0 0-.8-.8M4.8 7.197a1.6 1.6 0 0 1 1.6-1.599h19.2a1.6 1.6 0 0 1 1.6 1.599v13.586h-7.643c-.203 0-.351.156-.396.354A1.6 1.6 0 0 1 17.6 22.38h-3.2a1.6 1.6 0 0 1-1.56-1.244c-.046-.198-.194-.354-.396-.354H4.8zm25.6 16.782a2.4 2.4 0 0 1-2.4 2.398H4a2.4 2.4 0 0 1-2.4-2.398v-1.598h9.738a2.4 2.4 0 0 0 2.262 1.598h4.8a2.4 2.4 0 0 0 2.263-1.598H30.4z"
          fill="#262626"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.882 8.74a4.979 4.979 0 1 0 .001 9.958 4.979 4.979 0 0 0-.001-9.957m0 8.993a4.01 4.01 0 0 1-4.015-4.014 4.013 4.013 0 0 1 4.015-4.015 4.013 4.013 0 0 1 4.014 4.015 4.01 4.01 0 0 1-4.014 4.014m0-6.784a.843.843 0 1 1 0 1.686.843.843 0 0 1 0-1.686m1.124 5.098a.24.24 0 0 1-.241.24h-1.767a.24.24 0 0 1-.24-.24v-.482a.24.24 0 0 1 .24-.24h.241V14.04H15a.24.24 0 0 1-.242-.241v-.482a.24.24 0 0 1 .241-.24h1.285a.24.24 0 0 1 .24.24v2.007h.242a.24.24 0 0 1 .24.241z"
          fill="#262626"
        />
      </g>
    </SvgIcon>
  );
}

export default AboutIcon;
