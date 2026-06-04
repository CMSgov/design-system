import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 32 32',
};

function ShareIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--share ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      <SvgIcon title={t('icons.share')} {...defaultProps} {...props} className={iconCssClasses}>
        <path
          d="M24 20a5.97 5.97 0 0 0-3.737 1.306l-6.405-4.003c.19-.858.19-1.748 0-2.606l6.405-4.003a6 6 0 1 0-2.12-3.391l-6.406 4.003a6 6 0 1 0 0 9.388l6.405 4.003A6 6 0 1 0 24 20"
          fill="#262626"
        />
      </SvgIcon>
    </span>
  );
}

export default ShareIcon;
