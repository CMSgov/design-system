import { define } from '../preactement/define';
import { attributes } from './shared-attributes';
import { ImageIcon, IconCommonProps } from '../../Icons';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-image-icon': React.JSX.IntrinsicElements['div'] & {
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
  <ImageIcon ariaHidden={JSON.parse(ariaHidden)} {...otherProps} />
);

define('ds-image-icon', () => Wrapper, { attributes });
