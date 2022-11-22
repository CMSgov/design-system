import React from 'react';
import { useRef, useState } from 'react';
import CalendarIcon from '../Icons/CalendarIcon';
import CustomDayPicker from './CustomDayPicker';
import classNames from 'classnames';
import isMatch from 'date-fns/isMatch';
import useLabelMask from '../TextField/useLabelMask';
import useClickOutsideHandler from '../utilities/useClickOutsideHandler';
import usePressEscapeHandler from '../utilities/usePressEscapeHandler';
import { DATE_MASK } from '../TextField/useLabelMask';
import { FormFieldProps, FormLabel, useFormLabel } from '../FormLabel';
import { TextInput } from '../TextField';
import { t } from '../i18n';

export interface SingleInputDateFieldProps extends FormFieldProps {
  /**
   * The `input` field's `name` attribute
   */
  name: string;
  /**
   * Called anytime any date input is blurred
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => any;
  /**
   * Called anytime any date input is changed. This function is called with two arguments.
   * The first argument should be used to update whatever state your application uses to
   * supply back to this component's `value` prop in a _controlled component_ pattern.
   *
   * @param updatedValue - The input's new value
   * @param formattedValue - The input's new value with date formatting applied, included
   *   for convenience. Do not use this value as the component's `value` prop. An appropriate
   *   use for this value would be to run date-validation checks against it.
   */
  onChange: (updatedValue: string, formattedValue: string) => any;
  /**
   * Sets the input's `value`. Use in combination with an `onChange` handler to implement
   * a _controlled component_ pattern. This component expects the `value` to match
   * whatever string the user types (i.e., the first argument provided to your `onChange`
   * handler).
   */
  value?: string;

  // From DayPicker
  // -------------------------
  /**
   * The initial month to show in the calendar picker. If not provided, defaults to the
   * month of the currently selected date.
   */
  defaultMonth?: Date;
  /**
   * Earliest day to start month navigation in the calendar picker.
   * (This does not restrict dates entered manually.)
   */
  fromDate?: Date;
  /**
   * Earliest month to start month navigation in the calendar picker.
   * (This does not restrict dates entered manually.)
   */
  fromMonth?: Date;
  /**
   * Earliest year to start month navigation in the calendar picker.
   * (This does not restrict dates entered manually.)
   */
  fromYear?: number;
  /**
   * Latest day to end month navigation in the calendar picker.
   * (This does not restrict dates entered manually.)
   */
  toDate?: Date;
  /**
   * Latest month to end month navigation in the calendar picker.
   * (This does not restrict dates entered manually.)
   */
  toMonth?: Date;
  /**
   * Latest year to end month navigation in the calendar picker.
   * (This does not restrict dates entered manually.)
   */
  toYear?: number;
}

const SingleInputDateField = (props: SingleInputDateFieldProps) => {
  const {
    className,
    onChange,
    defaultMonth,
    fromDate,
    fromMonth,
    fromYear,
    toDate,
    toMonth,
    toYear,
    ...remainingProps
  } = props;
  const withPicker =
    (fromDate != null || fromMonth != null || Number.isInteger(fromYear)) &&
    (toDate != null || toMonth != null || Number.isInteger(toYear));
  const [pickerVisible, setPickerVisible] = useState(false);

  // Set up change handlers
  function handleInputChange(event) {
    const updatedValue = event.currentTarget.value;
    onChange(updatedValue, DATE_MASK(updatedValue, true));
  }
  function handlePickerChange(date: Date) {
    const updatedValue = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    onChange(DATE_MASK(updatedValue), DATE_MASK(updatedValue, true));
    setPickerVisible(false);
    inputRef.current?.focus();
  }

  // Collect all the props and elements for the input and its labels
  const { labelProps, fieldProps, wrapperProps, bottomError } = useFormLabel({
    ...remainingProps,
    className: classNames(
      'ds-c-single-input-date-field',
      { 'ds-c-single-input-date-field--with-picker': withPicker },
      className
    ),
    labelComponent: 'label',
    wrapperIsFieldset: false,
  });
  const inputRef = useRef<HTMLInputElement>();
  const { labelMask, inputProps } = useLabelMask(DATE_MASK, {
    ...fieldProps,
    onChange: handleInputChange,
    type: 'text',
    inputRef: (el) => {
      inputRef.current = el;
    },
  });

  // Handle alternate ways of closing the day picker
  const dayPickerRef = useRef();
  const calendarButtonRef = useRef();
  useClickOutsideHandler([dayPickerRef, calendarButtonRef], () => setPickerVisible(false));
  usePressEscapeHandler(dayPickerRef, () => {
    setPickerVisible(false);
    inputRef.current?.focus();
  });

  // Validate the date string (value) and make date null if it's invalid. We don't want to pass
  // a bizarre date to DayPicker like `new Date('01/02')`, which is interpreted as `Jan 02, 2001`
  const dateString = DATE_MASK(props.value, true);
  const validDateString = isMatch(dateString, 'MM/dd/yyyy');
  const date = validDateString ? new Date(dateString) : null;

  return (
    <div {...wrapperProps}>
      <FormLabel {...labelProps} />
      {labelMask}
      <div className="ds-c-single-input-date-field__field-wrapper">
        <TextInput {...inputProps} />
        {withPicker && (
          <button
            className="ds-c-single-input-date-field__button"
            onClick={() => setPickerVisible(!pickerVisible)}
            ref={calendarButtonRef}
          >
            <CalendarIcon
              ariaHidden={false}
              title={t(pickerVisible ? 'singleInputDateField.close' : 'singleInputDateField.open')}
            />
          </button>
        )}
      </div>
      {pickerVisible && (
        <div ref={dayPickerRef} role="dialog">
          <CustomDayPicker
            selected={date}
            onSelect={handlePickerChange}
            defaultMonth={date ?? defaultMonth}
            {...{
              fromDate,
              fromMonth,
              fromYear,
              toDate,
              toMonth,
              toYear,
            }}
          />
        </div>
      )}
      {bottomError}
    </div>
  );
};

export default SingleInputDateField;
