import { IconCommonProps } from '@cmsgov/design-system';
import FilledHeart from './HeartFilledIcon';
import EmptyHeart from './HeartEmptyIcon';

export type HeartVariation = 'filled' | 'empty';

export interface HeartProps extends IconCommonProps {
  className?: string;
  variation?: HeartVariation;
}

const HeartIcon = (props: HeartProps) => {
  if (props.variation === 'filled') {
    return <FilledHeart {...props} />;
  } else {
    return <EmptyHeart {...props} />;
  }
};

export default HeartIcon;
