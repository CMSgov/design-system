import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 24 24',
};

function ChatIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--chat ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.chat')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.3333 3.9987V10.6654C17.3333 12.1362 16.1375 13.332 14.6667 13.3279H6.7625L3.3125 15.9154C3.04583 16.1154 2.66667 15.9237 2.66667 15.5904V13.332C1.19583 13.332 0 12.1362 0 10.6654V3.9987C0 2.52786 1.19583 1.33203 2.66667 1.33203H14.6667C16.1375 1.33203 17.3333 2.52786 17.3333 3.9987ZM18.6667 7.99873H21.3333C22.8042 7.99873 24 9.19457 24 10.6654V17.3321C24 18.8029 22.8042 19.9987 21.3333 19.9987H20V22.2612C20 22.5946 19.6208 22.7862 19.3542 22.5862L15.9042 19.9987H10.6667C9.19582 19.9987 7.99999 18.8029 7.99999 17.3321V14.6654H14.6667C16.8708 14.6654 18.6667 12.8696 18.6667 10.6654V7.99873Z"
        fill="#262626"
      />
    </SvgIcon>
  );
}

export default ChatIcon;
