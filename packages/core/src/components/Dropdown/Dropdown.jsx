import FormLabel from '../FormLabel/FormLabel';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

export class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);

    if (process.env.NODE_ENV !== 'production') {
      if (props.fieldRef) {
        console.warn(
          `[Deprecated]: Please remove the 'fieldRef' prop in <Dropdown>, use 'inputRef' instead. This prop is no longer supported and will be removed in a future release.`
        );
      }
      if (props.children && props.options.length > 0) {
        console.warn(
          `Cannot use 'options' and 'children' React properties at the same time in the <Dropdown> component. Please use 'children' for custom options and 'options' for general cases`
        );
      }
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

  componentDidMount() {
    if (this.props.focusTrigger) {
      this.focusRef && this.focusRef.focus();
    }
  }

  id() {
    // Use provided custom id
    if (this.props.id) {
      return this.props.id;
    }
    // Use generated id
    if (!this._id) {
      // Cache the ID so we're not regenerating it on each method call
      this._id = uniqueId(`select_${this.props.name}_`);
    }
    return this._id;
  }

  render() {
    /* eslint-disable prefer-const */
    const {
      ariaLabel,
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
          aria-label={ariaLabel}
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
   * Adds `aria-label` attribute. When using `aria-label`, `label` should be empty string.
   */
  ariaLabel: PropTypes.string,
  /**
   * Additional classes to be added to the root element.
   */
  className: PropTypes.string,
  /**
   * Used to define custom dropdown options (i.e. option groups). When using the `children` prop, `options` should be an empty list.
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
   * @hide-prop [Deprecated] Access a reference to the `select` element. Please use `inputRef` instead.
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
   * A unique ID to be used for the dropdown field. If one isn't provided, a unique ID will be generated.
   */
  id: PropTypes.string,
  /**
   * Access a reference to the `select` element
   */
  inputRef: PropTypes.func,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: PropTypes.bool,
  /**
   * Label for the field. If using `Dropdown` without a label, provide an empty string for `label` and use the `ariaLabel` prop instead.
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
