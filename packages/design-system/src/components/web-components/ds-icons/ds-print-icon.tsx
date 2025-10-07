import { define } from '../preactement/define';
import { attributes } from './shared-attributes';
import { PrintIcon, IconCommonProps } from '../../Icons';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-print-icon': React.JSX.IntrinsicElements['div'] & {
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
  <PrintIcon ariaHidden={JSON.parse(ariaHidden)} {...otherProps} />
);

define('ds-print-icon', () => Wrapper, { attributes });
