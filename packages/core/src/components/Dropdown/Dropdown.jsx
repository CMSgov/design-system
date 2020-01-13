import FormLabel from '../FormLabel/FormLabel';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

export class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);

    if (process.env.NODE_ENV === 'development') {
      if (props.fieldRef) {
        console.error(
          `[Deprecated]: Please remove the React property 'fieldRef' for the <Dropdown> component. It is no longer supported and will be removed in a future release, use 'inputRef' instead.`
        );
      }
      if (props.children && props.options.length > 0) {
        console.error(
          `Cannot use 'options' and 'children' React properties at the same time in the <Dropdown> component. Please use 'children' for custom options and 'options' for general cases`
        );
      }
    }
  }

  componentDidMount() {
    if (this.props.focusTrigger) {
      this.focusRef && this.focusRef.focus();
    }
  }

  id() {
    if (!this._id) {
      // Cache the ID so we're not regenerating it on each method call
      this._id = uniqueId(`select_${this.props.name}_`);
    }
    return this._id;
  }

  render() {
    /* eslint-disable prefer-const */
    const {
      className,
      children,
      errorMessage,
      fieldClassName,
      fieldRef,
      focusTrigger,
      hint,
      inputRef,
      inversed,
      label,
      labelClassName,
      options,
      requirementLabel,
      size,
      ...selectProps
    } = this.props;
    /* eslint-enable prefer-const */

    const classes = classNames(className);
    const fieldClasses = classNames(
      'ds-c-field',
      { 'ds-c-field--inverse': inversed },
      size && `ds-c-field--${size}`,
      fieldClassName
    );

    const optionElements = options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));

    return (
      <div className={classes}>
        <FormLabel
          className={labelClassName}
          component={'label'}
          errorMessage={errorMessage}
          fieldId={this.id()}
          hint={hint}
          requirementLabel={requirementLabel}
          inversed={inversed}
        >
          {label}
        </FormLabel>
        <select
          className={fieldClasses}
          id={this.id()}
          /* eslint-disable no-return-assign */
          ref={ref => {
            if (focusTrigger) {
              this.focusRef = ref;
            } else {
              if (inputRef) {
                inputRef(ref);
              }
              if (fieldRef) {
                fieldRef(ref);
              }
            }
          }}
          /* eslint-enable no-return-assign */
          {...selectProps}
        >
          {/* Render custom options if provided */
          children || optionElements}
        </select>
      </div>
    );
  }
}

Dropdown.propTypes = {
  /**
   * Adds `aria-label` attribute if component renders a select
   */
  ariaLabel: PropTypes.string,
  /**
   * Additional classes to be added to the root element.
   */
  className: PropTypes.string,
  /**
   * Optional prop for defining custom dropdown options. When using the `children` prop, `options` should be an empty list.
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
  errorMessage: PropTypes.node,
  /**
   * Additional classes to be added to the select element
   */
  fieldClassName: PropTypes.string,
  /**
   * (Deprecated) Access a reference to the `select` element
   */
  fieldRef: PropTypes.func,
  /**
   * Used to focus `select` on `componentDidMount()`
   */
  focusTrigger: PropTypes.bool,
  /**
   * Additional hint text to display
   */
  hint: PropTypes.node,
  /**
   * Access a reference to the `select` element
   */
  inputRef: PropTypes.func,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: PropTypes.bool,
  /**
   * Label for the field
   */
  label: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the `FormLabel`.
   */
  labelClassName: PropTypes.string,
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
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    })
  ).isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel: PropTypes.node,
  /**
   * If the component renders a select, set the max-width of the input either to `'small'` or `'medium'`.
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * Sets the field's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `defaultValue`.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Dropdown;
