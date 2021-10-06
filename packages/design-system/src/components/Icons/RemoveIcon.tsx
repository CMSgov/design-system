import React from 'react';
import SvgIcon, { SvgIconProps } from './SvgIcon';

function RemoveIcon(props: SvgIconProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--remove ${props.className}`;

  return (
    <SvgIcon {...props} className={iconCssClasses}>
      <path d="M19 13H5v-2h14v2z" />
    </SvgIcon>
  );
}

RemoveIcon.defaultProps = {
  className: '',
  title: 'Remove',
};

export default RemoveIcon;
