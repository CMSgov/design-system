import type * as React from 'react';
import { SvgIcon, t } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  viewBox: '0 0 24 24',
};

function PhoneNumberIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--phone-number ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      {/* TODO: Add Spanish translation - ticket CMSDS-4263 */}
      <SvgIcon
        title={t('icons.phoneNumber')}
        {...defaultProps}
        {...props}
        className={iconCssClasses}
      >
        <path d="M23.0835 1.15138L18.218 0.0285761C17.6894 -0.0930614 17.1467 0.182962 16.9315 0.678869L14.6859 5.91864C14.4894 6.37711 14.6204 6.91513 15.0087 7.22858L17.8438 9.54904C16.1596 13.1373 13.2169 16.1221 9.5537 17.8391L7.23324 15.004C6.91511 14.6157 6.38177 14.4847 5.92329 14.6812L0.683528 16.9268C0.182943 17.1467 -0.09308 17.6894 0.0285575 18.2181L1.15136 23.0835C1.26832 23.5888 1.71745 23.9537 2.2461 23.9537C14.2274 23.9537 23.9537 14.2461 23.9537 2.24612C23.9537 1.72214 23.5935 1.26834 23.0835 1.15138Z" />
      </SvgIcon>
    </span>
  );
}

export default PhoneNumberIcon;
