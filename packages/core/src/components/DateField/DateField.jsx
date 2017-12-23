import FormLabel from '../FormLabel/FormLabel';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '../TextField/TextField';
import classNames from 'classnames';

export class DateField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  formatDate() {
    if (this.props.dateFormatter) {
      const values = {
        month: this.monthInput.value,
        day: this.dayInput.value,
        year: this.yearInput.value
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

  render() {
    const sharedDateFieldProps = {
      className: 'ds-l-col--auto',
      labelClassName: 'ds-u-margin-top--1',
      inversed: this.props.inversed,
      onBlur:
        (this.props.onBlur || this.props.onComponentBlur) && this.handleBlur,
      onChange: this.props.onChange && this.handleChange,
      type: 'number'
    };

    return (
      <fieldset className="ds-c-fieldset">
        <FormLabel
          component="legend"
          errorMessage={this.props.errorMessage}
          hint={this.props.hint}
          inversed={this.props.inversed}
          requirementLabel={this.props.requirementLabel}
        >
          <span className="ds-u-font-weight--bold">{this.props.label}</span>
        </FormLabel>

        <div className="ds-l-form-row">
          <TextField
            {...sharedDateFieldProps}
            fieldClassName={classNames('ds-c-field--month', {
              'ds-c-field--error': this.props.monthInvalid
            })}
            fieldRef={el => {
              this.monthInput = el;
              if (this.props.monthFieldRef) this.props.monthFieldRef(el);
            }}
            max="12"
            min="1"
            defaultValue={this.props.monthDefaultValue}
            label={this.props.monthLabel}
            name={this.props.monthName}
            value={this.props.monthValue}
          />
          <TextField
            {...sharedDateFieldProps}
            fieldClassName={classNames('ds-c-field--day', {
              'ds-c-field--error': this.props.dayInvalid
            })}
            fieldRef={el => {
              this.dayInput = el;
              if (this.props.dayFieldRef) this.props.dayFieldRef(el);
            }}
            max="31"
            min="1"
            defaultValue={this.props.dayDefaultValue}
            label={this.props.dayLabel}
            name={this.props.dayName}
            value={this.props.dayValue}
          />
          <TextField
            {...sharedDateFieldProps}
            fieldClassName={classNames('ds-c-field--year', {
              'ds-c-field--error': this.props.yearInvalid
            })}
            fieldRef={el => {
              this.yearInput = el;
              if (this.props.yearFieldRef) this.props.yearFieldRef(el);
            }}
            defaultValue={this.props.yearDefaultValue}
            label={this.props.yearLabel}
            min={this.props.yearMin}
            max={this.props.yearMax}
            name={this.props.yearName}
            value={this.props.yearValue}
          />
        </div>
      </fieldset>
    );
  }
}

DateField.defaultProps = {
  label: 'Date',
  hint: 'For example: 4/25/1986',
  dayLabel: 'Day',
  dayName: 'day',
  monthLabel: 'Month',
  monthName: 'month',
  yearLabel: 'Year',
  yearMin: 1900,
  yearName: 'year'
};

DateField.propTypes = {
  /**
   * Optional method to format the `input` field values. If this
   * method is provided, the returned value will be passed as a second argument
   * to the `onBlur` and `onChange` callbacks. This method receives an object as
   * its only argument, in the shape of: `{ day, month, year }`
   */
  dateFormatter: PropTypes.func,
  errorMessage: PropTypes.node,
  /**
   * Additional hint text to display above the individual month/day/year fields
   */
  hint: PropTypes.node,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: PropTypes.bool,
  /**
   * The primary label, rendered above the individual month/day/year fields
   */
  label: PropTypes.node,
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel: PropTypes.node,
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
  dayLabel: PropTypes.node,
  /**
   * `name` for the day `input` field
   */
  dayName: PropTypes.string,
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
  monthLabel: PropTypes.node,
  /**
   * `name` for the month `input` field
   */
  monthName: PropTypes.string,
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
  yearLabel: PropTypes.node,
  /**
   * Max value for the year `input` field
   */
  yearMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Minimum value for the year `input` field
   */
  yearMin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * `name` for the year field
   */
  yearName: PropTypes.string,
  /**
   * Sets the year input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `yearDefaultValue`.
   */
  yearValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default DateField;
