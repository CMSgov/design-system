import { FormControl, FormControlPropKeys } from '../FormControl/FormControl';
import React from 'react';
import TextInput from './TextInput';
import classNames from 'classnames';
import { errorPlacementDefault } from '../flags';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

// TODO: Remove this export, apps shouldnt be importing `unmaskValue` from `TextField`
export { unmaskValue } from './maskHelpers';

export type TextFieldDefaultValue = string | number;

export type TextFieldMask = 'currency' | 'phone' | 'ssn' | 'zip';

export type TextFieldRows = number | string;

export type TextFieldSize = 'small' | 'medium';

export type TextFieldValue = string | number;

export type TextFieldErrorPlacement = 'top' | 'bottom';

export interface TextFieldProps {
  /**
   * Apply an `aria-label` to the text field to provide additional
   * context to assistive devices.
   */
  ariaLabel?: string;
  /**
   * Additional classes to be added to the root `div` element
   */
  className?: string;
  /**
   * Sets the initial value. Use this for an uncontrolled component; otherwise,
   * use the `value` property.
   */
  defaultValue?: TextFieldDefaultValue;
  disabled?: boolean;
  errorMessage?: React.ReactNode;
  /**
   * Additional classes to be added to the error message
   */
  errorMessageClassName?: string;
  /**
   * Location of the error message relative to the field input
   */
  errorPlacement?: TextFieldErrorPlacement;
  /**
   * Additional classes to be added to the field element
   */
  fieldClassName?: string;
  /**
   * Used to focus `input` on `componentDidMount()`
   */
  focusTrigger?: boolean;
  /**
   * Additional hint text to display
   */
  hint?: React.ReactNode;
  /**
   * A unique `id` to be used on the text field.
   */
  id?: string;
  /**
   * Access a reference to the `input` or `textarea` element
   */
  inputRef?: (...args: any[]) => any;
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel?: React.ReactNode;
  /**
   * Applies the "inverse" UI theme
   */
  inversed?: boolean;
  /**
   * Label for the input
   */
  label: React.ReactNode;
  /**
   * Additional classes to be added to the `FormLabel`.
   */
  labelClassName?: string;
  /**
   * A unique `id` to be used on the label field.
   */
  labelId?: string;
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

type OmitProps = 'size' | 'label';

export class TextField extends React.PureComponent<
  Omit<React.ComponentPropsWithRef<'input'>, OmitProps> & TextFieldProps,
  any
> {
  constructor(props: TextFieldProps) {
    super(props);

    if (process.env.NODE_ENV !== 'production') {
      if (props.type === 'number') {
        console.warn(
          `Please use the 'numeric' prop instead of 'type="number"' unless your user research suggests otherwise.`
        );
      }
    }
  }

  render(): React.ReactNode {
    const containerProps = pick(this.props, FormControlPropKeys);
    const inputOnlyProps = omit(this.props, FormControlPropKeys);

    // Add clearfix class
    const containerClassName = classNames(
      'ds-u-clearfix', // fixes issue where the label's margin is collapsed
      this.props.className
    );

    // Use errorPlacement feature flag for <TextInput>
    // Duplicate of errorPlacement defaulting that occurs inside <FormControl>
    const errorPlacement = this.props.errorPlacement || errorPlacementDefault();

    return (
      <FormControl
        {...containerProps}
        className={containerClassName}
        component="div"
        labelComponent="label"
        render={({ id, errorId, setRef }) => (
          <TextInput
            {...inputOnlyProps}
            {...{ id, setRef, errorId }}
            errorMessage={this.props.errorMessage}
            errorPlacement={errorPlacement}
            inversed={this.props.inversed}
          />
        )}
      />
    );
  }
}

export default TextField;
