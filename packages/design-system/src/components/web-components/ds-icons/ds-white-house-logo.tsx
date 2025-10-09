import { define } from '../preactement/define';
import { attributes } from './shared-attributes';
import { WhiteHouseLogo, IconCommonProps } from '../../Icons';
import { parseBooleanAttr } from '../wrapperUtils';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-white-house-logo': React.JSX.IntrinsicElements['div'] & {
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
  <WhiteHouseLogo ariaHidden={parseBooleanAttr(ariaHidden)} {...otherProps} />
);

define('ds-white-house-logo', () => Wrapper, { attributes });
