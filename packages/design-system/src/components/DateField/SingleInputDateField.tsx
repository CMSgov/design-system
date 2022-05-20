import { FormControl, FormControlProps, FormControlPropKeys } from '../FormControl/FormControl';
import React from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

export interface SingleInputDateFieldProps extends Omit<FormControlProps, 'label' | 'render'> {
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, maskedValue: string) => any;
  value?: string;

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
  // TODO: Validate this and make date null if it's invalid. Don't pass a bizarre date
  // to DayPicker like new Date(`01/02`), which is interpreted as `Jan 02, 2001`. Probably
  // borrow the regex from the label mask
  const date = new Date(props.value);

  function handlePickerChange() {}

  // let footer = <p>Please pick a day.</p>;
  // if (selected) {
  //   footer = <p>You picked {format(selected, 'PP')}.</p>;
  // }
  return <DayPicker mode="single" selected={date} onSelect={handlePickerChange} />;
};

export default SingleInputDateField;
