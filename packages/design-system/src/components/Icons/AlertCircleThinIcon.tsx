import type * as React from 'react';
import { t } from '../i18n';
import { SvgIcon, IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '0 0 24 24',
};

export function AlertCircleThinIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--alert-circle-medicare ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.alertCircle')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        fill="#currentcolor"
        fillRule="evenodd"
        d="M12 1c6.075 0 11 4.927 11 11 0 6.076-4.925 11-11 11S1 18.076 1 12C1 5.927 5.925 1 12 1m0 13a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 14m1.45-8h-2.9l-.093.007a.53.53 0 0 0-.456.547l.34 5.95.013.09a.544.544 0 0 0 .535.406h2.222l.095-.008a.53.53 0 0 0 .454-.488l.34-5.95-.004-.089A.54.54 0 0 0 13.451 6z"
      />
    </SvgIcon>
  );
}
