import React from 'react';
import CustomDayPickerCaption from './CustomDayPickerCaption';
import format from 'date-fns/format';
import { DayPicker, DayPickerSingleProps } from 'react-day-picker';
import { t } from '../i18n';
import type { Locale } from 'date-fns';

/**
 * The default formatter for the Month caption.
 */
export function formatMonthCaption(month: Date, options?: { locale?: Locale }) {
  return format(month, 'LLL', options);
}

type CustomDayPickerProps = Pick<
  DayPickerSingleProps,
  | 'selected'
  | 'onSelect'
  | 'defaultMonth'
  | 'fromDate'
  | 'fromMonth'
  | 'fromYear'
  | 'toDate'
  | 'toMonth'
  | 'toYear'
>;

export function CustomDayPicker(props: CustomDayPickerProps) {
  return (
    <DayPicker
      mode="single"
      footer={t('singleInputDateField.arrowKeyInstructions')}
      captionLayout="dropdown"
      components={{
        Caption: CustomDayPickerCaption,
      }}
      formatters={{ formatMonthCaption }}
      {...props}
    />
  );
}

export default CustomDayPicker;
