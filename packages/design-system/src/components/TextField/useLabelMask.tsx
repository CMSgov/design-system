import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { TextInputProps } from './TextInput';

export type MaskFunction = (rawInput: string, valueOnly?: boolean) => string;

export const RE_DATE = /^(\d{1,2})[\D]?(\d{1,2})?[\D]?(\d{1,4})?/;

/**
 * Takes the string value from an input and returns a string
 * with appropriate date format masking applied concatenated
 * with the date hint text, MM/DD/YYYY.
 *
 * `valueOnly` defaults to false. If true, returns formatted
 * string without additional hint text.
 */
export const DATE_MASK: MaskFunction = (rawInput = '', valueOnly = false) => {
  const match = RE_DATE.exec(rawInput);
  let formattedDate = '';
  if (match) {
    const [month, day, year] = match.slice(1);
    formattedDate = [
      // We treat all non-numeric characters as a delimiter. If they're using a
      // delimiter after a month or day, we interpret that as the user supplying
      // a single digit for month or day, which we will automatically pad for them.
      month && month.padStart(2, '0'),
      day && day.padStart(2, '0'),
      year,
    ]
      .filter((s) => s)
      .join('/');
  }
  if (valueOnly) {
    return formattedDate;
  }
  const hint = 'MM/DD/YYYY';
  const hintSub = hint.substring(formattedDate.length);
  return formattedDate + hintSub;
};

export function useLabelMask(maskFn: MaskFunction, originalInputProps: TextInputProps) {
  // TODO: Once we're on React 18, we can use the `useId` hook
  const labelMaskId = useRef(uniqueId('labelmask_')).current;
  const [focused, setFocused] = useState(false);
  const { onFocus, onBlur, onChange } = originalInputProps;
  const value = originalInputProps.value?.toString() ?? '';

  const inputProps = {
    ...originalInputProps,
    defaultValue: undefined,
    onFocus: (e) => {
      if (onFocus) {
        onFocus(e);
      }

      setFocused(true);
    },
    onBlur: (e) => {
      const maskedValue = maskFn(value.toString(), true);
      e.currentTarget.value = maskedValue;
      e.target.value = maskedValue;

      if (onChange) {
        (onChange as any)(e);
      }

      if (onBlur) {
        (onBlur as any)(e);
      }

      setFocused(false);
    },
    type: 'text',
    inputMode: 'numeric' as const,
    'aria-describedby': classNames(originalInputProps['aria-describedby'], labelMaskId),
  };

  return {
    labelMask: (
      <div className="ds-c-label-mask" id={labelMaskId}>
        <span className={classNames(focused && 'ds-u-visibility--screen-reader')}>
          {maskFn('')}
        </span>
        <span className={classNames(!focused && 'ds-u-display--none')} aria-hidden="true">
          {maskFn(value)}
        </span>
      </div>
    ),
    inputProps,
  };
}

export default useLabelMask;
