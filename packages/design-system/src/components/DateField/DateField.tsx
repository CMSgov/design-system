import { FormControl, FormControlPropKeys } from '../FormControl/FormControl';
import DateInput from './DateInput';
import React from 'react';
import defaultDateFormatter from './defaultDateFormatter';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

export type DateFieldDayDefaultValue = string | number;
export type DateFieldDayValue = string | number;
export type DateFieldMonthDefaultValue = string | number;
export type DateFieldMonthValue = string | number;
export type DateFieldYearDefaultValue = string | number;
export type DateFieldYearValue = string | number;

export interface DateFieldProps {
  /**
   * Adds `autocomplete` attributes `bday-day`, `bday-month` and `bday-year` to the corresponding `<DateField>` inputs
   */
  autoComplete?: boolean;
  /**
   * Additional classes to be added to the root fieldset element
   */
  className?: string;
  /**
   * Optional method to format the `input` field values. If this
   * method is provided, the returned value will be passed as a second argument
   * to the `onBlur` and `onChange` callbacks. This method receives an object as
   * its only argument, in the shape of: `{ day, month, year }`
   *
   * By default `dateFormatter` will be set to the `defaultDateFormatter` function, which prevents days/months more than 2 digits & years more than 4 digits.
   */
  dateFormatter?: typeof defaultDateFormatter;
  disabled?: boolean;
  errorMessage?: React.ReactNode;
  /**
   * Additional classes to be added to the error message
   */
  errorMessageClassName?: string;
  /**
   * Location of the error message relative to the field input
   */
  errorPlacement?: 'top' | 'bottom';
  /**
   * Additional hint text to display above the individual month/day/year fields
   */
  hint?: React.ReactNode;
  /**
   * Applies the "inverse" UI theme
   */
  inversed?: boolean;
  /**
   * The primary label, rendered above the individual month/day/year fields
   */
  label?: React.ReactNode;
  /**
   * A unique ID to be used for the DateField label. If one isn't provided, a unique ID will be generated.
   */
  labelId?: string;
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel?: React.ReactNode;
  /**
   * Called anytime any date input is blurred
   */
  onBlur?: (...args: any[]) => any;
  /**
   * Called when any date input is blurred and the focus does not land on one
   * of the other date inputs inside this component (i.e., when the whole
   * component loses focus)
   */
  onComponentBlur?: (...args: any[]) => any;
  /**
   * Called anytime any date input is changed
   */
  onChange?: (...args: any[]) => any;
  /**
   * Label for the day field
   */
  dayLabel?: React.ReactNode;
  /**
   * `name` for the day `input` field
   */
  dayName?: string;
  /**
   * Initial value for the day `input` field. Use this for an uncontrolled
   * component; otherwise, use the `dayValue` property.
   */
  dayDefaultValue?: DateFieldDayDefaultValue;
  /**
   * Access a reference to the day `input`
   */
  dayFieldRef?: (...args: any[]) => any;
  /**
   * Apply error styling to the day `input`
   */
  dayInvalid?: boolean;
  /**
   * Sets the day input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `dayDefaultValue`.
   */
  dayValue?: DateFieldDayValue;
  /**
   * Label for the month field
   */
  monthLabel?: React.ReactNode;
  /**
   * `name` for the month `input` field
   */
  monthName?: string;
  /**
   * Initial value for the month `input` field. Use this for an uncontrolled
   * component; otherwise, use the `monthValue` property.
   */
  monthDefaultValue?: DateFieldMonthDefaultValue;
  /**
   * Access a reference to the month `input`
   */
  monthFieldRef?: (...args: any[]) => any;
  /**
   * Apply error styling to the month `input`
   */
  monthInvalid?: boolean;
  /**
   * Sets the month input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `monthDefaultValue`.
   */
  monthValue?: DateFieldMonthValue;
  /**
   * Initial value for the year `input` field. Use this for an uncontrolled
   * component; otherwise, use the `yearValue` property.
   */
  yearDefaultValue?: DateFieldYearDefaultValue;
  /**
   * Access a reference to the year `input`
   */
  yearFieldRef?: (...args: any[]) => any;
  /**
   * Apply error styling to the year `input`
   */
  yearInvalid?: boolean;
  /**
   * Label for the year `input` field
   */
  yearLabel?: React.ReactNode;
  /**
   * `name` for the year field
   */
  yearName?: string;
  /**
   * Sets the year input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `yearDefaultValue`.
   */
  yearValue?: DateFieldYearValue;
}

export function DateField(props: DateFieldProps): React.ReactElement {
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

export default DateField;
