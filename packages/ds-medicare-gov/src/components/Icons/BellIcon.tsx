import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 17 20',
};

function BellIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--bell ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      {/* TODO: Add Spanish translation - ticket CMSDS-4263 */}
      <SvgIcon title={t('icons.bell')} {...defaultProps} {...props} className={iconCssClasses}>
        <path d="M8.4 0C7.73625 0 7.2 0.53625 7.2 1.2V1.32C4.4625 1.875 2.4 4.2975 2.4 7.2V8.01375C2.4 9.8175 1.785 11.5688 0.66 12.9788L0.2925 13.4362C0.10125 13.6725 0 13.965 0 14.2688C0 15.0038 0.59625 15.6 1.33125 15.6H15.465C16.2 15.6 16.7963 15.0038 16.7963 14.2688C16.7963 13.965 16.695 13.6725 16.5037 13.4362L16.1362 12.9788C15.015 11.5688 14.4 9.8175 14.4 8.01375V7.2C14.4 4.2975 12.3375 1.875 9.6 1.32V1.2C9.6 0.53625 9.06375 0 8.4 0ZM6.075 17.4C6.34125 18.435 7.2825 19.2 8.4 19.2C9.5175 19.2 10.4588 18.435 10.725 17.4H6.075Z" />
      </SvgIcon>
    </span>
  );
}

export default BellIcon;
