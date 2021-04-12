import * as React from 'react';

export type TextInputDefaultValue = string | number;

export type TextInputMask = 'currency' | 'phone' | 'ssn' | 'zip';

export type TextInputRows = number | string;

export type TextInputSize = 'small' | 'medium';

export type TextInputValue = string | number;

export type TextInputErrorPlacement = 'top' | 'bottom';

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
  errorId?: string,
  errorMessage?: React.ReactNode;
  /**
   * Location of the error message relative to the field input
   */
  errorPlacement?: TextInputErrorPlacement;
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
  mask?: TextInputMask;
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
  rows?: TextInputRows;
  setRef?: (...args: any[]) => any;
  /**
   * Set the max-width of the input either to `'small'` or `'medium'`.
   */
  size?: TextInputSize;
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

type OmitProps = 'size';

// Remove the "size" definition inside React.HTMLProps<HTMLInputElement>, and use ours instead
export default class TextInput extends React.Component<
  Omit<React.HTMLProps<HTMLInputElement>, OmitProps> & TextInputProps,
  any
> {
  render(): JSX.Element;
}
