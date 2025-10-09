import { define } from '../preactement/define';
import { attributes } from './shared-attributes';
import { InfoCircleIconThin, IconCommonProps } from '../../Icons';
import { parseBooleanAttr } from '../wrapperUtils';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-info-circle-icon-thin': React.JSX.IntrinsicElements['div'] & {
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
  <InfoCircleIconThin ariaHidden={parseBooleanAttr(ariaHidden)} {...otherProps} />
);

define('ds-info-circle-icon-thin', () => Wrapper, { attributes });
