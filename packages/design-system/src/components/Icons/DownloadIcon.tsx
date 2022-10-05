import { t } from '../i18n';
import SvgIcon, { IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '0 0 15 19',
};

function DownloadIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--download ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.download')} {...defaultProps} {...props} className={iconCssClasses}>
      <path
        d="M1.6 17.657V16h12.8v3.2H1.6v-1.543zM0 5.337l1.09-1.09L2.178 3.2l2.084 2.043L6.4 7.2V0h3.2V7.2l1.892-1.973C12.624 4.095 13.589 3.2 13.6 3.2c.011 0 .48.457 1.076 1.053l1.084 1.084-3.93 3.93a532.294 532.294 0 01-3.95 3.929c-.011 0-1.79-1.768-3.95-3.93L0 5.336z"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
}

export default DownloadIcon;
