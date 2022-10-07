import { t } from '../i18n';
import SvgIcon, { IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  viewBox: '0 0 16 12',
};

function CheckIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--check ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.check')} {...defaultProps} {...props} className={iconCssClasses}>
      <path d="M16 2.343a.969.969 0 00-.289-.686L14.307.283a1.012 1.012 0 00-1.404 0L6.132 6.919 3.097 3.94a1.012 1.012 0 00-1.404 0L.289 5.313A.969.969 0 000 6c0 .253.103.505.289.687l5.14 5.03a1.012 1.012 0 001.405 0L15.71 3.03A.969.969 0 0016 2.343z" />
    </SvgIcon>
  );
}

export default CheckIcon;
