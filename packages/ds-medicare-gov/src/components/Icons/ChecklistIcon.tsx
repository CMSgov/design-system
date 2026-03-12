import type * as React from 'react';
import { SvgIcon } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  title: 'Checklist',
  viewBox: '0 0 32 32',
};

function ChecklistIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--checklist ${props.className || ''}`;

  return (
    <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.5 0h-21C4.669 0 4 .669 4 1.5v29c0 .831.669 1.5 1.5 1.5h21c.831 0 1.5-.669 1.5-1.5v-29c0-.831-.669-1.5-1.5-1.5M8 7c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1zm.894 7.3-.794.787a.336.336 0 0 0 0 .476l2.306 2.33a.336.336 0 0 0 .475 0l4.013-3.974a.336.336 0 0 0 0-.475l-.788-.794a.336.336 0 0 0-.475 0l-2.975 2.95-1.287-1.3a.336.336 0 0 0-.475 0M12 25c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1h2c.55 0 1 .45 1 1zm11.5 0c.275 0 .5-.225.5-.5v-1c0-.275-.225-.5-.5-.5h-9c-.275 0-.5.225-.5.5v1c0 .275.225.5.5.5zm.5-8.5c0 .275-.269.5-.6.5h-8.762s1.824-1.887 1.9-2h6.856c.331 0 .6.225.6.5v1zM23.5 9c.275 0 .5-.225.5-.5v-1c0-.275-.225-.5-.5-.5h-9c-.275 0-.5.225-.5.5v1c0 .275.225.5.5.5z"
        fill="#262626"
      />
    </SvgIcon>
  );
}

export default ChecklistIcon;
