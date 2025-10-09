import { define } from '../preactement/define';
import { attributes } from './shared-attributes';
import { MenuIconThin, IconCommonProps } from '../../Icons';
import { parseBooleanAttr } from '../wrapperUtils';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-menu-icon-thin': React.JSX.IntrinsicElements['div'] & {
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
  <MenuIconThin ariaHidden={parseBooleanAttr(ariaHidden)} {...otherProps} />
);

define('ds-menu-icon-thin', () => Wrapper, { attributes });
