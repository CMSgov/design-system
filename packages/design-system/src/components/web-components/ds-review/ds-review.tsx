import { define } from '../preactement/define';
import { Review } from '../../Review';

const attributes = [
  'class-name',
  'edit-aria-label',
  'edit-href',
  'edit-text',
  'heading',
  'heading-level',
] as const;

const Wrapper = ({ children, ...otherProps }) => {
  return <Review {...otherProps}>{children}</Review>;
};

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-review': JSX.IntrinsicElements['div'] & {
        [K in (typeof attributes)[number]]?: string;
      };
    }
  }
}
/* eslint-enable */

define('ds-review', () => Wrapper, {
  attributes: attributes,
});
