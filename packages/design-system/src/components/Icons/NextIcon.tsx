import React from 'react';
import SvgIcon, { IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  title: 'Next',
  viewBox: '0 0 16 13',
};

function NextIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--next ${props.className || ''}`;

  return (
    <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
      <path
        d="M16 6.667l-6.678 6.666H4.906L9.99 8H0V5.333h9.954L4.897 0h4.436z"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
}

export default NextIcon;
