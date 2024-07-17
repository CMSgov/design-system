import { define } from '../preactement/define';
import { TextField, TextFieldProps } from '../../TextField';
import { parseBooleanAttr } from '../wrapperUtils';
import { formAttrs } from '../shared-attributes/form';
import { PHONE_MASK, SSN_MASK, ZIP_MASK, CURRENCY_MASK } from '../../TextField/useLabelMask';

const attributes = [
  'aria-disabled',
  'class-name',
  'default-value',
  'disabled',
  'field-class-name',
  'inversed',
  'label-mask',
  'multiline',
  'name',
  'numeric',
  'value',
  'root-id',
  'size',
  'type',
  ...formAttrs,
];

function getMaskFunction(value: string) {
  switch (value) {
    case 'PHONE_MASK':
      return PHONE_MASK;
    case 'ZIP_MASK':
      return ZIP_MASK;
    case 'SSN_MASK':
      return SSN_MASK;
    case 'CURRENCY_MASK':
      return CURRENCY_MASK;
  }
  return undefined;
}

interface WrapperProps
  extends Omit<TextFieldProps, 'disabled' | 'ariaDisabled' | 'inversed' | 'labelMask'> {
  ariaDisabled?: string;
  disabled?: string;
  inversed?: string;
  labelMask?: string;
  rootId?: string;
}

const Wrapper = ({ rootId, ...otherProps }: WrapperProps) => (
  <TextField
    {...otherProps}
    disabled={parseBooleanAttr(otherProps.disabled)}
    aria-disabled={parseBooleanAttr(otherProps.ariaDisabled)}
    id={rootId}
    inversed={parseBooleanAttr(otherProps.inversed)}
    labelMask={getMaskFunction(otherProps.labelMask)}
  />
);

define('ds-text-field', () => Wrapper, { attributes, events: ['onChange', 'onBlur'] });
