import { define } from '../preactement/define';
import { attributes } from './shared-attributes';
import { ArrowIcon, IconCommonProps } from '../../Icons';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-arrow-icon': React.JSX.IntrinsicElements['div'] & {
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
  <ArrowIcon ariaHidden={JSON.parse(ariaHidden)} {...otherProps} />
);

define('ds-arrow-icon', () => Wrapper, { attributes });
