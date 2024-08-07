import { define } from '../preactement/define';
import { TextField, TextFieldProps } from '../../TextField';
import { parseBooleanAttr } from '../wrapperUtils';
import { formAttrs } from '../shared-attributes/form';
import { PHONE_MASK, SSN_MASK, ZIP_MASK, CURRENCY_MASK } from '../../TextField/useLabelMask';

const attributes = [
  // Using the lowercase HTML attribute name rather than `auto-focus` so it's
  // more natural. There's no reason for us to worry about name collisions.
  'autofocus',
  'aria-disabled',
  'class-name',
  'disabled',
  'field-class-name',
  'inversed',
  'label-mask',
  'multiline',
  'name',
  'numeric',
  'value',
  'root-id',
  'rows',
  'size',
  'type',
  ...formAttrs,
];

function getMaskFunction(value: string) {
  switch (value) {
    case 'phone':
      return PHONE_MASK;
    case 'zip':
      return ZIP_MASK;
    case 'ssn':
      return SSN_MASK;
    case 'currency':
      return CURRENCY_MASK;
  }
  return undefined;
}

interface WrapperProps
  extends Omit<
    TextFieldProps,
    'autoFocus' | 'ariaDisabled' | 'disabled' | 'inversed' | 'labelMask' | 'multiline'
  > {
  autofocus?: string;
  ariaDisabled?: string;
  disabled?: string;
  inversed?: string;
  labelMask?: string;
  multiline?: string;
  rootId?: string;
}

const Wrapper = ({ autofocus, rootId, ...otherProps }: WrapperProps) => (
  <TextField
    {...otherProps}
    autoFocus={parseBooleanAttr(autofocus)}
    aria-disabled={parseBooleanAttr(otherProps.ariaDisabled)}
    disabled={parseBooleanAttr(otherProps.disabled)}
    id={rootId}
    inversed={parseBooleanAttr(otherProps.inversed)}
    labelMask={getMaskFunction(otherProps.labelMask)}
    multiline={parseBooleanAttr(otherProps.multiline)}
  />
);

define('ds-text-field', () => Wrapper, { attributes, events: ['onChange', 'onBlur'] });
