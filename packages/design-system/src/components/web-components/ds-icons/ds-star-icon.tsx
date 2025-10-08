import { define } from '../preactement/define';
import { attributes } from './shared-attributes';
import { StarIcon, StarIconProps } from '../../Icons';

const starAttributes = [...attributes, 'is-filled'] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-star-icon': React.JSX.IntrinsicElements['div'] & {
        [K in (typeof starAttributes)[number]]?: string;
      };
    }
  }
}
/* eslint-enable */

interface WrapperProps extends Omit<StarIconProps, 'ariaHidden'> {
  ariaHidden?: string;
}

const Wrapper = ({ ariaHidden, ...otherProps }: WrapperProps) => (
  <StarIcon ariaHidden={JSON.parse(ariaHidden)} {...otherProps} />
);

define('ds-star-icon', () => Wrapper, { attributes: starAttributes });
