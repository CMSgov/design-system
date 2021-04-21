import { FormControl, FormControlPropKeys } from '../FormControl/FormControl';
import PropTypes from 'prop-types';
import React from 'react';
import TextInput from './TextInput';
import classNames from 'classnames';
import { errorPlacementDefault } from '../flags';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

// TODO: Remove this export, apps shouldnt be importing `unmaskValue` from `TextField`
export { unmaskValue } from './maskHelpers';

export class TextField extends React.PureComponent {
  constructor(props) {
    super(props);

    if (process.env.NODE_ENV !== 'production') {
      if (props.type === 'number') {
        console.warn(
          `Please use the 'numeric' prop instead of 'type="number"' unless your user research suggests otherwise.`
        );
      }
    }
  }

  render() {
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

// Set component name to make child.type.displayName available to other components (eg. Autocomplete)
TextField.displayName = 'TextField';

TextField.defaultProps = {
  type: 'text',
};

TextField.propTypes = {
  /**
   * Apply an `aria-label` to the text field to provide additional
   * context to assistive devices.
   */
  ariaLabel: PropTypes.string,
  /**
   * Additional classes to be added to the root `div` element
   */
  className: PropTypes.string,
  /**
   * Sets the initial value. Use this for an uncontrolled component; otherwise,
   * use the `value` property.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
   * Additional classes to be added to the input element
   */
  fieldClassName: PropTypes.string,
  /**
   * Used to focus `input` on `componentDidMount()`
   */
  focusTrigger: PropTypes.bool,
  /**
   * Additional hint text to display
   */
  hint: PropTypes.node,
  /**
   * A unique `id` to be used on the text field.
   */
  id: PropTypes.string,
  /**
   * Access a reference to the `input` or `textarea` element
   */
  inputRef: PropTypes.func,
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel: PropTypes.node,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: PropTypes.bool,
  /**
   * Label for the input
   */
  label: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the `FormLabel`.
   */
  labelClassName: PropTypes.string,
  /**
   * A unique `id` to be used on the label field.
   */
  labelId: PropTypes.string,
  /**
   * Apply formatting to the field that's unique to the value
   * you expect to be entered. Depending on the mask, the
   * field's appearance and functionality may be affected.
   */
  mask: PropTypes.oneOf(['currency', 'phone', 'ssn', 'zip']),
  /**
   * Whether or not the text field is a multiline text field
   */
  multiline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  /**
   * Sets `inputMode`, `type`, and `pattern` to improve accessiblity and consistency for number fields. Use this prop instead of `type="number"`, see [here](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/) for more information.
   */
  numeric: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  /**
   * @hide-prop HTML `input` [pattern](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefpattern).
   */
  pattern: PropTypes.string,
  /**
   * Optionally specify the number of visible text lines for the field. Only
   * applicable if this is a multiline field.
   */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Set the max-width of the input either to `'small'` or `'medium'`.
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * HTML `input` [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#<input>_types) attribute. If you are using `type=number` please use the numeric prop instead.
   */
  type: PropTypes.string,
  /**
   * Sets the input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `defaultValue`.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TextField;
