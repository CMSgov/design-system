import React from 'react';
import SvgIcon, { SvgIconProps } from './SvgIcon';

function NextIcon(props: SvgIconProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--next ${props.className}`;

  return (
    <SvgIcon {...props} className={iconCssClasses}>
      <path
        d="M16 6.667l-6.678 6.666H4.906L9.99 8H0V5.333h9.954L4.897 0h4.436z"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
}

NextIcon.defaultProps = {
  className: '',
  title: 'Next',
};

export default NextIcon;
