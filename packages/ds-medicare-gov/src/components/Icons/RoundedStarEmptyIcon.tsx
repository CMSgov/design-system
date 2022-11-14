import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { SvgIcon } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system/dist/components/Icons/SvgIcon';

const defaultProps = {
  className: '',
  title: 'Empty Star',
};

const RoundedStarEmptyIcon = (props: IconCommonProps) => {
  const clipPath1 = uniqueId('empty_clip_path_');
  const clipPath2 = uniqueId('empty_clip_path_');
  const clipPath3 = uniqueId('empty_clip_path_');

  const iconCssClasses = classNames(
    'ds-c-icon--rounded-star',
    'ds-c-icon--rounded-star-empty',
    props.className
  );

  return (
    <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
      <clipPath id={clipPath1}>
        <path d="M11,3.6L8.8,8.3L3.9,9C3,9.2,2.7,10.3,3.3,10.9l3.6,3.6L6,19.7c-0.2,0.9,0.8,1.6,1.6,1.2l4.4-2.4l4.4,2.4 c0.8,0.4,1.7-0.3,1.6-1.2l-0.8-5.1l3.6-3.6c0.6-0.7,0.3-1.8-0.6-1.9l-4.9-0.7L13,3.6C12.6,2.8,11.4,2.8,11,3.6z" />
      </clipPath>
      <clipPath id={clipPath2}>
        <rect x="-8" y="-8" width="40" height="40" />
      </clipPath>
      <clipPath id={clipPath3}>
        <rect x="3" y="3" width="18" height="18" />
      </clipPath>
      <g clipPath={`url(#${clipPath1})`}>
        <g
          clipPath={`url(#${clipPath2})`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeMiterlimit={10}
        >
          <path
            className="EmptyStarPath"
            clipPath={`url(#${clipPath3})`}
            d="M11,3.6L8.8,8.3L3.9,9C3,9.2,2.7,10.3,3.3,10.9l3.6,3.6L6,19.7c-0.2,0.9,0.8,1.6,1.6,1.2l4.4-2.4l4.4,2.4 c0.8,0.4,1.7-0.3,1.6-1.2l-0.8-5.1l3.6-3.6c0.6-0.7,0.3-1.8-0.6-1.9l-4.9-0.7L13,3.6C12.6,2.8,11.4,2.8,11,3.6z"
          />
        </g>
      </g>
    </SvgIcon>
  );
};

export default RoundedStarEmptyIcon;
