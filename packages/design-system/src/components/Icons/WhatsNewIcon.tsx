import type * as React from 'react';
import { t } from '../i18n';
import { SvgIcon, IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '0 0 32 32',
};

export function WhatsNewIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--whats-new ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.whatsNew')} {...defaultProps} {...props} className={iconCssClasses}>
      <path d="M21.6867 6.17392C18.2843 6.17392 15.4743 3.99998 11.1967 3.99998C9.61225 3.99998 8.19295 4.27398 6.87638 4.75079C7.05884 4.28171 7.1365 3.77944 7.10406 3.27817C6.99156 1.50092 5.51149 0.075353 3.704 0.00297798C1.6727 -0.0783971 0 1.51848 0 3.49998C0 4.68911 0.602984 5.73904 1.52381 6.37154V30.5C1.52381 31.3284 2.20603 32 3.04762 32H4.06349C4.90508 32 5.5873 31.3284 5.5873 30.5V24.6C7.38483 23.846 9.62425 23.2174 12.853 23.2174C16.2554 23.2174 19.0653 25.3913 23.343 25.3913C26.4013 25.3913 28.8456 24.3729 31.1211 22.8377C31.6724 22.4657 32 21.8482 32 21.1903V5.99654C32 4.53448 30.4591 3.56717 29.1121 4.18304C26.9319 5.17979 24.2578 6.17392 21.6867 6.17392Z" />
    </SvgIcon>
  );
}
