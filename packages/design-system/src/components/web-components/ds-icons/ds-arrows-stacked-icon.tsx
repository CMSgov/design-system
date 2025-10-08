import { define } from '../preactement/define';
import { attributes } from './shared-attributes';
import { ArrowsStackedIcon, IconCommonProps } from '../../Icons';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-arrows-stacked-icon': React.JSX.IntrinsicElements['div'] & {
        [K in (typeof attributes)[number]]?: string;
      };
    }
  }
}
/* eslint-enable */

interface WrapperProps extends Omit<IconCommonProps, 'ariaHidden'> {
  ariaHidden?: string;
}

const Wrapper = ({ ariaHidden = 'true', ...otherProps }: WrapperProps) => (
  <ArrowsStackedIcon ariaHidden={JSON.parse(ariaHidden)} {...otherProps} />
);

define('ds-arrows-stacked-icon', () => Wrapper, { attributes });
