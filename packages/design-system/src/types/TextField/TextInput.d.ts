import * as React from 'react';

export type TextInputDefaultValue = string | number;

export type TextInputMask = "currency" | "phone" | "ssn" | "zip";

export type TextInputRows = number | string;

export type TextInputSize = "small" | "medium";

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
  errorMessage?: React.ReactNode;
  /**
   * Additional classes to be added to the input element
   */
  fieldClassName?: string;
  /**
   * A unique ID to be used for the input field.
   */
  id: string;
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
  onBlur?: (...args: any[])=>any;
  onChange?: (...args: any[])=>any;
  /**
   * @hide-prop HTML `input` [pattern](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefpattern).
   */
  pattern?: string;
  /**
   * Optionally specify the number of visible text lines for the field. Only
   * applicable if this is a multiline field.
   */
  rows?: TextInputRows;
  setRef?: (...args: any[])=>any;
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

type OmitProps = 'size' | 'label';

declare const TextInput: React.FC<Omit<React.HTMLProps<HTMLInputElement>, OmitProps> & TextInputProps>;
