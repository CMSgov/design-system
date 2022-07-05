import React from 'react';
import classNames from 'classnames';

export type SelectDefaultValue = number | string;

export interface SelectOptions {
  label: React.ReactNode;
  value: number | string;
}

export type SelectSize = 'small' | 'medium';

export type SelectValue = number | string;

export type SelectErrorPlacement = 'top' | 'bottom';

export interface SelectProps {
  /**
   * Adds `aria-label` attribute. When using `aria-label`, `label` should be empty string.
   */
  ariaLabel?: string;
  /**
   * Used to define custom Select options (i.e. option groups). When using the `children` prop, `options` should be an empty list.
   */
  children?: React.ReactNode;
  /**
   * Sets the initial selected state. Use this for an uncontrolled component;
   * otherwise, use the `value` property.
   */
  defaultValue?: SelectDefaultValue;
  /**
   * Disables the entire field.
   */
  disabled?: boolean;
  /**
   * The ID of the error message applied to the Select field.
   */
  errorId?: string;
  errorMessage?: React.ReactNode;
  /**
   * Location of the error message relative to the field input
   */
  errorPlacement: SelectErrorPlacement;
  /**
   * Additional classes to be added to the select element
   */
  fieldClassName?: string;
  /**
   * A unique ID to be used for the Select field.
   */
  id: string;
  /**
   * Applies the "inverse" UI theme
   */
  inversed?: boolean;
  /**
   * The field's `name` attribute
   */
  name: string;
  /**
   * The list of options to be rendered. Provide an empty list if using custom options via the `children` prop.
   */
  options: SelectOptions[];
  onBlur?: (...args: any[]) => any;
  onChange?: (...args: any[]) => any;
  setRef?: (...args: any[]) => any;
  /**
   * If the component renders a select, set the max-width of the input either to `'small'` or `'medium'`.
   */
  size?: SelectSize;
  /**
   * Sets the field's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `defaultValue`.
   */
  value?: SelectValue;
}

type OmitProps = 'size' | 'value';

/**
 * `<Select>` is an internal component used by `<Dropdown>`, which wraps it and handles common form controls like labels, error messages, etc
 * `<Select/>` is also exported for advanced design system use cases, where the internal component can be leveraged to build custom form components
 * As an internal component, it's subject to more breaking changes. Exercise caution using `<Select>` outside of those special cases
 */
export class Select extends React.PureComponent<
  Omit<React.ComponentPropsWithoutRef<'select'>, OmitProps> & SelectProps,
  any
> {
  constructor(props: SelectProps) {
    super(props);

    if (process.env.NODE_ENV !== 'production') {
      if (props.children && props.options.length > 0) {
        console.warn(
          `Cannot use 'options' and 'children' React properties at the same time in the <Select> component. Please use 'children' for custom options and 'options' for general cases`
        );
      }
    }
  }

  render() {
    // Select specific props
    const {
      ariaLabel,
      children,
      errorId,
      errorMessage,
      errorPlacement,
      fieldClassName,
      inversed,
      options,
      size,
      setRef,
      ...selectProps
    } = this.props;

    const classes = classNames(
      'ds-c-field',
      {
        'ds-c-field--error': errorMessage,
        'ds-c-field--inverse': inversed,
      },
      size && `ds-c-field--${size}`,
      fieldClassName
    );

    const optionElements = options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));

    const ariaAttributes = {
      'aria-label': ariaLabel,
      // Use set `aria-invalid` based off errorMessage unless manually specified
      'aria-invalid': this.props['aria-invalid'] ? this.props['aria-invalid'] : !!errorMessage,
      // Link input to bottom placed error message
      'aria-describedby':
        errorPlacement === 'bottom' && errorMessage
          ? classNames(this.props['aria-describedby'], errorId)
          : undefined,
    };

    return (
      <select {...ariaAttributes} className={classes} ref={setRef} {...selectProps}>
        {/* Render custom options if provided */ children || optionElements}
      </select>
    );
  }
}

export default Select;
