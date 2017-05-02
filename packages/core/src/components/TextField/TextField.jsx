import FormLabel from '../FormLabel/FormLabel';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

/**
The `TextField` component affords a user to type text into a form.
By default it renders a field for capturing a single line of text,
but can be configured to support multiline text.
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
   * Additional classes to be added to the root element
   */
  className: PropTypes.string,
  /**
   * Default value of the text field, if any. Use this for an uncontrolled
   * component; otherwise, use the `value` property
   */
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  /**
   * Additional classes to be added to the field element
   */
  fieldClassName: PropTypes.string,
  /**
   * Hint text
   */
  hint: PropTypes.node,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: PropTypes.bool,
  /**
   * The label for the entire list of choices
   */
  label: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the `FormLabel`
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
   * Optionally specify the number of visible text lines for the control. Only
   * applicable if this is a multiline field
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
   * Current value of the text field. Use this for a controlled component where
   * you are maintaining its current state; otherwise, use the `defaultValue` property
   */
  value: PropTypes.string
};

export default TextField;
