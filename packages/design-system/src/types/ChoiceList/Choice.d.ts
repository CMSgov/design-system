import * as React from 'react';

export type ChoiceSize = 'small';

export type ChoiceType = 'checkbox' | 'radio';

export type ChoiceValue = number | string;

export interface ChoiceProps {
  /**
   * @hide-prop In order to be consistent with form elements, use `label` instead
   */
  children?: React.ReactNode;
  /**
   * Sets the input's `checked` state. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `defaultChecked`.
   */
  checked?: boolean;
  /**
   * Content to be shown when the choice is checked. See
   * **Checked children and the expose within pattern** on
   * the Guidance tab for detailed instructions.
   */
  checkedChildren?: React.ReactNode;
  /**
   * Content to be shown when the choice is not checked
   */
  uncheckedChildren?: React.ReactNode;
  /**
   * Additional classes to be added to the root `div` element.
   */
  className?: string;
  /**
   * Additional classes to be added to the `input` element.
   */
  inputClassName?: string;
  /**
   * Label text or HTML.
   */
  label?: React.ReactNode;
  /**
   * Additional classes to be added to the `FormLabel`.
   */
  labelClassName?: string;
  /**
   * Sets the initial `checked` state. Use this for an uncontrolled component;
   * otherwise, use the `checked` property.
   */
  defaultChecked?: boolean;
  disabled?: boolean;
  /**
   * Access a reference to the `input` element
   */
  inputRef?: (...args: any[]) => any;
  /**
   * Additional hint text to display below the choice's label
   */
  hint?: React.ReactNode;
  /**
   * A unique ID to be used for the input field, as well as the label's
   * `for` attribute. A unique ID will be generated if one isn't provided.
   */
  id?: string;
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel?: React.ReactNode;
  /**
   * Applies the "inverse" UI theme
   */
  inversed?: boolean;
  size?: ChoiceSize;
  /**
   * The `input` field's `name` attribute
   */
  name: string;
  onBlur?: (...args: any[]) => any;
  onChange?: (...args: any[]) => any;
  /**
   * Sets the type to render `checkbox` fields or `radio` buttons
   */
  type: ChoiceType;
  /**
   * The `input` `value` attribute
   */
  value: ChoiceValue;
}

type OmitProps = 'size' | 'type' | 'value' | 'label';

// Remove the "size" definition inside React.HTMLProps<HTMLInputElement>, and use ours instead
export default class Choice extends React.Component<
  Omit<React.HTMLProps<HTMLInputElement>, OmitProps> & ChoiceProps,
  any
> {
  render(): JSX.Element;
}
