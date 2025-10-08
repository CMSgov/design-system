import { define } from '../preactement/define';
import { attributes } from './shared-attributes';
import { RssIcon, IconCommonProps } from '../../Icons';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-rss-icon': React.JSX.IntrinsicElements['div'] & {
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
  <RssIcon ariaHidden={JSON.parse(ariaHidden)} {...otherProps} />
);

define('ds-rss-icon', () => Wrapper, { attributes });
