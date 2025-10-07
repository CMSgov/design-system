import { define } from '../preactement/define';
import { attributes } from './shared-attributes';
import { QuotationMarkIcon, IconCommonProps } from '../../Icons';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-quotation-mark-icon': React.JSX.IntrinsicElements['div'] & {
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
  <QuotationMarkIcon ariaHidden={JSON.parse(ariaHidden)} {...otherProps} />
);

define('ds-quotation-mark-icon', () => Wrapper, { attributes });
