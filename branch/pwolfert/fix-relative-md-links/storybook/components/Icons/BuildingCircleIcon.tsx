import React from 'react';
import { t } from '../i18n';
import SvgIcon, { IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '0 0 54 54',
};

function BuildingCircleIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--building-circle ${props.className || ''}`;

  return (
    <SvgIcon
      title={t('icons.buildingCircle')}
      {...defaultProps}
      {...props}
      className={iconCssClasses}
    >
      <g>
        <path
          className="ds-c-icon--building-circle__building"
          fill="currentColor"
          d="M36.5,20.91v1.36H35.15a0.71,0.71,0,0,1-.73.68H18.23a0.71,0.71,0,0,1-.73-0.68H16.14V20.91l10.18-4.07Zm0,13.57v1.36H16.14V34.48a0.71,0.71,0,0,1,.73-0.68h18.9A0.71,0.71,0,0,1,36.5,34.48ZM21.57,23.62v8.14h1.36V23.62h2.71v8.14H27V23.62h2.71v8.14h1.36V23.62h2.71v8.14h0.63a0.71,0.71,0,0,1,.73.68v0.68H17.5V32.45a0.71,0.71,0,0,1,.73-0.68h0.63V23.62h2.71Z"
        />
        <circle
          className="ds-c-icon--building-circle__circle"
          fill="none"
          cx="50%"
          cy="50%"
          r="47%"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>
    </SvgIcon>
  );
}

export default BuildingCircleIcon;
