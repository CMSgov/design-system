import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 32 32',
};

function PasswordShowIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--password-show ${props.className || ''}`;

  return (
    <SvgIcon
      title={t('icons.passwordShow')}
      {...defaultProps}
      {...props}
      className={iconCssClasses}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.8066 14.8556C28.7939 8.97722 22.8294 5 16 5C9.17052 5 3.20441 8.98 0.193303 14.8561C-0.0644343 15.3659 -0.0644343 15.9679 0.193303 16.4778C3.20608 22.3561 9.17052 26.3333 16 26.3333C22.8294 26.3333 28.7955 22.3533 31.8066 16.4772C32.0644 15.9674 32.0644 15.3654 31.8066 14.8556ZM16 9.44444C15.4112 9.45365 14.8267 9.54719 14.2644 9.72222C14.5245 10.1796 14.663 10.6961 14.6666 11.2222C14.6666 12.9404 13.2737 14.3333 11.5555 14.3333C11.0294 14.3297 10.5129 14.1912 10.0555 13.9311C9.31544 16.4978 10.3008 19.2501 12.5017 20.7639C14.7027 22.2777 17.6253 22.2133 19.7575 20.6041C21.8896 18.9948 22.7528 16.2018 21.9004 13.6701C21.048 11.1385 18.6712 9.43638 16 9.44444ZM2.78164 15.6667C5.49497 20.6111 10.5194 23.6667 16 23.6667C21.4811 23.6667 26.5055 20.6111 29.2183 15.6667C26.505 10.7222 21.4811 7.66667 16 7.66667C10.5189 7.66667 5.49497 10.7222 2.78164 15.6667Z"
        fill="#262626"
      />
    </SvgIcon>
  );
}

export default PasswordShowIcon;
