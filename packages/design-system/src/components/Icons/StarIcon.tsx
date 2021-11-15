import React from 'react';
import SvgIcon, { IconCommonProps } from './SvgIcon';
import classNames from 'classnames';

export type StarVariation = 'filled' | 'half' | 'empty';
export interface StarIconProps extends IconCommonProps {
  variation?: StarVariation;
}

const defaultProps = {
  className: '',
  isFilled: false,
  viewBox: '0 0 18 16',
};

function StarIcon(props: StarIconProps): React.ReactElement {
  const isFilled = () => props.variation === 'filled';
  const isHalfFilled = () => props.variation === 'half';

  const iconCssClasses = classNames(
    'ds-c-icon--star',
    {
      'ds-c-icon--star-filled': isFilled(),
      'ds-c-icon--star-half-filled': isHalfFilled(),
    },
    props.className
  );

  let title = 'Star';
  let pathMarkup = (
    <path
      className="ds-c-icon--star__outline"
      d="M13.14 14.852l-.88-4.976 3.709-3.508-5.126-.723-2.31-4.542-2.309 4.542-5.126.723 3.708 3.508-.88 4.976 4.607-2.35 4.607 2.35z"
      fillRule="nonzero"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    />
  );

  if (isFilled()) {
    title = 'Star filled';
    pathMarkup = (
      <path
        d="M8.533 13.063l-5.274 2.69 1.008-5.699L0 6.017l5.896-.831L8.533 0l2.637 5.186 5.897.831-4.267 4.037 1.007 5.7z"
        fillRule="nonzero"
      />
    );
  } else if (isHalfFilled()) {
    title = 'Star half-filled';
    pathMarkup = (
      <path
        d="M8.533 13.063l-5.274 2.69 1.008-5.699L0 6.017l5.896-.831L8.533 0l2.637 5.186 5.897.831-4.267 4.037 1.007 5.7z"
        fillRule="nonzero"
      />
    );
  }

  return (
    <SvgIcon title={title} {...defaultProps} {...props} className={iconCssClasses}>
      {pathMarkup}
    </SvgIcon>
  );
}

export default StarIcon;
