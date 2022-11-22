import React from 'react';
import { DateObject } from './defaultDateFormatter';
import React, { MutableRefObject } from 'react';
import TextField from '../TextField/TextField';
import classNames from 'classnames';
import { t } from '../i18n';

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
  labelId: string;
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
  dayName: string;
  /**
   * Initial value for the day `input` field. Use this for an uncontrolled
   * component; otherwise, use the `dayValue` property.
   */
  dayDefaultValue?: DateInputDayDefaultValue;
  /**
   * Access a reference to the day `input`
   */
  dayFieldRef?: MutableRefObject<any> | ((...args: any[]) => any);
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
  monthLabel?: React.ReactNode;
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
  monthFieldRef?: MutableRefObject<any> | ((...args: any[]) => any);
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
  yearFieldRef?: MutableRefObject<any> | ((...args: any[]) => any);
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
  yearName: string;
  /**
   * Sets the year input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `yearDefaultValue`.
   */
  yearValue?: DateInputYearValue;
}

export class DateInput extends React.PureComponent<DateInputProps> {
  constructor(props: DateInputProps) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  monthInput: any;
  dayInput: any;
  yearInput: any;

  formatDate(): DateObject {
    if (this.props.dateFormatter && this.monthInput && this.dayInput && this.yearInput) {
      const values = {
        month: this.monthInput.value,
        day: this.dayInput.value,
        year: this.yearInput.value,
      };
      return this.props.dateFormatter(values);
    }
  }

  handleBlur(evt: React.FocusEvent<HTMLInputElement>): void {
    if (this.props.onBlur) {
      this.props.onBlur(evt, this.formatDate());
    }

    if (this.props.onComponentBlur) {
      this.handleComponentBlur(evt);
    }
  }

  handleChange(evt: React.ChangeEvent<HTMLInputElement>): void {
    this.props.onChange(evt, this.formatDate());
  }

  handleComponentBlur(evt: React.FocusEvent<HTMLInputElement>): void {
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

  renderField(type: 'day' | 'month' | 'year', maxLength: number): React.ReactNode {
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
        label={this.props[`${type}Label`] ?? t(`dateField.${type}Label`)}
        name={this.props[`${type}Name`]}
        maxLength={maxLength}
        fieldClassName={classNames(`ds-c-field--${type}`, {
          'ds-c-field--error': this.props[`${type}Invalid`],
        })}
        inputRef={(el) => {
          this[`${type}Input`] = el;
          const ref = this.props[`${type}FieldRef`];
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        }}
        autoComplete={this.props.autoComplete && `bday-${type}`}
        aria-describedby={this.props.labelId}
        aria-invalid={this.props[`${type}Invalid`]}
      />
    );
  }

  render() {
    return (
      <div className="ds-c-datefield__container ds-l-form-row">
        {this.renderField('month', 2)}
        <span className="ds-c-datefield__separator">/</span>
        {this.renderField('day', 2)}
        <span className="ds-c-datefield__separator">/</span>
        {this.renderField('year', 4)}
      </div>
    );
  }
}

export default DateInput;
