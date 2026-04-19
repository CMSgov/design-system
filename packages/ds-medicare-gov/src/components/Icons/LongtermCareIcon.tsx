import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 32 32',
};

function LongtermCareIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--longterm-care ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      <SvgIcon
        title={t('icons.longtermCare')}
        {...defaultProps}
        {...props}
        className={iconCssClasses}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.413 23.698H7.54v5.386H2.154V0H19.75v29.084h-5.386v-5.386H11.49v5.386h-1.077zm7.181-11.49H15.8v2.514h1.795zM15.8 17.235h1.795v2.514H15.8zm-3.59 2.514h1.795v-2.514h-1.796zm1.795-5.027h-1.796v-2.514h1.796zm-3.95-10.054H8.259v2.154h1.795v1.796h2.154V6.822h1.796V4.668h-1.796V2.873h-2.154zm-1.795 7.54h1.795v2.514H8.259zm1.795 5.027H8.259v2.514h1.795zm-3.95 2.514H4.31v-2.514h1.795zM4.31 14.722h1.795v-2.514H4.31zm25.492 14.362V7.181h-8.976v21.903zm-3.59-18.671h1.795v2.513h-1.795zm1.795 5.027h-1.795v2.513h1.795zm-1.795 5.027h1.795v2.513h-1.795zm-1.796-10.054h-1.795v2.513h1.795zm-1.795 5.027h1.795v2.513h-1.795zm0 5.027v2.513h1.795v-2.513z"
          fill="#1e3c70"
        />
        <path
          d="M30.72 29.802H.878A.886.886 0 0 0 0 30.68c0 .479.399.878.878.878H30.72a.885.885 0 0 0 .878-.878.885.885 0 0 0-.878-.878"
          fill="#1e3c70"
        />
      </SvgIcon>
    </span>
  );
}

export default LongtermCareIcon;
