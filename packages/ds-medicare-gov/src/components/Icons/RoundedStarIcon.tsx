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
    return <FilledStar {...props} />;
  } else if (props.variation === 'half') {
    return <HalfStar {...props} />;
  } else {
    return <EmptyStar {...props} />;
  }
};

export default RoundedStar;
