import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 32 32',
};

function HospitalIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--hospital ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      <SvgIcon title={t('icons.hospital')} {...defaultProps} {...props} className={iconCssClasses}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31.5733 1.60562C31.5733 0.718871 30.8552 0 29.9693 0H1.60408C0.718101 0 0 0.718871 0 1.60562V29.9677C0 30.8545 0.718101 31.5733 1.60408 31.5733H29.9693C30.8552 31.5733 31.5733 30.8545 31.5733 29.9677V1.60562ZM7.31577 6.16065H12.3525V13.0914H19.2208V6.16065H24.2576V25.4127H19.2208V17.7119H12.3525V25.4127H7.31577V6.16065Z"
          fill="#1E3C70"
        />
      </SvgIcon>
    </span>
  );
}

export default HospitalIcon;
