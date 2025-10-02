import { define } from '../preactement/define';
import { Hint, HintProps } from '../../Hint';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = ['class-name', 'inversed', 'requirement-label', 'root-id'];

interface WrapperProps extends Omit<HintProps, 'inversed'> {
  inversed?: string;
  rootId?: string;
}

const Wrapper = ({ inversed, rootId, ...otherProps }: WrapperProps) => (
  <Hint {...otherProps} inversed={parseBooleanAttr(inversed)} id={rootId} />
);

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-hint': React.JSX.IntrinsicElements['div'] & {
        [K in (typeof attributes)[number]]?: string;
      };
    }
  }
}
/* eslint-enable */

define('ds-hint', () => Wrapper, { attributes, shadow: true });
