import React from 'react';
import { SvgIcon } from '@cmsgov/design-system';
import { CheckStatus } from './MaturityChecklistItem';

interface StatusProps {
  status: CheckStatus;
}

/**
 * SVG for Email logo
 */
const Status = ({ status }: StatusProps) => {
  if (status === true) {
    return (
      <>
        <SvgIcon ariaHidden title="" viewBox="0 0 24 24">
          <path
            fillRule="nonzero"
            d="m11.428 15.928c-0.51094 0.51094-1.3453 0.51094-1.8562 0l-3-3c-0.51094-0.51094-0.51094-1.3453 0-1.8562s1.3453-0.51094 1.8562 0l2.0719 2.0719 5.0719-5.0719c0.51094-0.51094 1.3453-0.51094 1.8562 0s0.51094 1.3453 0 1.8562l-6 6zm12.572-3.9281c0 6.6281-5.3719 12-12 12s-12-5.3719-12-12 5.3719-12 12-12 12 5.3719 12 12zm-12-9.75c-5.3859 0-9.75 4.3641-9.75 9.75s4.3641 9.75 9.75 9.75 9.75-4.3641 9.75-9.75-4.3641-9.75-9.75-9.75z"
          />
        </SvgIcon>
        <span className="ds-text-body--sm ds-u-margin-left--1">Complete</span>
      </>
    );
  } else if (status === null) {
    return (
      <>
        <SvgIcon ariaHidden title="" viewBox="0 0 24 24">
          <g strokeWidth=".5">
            <polygon
              id="a"
              points="1.8504 11.086 1.7787 11.086 1.8648 12.271 1.8648 17 0 17 0 7 1.7213 7 5.1926 13.114 5.2643 13.114 5.1352 11.914 5.1352 7 7 7 7 17 5.2787 17"
            />
            <polygon points="13.885 5 15.5 5.7746 9.6154 20 8 19.19" />
            <path d="m21.361 14.786h-2.8435l-0.65306 2.2143h-1.8639l3.0748-10h1.8639l3.0612 10h-1.9592l-0.68027-2.2143zm-2.4082-1.5714h2.0408l-0.96599-3.3429h-0.12245l-0.95238 3.3429z" />
          </g>
        </SvgIcon>
        <span className="ds-text-body--sm ds-u-margin-left--1">Not applicable</span>
      </>
    );
  } else {
    return (
      <>
        <SvgIcon ariaHidden title="" viewBox="0 0 24 24">
          <path
            fillRule="nonzero"
            d="m24 12c0 6.6281-5.3719 12-12 12s-12-5.3719-12-12 5.3719-12 12-12 12 5.3719 12 12zm-12-9.75c-5.3859 0-9.75 4.3641-9.75 9.75s4.3641 9.75 9.75 9.75 9.75-4.3641 9.75-9.75-4.3641-9.75-9.75-9.75z"
          />
        </SvgIcon>
        <span className="ds-text-body--sm ds-u-margin-left--1">Incomplete</span>
      </>
    );
  }
};

export default Status;
