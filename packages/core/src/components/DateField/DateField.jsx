import FormLabel from '../FormLabel/FormLabel';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '../TextField/TextField';

export function DateField(props) {
  const sharedDateFieldProps = {
    className: 'ds-l-col--auto',
    labelClassName: 'ds-u-margin-top--1',
    inversed: props.inversed,
    onBlur: props.onBlur,
    onChange: props.onChange,
    type: 'number'
  };

  return (
    <fieldset className="ds-c-fieldset">
      <FormLabel
        component="legend"
        errorMessage={props.errorMessage}
        hint={props.hint}
        inversed={props.inversed}
        requirementLabel={props.requirementLabel}
      >
        <span className="ds-u-font-weight--bold">{props.label}</span>
      </FormLabel>

      <div className="ds-l-form-row">
        <TextField
          {...sharedDateFieldProps}
          fieldClassName="ds-c-field--month"
          max="12"
          min="1"
          defaultValue={props.monthDefaultValue}
          label={props.monthLabel}
          name={props.monthName}
          value={props.monthValue}
        />
        <TextField
          {...sharedDateFieldProps}
          fieldClassName="ds-c-field--day"
          max="31"
          min="1"
          defaultValue={props.dayDefaultValue}
          label={props.dayLabel}
          name={props.dayName}
          value={props.dayValue}
        />
        <TextField
          {...sharedDateFieldProps}
          fieldClassName="ds-c-field--year"
          defaultValue={props.yearDefaultValue}
          label={props.yearLabel}
          min={props.yearMin}
          max={props.yearMax}
          name={props.yearName}
          value={props.yearValue}
        />
      </div>
    </fieldset>
  );
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
   * The primary label, rendered above the individual month/day/year fields
   */
  label: PropTypes.string,
  /**
   * Additional hint text to display above the individual month/day/year fields
   */
  hint: PropTypes.string,
  errorMessage: PropTypes.string,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: PropTypes.bool,
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
   * Label for the day input field
   */
  dayLabel: PropTypes.string,
  /**
   * `name` for the day input field
   */
  dayName: PropTypes.string,
  /**
   * Initial value for the day input field. Use this for an uncontrolled
   * component; otherwise, use the `dayValue` property.
   */
  dayDefaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * This will render a read-only field. If the field should be mutable, use
   * `dayDefaultValue`; otherwise, set `onChange`.
   */
  dayValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Label for the month input field
   */
  monthLabel: PropTypes.string,
  /**
   * `name` for the month input field
   */
  monthName: PropTypes.string,
  /**
   * Initial value for the month input field. Use this for an uncontrolled
   * component; otherwise, use the `monthValue` property.
   */
  monthDefaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * This will render a read-only field. If the field should be mutable, use
   * `monthDefaultValue`; otherwise, set `onChange`.
   */
  monthValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Label for the year input field
   */
  yearLabel: PropTypes.string,
  /**
   * Max value for the year input field
   */
  yearMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Minimum value for the year input field
   */
  yearMin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * `name` for the year input field
   */
  yearName: PropTypes.string,
  /**
   * Initial value for the year input field. Use this for an uncontrolled
   * component; otherwise, use the `yearValue` property.
   */
  yearDefaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * This will render a read-only field. If the field should be mutable, use
   * `yearDefaultValue`; otherwise, set `onChange`.
   */
  yearValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default DateField;
