import React, { useState } from 'react';
import CalendarIcon from '../Icons/CalendarIcon';
import classNames from 'classnames';
import { Button } from '../Button';
import { DayPicker } from 'react-day-picker';
import { DATE_MASK, RE_DATE } from '../TextField/useLabelMask';
import { format } from 'date-fns';
import { FormFieldProps, FormLabel, useFormLabel } from '../FormLabel';
import { TextInput } from '../TextField';
import useLabelMask from '../TextField/useLabelMask';

export interface SingleInputDateFieldProps extends FormFieldProps {
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, maskedValue: string) => any;
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
    onChange(event, DATE_MASK(value, true));
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
  const inputWithoutMasking = (
    <TextInput {...fieldProps} type="text" value={value} onChange={handleChange} />
  );
  const { labelMask, input } = useLabelMask(DATE_MASK, inputWithoutMasking);

  // TODO: Validate this and make date null if it's invalid. Don't pass a bizarre date
  // to DayPicker like new Date(`01/02`), which is interpreted as `Jan 02, 2001`. Probably
  // borrow the regex from the label mask
  const date = new Date(props.value);

  function handlePickerChange() {}

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
          >
            <CalendarIcon ariaHidden={false} />
          </button>
        )}
        {pickerVisible && <DayPicker mode="single" selected={date} onSelect={handlePickerChange} />}
      </div>
      {bottomError}
    </div>
  );
};

export default SingleInputDateField;
