import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 24 24',
};

function LowPerformingPlanIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--low-performing-plan ${props.className || ''}`;

  return (
    <SvgIcon
      title={t('icons.lowPerformingPlan')}
      {...defaultProps}
      {...props}
      className={iconCssClasses}
    >
      <path
        d="M22.6382 6.4873C23.7685 6.48762 24.3512 7.83893 23.5757 8.66113L12.7827 20.0947C12.27 20.6376 11.4045 20.6327 10.8979 20.084L0.344225 8.65137C-0.418073 7.82554 0.168592 6.4873 1.29247 6.4873H9.6284V9.06543H4.2368L11.8559 17.3203L19.6479 9.06543H13.9536V6.4873H22.6382Z"
        fill="#ED1C24"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.019 8.45257C11.232 9.52095 11.4448 10.5881 11.6247 11.6668L11.98 11.6637C12.1596 10.7218 12.3345 9.77605 12.5094 8.83046C12.6866 7.87223 12.8638 6.91418 13.0458 5.96053C13.1118 5.59114 13.1419 5.21624 13.1358 4.84105C13.1358 3.92053 12.8468 3 11.7826 3C10.8258 3 10.4295 3.90632 10.4295 4.73684C10.4234 5.1115 10.4535 5.48588 10.5195 5.85474C10.6747 6.72599 10.8469 7.58968 11.019 8.45257ZM10.3616 14.0889C10.3783 14.8667 11.0048 15.4933 11.7826 15.51C12.5683 15.5034 13.2071 14.8745 13.2258 14.0889C13.1981 13.3037 12.5679 12.6735 11.7826 12.6458C11.0026 12.6772 10.3809 13.3086 10.3616 14.0889Z"
        fill="#262626"
      />
    </SvgIcon>
  );
}

export default LowPerformingPlanIcon;
