import { t } from '../i18n';
import SvgIcon, { IconCommonProps } from './SvgIcon';
import classNames from 'classnames';

const defaultProps = {
  className: '',
  viewBox: '0 0 20 20',
};

function MinusCircleIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = classNames('ds-c-icon--minus-circle', props.className);

  return (
    <SvgIcon title={t('icons.remove')} {...defaultProps} {...props} className={iconCssClasses}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-47.000000, -360.000000)">
          <g transform="translate(49.000000, 362.000000)">
            <circle
              className="ds-c-icon--minus-circle__circle"
              stroke="currentColor"
              strokeWidth="2"
              fill="#FFFFFF"
              cx="8"
              cy="8"
              r="9"
            ></circle>
            <g
              className="ds-c-icon--minus-circle__group"
              transform="translate(2.823529, 7.223529)"
              fill="currentColor"
            >
              <path
                d="M5.17647059,-4.4 C5.60530345,-4.4 5.95294118,-4.05236228 5.95294118,-3.62352941 L5.95294118,5.17647059 C5.95294118,5.60530345 5.60530345,5.95294118 5.17647059,5.95294118 C4.74763772,5.95294118 4.4,5.60530345 4.4,5.17647059 L4.4,0.132872909 L4.4,-3.62352941 C4.4,-4.05236228 4.74763772,-4.4 5.17647059,-4.4 Z"
                transform="translate(5.176471, 0.776471) rotate(-270.000000) translate(-5.176471, -0.776471) "
              ></path>
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  );
}

export default MinusCircleIcon;
