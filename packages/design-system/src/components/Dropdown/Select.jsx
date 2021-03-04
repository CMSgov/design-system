import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

/**
 * <Select> is an internal component used by <Dropdown>, which wraps it and handles common form controls like labels, error messages, etc
 * <Select> is also exported for advanced design system use cases, where the internal component can be leveraged to build custom form components
 * As an internal component, it's subject to more breaking changes. Exercise caution using <Select> outside of those special cases
 */
export class Select extends React.PureComponent {
  constructor(props) {
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

    /* eslint-disable react/prop-types */
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
    /* eslint-enable react/prop-types */

    return (
      <select {...ariaAttributes} className={classes} ref={setRef} {...selectProps}>
        {/* Render custom options if provided */ children || optionElements}
      </select>
    );
  }
}

Select.propTypes = {
  /**
   * Adds `aria-label` attribute. When using `aria-label`, `label` should be empty string.
   */
  ariaLabel: PropTypes.string,
  /**
   * Used to define custom Select options (i.e. option groups). When using the `children` prop, `options` should be an empty list.
   */
  children: PropTypes.node,
  /**
   * Sets the initial selected state. Use this for an uncontrolled component;
   * otherwise, use the `value` property.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Disables the entire field.
   */
  disabled: PropTypes.bool,
  /**
   * The ID of the error message applied to the Select field.
   */
  errorId: PropTypes.string,
  errorMessage: PropTypes.node,
  /**
   * Location of the error message relative to the field input
   */
  errorPlacement: PropTypes.oneOf(['top', 'bottom']).isRequired,
  /**
   * Additional classes to be added to the select element
   */
  fieldClassName: PropTypes.string,
  /**
   * A unique ID to be used for the Select field.
   */
  id: PropTypes.string.isRequired,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: PropTypes.bool,
  /**
   * The field's `name` attribute
   */
  name: PropTypes.string.isRequired,
  /**
   * The list of options to be rendered. Provide an empty list if using custom options via the `children` prop.
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    })
  ).isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  setRef: PropTypes.func,
  /**
   * If the component renders a select, set the max-width of the input either to `'small'` or `'medium'`.
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * Sets the field's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `defaultValue`.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Select;
