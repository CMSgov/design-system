import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 32 30',
};

function SortIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--sort ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.sort')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.00005 21.5H11C11.8888 21.5 12.3344 22.5788 11.7082 23.2069L6.70817 29.2069C6.3177 29.5971 5.68489 29.5971 5.29442 29.2069L0.294423 23.2069C-0.335577 22.5775 0.113173 21.5 1.00005 21.5H4.00005V2.5C4.00005 1.94772 4.44776 1.5 5.00005 1.5H7.00005C7.55233 1.5 8.00005 1.94772 8.00005 2.5V21.5ZM15 5.5H19C19.5523 5.5 20 5.05228 20 4.5V2.5C20 1.94772 19.5523 1.5 19 1.5H15C14.4478 1.5 14 1.94772 14 2.5V4.5C14 5.05228 14.4478 5.5 15 5.5ZM23 13.5C23.5523 13.5 24 13.0523 24 12.5V10.5C24 9.94771 23.5523 9.5 23 9.5H15C14.4478 9.5 14 9.94771 14 10.5V12.5C14 13.0523 14.4478 13.5 15 13.5H23ZM14 26.5C14 25.9477 14.4478 25.5 15 25.5H31C31.5523 25.5 32 25.9477 32 26.5V28.5C32 29.0523 31.5523 29.5 31 29.5H15C14.4478 29.5 14 29.0523 14 28.5V26.5ZM15 21.5H27C27.5523 21.5 28 21.0523 28 20.5V18.5C28 17.9477 27.5523 17.5 27 17.5H15C14.4478 17.5 14 17.9477 14 18.5V20.5C14 21.0523 14.4478 21.5 15 21.5Z"
        fill="#262626"
      />
    </SvgIcon>
  );
}

export default SortIcon;
