import React from 'react';
import { IconCommonProps } from '@cmsgov/design-system/dist/components/Icons/SvgIcon';
import FilledStar from './RoundedStarFilledIcon';
import HalfStar from './RoundedStarHalfIcon';
import EmptyStar from './RoundedStarEmptyIcon';

export type RoundedStarVariation = 'filled' | 'half' | 'empty';

export interface RoundedStarProps extends IconCommonProps {
  className?: string;
  variation?: RoundedStarVariation;
}

const RoundedStar = (props: RoundedStarProps) => {
  if (props.variation === 'filled') {
    return <FilledStar className={props.className} {...props} />;
  } else if (props.variation === 'half') {
    return <HalfStar className={props.className} {...props} />;
  } else {
    return <EmptyStar className={props.className} {...props} />;
  }
};

export default RoundedStar;
