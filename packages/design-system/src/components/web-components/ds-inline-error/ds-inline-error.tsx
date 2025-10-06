import { define } from '../preactement/define';
import { InlineError, InlineErrorProps } from '../../InlineError';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = ['class-name', 'inversed', 'root-id'];

interface WrapperProps extends Omit<InlineErrorProps, 'inversed'> {
  inversed?: string;
  rootId?: string;
}

const Wrapper = ({ inversed, rootId, ...otherProps }: WrapperProps) => (
  <InlineError {...otherProps} inversed={parseBooleanAttr(inversed)} id={rootId} />
);

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-inline-error': React.JSX.IntrinsicElements['div'] & {
        rootId?: string;
        'class-name'?: string;
        inversed?: string;
      };
    }
  }
}
/* eslint-enable */

define('ds-inline-error', () => Wrapper, { attributes, shadow: true });
