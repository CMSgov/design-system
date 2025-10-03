import { define } from '../preactement/define';
import { UsaBanner, UsaBannerProps } from '../../UsaBanner';

const attributes = [
  // Purposely leaving out `className` because it's unnecessary
  'root-id',
];

interface WrapperProps extends UsaBannerProps {
  rootId?: string;
}

const Wrapper = ({ rootId, ...otherProps }: WrapperProps) => (
  <UsaBanner {...otherProps} id={rootId} />
);

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-usa-banner': React.JSX.IntrinsicElements['div'] & {
        [K in (typeof attributes)[number]]?: string;
      };
    }
  }
}
/* eslint-enable */

define('ds-usa-banner', () => Wrapper, { attributes });
