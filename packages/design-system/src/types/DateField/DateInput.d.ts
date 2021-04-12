import * as React from 'react';

export type DateInputDayDefaultValue = string | number;

export type DateInputDayValue = string | number;

export type DateInputMonthDefaultValue = string | number;

export type DateInputMonthValue = string | number;

export type DateInputYearDefaultValue = string | number;

export type DateInputYearValue = string | number;

export interface DateInputProps {
  /**
   * Adds `autocomplete` attributes `bday-day`, `bday-month` and `bday-year` to the corresponding `<DateInput>` inputs
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
   * By default `dateFormatter` will be set to the `defaultDateFormatter` function, which prevents days/months more than 2 digits & years more than 4 digits.
   */
  dateFormatter?: (...args: any[]) => any;
  /**
   * Disables all three input fields.
   */
  disabled?: boolean;
  /**
   * Applies the "inverse" UI theme
   */
  inversed?: boolean;
  /**
   * A unique ID applied to the DateField label.
   */
  labelId: string,
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
  dayLabel: React.ReactNode;
  /**
   * `name` for the day `input` field
   */
  dayName: string;
  /**
   * Initial value for the day `input` field. Use this for an uncontrolled
   * component; otherwise, use the `dayValue` property.
   */
  dayDefaultValue?: DateInputDayDefaultValue;
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
  dayValue?: DateInputDayValue;
  /**
   * Label for the month field
   */
  monthLabel: React.ReactNode;
  /**
   * `name` for the month `input` field
   */
  monthName: string;
  /**
   * Initial value for the month `input` field. Use this for an uncontrolled
   * component; otherwise, use the `monthValue` property.
   */
  monthDefaultValue?: DateInputMonthDefaultValue;
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
  monthValue?: DateInputMonthValue;
  /**
   * Initial value for the year `input` field. Use this for an uncontrolled
   * component; otherwise, use the `yearValue` property.
   */
  yearDefaultValue?: DateInputYearDefaultValue;
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
  yearLabel: React.ReactNode;
  /**
   * `name` for the year field
   */
  yearName: string;
  /**
   * Sets the year input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `yearDefaultValue`.
   */
  yearValue?: DateInputYearValue;
}

export default class DateInput extends React.Component<DateInputProps, any> {
  render(): JSX.Element;
}
