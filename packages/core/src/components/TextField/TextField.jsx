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
    this.id = uniqueId('textfield_');
  }

  render() {
    const FieldComponent = this.props.multiline ? 'textarea' : 'input';
    const rows = this.props.multiline && this.props.rows
      ? this.props.rows : undefined;

    const classes = classNames(
      'ds-u-clearfix', // fixes issue where the label's margin is collapsed
      this.props.className
    );
    const fieldClasses = classNames(
      'ds-c-field',
      {
        'ds-c-field--error': typeof this.props.errorMessage === 'string',
        'ds-c-field--inverse': this.props.inversed
      },
      this.props.fieldClassName
    );

    return (
      <div className={classes}>
        <FormLabel
          className={this.props.labelClassName}
          errorMessage={this.props.errorMessage}
          fieldId={this.id}
          hint={this.props.hint}
          inversed={this.props.inversed}
        >
          {this.props.label}
        </FormLabel>
        <FieldComponent
          className={fieldClasses}
          defaultValue={this.props.defaultValue}
          disabled={this.props.disabled}
          id={this.id}
          name={this.props.name}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          rows={rows}
          type={this.props.multiline ? undefined : this.props.type}
          value={this.props.value}
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
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  /**
   * Additional classes to be added to the field element
   */
  fieldClassName: PropTypes.string,
  /**
   * Additional hint text to display
   */
  hint: PropTypes.node,
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
  rows: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  /**
   * Any valid `input` [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
   */
  type: PropTypes.string,
  /**
   * **Note**: Setting this prop will render a read-only field. If the field should be
   * mutable, use `defaultValue`. Otherwise, set `onChange` or `disabled`.
   */
  value: PropTypes.string
};

export default TextField;
