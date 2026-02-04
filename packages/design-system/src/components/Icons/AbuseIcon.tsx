import type * as React from 'react';
import { t } from '../i18n';
import { SvgIcon, IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '0 0 24 24',
};

export function AbuseIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--abuse ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.abuse')} {...defaultProps} {...props} className={iconCssClasses}>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#000"
          d="M20 10c0 5.524-4.478 10-10 10S0 15.524 0 10C0 4.48 4.478 0 10 0s10 4.48 10 10"
        />
        <path
          fill="#fff"
          d="M14.226 6.067a.78.78 0 0 0-.774.781v1.758a.195.195 0 0 1-.193.195h-.387a.195.195 0 0 1-.194-.195v-3.71a.78.78 0 0 0-.773-.782.78.78 0 0 0-.774.782v3.71a.195.195 0 0 1-.194.195h-.387a.195.195 0 0 1-.193-.195V4.114a.78.78 0 0 0-.774-.78.78.78 0 0 0-.774.78v4.492a.195.195 0 0 1-.193.195h-.387a.195.195 0 0 1-.194-.195v-3.71a.78.78 0 0 0-.774-.782.78.78 0 0 0-.773.782v5.882l-.571-.793a.96.96 0 0 0-1.352-.215.98.98 0 0 0-.213 1.365L7.39 15.35c.217.303.568.483.938.483h4.778c.54 0 1.006-.373 1.13-.903l.64-2.75c.078-.335.12-.692.124-1.033V6.848a.78.78 0 0 0-.774-.78z"
        />
      </g>
    </SvgIcon>
  );
}
