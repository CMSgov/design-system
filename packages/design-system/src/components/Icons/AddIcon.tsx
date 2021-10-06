import React from 'react';
import SvgIcon, { SvgIconProps } from './SvgIcon';

function AddIcon(props: SvgIconProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--add ${props.className}`;

  return (
    <SvgIcon {...props} className={iconCssClasses}>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </SvgIcon>
  );
}

AddIcon.defaultProps = {
  className: '',
  title: 'Add',
  viewBox: '0 0 24 24',
};

export default AddIcon;
