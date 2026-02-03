import type * as React from 'react';
import { t } from '../i18n';
import { SvgIcon, IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '0 0 24 24',
};

export function AlertCircleMedicareIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--alert-circle-medicare ${props.className || ''}`;

  return (
    <SvgIcon
      title={t('icons.alertCircleMedicare')}
      {...defaultProps}
      {...props}
      className={iconCssClasses}
    >
      <g fillRule="evenodd">
        <path fill="#fff" d="M9 8h6v13H9z" />
        <path d="M23.73 19.334c.769 1.333-.196 3-1.733 3H2.002c-1.539 0-2.5-1.67-1.732-3l9.998-17.335c.77-1.333 2.696-1.33 3.464 0zM12 15.75a1.917 1.917 0 1 0 0 3.833 1.917 1.917 0 0 0 0-3.833m-1.82-6.89.31 5.667a.5.5 0 0 0 .499.473h2.022a.5.5 0 0 0 .5-.473l.309-5.666a.5.5 0 0 0-.5-.528h-2.64a.5.5 0 0 0-.5.528z" />
      </g>
    </SvgIcon>
  );
}
