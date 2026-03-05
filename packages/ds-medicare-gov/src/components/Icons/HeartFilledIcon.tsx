import type * as React from 'react';
import { SvgIcon } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  title: 'Filled Heart',
  viewBox: '0 0 32 32',
};

function HeartFilledIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--heart-filled ${props.className || ''}`;

  return (
    <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M28.9 3.971c-3.418-2.913-8.502-2.389-11.64.848l-1.229 1.267-1.229-1.267c-3.131-3.237-8.221-3.76-11.64-.848C-.754 7.315-.96 13.315 2.546 16.94l12.07 12.463c.78.804 2.046.804 2.826 0l12.07-12.463c3.512-3.625 3.306-9.625-.611-12.969"
          fill="#262626"
        />
      </g>
    </SvgIcon>
  );
}

export default HeartFilledIcon;
