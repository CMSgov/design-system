import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 24 21',
};

function FindCareIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--find-care ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      {/* TODO: Add Spanish translation - ticket CMSDS-4263 */}
      <SvgIcon title={t('icons.findCare')} {...defaultProps} {...props} className={iconCssClasses}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.5 0.75C19.5 0.335625 19.1644 0 18.75 0H15.75C15.3356 0 15 0.335625 15 0.75V3H19.5V0.75ZM2.99578 5.99953C2.94171 8.02118 2.33893 9.31553 1.68743 10.7145C0.921234 12.3597 0.0876548 14.1497 0 17.4375V19.5C0 20.3283 0.671719 21 1.5 21H6C6.82828 21 7.5 20.3283 7.5 19.5V12H9V4.5H4.4925C3.66609 4.5 3.01828 5.17359 2.99578 5.99953ZM19.5075 4.5C20.3339 4.5 20.9817 5.17359 21.0042 5.99953C21.0583 8.02118 21.6611 9.31553 22.3126 10.7145C23.0788 12.3597 23.9123 14.1497 24 17.4375V19.5C24 20.3283 23.3283 21 22.5 21H18C17.1717 21 16.5 20.3283 16.5 19.5V12H15V4.5H19.5075ZM8.25 0H5.25C4.83563 0 4.5 0.335625 4.5 0.75V3H9V0.75C9 0.335625 8.66438 0 8.25 0ZM13.5 12H10.5V4.5H13.5V12Z"
        />
      </SvgIcon>
    </span>
  );
}

export default FindCareIcon;
