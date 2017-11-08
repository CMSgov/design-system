import FormLabel from '../FormLabel/FormLabel';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '../TextField/TextField';

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
    this.props.onBlur(evt, this.formatDate());
  }

  handleChange(evt) {
    this.props.onChange(evt, this.formatDate());
  }

  render() {
    const sharedDateFieldProps = {
      className: 'ds-l-col--auto',
      labelClassName: 'ds-u-margin-top--1',
      inversed: this.props.inversed,
      onBlur: this.props.onBlur && this.handleBlur,
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
            fieldClassName="ds-c-field--month"
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
            fieldClassName="ds-c-field--day"
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
            fieldClassName="ds-c-field--year"
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
  hint: 'For example: 4 25 1986',
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
  errorMessage: PropTypes.string,
  /**
   * Additional hint text to display above the individual month/day/year fields
   */
  hint: PropTypes.string,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: PropTypes.bool,
  /**
   * The primary label, rendered above the individual month/day/year fields
   */
  label: PropTypes.string,
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Called anytime any date input is blurred
   */
  onBlur: PropTypes.func,
  /**
   * Called anytime any date input is changed
   */
  onChange: PropTypes.func,
  /**
   * Label for the day field
   */
  dayLabel: PropTypes.string,
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
    * Access a reference to the day `input` element
    */
  dayFieldRef: PropTypes.func,
  /**
   * This will render a read-only field. If the field should be mutable, use
   * `dayDefaultValue`; otherwise, set `onChange`.
   */
  dayValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Label for the month field
   */
  monthLabel: PropTypes.string,
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
    * Access a reference to the month `input` element
    */
  monthFieldRef: PropTypes.func,
  /**
   * This will render a read-only field. If the field should be mutable, use
   * `monthDefaultValue`; otherwise, set `onChange`.
   */
  monthValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Initial value for the year `input` field. Use this for an uncontrolled
   * component; otherwise, use the `yearValue` property.
   */
  yearDefaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Access a reference to the year `input` element
   */
  yearFieldRef: PropTypes.func,
  /**
   * Label for the year `input` field
   */
  yearLabel: PropTypes.string,
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
   * This will render a read-only field. If the field should be mutable, use
   * `yearDefaultValue`; otherwise, set `onChange`.
   */
  yearValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default DateField;
