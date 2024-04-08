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

define('ds-hint', () => Wrapper, { attributes });
