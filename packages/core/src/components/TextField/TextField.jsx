import FormLabel from '../FormLabel/FormLabel';
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

  render() {
    const {
      className,
      labelClassName,
      fieldClassName,
      errorMessage,
      hint,
      id,
      requirementLabel,
      inversed,
      rows,
      multiline,
      label,
      fieldRef,
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
      {
        'ds-c-field--error': typeof errorMessage === 'string',
        'ds-c-field--inverse': inversed
      },
      fieldClassName
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
        <FieldComponent
          className={fieldClasses}
          id={this.id}
          ref={fieldRef}
          rows={_rows}
          type={multiline ? undefined : type}
          {...fieldProps}
        />
      </div>
    );
  }
}

TextField.defaultProps = {
  type: 'text'
};

TextField.propTypes = {
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
   * `max` HTML input attribute
   */
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * `min` HTML input attribute
   */
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Whether or not the textfield is a multiline textfield
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
