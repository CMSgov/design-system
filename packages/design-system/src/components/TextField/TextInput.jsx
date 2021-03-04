import Mask from './Mask';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

/**
 * <TextInput> is an internal component used by <TextField>, which wraps it and handles shared form UI like labels, error messages, etc
 * <TextInput> is also exported for advanced design system use cases, where the internal component can be leveraged to build custom form components
 * As an internal component, it's subject to more breaking changes. Exercise caution using <TextInput> outside of those special cases
 */
export function TextInput(props) {
  const {
    ariaLabel,
    errorId,
    errorMessage,
    errorPlacement,
    fieldClassName,
    inversed,
    mask,
    multiline,
    numeric,
    rows,
    size,
    setRef,
    type,
    pattern,
    ...inputProps
  } = props;

  const classes = classNames(
    'ds-c-field',
    {
      'ds-c-field--error': errorMessage,
      'ds-c-field--inverse': inversed,
    },
    mask && `ds-c-field--${mask}`,
    size && `ds-c-field--${size}`,
    fieldClassName
  );

  let inputType = type;
  if (numeric) {
    inputType = 'text';
  } else if (multiline) {
    inputType = undefined;
  }

  const ComponentType = multiline ? 'textarea' : 'input';

  /* eslint-disable react/prop-types */
  const ariaAttributes = {
    'aria-label': ariaLabel,
    // Use set `aria-invalid` based off errorMessage unless manually specified
    'aria-invalid': props['aria-invalid'] ? props['aria-invalid'] : !!errorMessage,
    // Link input to bottom placed error message
    'aria-describedby':
      errorPlacement === 'bottom' && errorMessage
        ? classNames(props['aria-describedby'], errorId)
        : undefined,
  };
  /* eslint-enable react/prop-types */

  const field = (
    <ComponentType
      {...ariaAttributes}
      className={classes}
      ref={setRef}
      rows={multiline && rows ? rows : undefined}
      inputMode={numeric ? 'numeric' : undefined}
      pattern={numeric && !pattern ? '[0-9]*' : pattern}
      type={inputType}
      {...inputProps}
    />
  );

  return mask ? <Mask mask={mask}>{field}</Mask> : field;
}

TextInput.propTypes = {
  /**
   * Apply an `aria-label` to the text field to provide additional
   * context to assistive devices.
   */
  ariaLabel: PropTypes.string,
  /**
   * Sets the initial value. Use this for an uncontrolled component; otherwise,
   * use the `value` property.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
   * Additional classes to be added to the input element
   */
  fieldClassName: PropTypes.string,
  /**
   * A unique ID to be used for the input field.
   */
  id: PropTypes.string.isRequired,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: PropTypes.bool,
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
  name: PropTypes.string,
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
  setRef: PropTypes.func,
  /**
   * Set the max-width of the input either to `'small'` or `'medium'`.
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * HTML `input` [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#<input>_types) attribute. If you are using `type=number` please use the numeric prop instead.
   */
  type: PropTypes.string.isRequired,
  /**
   * Sets the input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `defaultValue`.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TextInput;
