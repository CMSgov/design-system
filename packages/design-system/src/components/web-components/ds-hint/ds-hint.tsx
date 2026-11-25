import { define } from '../preactement/define';
import { Hint, HintProps } from '../../Hint';
import useId from '../../utilities/useId';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = ['class-name', 'inversed', 'requirement-label', 'root-id'];

interface WrapperProps extends Omit<HintProps, 'inversed'> {
  inversed?: string;
  rootId?: string;
}

const Wrapper = ({ inversed, rootId, ...otherProps }: WrapperProps) => (
  // `Hint`'s id is what a field's `aria-describedby` points at, so it falls back to a
  // generated one the way the rest of the library does rather than going unset.
  <Hint {...otherProps} inversed={parseBooleanAttr(inversed)} id={useId('hint--', rootId)} />
);

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-hint': React.JSX.IntrinsicElements['div'] & {
        'class-name'?: string;
        inversed?: string;
        'requirement-label'?: string;
        'root-id'?: string;
      };
    }
  }
}
/* eslint-enable */

define('ds-hint', () => Wrapper, { attributes, shadow: true });
