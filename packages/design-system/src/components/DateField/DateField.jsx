import FormLabel from '../FormLabel/FormLabel';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '../TextField/TextField';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

// Prevents day/month greater than 2 digits and year greater than 4 digits
const standardLengthFormatter = ({ day, month, year }) => ({
  day: day.length > 2 ? day.substring(0, 2) : day,
  month: month.length > 2 ? month.substring(0, 2) : month,
  year: year.length > 4 ? year.substring(0, 4) : year
});

export const defaultDateFormatter = dateObject => {
  const standardDate = standardLengthFormatter(dateObject);
  return standardDate;
};

export class DateField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  labelId() {
    if (!this._labelId) {
      // Cache the ID so we're not regenerating it on each method call
      this._labelId = uniqueId('datefield_label_');
    }

    return this._labelId;
  }

  formatDate() {
    if (this.props.dateFormatter && this.monthInput && this.dayInput && this.yearInput) {
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
      labelClassName: 'ds-u-font-weight--normal ds-u-margin-top--1',
      inversed: this.props.inversed,
      onBlur: (this.props.onBlur || this.props.onComponentBlur) && this.handleBlur,
      onChange: this.props.onChange && this.handleChange,
      numeric: true
    };
    const labelId = this.labelId();

    return (
      <fieldset className="ds-c-fieldset">
        <FormLabel
          component="legend"
          errorMessage={this.props.errorMessage}
          hint={this.props.hint}
          inversed={this.props.inversed}
          requirementLabel={this.props.requirementLabel}
          id={labelId}
        >
          {this.props.label}
        </FormLabel>

        <div className="ds-l-form-row ds-u-align-items--end">
          <TextField
            {...sharedDateFieldProps}
            fieldClassName={classNames('ds-c-field--month', {
              'ds-c-field--error': this.props.monthInvalid
            })}
            inputRef={el => {
              this.monthInput = el;
              if (this.props.monthFieldRef) this.props.monthFieldRef(el);
            }}
            defaultValue={this.props.monthDefaultValue}
            label={this.props.monthLabel}
            name={this.props.monthName}
            value={this.props.monthValue}
            aria-describedby={labelId}
          />
          <span className="ds-c-datefield__separator">/</span>
          <TextField
            {...sharedDateFieldProps}
            fieldClassName={classNames('ds-c-field--day', {
              'ds-c-field--error': this.props.dayInvalid
            })}
            inputRef={el => {
              this.dayInput = el;
              if (this.props.dayFieldRef) this.props.dayFieldRef(el);
            }}
            defaultValue={this.props.dayDefaultValue}
            label={this.props.dayLabel}
            name={this.props.dayName}
            value={this.props.dayValue}
            aria-describedby={labelId}
          />
          <span className="ds-c-datefield__separator">/</span>
          <TextField
            {...sharedDateFieldProps}
            fieldClassName={classNames('ds-c-field--year', {
              'ds-c-field--error': this.props.yearInvalid
            })}
            inputRef={el => {
              this.yearInput = el;
              if (this.props.yearFieldRef) this.props.yearFieldRef(el);
            }}
            defaultValue={this.props.yearDefaultValue}
            label={this.props.yearLabel}
            name={this.props.yearName}
            value={this.props.yearValue}
            aria-describedby={labelId}
          />
        </div>
      </fieldset>
    );
  }
}

DateField.defaultProps = {
  label: 'Date',
  hint: 'For example: 4 / 28 / 1986',
  dayLabel: 'Day',
  dayName: 'day',
  monthLabel: 'Month',
  monthName: 'month',
  yearLabel: 'Year',
  yearName: 'year',
  dateFormatter: defaultDateFormatter
};

DateField.propTypes = {
  /**
   * Optional method to format the `input` field values. If this
   * method is provided, the returned value will be passed as a second argument
   * to the `onBlur` and `onChange` callbacks. This method receives an object as
   * its only argument, in the shape of: `{ day, month, year }`
   *
   * By default `dateFormatter` will be set to the `defaultDateFormatter` function, which prevents days/months more than 2 digits & years more than 4 digits.
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
