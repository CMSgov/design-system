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

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-label': React.JSX.IntrinsicElements['div'] & {
        [K in (typeof attributes)[number]]?: string;
      };
    }
  }
}
/* eslint-enable */

define('ds-label', () => Wrapper, { attributes });
