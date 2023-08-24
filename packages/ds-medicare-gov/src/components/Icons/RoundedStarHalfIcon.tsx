import React from 'react';
import classNames from 'classnames';
import { useId } from '@cmsgov/design-system';
import { SvgIcon } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  title: 'Half Star',
};

const RoundedStarHalfIcon = (props: IconCommonProps) => {
  const rootId = useId('icon-half-star--', props.id);
  const clipPath1 = `${rootId}__clip-path-1`;
  const clipPath2 = `${rootId}__clip-path-2`;
  const clipPath3 = `${rootId}__clip-path-3`;
  const filterId = `${rootId}__filter`;
  const maskId = `${rootId}__mask`;

  const iconCssClasses = classNames(
    'ds-c-icon--rounded-star',
    'ds-c-icon--rounded-star-half',
    props.className
  );

  return (
    <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
      <g>
        <g>
          <clipPath id={clipPath1}>
            <path d="M11.5,3.6L9.3,8.3L4.4,9c-0.9,0.1-1.2,1.3-0.6,1.9l3.6,3.6l-0.8,5.1c-0.2,0.9,0.8,1.6,1.6,1.2l4.4-2.4 l4.4,2.4c0.8,0.4,1.7-0.3,1.6-1.2l-0.8-5.1l3.6-3.6c0.6-0.7,0.3-1.8-0.6-1.9l-4.9-0.7l-2.2-4.7C13.1,2.8,11.9,2.8,11.5,3.6z" />
          </clipPath>
          <clipPath id={clipPath2}>
            <rect x="-7.5" y="-8" width="40" height="40" />
          </clipPath>
          <clipPath id={clipPath3}>
            <rect x="3.5" y="3" width="18" height="18" />
          </clipPath>
          <g clipPath={`url(#${clipPath1})`}>
            <g
              clipPath={`url(#${clipPath2})`}
              fill="none"
              stroke="#1E3C70"
              strokeWidth={2}
              strokeMiterlimit={10}
            >
              <path
                clipPath={`url(#${clipPath3})`}
                d="M11.5,3.6L9.3,8.3L4.4,9c-0.9,0.1-1.2,1.3-0.6,1.9l3.6,3.6l-0.8,5.1c-0.2,0.9,0.8,1.6,1.6,1.2l4.4-2.4 l4.4,2.4c0.8,0.4,1.7-0.3,1.6-1.2l-0.8-5.1l3.6-3.6c0.6-0.7,0.3-1.8-0.6-1.9l-4.9-0.7l-2.2-4.7C13.1,2.8,11.9,2.8,11.5,3.6z"
              />
            </g>
          </g>
        </g>
        <filter id={filterId} filterUnits="userSpaceOnUse" x="3" y="3" width="19" height="18">
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>
        <mask maskUnits="userSpaceOnUse" x="3" y="3" width="19" height="18" id={maskId}>
          <g filter={`url(#${filterId})`}>
            <rect
              x="2"
              y="1"
              width="10.5"
              height="21"
              fill="#FFFFFF"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </g>
        </mask>
        <path
          className="HalfStarPath"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          mask={`url(#${maskId})`}
          d="M11.5,3.6L9.2,8.3L4,9C3,9.2,2.7,10.3,3.3,10.9l3.8,3.6l-0.9,5.1c-0.2,0.9,0.8,1.6,1.6,1.2 l4.6-2.4 l4.6,2.4c0.8,0.4,1.8-0.3,1.6-1.2l-0.9-5.1l3.8-3.6C22.3,10.3,22,9.2,21,9l-5.2-0.7l-2.3-4.7C13.1,2.8,11.9,2.8,11.5,3.6z"
        />
      </g>
    </SvgIcon>
  );
};

export default RoundedStarHalfIcon;
