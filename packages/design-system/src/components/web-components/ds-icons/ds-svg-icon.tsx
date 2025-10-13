import { define } from '../preactement/define';
import { attributes } from './shared-attributes';
import { SvgIcon, SvgIconProps } from '../../Icons';
import { parseBooleanAttr } from '../wrapperUtils';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-svg-icon': React.JSX.IntrinsicElements['div'] & {
        [K in (typeof attributes)[number]]?: string;
      };
    }
  }
}
/* eslint-enable */

interface WrapperProps extends Omit<SvgIconProps, 'ariaHidden'> {
  ariaHidden?: string;
}

const Wrapper = ({ ariaHidden = 'true', ...otherProps }: WrapperProps) => (
  <SvgIcon ariaHidden={parseBooleanAttr(ariaHidden)} {...otherProps} />
);

define('ds-svg-icon', () => Wrapper, { attributes });
