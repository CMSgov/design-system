import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 24 24',
};

function ManageRepsIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--manage-reps ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.manageReps')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.4 7.95C11.4 10.2712 9.52125 12.15 7.2 12.15C4.87875 12.15 3 10.2712 3 7.95C3 5.62875 4.87875 3.75 7.2 3.75C9.52125 3.75 11.4 5.62875 11.4 7.95ZM9.76875 13.35H10.08C12.465 13.35 14.4 15.285 14.4 17.67V18.75C14.4 19.7438 13.5937 20.55 12.6 20.55H1.8C0.80625 20.55 0 19.7438 0 18.75V17.67C0 15.285 1.935 13.35 4.32 13.35H4.63125C5.415 13.725 6.2775 13.95 7.2 13.95C8.1225 13.95 8.98875 13.725 9.76875 13.35ZM18 12.15C19.9875 12.15 21.6 10.5375 21.6 8.55C21.6 6.5625 19.9875 4.95 18 4.95C16.0125 4.95 14.4 6.5625 14.4 8.55C14.4 10.5375 16.0125 12.15 18 12.15ZM19.6575 13.35H19.8C22.1213 13.35 24 15.2288 24 17.55C24 18.5438 23.1938 19.35 22.2 19.35H15.5775C15.5791 19.3155 15.5837 19.281 15.5882 19.2462C15.5941 19.2015 15.6 19.1564 15.6 19.11V17.67C15.6 16.2225 15.0262 14.9138 14.1112 13.9275C14.73 13.5712 15.435 13.35 16.2 13.35H16.3425C16.8638 13.53 17.415 13.65 18 13.65C18.585 13.65 19.1362 13.53 19.6575 13.35Z"
        fill="#262626"
      />
    </SvgIcon>
  );
}

export default ManageRepsIcon;
