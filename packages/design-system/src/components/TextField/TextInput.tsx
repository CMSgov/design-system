import React, { FunctionComponent } from 'react';
import Mask from './Mask';
import classNames from 'classnames';

export type TextInputDefaultValue = string | number;
export type TextInputValue = string | number;

export interface TextInputProps {
  /**
   * Apply an `aria-label` to the text field to provide additional
   * context to assistive devices.
   */
  ariaLabel?: string;
  /**
   * Sets the initial value. Use this for an uncontrolled component; otherwise,
   * use the `value` property.
   */
  defaultValue?: TextInputDefaultValue;
  disabled?: boolean;
  /**
   * The ID of the error message applied to the Select field.
   */
  errorId?: string;
  errorMessage?: React.ReactNode;
  /**
   * Location of the error message relative to the field input
   */
  errorPlacement?: 'top' | 'bottom';
  /**
   * Additional classes to be added to the field element
   */
  fieldClassName?: string;
  /**
   * A unique `id` to be used on the text field.
   */
  id?: string;
  /**
   * Applies the "inverse" UI theme
   */
  inversed?: boolean;
  /**
   * Apply formatting to the field that's unique to the value
   * you expect to be entered. Depending on the mask, the
   * field's appearance and functionality may be affected.
   */
  mask?: 'currency' | 'phone' | 'ssn' | 'zip';
  /**
   * Whether or not the text field is a multiline text field
   */
  multiline?: boolean;
  name?: string;
  /**
   * Sets `inputMode`, `type`, and `pattern` to improve accessiblity and consistency for number fields. Use this prop instead of `type="number"`, see [here](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/) for more information.
   */
  numeric?: boolean;
  onBlur?: (...args: any[]) => any;
  onChange?: (...args: any[]) => any;
  /**
   * @hide-prop HTML `input` [pattern](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefpattern).
   */
  pattern?: string;
  /**
   * Optionally specify the number of visible text lines for the field. Only
   * applicable if this is a multiline field.
   */
  rows?: number | string;
  setRef?: (...args: any[]) => any;
  /**
   * Set the max-width of the input either to `'small'` or `'medium'`.
   */
  size?: 'small' | 'medium';
  /**
   * HTML `input` [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#<input>_types) attribute. If you are using `type=number` please use the numeric prop instead.
   */
  type: string;
  /**
   * Sets the input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `defaultValue`.
   */
  value?: TextInputValue;
}

export type OmitProps = 'size' | 'ref';

/**
 * <TextInput> is an internal component used by <TextField>, which wraps it and handles shared form UI like labels, error messages, etc
 * <TextInput> is also exported for advanced design system use cases, where the internal component can be leveraged to build custom form components
 * As an internal component, it's subject to more breaking changes. Exercise caution using <TextInput> outside of those special cases
 */
const TextInput: FunctionComponent<
  Omit<React.ComponentPropsWithoutRef<'textarea'>, OmitProps> &
    Omit<React.ComponentPropsWithoutRef<'input'>, OmitProps> &
    TextInputProps
> = (props: TextInputProps) => {
  const {
    ariaLabel,
    errorId,
    errorMessage,
    errorPlacement,
    fieldClassName,
    inversed,
    mask,
    multiline,
    numeric,
    rows,
    size,
    setRef,
    type,
    pattern,
    ...inputProps
  } = props;

  const classes = classNames(
    'ds-c-field',
    {
      'ds-c-field--error': errorMessage,
      'ds-c-field--inverse': inversed,
    },
    mask && `ds-c-field--${mask}`,
    size && `ds-c-field--${size}`,
    fieldClassName
  );

  let inputType = type;
  if (numeric) {
    inputType = 'text';
  } else if (multiline) {
    inputType = undefined;
  }

  const ComponentType = multiline ? 'textarea' : 'input';

  /* eslint-disable react/prop-types */
  const ariaAttributes = {
    'aria-label': ariaLabel,
    // Use set `aria-invalid` based off errorMessage unless manually specified
    'aria-invalid': props['aria-invalid'] ? props['aria-invalid'] : !!errorMessage,
    // Link input to bottom placed error message
    'aria-describedby':
      errorPlacement === 'bottom' && errorMessage
        ? classNames(props['aria-describedby'], errorId)
        : undefined,
  };

  const numberRows: number = typeof rows === 'string' ? parseInt(rows) : rows;
  /* eslint-enable react/prop-types */
  const field = (
    <ComponentType
      {...ariaAttributes}
      className={classes}
      ref={setRef}
      rows={multiline && numberRows ? numberRows : undefined}
      inputMode={numeric ? 'numeric' : undefined}
      pattern={numeric && !pattern ? '[0-9]*' : pattern}
      type={inputType}
      {...inputProps}
    />
  );

  return mask ? <Mask mask={mask}>{field}</Mask> : field;
};

export default TextInput;
