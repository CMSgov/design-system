import CustomDayPickerCaption from './CustomDayPickerCaption';
import { format } from 'date-fns';
import { DayPicker, DayPickerSingleProps } from 'react-day-picker';
import { ArrowsStackedIcon } from '../Icons';
import { t, getLanguage } from '../i18n';
import type { Locale } from 'date-fns';
import { CustomDayPickerDayContent } from './CustomDayPickerDayContent';
import { enUS, es } from 'date-fns/locale';

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

const getLocale = () => {
  const lang = getLanguage();
  switch (lang) {
    case 'es':
      return es;
    default:
      return enUS;
  }
};

export function CustomDayPicker(props: CustomDayPickerProps) {
  return (
    <DayPicker
      locale={getLocale()}
      mode="single"
      footer={
        <span className="ds-u-visibility--screen-reader">
          {t('singleInputDateField.arrowKeyInstructions')}
        </span>
      }
      captionLayout="dropdown"
      components={{
        Caption: CustomDayPickerCaption,
        IconDropdown: ArrowsStackedIcon,
        DayContent: CustomDayPickerDayContent,
      }}
      formatters={{ formatMonthCaption }}
      {...props}
    />
  );
}

export default CustomDayPicker;
