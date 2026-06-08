import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 32 32',
};

function LogoutIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--logout ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      <SvgIcon title={t('icons.logout')} {...defaultProps} {...props} className={iconCssClasses}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.25 4H6a6 6 0 0 0-6 6v12a6 6 0 0 0 6 5.999h5.25c.412 0 .75-.338.75-.75v-1.5a.75.75 0 0 0-.75-.75H6a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h5.25c.412 0 .75-.337.75-.75v-1.5a.75.75 0 0 0-.75-.75m7.968 2.444 1.225-1.225a.756.756 0 0 1 1.062-.007l10.275 10.25a.75.75 0 0 1 0 1.062l-10.275 10.25a.75.75 0 0 1-1.062 0l-1.225-1.225a.753.753 0 0 1 .012-1.069l7.069-6.856h-15.55a.75.75 0 0 1-.75-.75v-1.75c0-.412.338-.75.75-.75H26.3l-7.07-6.862a.74.74 0 0 1-.012-1.068"
          fill="#404040"
        />
      </SvgIcon>
    </span>
  );
}

export default LogoutIcon;
