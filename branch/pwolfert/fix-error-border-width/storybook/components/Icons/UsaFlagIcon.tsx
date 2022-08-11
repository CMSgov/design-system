import React from 'react';
import { t } from '../i18n';
import SvgIcon, { IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '0 0 16 11',
};

function UsaFlagIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--usa-flag ${props.className || ''}`;

  return (
    <SvgIcon
      title={t('usaBanner.flagIconTitle')}
      {...defaultProps}
      {...props}
      className={iconCssClasses}
    >
      <g fill="none" fillRule="evenodd">
        <path fill="#FFF" d="M0 0h16v11H0z" />
        <path fill="#DB3E1F" d="M8 0h8v1H8z" />
        <path fill="#1E33B1" d="M0 0h8v7H0z" />
        <path fill="#DB3E1F" d="M8 2h8v1H8zM8 4h8v1H8zM8 6h8v1H8zM0 8h16v1H0zM0 10h16v1H0z" />
        <path
          fill="#FFF"
          d="M1 1h1v1H1zM2 3h1v1H2zM1 5h1v1H1zM3 1h1v1H3zM4 3h1v1H4zM3 5h1v1H3zM5 1h1v1H5zM6 3h1v1H6zM5 5h1v1H5z"
        />
      </g>
    </SvgIcon>
  );
}

export default UsaFlagIcon;
