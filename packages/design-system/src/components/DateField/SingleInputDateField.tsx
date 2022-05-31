import React, { useRef, useState } from 'react';
import CalendarIcon from '../Icons/CalendarIcon';
import classNames from 'classnames';
import { DayPicker } from 'react-day-picker';
import { DATE_MASK, RE_DATE } from '../TextField/useLabelMask';
import { FormFieldProps, FormLabel, useFormLabel } from '../FormLabel';
import { TextInput } from '../TextField';
import useLabelMask from '../TextField/useLabelMask';
import { useClickOutsideHandler } from '../utilities/useClickOutsideHandler';
import usePressEscapeHandler from '../utilities/usePressEscapeHandler';

export interface SingleInputDateFieldProps extends FormFieldProps {
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => any;
  onChange?: (updatedValue: string, maskedValue: string) => any;
  value?: string;
  name: string;

  // From DayPicker
  // -------------------------
  defaultMonth?: Date;
  fromDate?: Date;
  fromMonth?: Date;
  fromYear?: number;
  toDate?: Date;
  toMonth?: Date;
  toYear?: number;
}

const SingleInputDateField = (props: SingleInputDateFieldProps) => {
  const {
    className,
    value,
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
  const withPicker = fromDate || fromMonth || fromYear;
  const [pickerVisible, setPickerVisible] = useState(false);

  function handleChange(event) {
    const updatedValue = event.currentTarget.value;
    onChange(updatedValue, DATE_MASK(updatedValue, true));
  }

  function handlePickerChange(date: Date) {
    const updatedValue = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    onChange(DATE_MASK(updatedValue), DATE_MASK(updatedValue, true));
    setPickerVisible(false);
  }

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
  const { labelId, ...inputProps } = fieldProps;
  const inputWithoutMasking = (
    <TextInput {...inputProps} type="text" value={value} onChange={handleChange} />
  );
  const { labelMask, input } = useLabelMask(DATE_MASK, inputWithoutMasking);

  const dayPickerRef = useRef();
  const calendarButtonRef = useRef();
  useClickOutsideHandler([dayPickerRef, calendarButtonRef], () => setPickerVisible(false));
  usePressEscapeHandler(dayPickerRef, () => setPickerVisible(false));

  // TODO: Validate this and make date null if it's invalid. Don't pass a bizarre date
  // to DayPicker like new Date(`01/02`), which is interpreted as `Jan 02, 2001`. Probably
  // borrow the regex from the label mask
  const date = new Date(props.value);

  return (
    <div {...wrapperProps}>
      <FormLabel {...labelProps} />
      {labelMask}
      <div className="ds-c-single-input-date-field__field-wrapper">
        {input}
        {withPicker && (
          <button
            className="ds-c-single-input-date-field__button"
            onClick={() => setPickerVisible(!pickerVisible)}
            ref={calendarButtonRef}
          >
            <CalendarIcon ariaHidden={false} />
          </button>
        )}
      </div>
      {pickerVisible && (
        <div ref={dayPickerRef}>
          <DayPicker mode="single" selected={date} onSelect={handlePickerChange} />
        </div>
      )}
      {bottomError}
    </div>
  );
};

export default SingleInputDateField;
