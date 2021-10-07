import React from 'react';
import SvgIcon, { SvgIconProps } from './SvgIcon';
import classNames from 'classnames';

export type ArrowIconDirectionType = 'up' | 'down' | 'left' | 'right';

export interface ArrowIconProps extends SvgIconProps {
  direction?: ArrowIconDirectionType;
}

// TODO: standardize size with other icons
function ArrowIcon(props: ArrowIconProps): React.ReactElement {
  const iconCssClasses = classNames(
    'ds-c-icon--arrow',
    `ds-c-icon--arrow-${props.direction}`,
    props.className
  );

  return (
    <SvgIcon title={`${props.direction} arrow`} {...props} className={iconCssClasses}>
      <path d="M14.502 20.77L25.37 9.894c.42-.404.631-.9.631-1.503a1.99 1.99 0 00-.631-1.502L24.118 5.62c-.41-.41-.912-.62-1.502-.62-.58 0-1.088.205-1.52.62L13 13.727 4.893 5.62C4.483 5.21 3.98 5 3.39 5c-.578 0-1.087.205-1.52.62L.62 6.888C.21 7.298 0 7.8 0 8.39s.205 1.093.62 1.503L11.48 20.77c.433.409.941.62 1.52.62.59 0 1.093-.205 1.502-.62z" />
    </SvgIcon>
  );
}

ArrowIcon.defaultProps = {
  className: '',
  direction: 'up',
  viewBox: '0 0 26 26',
};

export default ArrowIcon;
