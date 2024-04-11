import { define } from '../preactement/define';
import { Label, LabelProps } from '../../Label';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = ['class-name', 'inversed', 'for', 'root-id'];

interface WrapperProps extends Omit<LabelProps, 'inversed' | 'fieldId'> {
  inversed?: string;
  rootId?: string;
  for?: string;
}

const Wrapper = ({ inversed, rootId, for: fieldId, ...otherProps }: WrapperProps) => (
  <Label {...otherProps} inversed={parseBooleanAttr(inversed)} fieldId={fieldId} id={rootId} />
);

define('ds-label', () => Wrapper, { attributes });
