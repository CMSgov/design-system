import * as React from 'react';
import { ChoiceProps as ChoiceComponentProps } from './Choice';

export type ChoiceListSize = 'small';

export type ChoiceListType = 'checkbox' | 'radio';

// Omit props that we override with values from the ChoiceList
type OmitChoiceProp = 'inversed' | 'name' | 'onBlur' | 'onChange' | 'size' | 'type' | 'inputRef';
export type ChoiceProps = Omit<ChoiceComponentProps, OmitChoiceProp>;

export type ChoiceListErrorPlacement = 'top' | 'bottom';

export interface ChoiceListProps {
  /**
   * The list of choices to be rendered.
   */
  choices: ChoiceProps[];
  /**
   * Additional classes to be added to the root element.
   */
  className?: string;
  /**
   * Disables the entire field.
   */
  disabled?: boolean;
  errorMessage?: React.ReactNode;
  /**
   * Additional classes to be added to the error message
   */
  errorMessageClassName?: string;
  /**
   * Location of the error message relative to the field input
   */
  errorPlacement?: ChoiceListErrorPlacement;
  /**
   * Additional hint text to display
   */
  hint?: React.ReactNode;
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel?: React.ReactNode;
  /**
   * Applies the "inverse" UI theme
   */
  inversed?: boolean;
  /**
   * Label for the field
   */
  label: React.ReactNode;
  /**
   * Additional classes to be added to the `FormLabel`.
   */
  labelClassName?: string;
  /**
   * @hide-prop [Deprecated] This prop is deprecated after changing `type` to a required prop
   */
  multiple?: boolean;
  /**
   * The field's `name` attribute
   */
  name: string;
  /**
   * Called anytime any choice is blurred
   */
  onBlur?: (...args: any[]) => any;
  /**
   * Called when any choice is blurred and the focus does not land on one
   * of the other choices inside this component (i.e., when the whole
   * component loses focus)
   */
  onComponentBlur?: (...args: any[]) => any;
  onChange?: (...args: any[]) => any;
  /**
   * Sets the size of the checkbox or radio button
   */
  size?: ChoiceListSize;
  /**
   * Sets the type to render `checkbox` fields or `radio` buttons
   */
  type: ChoiceListType;
}

export default class ChoiceList extends React.Component<ChoiceListProps, any> {
  render(): JSX.Element;
}
