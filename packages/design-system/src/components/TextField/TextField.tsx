import React from 'react';
import LabelMask from './LabelMask';
import Mask from './Mask';
import TextInput from './TextInput';
import classNames from 'classnames';
import { FormFieldProps } from '../FormLabel';
import { Label } from '../Label';
import useId from '../utilities/useId';
import { useInlineError } from '../InlineError/useInlineError';
import describeField from '../utilities/describeField';
import { useHint } from '../Hint/useHint';
import useLabelProps from '../Label/useLabelProps';
import cleanFieldProps from '../utilities/cleanFieldProps';

export type TextFieldDefaultValue = string | number;
export type TextFieldMask = 'currency' | 'phone' | 'ssn' | 'zip';
export type TextFieldRows = number | string;
export type TextFieldSize = 'small' | 'medium';
export type TextFieldValue = string | number;

export interface BaseTextFieldProps extends Omit<FormFieldProps, 'id'> {
  /**
   * Apply an `aria-label` to the text field to provide additional
   * context to assistive devices.
   */
  ariaLabel?: string;
  /**
   * Sets the initial value. Use this for an uncontrolled component; otherwise,
   * use the `value` property.
   */
  defaultValue?: TextFieldDefaultValue;
  disabled?: boolean;
  fieldClassName?: string;
  /*
   * Sets the focus on the select during the first mount
   */
  autoFocus?: boolean;
  /**
   * A unique `id` to be used on the text field.
   */
  id?: string;
  /**
   * Access a reference to the `input` or `textarea` element
   */
  inputRef?: (...args: any[]) => any;
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields](https://design.cms.gov/patterns/Forms/forms/#required-and-optional-fields).
   */
  requirementLabel?: React.ReactNode;
  /**
   * Applies the "inverse" UI theme
   */
  inversed?: boolean;
  /**
   * Applies date format masking to the input value entered
   * and renders to a text field above the input.
   * Passing `true` to `valueOnly` will return just the
   * formatted value entered.
   */
  labelMask?: (rawInput: string, valueOnly?: boolean) => string;
  /**
   * Apply formatting to the field that's unique to the value
   * you expect to be entered. Depending on the mask, the
   * field's appearance and functionality may be affected.
   */
  mask?: TextFieldMask;
  /**
   * Whether or not the text field is a multiline text field
   */
  multiline?: boolean;
  name: string;
  /**
   * Sets `inputMode`, `type`, and `pattern` to improve accessibility and consistency for number fields. Use this prop instead of `type="number"`, see [here](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/) for more information.
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
  rows?: TextFieldRows;
  /**
   * Set the max-width of the input either to `'small'` or `'medium'`.
   */
  size?: TextFieldSize;
  /**
   * HTML `input` [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#<input>_types) attribute. If you are using `type=number` please use the numeric prop instead.
   */
  type?: string;
  /**
   * Sets the input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `defaultValue`.
   */
  value?: TextFieldValue;
}

export type TextFieldProps = BaseTextFieldProps &
  Omit<React.ComponentPropsWithRef<'input'>, keyof BaseTextFieldProps>;

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/text-field/).
 */
export const TextField: React.FC<TextFieldProps> = (props: TextFieldProps) => {
  const { id: originalId, mask, labelMask, className, ...remainingProps } = props;
  const id = useId('text-field--', originalId);

  if (process.env.NODE_ENV !== 'production') {
    if (props.type === 'number') {
      console.warn(
        `Please use the 'numeric' prop instead of 'type="number"' unless your user research suggests otherwise.`
      );
    }
  }

  const { errorId, topError, bottomError, invalid } = useInlineError({ ...props, id });
  const { hintId, hintElement } = useHint({ ...props, id });
  const labelProps = useLabelProps({ ...props, id });

  const input = (
    <TextInput
      // TypeScript doesn't know we set this in .defaultProps
      type={TextField.defaultProps.type}
      {...cleanFieldProps(remainingProps)}
      id={id}
      aria-invalid={invalid}
      aria-describedby={describeField({ ...props, errorId, hintId })}
    />
  );

  return (
    <div
      className={classNames(
        'ds-u-clearfix', // fixes issue where the label's margin is collapsed
        className
      )}
    >
      <Label {...labelProps} fieldId={id} />
      {hintElement}
      {topError}
      {mask && <Mask mask={mask}>{input}</Mask>}
      {labelMask && <LabelMask labelMask={labelMask}>{input}</LabelMask>}
      {!mask && !labelMask && input}
      {bottomError}
    </div>
  );
};

TextField.defaultProps = {
  type: 'text',
};

export default TextField;
