import { define } from '../preactement/define';
import { attributes } from './shared-attributes';
import { HHSLogo, IconCommonProps } from '../../Icons';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-h-h-s-logo': React.JSX.IntrinsicElements['div'] & {
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
  <HHSLogo ariaHidden={JSON.parse(ariaHidden)} {...otherProps} />
);

define('ds-h-h-s-logo', () => Wrapper, { attributes });
