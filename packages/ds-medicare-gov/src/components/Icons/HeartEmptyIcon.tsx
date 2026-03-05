import type * as React from 'react';
import { SvgIcon } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  title: 'Empty Heart',
  viewBox: '0 0 32 32',
};

function HeartEmptyIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--heart-empty ${props.className || ''}`;

  return (
    <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
      <g fill="none" fillRule="evenodd">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 5.019c3.456-3.519 9.038-3.975 12.65-.938 4.706 3.963 4.006 10.413.663 13.832L18.35 29.08a3.26 3.26 0 0 1-2.35.988 3.28 3.28 0 0 1-2.35-.994L2.688 17.906c-3.35-3.418-4.038-9.868.662-13.825C6.963 1.037 12.544 1.5 16 5.02m.212 21.95L27.176 15.8c2.262-2.306 2.738-6.731-.456-9.425-2.419-2.037-6.169-1.744-8.532.662L16 9.27l-2.187-2.232c-2.35-2.393-6.1-2.7-8.532-.656-3.2 2.694-2.737 7.094-.456 9.419L15.787 26.97c.15.15.275.15.425 0"
          fill="#262626"
        />
      </g>
    </SvgIcon>
  );
}

export default HeartEmptyIcon;
