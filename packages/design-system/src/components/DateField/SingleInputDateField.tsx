import { useRef, useState } from 'react';
import type * as React from 'react';
import CustomDayPicker from './CustomDayPicker';
import classNames from 'classnames';
import cleanFieldProps from '../utilities/cleanFieldProps';
import describeField from '../utilities/describeField';
import { isMatch } from 'date-fns';
import mergeIds from '../utilities/mergeIds';
import useLabelMask from '../TextField/useLabelMask';
import useClickOutsideHandler from '../utilities/useClickOutsideHandler';
import usePressEscapeHandler from '../utilities/usePressEscapeHandler';
import useId from '../utilities/useId';
import { CalendarIcon } from '../Icons/CalendarIcon';
import { createDateMask } from '../TextField/useLabelMask';
import { Label } from '../Label';
import { TextInput } from '../TextField';
import { TextInputProps } from '../TextField/TextInput';
import { getLanguage, t } from '../i18n';
import { useLabelProps, UseLabelPropsProps } from '../Label/useLabelProps';
import { useHint, UseHintProps } from '../Hint/useHint';
import { useInlineError, UseInlineErrorProps } from '../InlineError/useInlineError';

interface BaseSingleInputDateFieldProps {
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
  onChange?: (updatedValue: string, formattedValue: string) => any;
  /**
   * A unique ID for this element. A unique ID will be generated if one isn't provided.
   */
  id?: string;
  /**
   * Set to `true` to apply the "inverse" color scheme
   */
  inversed?: boolean;
  /**
   * Sets the input's `value`. Use in combination with an `onChange` handler to implement
   * a _controlled component_ pattern. This component expects the `value` to match
   * whatever string the user types (i.e., the first argument provided to your `onChange`
   * handler).
   */
  value?: string;
  /**
   * Sets the initial value. Use this for an uncontrolled component; otherwise,
   * use the `value` property.
   */
  defaultValue?: string;

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

export type SingleInputDateFieldProps = BaseSingleInputDateFieldProps &
  Omit<TextInputProps, keyof BaseSingleInputDateFieldProps | 'type'> &
  Omit<UseLabelPropsProps & UseHintProps & UseInlineErrorProps, 'id' | 'inversed'>;

/**
 * For information about how and when to use this component, refer to the
 * [Single Input Date Field](https://design.cms.gov/components/date-field/single-input-date-field/) and
 * [Calendar Picker](https://design.cms.gov/components/date-field/date-picker/) documentation pages.
 */
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
  const id = useId('date-field--', props.id);
  const isControlled = remainingProps.value !== undefined;
  const [internalValueState, setInternalValueState] = useState(remainingProps.defaultValue);
  const value = isControlled ? remainingProps.value : internalValueState;
  // This currently just supports English and non-english date formatting. Maybe could expand later.
  const lang = getLanguage();
  const localizedDateHint = lang === 'en' ? 'MM/DD/YYYY' : 'DD/MM/YYYY';
  const dateMask = createDateMask(localizedDateHint);

  // Set up change handlers
  const handleInputChange = (event) => {
    const updatedValue = event.currentTarget.value;
    if (onChange) {
      onChange(updatedValue, dateMask(updatedValue, true));
    }
    if (!isControlled) {
      setInternalValueState(updatedValue);
    }
  };

  const computeDateValue = (date: Date, lang: string) => {
    const vals = [date.getMonth() + 1, date.getDate(), date.getFullYear()];
    return lang === 'en' ? `${vals[0]}/${vals[1]}/${vals[2]}` : `${vals[1]}/${vals[0]}/${vals[2]}`;
  };

  const handlePickerChange = (date: Date) => {
    const updatedValue = computeDateValue(date, lang);
    const maskedValue = dateMask(updatedValue);
    if (onChange) {
      onChange(maskedValue, dateMask(updatedValue, true));
    }
    if (!isControlled) {
      setInternalValueState(maskedValue);
    }
    setPickerVisible(false);
    inputRef.current?.focus();
  };

  // Collect all the props and elements for the input and its labels
  const { errorId, topError, bottomError, invalid } = useInlineError({ ...props, id });
  const { hintId, hintElement } = useHint({ ...props, id });
  const labelProps = useLabelProps({ ...props, id });
  const inputRef = useRef<HTMLInputElement>(null);
  const { labelMask, inputProps } = useLabelMask(dateMask, {
    ...cleanFieldProps(remainingProps),
    value,
    id,
    onChange: handleInputChange,
    type: 'text',
    inputRef,
    'aria-invalid': invalid,
    'aria-describedby': describeField({ ...props, errorId, hintId }),
  });

  // Handle alternate ways of closing the day picker
  const dayPickerRef = useRef(null);
  const calendarButtonRef = useRef(null);
  useClickOutsideHandler([dayPickerRef, calendarButtonRef], () => setPickerVisible(false));
  usePressEscapeHandler(dayPickerRef, () => {
    setPickerVisible(false);
    inputRef.current?.focus();
  });

  const handleDayPickerKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key !== 'Tab') return;

    const focusableElements = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'button:not([disabled]), select:not([disabled])'
      )
    ).filter((element) => element.tabIndex >= 0);

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = event.currentTarget.ownerDocument.activeElement;

    if (!firstElement || !lastElement || !activeElement) return;

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  // Validate the date string (value) and make date null if it's invalid. We don't want to pass
  // a bizarre date to DayPicker like `new Date('01/02')`, which is interpreted as `Jan 02, 2001`
  const dateString = dateMask(props.value ?? '', true);
  // Handle Spanish format dates
  const testValue = lang === 'en' ? 'MM/dd/yyyy' : 'dd/MM/yyyy';
  const validDateString = isMatch(dateString, testValue);
  const date = validDateString ? new Date(dateString) : null;

  return (
    <div
      className={classNames(
        'ds-c-single-input-date-field',
        withPicker && 'ds-c-single-input-date-field--with-picker',
        className
      )}
    >
      <Label {...labelProps} fieldId={id} />
      {hintElement}
      {topError}
      {labelMask}
      <div className="ds-c-single-input-date-field__field-wrapper">
        <TextInput {...inputProps} />
        {withPicker && (
          <button
            className="ds-c-single-input-date-field__button"
            onClick={() => setPickerVisible(!pickerVisible)}
            type="button"
            ref={calendarButtonRef}
            aria-describedby={mergeIds(labelProps.id, hintId)}
          >
            <CalendarIcon
              ariaHidden={false}
              title={t(pickerVisible ? 'singleInputDateField.close' : 'singleInputDateField.open')}
              id={`${id}__icon`}
            />
          </button>
        )}
      </div>
      {pickerVisible && (
        <div ref={dayPickerRef} role="dialog" onKeyDown={handleDayPickerKeyDown}>
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
