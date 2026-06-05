import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 32 32',
};

function LoginIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--login ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      <SvgIcon title={t('icons.login')} {...defaultProps} {...props} className={iconCssClasses}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.75 28H26a6 6 0 0 0 6-6V10c0-3.312-2.687-6-6-6h-5.25a.75.75 0 0 0-.75.75v1.5c0 .412.337.75.75.75H26a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-5.25a.75.75 0 0 0-.75.75v1.5c0 .413.337.75.75.75M9.219 6.444l1.225-1.225a.756.756 0 0 1 1.062-.006l10.275 10.25a.75.75 0 0 1 0 1.062l-10.275 10.25a.75.75 0 0 1-1.062 0L9.219 25.55a.753.753 0 0 1 .012-1.069l7.069-6.856H.75a.75.75 0 0 1-.75-.75v-1.75c0-.412.338-.75.75-.75H16.3L9.231 7.513a.74.74 0 0 1-.012-1.07"
          fill="#404040"
        />
      </SvgIcon>
    </span>
  );
}

export default LoginIcon;
