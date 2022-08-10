import React from 'react';
import { t } from '../i18n';
import SvgIcon, { IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '0 0 10 14',
};

function ArrowsStacked(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--arrows-stacked ${props.className || ''}`;

  return (
    <SvgIcon
      title={t('icons.arrowsStacked')}
      {...defaultProps}
      {...props}
      className={iconCssClasses}
    >
      <path
        d="M.626 6h8.747a.624.624 0 00.443-1.067L5.44.183a.614.614 0 00-.875 0L.184 4.934a.614.614 0 000 .876.604.604 0 00.442.19zm8.747 2H.626a.604.604 0 00-.442.181.614.614 0 000 .876l4.38 4.76a.614.614 0 00.876 0l4.376-4.75A.624.624 0 009.373 8z"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
}

export default ArrowsStacked;
