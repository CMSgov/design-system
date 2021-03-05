import { FormControl, FormControlPropKeys } from '../FormControl/FormControl';
import PropTypes from 'prop-types';
import React from 'react';
import Select from './Select';
import { errorPlacementDefault } from '../flags';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

export class Dropdown extends React.PureComponent {
  constructor(props) {
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
    const containerProps = pick(this.props, FormControlPropKeys);
    const inputOnlyProps = omit(this.props, FormControlPropKeys);

    // Use errorPlacement feature flag for <Select>
    // Duplicate of errorPlacement defaulting that occurs inside <FormControl>
    const errorPlacement = this.props.errorPlacement || errorPlacementDefault();

    return (
      <FormControl
        {...containerProps}
        component="div"
        labelComponent="label"
        render={({ id, errorId, setRef }) => (
          <Select
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
   * Additional classes to be added to the error message
   */
  errorMessageClassName: PropTypes.string,
  /**
   * Location of the error message relative to the field input
   */
  errorPlacement: PropTypes.oneOf(['top', 'bottom']),
  /**
   * Additional classes to be added to the select element
   */
  fieldClassName: PropTypes.string,
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
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
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
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Dropdown;
