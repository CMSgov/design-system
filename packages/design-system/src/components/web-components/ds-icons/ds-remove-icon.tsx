import { define } from '../preactement/define';
import { attributes } from './shared-attributes';
import { RemoveIcon, IconCommonProps } from '../../Icons';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-remove-icon': React.JSX.IntrinsicElements['div'] & {
        [K in (typeof attributes)[number]]?: string;
      };
    }
  }
}
/* eslint-enable */

interface WrapperProps extends Omit<IconCommonProps, 'ariaHidden'> {
  ariaHidden?: string;
}

const Wrapper = ({ ariaHidden, ...otherProps }: WrapperProps) => (
  <RemoveIcon ariaHidden={JSON.parse(ariaHidden)} {...otherProps} />
);

define('ds-remove-icon', () => Wrapper, { attributes });
