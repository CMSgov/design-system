import PropTypes from 'prop-types';
import React from 'react';
import TextField from '../TextField/TextField';
import classNames from 'classnames';

export class DateInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  formatDate() {
    if (this.props.dateFormatter && this.monthInput && this.dayInput && this.yearInput) {
      const values = {
        month: this.monthInput.value,
        day: this.dayInput.value,
        year: this.yearInput.value,
      };
      return this.props.dateFormatter(values);
    }
  }

  handleBlur(evt) {
    if (this.props.onBlur) {
      this.props.onBlur(evt, this.formatDate());
    }

    if (this.props.onComponentBlur) {
      this.handleComponentBlur(evt);
    }
  }

  handleChange(evt) {
    this.props.onChange(evt, this.formatDate());
  }

  handleComponentBlur(evt) {
    // The active element is always the document body during a focus
    // transition, so in order to check if the newly focused element
    // is one of our other date inputs, we're going to have to wait
    // a bit.
    setTimeout(() => {
      if (
        document.activeElement !== this.dayInput &&
        document.activeElement !== this.monthInput &&
        document.activeElement !== this.yearInput
      ) {
        this.props.onComponentBlur(evt, this.formatDate());
      }
    }, 20);
  }

  renderField(type) {
    const sharedTextFieldProps = {
      className: 'ds-l-col--auto',
      labelClassName: 'ds-c-datefield__label',
      disabled: this.props.disabled,
      inversed: this.props.inversed,
      onBlur: (this.props.onBlur || this.props.onComponentBlur) && this.handleBlur,
      onChange: this.props.onChange && this.handleChange,
      numeric: true,
    };

    return (
      <TextField
        {...sharedTextFieldProps}
        defaultValue={this.props[`${type}DefaultValue`]}
        value={this.props[`${type}Value`]}
        label={this.props[`${type}Label`]}
        name={this.props[`${type}Name`]}
        fieldClassName={classNames(`ds-c-field--${type}`, {
          'ds-c-field--error': this.props[`${type}Invalid`],
        })}
        inputRef={(el) => {
          this[`${type}Input`] = el;
          if (this.props[`${type}FieldRef`]) this.props[`${type}FieldRef`](el);
        }}
        autoComplete={this.props.autoComplete && `bday-${type}`}
        aria-describedby={this.props.labelId}
        aria-invalid={this.props[`${type}Invalid`]}
      />
    );
  }

  render() {
    return (
      <div className="ds-l-form-row ds-u-align-items--end">
        {this.renderField('month')}
        <span className="ds-c-datefield__separator">/</span>
        {this.renderField('day')}
        <span className="ds-c-datefield__separator">/</span>
        {this.renderField('year')}
      </div>
    );
  }
}

DateInput.propTypes = {
  /**
   * Adds `autocomplete` attributes `bday-day`, `bday-month` and `bday-year` to the corresponding `<DateInput>` inputs
   */
  autoComplete: PropTypes.bool,
  /**
   * Additional classes to be added to the root fieldset element
   */
  className: PropTypes.string,
  /**
   * Optional method to format the `input` field values. If this
   * method is provided, the returned value will be passed as a second argument
   * to the `onBlur` and `onChange` callbacks. This method receives an object as
   * its only argument, in the shape of: `{ day, month, year }`
   *
   * By default `dateFormatter` will be set to the `defaultDateFormatter` function, which prevents days/months more than 2 digits & years more than 4 digits.
   */
  dateFormatter: PropTypes.func,
  /**
   * Disables all three input fields.
   */
  disabled: PropTypes.bool,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: PropTypes.bool,
  /**
   * A unique ID applied to the DateField label.
   */
  labelId: PropTypes.string.isRequired,
  /**
   * Called anytime any date input is blurred
   */
  onBlur: PropTypes.func,
  /**
   * Called when any date input is blurred and the focus does not land on one
   * of the other date inputs inside this component (i.e., when the whole
   * component loses focus)
   */
  onComponentBlur: PropTypes.func,
  /**
   * Called anytime any date input is changed
   */
  onChange: PropTypes.func,
  /**
   * Label for the day field
   */
  dayLabel: PropTypes.node.isRequired,
  /**
   * `name` for the day `input` field
   */
  dayName: PropTypes.string.isRequired,
  /**
   * Initial value for the day `input` field. Use this for an uncontrolled
   * component; otherwise, use the `dayValue` property.
   */
  dayDefaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Access a reference to the day `input`
   */
  dayFieldRef: PropTypes.func,
  /**
   * Apply error styling to the day `input`
   */
  dayInvalid: PropTypes.bool,
  /**
   * Sets the day input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `dayDefaultValue`.
   */
  dayValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Label for the month field
   */
  monthLabel: PropTypes.node.isRequired,
  /**
   * `name` for the month `input` field
   */
  monthName: PropTypes.string.isRequired,
  /**
   * Initial value for the month `input` field. Use this for an uncontrolled
   * component; otherwise, use the `monthValue` property.
   */
  monthDefaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Access a reference to the month `input`
   */
  monthFieldRef: PropTypes.func,
  /**
   * Apply error styling to the month `input`
   */
  monthInvalid: PropTypes.bool,
  /**
   * Sets the month input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `monthDefaultValue`.
   */
  monthValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Initial value for the year `input` field. Use this for an uncontrolled
   * component; otherwise, use the `yearValue` property.
   */
  yearDefaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Access a reference to the year `input`
   */
  yearFieldRef: PropTypes.func,
  /**
   * Apply error styling to the year `input`
   */
  yearInvalid: PropTypes.bool,
  /**
   * Label for the year `input` field
   */
  yearLabel: PropTypes.node.isRequired,
  /**
   * `name` for the year field
   */
  yearName: PropTypes.string.isRequired,
  /**
   * Sets the year input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `yearDefaultValue`.
   */
  yearValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DateInput;
