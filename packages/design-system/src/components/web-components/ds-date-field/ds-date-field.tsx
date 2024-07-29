import { define } from '../preactement/define';
import { SingleInputDateFieldProps } from '../../DateField/SingleInputDateField';
import { SingleInputDateField } from '../../DateField';
import { parseBooleanAttr, parseDateAttr, parseIntegerAttr } from '../wrapperUtils';

const attributes = [
  'name',
  'root-id',
  'inversed',
  'value',
  'default-month',
  'from-date',
  'from-month',
  'from-year',
  'to-date',
  'to-month',
  'to-year',
  'hint',
  'label',
  'error-message',
] as const;

type IncompatibleProps =
  | 'inversed'
  | 'defaultMonth'
  | 'fromDate'
  | 'fromMonth'
  | 'fromYear'
  | 'toDate'
  | 'toDate'
  | 'toMonth'
  | 'toYear';

interface WrapperProps extends Omit<SingleInputDateFieldProps, IncompatibleProps> {
  name: string;
  rootId: string;
  inversed?: string;
  value?: string;
  defaultMonth?: string;
  fromDate?: string;
  fromMonth?: string;
  fromYear?: string;
  toDate?: string;
  toMonth?: string;
  toYear?: string;
}

const Wrapper = ({
  name,
  rootId,
  inversed,
  value,
  defaultMonth,
  fromDate,
  fromMonth,
  fromYear,
  toDate,
  toMonth,
  toYear,
  ...otherProps
}: WrapperProps) => {
  return (
    <SingleInputDateField
      name={name}
      id={rootId}
      inversed={parseBooleanAttr(inversed)}
      value={value}
      defaultMonth={parseDateAttr(defaultMonth)}
      fromDate={parseDateAttr(fromDate)}
      fromMonth={parseDateAttr(fromMonth)}
      fromYear={parseIntegerAttr(fromYear)}
      toDate={parseDateAttr(toDate)}
      toMonth={parseDateAttr(toMonth)}
      toYear={parseIntegerAttr(fromYear)}
      {...otherProps}
    />
  );
};

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-date-field': JSX.IntrinsicElements['div'] & {
        [K in (typeof attributes)[number]]?: string;
      };
    }
  }
}
/* eslint-enable */

define('ds-date-field', () => Wrapper, {
  attributes,
  events: ['onChange', 'onBlur'],
} as any);
