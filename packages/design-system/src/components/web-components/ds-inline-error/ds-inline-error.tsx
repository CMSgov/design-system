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

define('ds-inline-error', () => Wrapper, { attributes });
