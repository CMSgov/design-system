import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 32 32',
};

function CostsCircleIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--costs-circle ${props.className || ''}`;

  return (
    <SvgIcon title={t('icons.costs')} {...defaultProps} {...props} className={iconCssClasses}>
      <g fill="none" fillRule="evenodd">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31.797 15.967c0-8.76-7.1-15.86-15.859-15.86h-.025c-8.759 0-15.86 7.1-15.86 15.86s7.101 15.859 15.86 15.859h.025c8.759 0 15.86-7.1 15.86-15.86M15.402 4.992h1.451c.4 0 .726.313.726.696v2.088A6.6 6.6 0 0 1 21.5 9.081c.358.265.403.766.081 1.066l-1.577 1.479a.73.73 0 0 1-.885.087 2.85 2.85 0 0 0-1.55-.457h-3.007c-.739 0-1.337.574-1.337 1.283 0 .566.394 1.075.961 1.231l4.897 1.375c2.625.735 4.262 3.484 3.288 6.164-.699 1.918-2.68 3.123-4.793 3.162v2.097c0 .383-.327.696-.726.696h-1.45c-.4 0-.726-.313-.726-.696V24.48a6.6 6.6 0 0 1-3.922-1.305c-.359-.265-.404-.766-.082-1.066l1.578-1.479a.73.73 0 0 1 .884-.087c.454.296.998.457 1.55.457h3.007c.74 0 1.338-.574 1.338-1.283 0-.566-.395-1.07-.962-1.231l-4.647-1.305c-2.013-.566-3.61-2.197-3.8-4.202-.267-2.824 2.054-5.203 4.942-5.203h.114V5.688c0-.383.326-.696.725-.696"
          fill="#262626"
        />
      </g>
    </SvgIcon>
  );
}

export default CostsCircleIcon;
