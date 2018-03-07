import FormLabel from '../FormLabel/FormLabel';
import Mask from './Mask';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

/**
 * A `TextField` component renders an input field as well as supporting UI
 * elements like a label, error message, and hint text.
 */
export class TextField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.id = props.id || uniqueId('textfield_');
  }

  ariaLabel() {
    if (this.props.ariaLabel) {
      return this.props.ariaLabel;
    } else if (this.props.mask === 'currency') {
      return `${this.props.label}. Enter amount in dollars.`;
    }
  }

  /**
   * @param {React.Component} field
   * @returns {React.Component} The input field, optionally including mask
   *  markup if a mask is present
   */
  renderFieldAndMask(field) {
    const maskName = this.props.mask;

    return maskName ? (
      <div className={`ds-c-field-mask ds-c-field-mask--${maskName}`}>
        {this.renderMaskOverlay()}
        <Mask mask={maskName}>{field}</Mask>
      </div>
    ) : (
      field
    );
  }

  /**
   * UI overlayed on top of a field to support certain masks
   */
  renderMaskOverlay() {
    if (this.props.mask) {
      const content = {
        currency: '$'
      };

      return (
        <div
          className={`ds-c-field__before ds-c-field__before--${
            this.props.mask
          }`}
        >
          {content[this.props.mask]}
        </div>
      );
    }
  }

  render() {
    const {
      ariaLabel,
      className,
      labelClassName,
      fieldClassName,
      errorMessage,
      hint,
      id,
      requirementLabel,
      inversed,
      rows,
      mask,
      multiline,
      label,
      fieldRef,
      size,
      type,
      ...fieldProps
    } = this.props;

    const FieldComponent = multiline ? 'textarea' : 'input';
    const _rows = multiline && rows ? rows : undefined;

    const classes = classNames(
      'ds-u-clearfix', // fixes issue where the label's margin is collapsed
      className
    );

    const fieldClasses = classNames(
      'ds-c-field',
      mask && `ds-c-field--${mask}`,
      {
        'ds-c-field--error': typeof errorMessage === 'string',
        'ds-c-field--inverse': inversed
      },
      fieldClassName,
      size && `ds-c-field--${size}`
    );

    const field = (
      <FieldComponent
        aria-label={this.ariaLabel()}
        className={fieldClasses}
        id={this.id}
        ref={fieldRef}
        rows={_rows}
        type={multiline ? undefined : type}
        {...fieldProps}
      />
    );

    return (
      <div className={classes}>
        <FormLabel
          className={labelClassName}
          errorMessage={errorMessage}
          fieldId={this.id}
          hint={hint}
          requirementLabel={requirementLabel}
          inversed={inversed}
        >
          {label}
        </FormLabel>

        {this.renderFieldAndMask(field, mask)}
      </div>
    );
  }
}

TextField.defaultProps = {
  type: 'text'
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
   * Additional classes to be added to the field element
   */
  fieldClassName: PropTypes.string,
  /**
   * Access a reference to the `input` or `textarea` element
   */
  fieldRef: PropTypes.func,
  /**
   * Additional hint text to display
   */
  hint: PropTypes.node,
  /**
   * A unique `id` to be used on the text field.
   */
  id: PropTypes.string,
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
   * Additional classes to be added to the label
   */
  labelClassName: PropTypes.string,
  /**
   * Apply formatting to the field that's unique to the value
   * you expect to be entered. Depending on the mask, the
   * field's appearance and functionality may be affected.
   */
  mask: PropTypes.oneOf(['currency']),
  /**
   * `max` HTML input attribute
   */
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * `min` HTML input attribute
   */
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Whether or not the text field is a multiline text field
   */
  multiline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
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
   * Any valid `input` [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
   */
  type: PropTypes.string,
  /**
   * Sets the input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `defaultValue`.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default TextField;
