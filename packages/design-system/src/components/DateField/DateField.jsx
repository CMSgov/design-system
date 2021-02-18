import { FormControl, FormControlPropKeys } from '../FormControl/FormControl';
import DateInput from './DateInput';
import PropTypes from 'prop-types';
import React from 'react';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

// Prevents day/month greater than 2 digits and year greater than 4 digits
const standardLengthFormatter = ({ day, month, year }) => ({
  day: day.length > 2 ? day.substring(0, 2) : day,
  month: month.length > 2 ? month.substring(0, 2) : month,
  year: year.length > 4 ? year.substring(0, 4) : year,
});

export const defaultDateFormatter = (dateObject) => standardLengthFormatter(dateObject);

export function DateField(props) {
  const containerProps = pick(props, FormControlPropKeys);
  const inputOnlyProps = omit(props, FormControlPropKeys);

  return (
    <FormControl
      {...containerProps}
      component="fieldset"
      labelComponent="legend"
      render={({ labelId }) => (
        <DateInput {...inputOnlyProps} {...{ labelId }} inversed={props.inversed} />
      )}
    />
  );
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
  dateFormatter: defaultDateFormatter,
};

DateField.propTypes = {
  /**
   * Adds `autocomplete` attributes `bday-day`, `bday-month` and `bday-year` to the corresponding `<DateField>` inputs
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
  errorMessage: PropTypes.node,
  /**
   * Additional classes to be added to the error message
   */
  errorMessageClassName: PropTypes.string,
  /**
   * Location of the error message relative to the field input
   */
  errorPlacement: PropTypes.oneOf(['top', 'bottom']),
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
   * A unique ID to be used for the DateField label. If one isn't provided, a unique ID will be generated.
   */
  labelId: PropTypes.string,
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
  yearValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DateField;
