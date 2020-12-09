import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

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
      className,
      fieldId,
      options,
      size,
      setRef,
      ...selectProps
    } = this.props;

    const classes = classNames('ds-c-field', size && `ds-c-field--${size}`, className);

    const optionElements = options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));

    return (
      <select aria-label={ariaLabel} className={classes} id={fieldId} ref={setRef} {...selectProps}>
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
   * Additional classes to be added to the select element
   */
  className: PropTypes.string,
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
   * A unique ID to be used for the Select field. If one isn't provided, a unique ID will be generated.
   */
  fieldId: PropTypes.string,
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
  setRef: PropTypes.function,
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
