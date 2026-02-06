import { define } from '../preactement/define';
import { attributes } from './shared-attributes';
import { AlertCircleThinIcon, IconCommonProps } from '../../Icons';
import { parseBooleanAttr } from '../wrapperUtils';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-alert-circle-thin-icon': React.JSX.IntrinsicElements['div'] & {
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
  <AlertCircleThinIcon ariaHidden={parseBooleanAttr(ariaHidden)} {...otherProps} />
);

define('ds-alert-circle-thin-icon', () => Wrapper, { attributes });
