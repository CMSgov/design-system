import React, { useState } from 'react';
import CalendarIcon from '../Icons/CalendarIcon';
import classNames from 'classnames';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { Button } from '../Button';
import { DayPicker } from 'react-day-picker';
import { DATE_MASK, RE_DATE } from '../TextField/LabelMask';
import { FormControl, FormControlProps, FormControlPropKeys } from '../FormControl/FormControl';
import { TextInput } from '../TextField';
import { format } from 'date-fns';

export interface SingleInputDateFieldProps extends Omit<FormControlProps, 'label' | 'render'> {
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, maskedValue: string) => any;
  value?: string;
  /**
   * Label for the input
   */
  label: React.ReactNode;
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
  const [pickerVisible, setPickerVisible] = useState(false);
  const containerProps = pick(props, FormControlPropKeys);
  const {
    className,
    value,
    onBlur,
    onChange,
    defaultMonth,
    fromDate,
    fromMonth,
    fromYear,
    toDate,
    toMonth,
    toYear,
    ...inputProps
  } = omit(props, FormControlPropKeys);
  const withPicker = fromDate || fromMonth || fromYear;

  // TODO: Validate this and make date null if it's invalid. Don't pass a bizarre date
  // to DayPicker like new Date(`01/02`), which is interpreted as `Jan 02, 2001`. Probably
  // borrow the regex from the label mask
  const date = new Date(props.value);

  function handlePickerChange() {}

  return (
    <FormControl
      {...containerProps}
      className={classNames(
        'ds-c-single-input-date-field',
        { 'ds-c-single-input-date-field--with-picker': withPicker },
        className
      )}
      component="div"
      labelComponent="label"
      render={({ id, errorId, setRef }) => (
        <div className="ds-c-single-input-date-field__field-wrapper">
          <TextInput
            {...inputProps}
            {...{ id, setRef, errorId }}
            className="ds-c-single-input-date-field__field"
            value={value}
            labelMask={DATE_MASK}
            onChange={(event) => onChange(event, DATE_MASK(event.currentTarget.value, true))}
          />
          {withPicker && (
            <Button onClick={() => setPickerVisible(!pickerVisible)}>
              <CalendarIcon ariaHidden={false} />
            </Button>
          )}
          {pickerVisible && (
            <DayPicker mode="single" selected={date} onSelect={handlePickerChange} />
          )}
        </div>
      )}
    />
  );
};

export default SingleInputDateField;
