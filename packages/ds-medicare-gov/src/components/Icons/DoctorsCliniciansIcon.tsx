import type * as React from 'react';
import { SvgIcon } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  title: 'Doctors and Clinicians',
  viewBox: '0 0 32 32',
};

function DoctorsCliniciansIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--doctors-clinicians ${props.className || ''}`;

  return (
    <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M7.781 25.671c0 .884.718 1.603 1.6 1.603a1.603 1.603 0 0 0 0-3.205c-.882 0-1.6.719-1.6 1.602"
          fill="#1e3c70"
        />
        <mask
          id="a"
          style={{ maskType: 'luminance' }}
          maskUnits="userSpaceOnUse"
          x="3"
          y="18"
          width="26"
          height="14"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M3 18.195h25.802v13.721H3z" fill="#fff" />
        </mask>
        <g mask="url(#a)">
          <path
            d="M22.596 18.288v4.723a3.555 3.555 0 0 1 3.088 3.52v1.037a.546.546 0 0 1-.546.545h-.823a.546.546 0 1 1 0-1.09h.278v-.492a2.46 2.46 0 0 0-2.458-2.462 2.463 2.463 0 0 0-2.457 2.462v.491h.382a.546.546 0 0 1 0 1.091h-.824q-.025-.001-.051-.005-.026.004-.052.005a.546.546 0 0 1-.546-.545V26.53a3.555 3.555 0 0 1 2.917-3.494v-4.839l-.074-.003h-1.06l-4.469 4.712-4.469-4.712h-1.06c-.13 0-.256.012-.384.018q.023.073.024.154v4.688a2.7 2.7 0 0 1 2.06 2.616 2.695 2.695 0 0 1-2.691 2.694A2.695 2.695 0 0 1 6.69 25.67c0-1.328.966-2.432 2.23-2.651v-4.653l.005-.04C5.547 18.95 3 21.708 3 25.043v5.782c0 .603.49 1.092 1.092 1.092H27.71c.603 0 1.093-.489 1.093-1.092v-5.782c0-3.427-2.691-6.236-6.207-6.754"
            fill="#1e3c70"
          />
        </g>
        <path
          d="M9.648 11.32c.648 3.441 3.189 6.012 6.231 6.012 3.043 0 5.585-2.572 6.231-6.013l.033.003a1.713 1.713 0 0 0 .549-3.34 7 7 0 0 0 .092-1.077 6.905 6.905 0 1 0-13.81 0c0 .372.038.734.094 1.09a1.715 1.715 0 0 0 .58 3.326"
          fill="#1e3c70"
        />
      </g>
    </SvgIcon>
  );
}

export default DoctorsCliniciansIcon;
