import { define } from '../preactement/define';
import { attributes } from './shared-attributes';
import { UsaFlagIcon, IconCommonProps } from '../../Icons';
import { parseBooleanAttr } from '../wrapperUtils';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-usa-flag-icon': React.JSX.IntrinsicElements['div'] & {
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
  <UsaFlagIcon ariaHidden={parseBooleanAttr(ariaHidden)} {...otherProps} />
);

define('ds-usa-flag-icon', () => Wrapper, { attributes });
