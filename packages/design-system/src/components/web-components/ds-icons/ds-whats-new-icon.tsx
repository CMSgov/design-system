import { define } from '../preactement/define';
import { attributes } from './shared-attributes';
import { WhatsNewIcon, IconCommonProps } from '../../Icons';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-whats-new-icon': React.JSX.IntrinsicElements['div'] & {
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
  <WhatsNewIcon ariaHidden={JSON.parse(ariaHidden)} {...otherProps} />
);

define('ds-whats-new-icon', () => Wrapper, { attributes });
