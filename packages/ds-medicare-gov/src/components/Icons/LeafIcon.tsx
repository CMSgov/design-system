import type * as React from 'react';
import { SvgIcon } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  title: 'Leaf',
  viewBox: '0 0 32 32',
};

function LeafIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--leaf ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
        <path
          d="M30.345 2.594c-.312-.694-1.2-.722-1.573-.066-1.722 2.994-4.805 4.86-8.327 4.86H16c-5.889 0-10.667 4.779-10.667 10.667 0 .39.045.762.084 1.14 3.544-2.54 8.66-4.695 15.916-4.695.49 0 .89.4.89.889s-.4.889-.89.889c-13.966 0-19.889 8.56-21.2 11.778a1.78 1.78 0 0 0 3.294 1.35c.084-.2 1.162-2.662 3.995-5.034 1.8 2.44 5.223 4.767 9.717 4.29C25.86 28.027 32 20.205 32 10.627c0-2.79-.6-5.678-1.655-8.034"
          fill="#000"
        />
      </SvgIcon>
    </span>
  );
}

export default LeafIcon;
