import React from 'react';
import SvgIcon, { IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  title: 'Remove',
  viewBox: '0 0 24 24',
};

function RemoveIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--remove ${props.className || ''}`;

  return (
    <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
      <path d="M19 13H5v-2h14v2z" />
    </SvgIcon>
  );
}

export default RemoveIcon;
