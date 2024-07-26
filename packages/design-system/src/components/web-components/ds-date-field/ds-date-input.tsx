import { define } from '../preactement/define';
import { DateInput, DateInputProps } from '../../DateField/DateInput';

const attributes = [
  'class-name',
  'auto-complete',
  'disabled',
  'inversed',
  'id',
  'day-label',
  'day-name',
  'day-default-value',
  'day-invalid',
  'day-value',
  'month-label',
  'month-name',
  'month-default-value',
  'month-invalid',
  'month-value',
  'year-label',
  'year-name',
  'year-default-value',
  'year-invalid',
  'year-value',
] as const;

interface WrapperProps extends DateInputProps {
  className?: string;
  autoComplete?: boolean;
  disabled?: boolean;
  inversed?: boolean;
  id?: string;
  dayLabel?: string;
  dayName: string;
  dayDefaultValue?: string | number;
  dayInvalid?: boolean;
  dayValue?: string | number;
  monthLabel?: string;
  monthName: string;
  monthDefaultValue?: string | number;
  monthInvalid?: boolean;
  monthValue?: string | number;
  yearLabel?: string;
  yearName: string;
  yearDefaultValue?: string | number;
  yearInvalid?: boolean;
  yearValue?: string | number;
}

const Wrapper = ({
  className,
  autoComplete,
  disabled,
  inversed,
  id,
  dayLabel,
  dayName,
  dayDefaultValue,
  dayInvalid,
  dayValue,
  monthLabel,
  monthName,
  monthDefaultValue,
  monthInvalid,
  monthValue,
  yearLabel,
  yearName,
  yearDefaultValue,
  yearInvalid,
  yearValue,
  ...otherProps
}: WrapperProps) => {
  return (
    <DateInput
      className={className}
      autoComplete={autoComplete}
      disabled={disabled}
      inversed={inversed}
      id={id}
      dayLabel={dayLabel}
      dayName={dayName}
      dayDefaultValue={dayDefaultValue}
      dayInvalid={dayInvalid}
      dayValue={dayValue}
      monthLabel={monthLabel}
      monthName={monthName}
      monthDefaultValue={monthDefaultValue}
      monthInvalid={monthInvalid}
      monthValue={monthValue}
      yearLabel={yearLabel}
      yearName={yearName}
      yearDefaultValue={yearDefaultValue}
      yearInvalid={yearInvalid}
      yearValue={yearValue}
      {...otherProps}
    />
  );
};

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-date-input': JSX.IntrinsicElements['div'] & {
        [K in (typeof attributes)[number]]?: string;
      };
    }
  }
}
/* eslint-enable */

define('ds-date-input', () => Wrapper, { attributes, events: ['onChange', 'onBlur'] } as any);
// define('ds-date-input', () => DateInput, { attributes, events: ['onChange', 'onBlur'] } as any);
