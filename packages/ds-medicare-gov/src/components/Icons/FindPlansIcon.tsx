import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 21 24',
};

function FindPlansIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--find-plans ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      {/* TODO: Add Spanish translation - ticket CMSDS-XXXX */}
      <SvgIcon title={t('icons.findPlans')} {...defaultProps} {...props} className={iconCssClasses}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.2381 6V7.5H20.6667V20.25C20.6667 22.3211 19.0144 24 16.9762 24H3.69048C1.65227 24 0 22.3211 0 20.25V7.5H4.42857V6C4.42857 2.69156 7.07741 0 10.3333 0C13.5892 0 16.2381 2.69156 16.2381 6ZM10.3333 3C8.70537 3 7.38095 4.34578 7.38095 6V7.5H13.2857V6C13.2857 4.34578 11.9613 3 10.3333 3ZM14.7619 11.625C14.1504 11.625 13.6548 11.1213 13.6548 10.5C13.6548 9.87867 14.1504 9.375 14.7619 9.375C15.3734 9.375 15.869 9.87867 15.869 10.5C15.869 11.1213 15.3734 11.625 14.7619 11.625ZM4.79762 10.5C4.79762 11.1213 5.2933 11.625 5.90476 11.625C6.51623 11.625 7.0119 11.1213 7.0119 10.5C7.0119 9.87867 6.51623 9.375 5.90476 9.375C5.2933 9.375 4.79762 9.87867 4.79762 10.5Z"
        />
      </SvgIcon>
    </span>
  );
}

export default FindPlansIcon;
