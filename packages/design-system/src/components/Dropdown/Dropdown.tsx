import { FormControl, FormControlPropKeys, FormControlProps } from '../FormControl/FormControl';
import React from 'react';
import Select from './Select';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

export type DropdownDefaultValue = number | string;
export interface DropdownOptions {
  label: React.ReactNode;
  value: number | string;
}
export type DropdownSize = 'small' | 'medium';
export type DropdownValue = number | string;
export type DropdownErrorPlacement = 'top' | 'bottom';
export interface DropdownProps {
  /**
   * Adds `aria-label` attribute. When using `aria-label`, `label` should be empty string.
   */
  ariaLabel?: string;
  /**
   * Additional classes to be added to the root element.
   */
  className?: string;
  /**
   * Used to define custom dropdown options (i.e. option groups). When using the `children` prop, `options` should be an empty list.
   */
  children?: React.ReactNode;
  /**
   * Sets the initial selected state. Use this for an uncontrolled component;
   * otherwise, use the `value` property.
   */
  defaultValue?: DropdownDefaultValue;
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
  errorPlacement?: DropdownErrorPlacement;
  /**
   * Additional classes to be added to the select element
   */
  fieldClassName?: string;
  /**
   * Used to focus `select` on `componentDidMount()`
   */
  focusTrigger?: boolean;
  /**
   * Additional hint text to display
   */
  hint?: React.ReactNode;
  /**
   * A unique ID to be used for the dropdown field. If one isn't provided, a unique ID will be generated.
   */
  id?: string;
  /**
   * Access a reference to the `select` element
   */
  inputRef?: (...args: any[]) => any;
  /**
   * Applies the "inverse" UI theme
   */
  inversed?: boolean;
  /**
   * Label for the field. If using `Dropdown` without a label, provide an empty string for `label` and use the `ariaLabel` prop instead.
   */
  label: React.ReactNode;
  /**
   * Additional classes to be added to the `FormLabel`.
   */
  labelClassName?: string;
  /**
   * The field's `name` attribute
   */
  name: string;
  /**
   * The list of options to be rendered. Provide an empty list if using custom options via the `children` prop.
   */
  options: DropdownOptions[];
  onBlur?: (...args: any[]) => any;
  onChange?: (...args: any[]) => any;
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel?: React.ReactNode;
  /**
   * If the component renders a select, set the max-width of the input either to `'small'` or `'medium'`.
   */
  size?: DropdownSize;
  /**
   * Sets the field's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `defaultValue`.
   */
  value?: DropdownValue;
}

type OmitProps =
  | 'size'
  | 'value'
  | 'label'
  | 'className'
  | 'children'
  | 'defaultValue'
  | 'disabled'
  | 'id'
  | 'name'
  | 'onBlur'
  | 'onChange';

export class Dropdown extends React.PureComponent<
  Omit<React.ComponentPropsWithoutRef<'select'>, OmitProps> & DropdownProps,
  any
> {
  constructor(props: DropdownProps) {
    super(props);

    if (process.env.NODE_ENV !== 'production') {
      // 'ariaLabel' is provided with a `label` prop that is not an empty string
      if (props.ariaLabel && (typeof props.label !== 'string' || props.label.length > 0)) {
        console.warn(
          `Cannot use 'ariaLabel' and 'label' React properties together in the <Dropdown> component. If the 'label' prop is used, it should be written for all users so that an 'ariaLabel' is not needed. The 'ariaLabel' prop is intended to be used only when the input is missing an input label (i.e when an empty string is provided for the 'label' prop)`
        );
      }
      // An empty string `label` is provided without a corresponding `ariaLabel` prop
      if (!props.ariaLabel && typeof props.label === 'string' && props.label.length === 0) {
        console.warn(
          `Please provide an 'ariaLabel' when using the <Dropdown> component without a 'label' prop.`
        );
      }
    }
  }

  render() {
    const containerProps: any = pick(this.props, FormControlPropKeys);
    const inputOnlyProps: any = omit(this.props, FormControlPropKeys);

    return (
      <FormControl
        {...containerProps}
        component="div"
        labelComponent="label"
        render={({ id, errorId, setRef, errorMessage, errorPlacement }) => (
          <Select
            {...inputOnlyProps}
            {...{ id, setRef, errorId, errorMessage, errorPlacement }}
            inversed={this.props.inversed}
          />
        )}
      />
    );
  }
}

export default Dropdown;
