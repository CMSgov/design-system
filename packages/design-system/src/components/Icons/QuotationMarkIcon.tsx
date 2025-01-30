import type * as React from 'react';
import { t } from '../i18n';
import { SvgIcon, IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '2 0 40 32',
};

export function QuotationMarkIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--left-quote ${props.className || ''}`;

  return (
    <SvgIcon
      title={t('icons.quotationMark')}
      {...defaultProps}
      {...props}
      className={iconCssClasses}
    >
      <path d="M3 12.5C3 6.69875 7.67478 2 13.4464 2H14.1429C15.6837 2 16.9286 3.25125 16.9286 4.8C16.9286 6.34875 15.6837 7.6 14.1429 7.6H13.4464C10.7565 7.6 8.57143 9.79625 8.57143 12.5V13.2H14.1429C17.2158 13.2 19.7143 15.7113 19.7143 18.8V24.4C19.7143 27.4887 17.2158 30 14.1429 30H8.57143C5.49844 30 3 27.4887 3 24.4V12.5ZM25.2857 12.5C25.2857 6.69875 29.9605 2 35.7321 2H36.4286C37.9694 2 39.2143 3.25125 39.2143 4.8C39.2143 6.34875 37.9694 7.6 36.4286 7.6H35.7321C33.0422 7.6 30.8571 9.79625 30.8571 12.5V13.2H36.4286C39.5016 13.2 42 15.7113 42 18.8V24.4C42 27.4887 39.5016 30 36.4286 30H30.8571C27.7842 30 25.2857 27.4887 25.2857 24.4V12.5Z" />
    </SvgIcon>
  );
}
