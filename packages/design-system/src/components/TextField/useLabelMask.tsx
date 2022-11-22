import React from 'react';
import { useState, useRef } from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { TextInputProps } from './TextInput';

export type MaskFunction = (rawInput: string, valueOnly?: boolean) => string;

/**
 * Regular expressions for matching commonly used masks, ensure capture groups are
 * set for each set of items that are separated by a delimiter, delimiters are
 * optional and so should be shown as well with the `?` optional flag.
 */
export const RE_DATE = /^(\d{1,2})[\D]?(\d{1,2})?[\D]?(\d{1,4})?/;
export const RE_PHONE = /^\(?(\d{1,3})?\)?[\s.-]?(\d{1,3})?[\s.-]?(\d{1,4})?/;
export const RE_SSN = /([*\d]{1,3})[\s.-]?([*\d]{1,2})?[\s.-]?([\d{1,4}]+)?/;
export const RE_ZIP = /(\d{1,5})/;

/**
 * This function returns a mask function which returns either the formatted match only, or
 * the formatted match + the hint substring which the regular expressions above match against
 * when determining what content has been filled in.
 */
const makeMask = (regex: RegExp, hint: string, formatter: (stringMatch: string[]) => string) => {
  return (rawInput = '', valueOnly = false) => {
    const match = regex.exec(rawInput);
    let formattedMatch = '';
    if (match) {
      formattedMatch = formatter(match);
    }
    if (valueOnly) {
      return formattedMatch;
    }
    const hintSub = hint.substring(formattedMatch.length);
    return formattedMatch + hintSub;
  };
};

/**
 * The date mask automatically pads months and days that are one digit
 */
export const DATE_MASK: MaskFunction = makeMask(RE_DATE, 'MM/DD/YYYY', (match) => {
  const [month, day, year] = match.slice(1);
  const formattedDate = [
    // We treat all non-numeric characters as a delimiter. If they're using a
    // delimiter after a month or day, we interpret that as the user supplying
    // a single digit for month or day, which we will automatically pad for them.
    month && month.padStart(2, '0'),
    day && day.padStart(2, '0'),
    year,
  ]
    .filter((s) => s)
    .join('/');

  return formattedDate;
});

/**
 * Formatting for US phone numbers
 */
export const PHONE_MASK: MaskFunction = makeMask(RE_PHONE, '###-###-####', (match) => {
  return match
    .slice(1)
    .filter((s) => s)
    .join('-');
});

/**
 * Formatting for US Postal codes, this could be expanded to allow for 9 digit numbers
 */
export const ZIP_MASK: MaskFunction = makeMask(RE_ZIP, '#####', (match) => {
  return match[1];
});

/**
 * Formatting for social security numbers.
 */
export const SSN_MASK: MaskFunction = makeMask(RE_SSN, '###-##-####', (match) => {
  /**
   * for future notice, there are rules regarding social security numbers, these could be validated
   * if we were to add error handling to useLabelMask as an additional set of functionality
   * The first part should have 3 digits and should not be 000, 666, or between 900 and 999.
   * The second part should have 2 digits and it should be from 01 to 99.
   * The third part should have 4 digits and it should be from 0001 to 9999.
   */
  return match
    .slice(1)
    .filter((s) => s)
    .join('-');
});

/**
 * Currency mask is a little different, we need to modify the incoming content to strip
 * out any commas or dollar signs before evaluating it via the Intl.NumberFormat function.
 */
export const CURRENCY_MASK = (rawInput = '', valueOnly = false) => {
  const signed = rawInput.includes('-');
  const stripped = rawInput.replace(/[^0-9.]/g, '');
  const clipped = stripped.includes('.') ? stripped.slice(0, stripped.indexOf('.') + 3) : stripped;
  const USDollar = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const formatted = USDollar.format(Number(clipped));

  return signed ? '-' + formatted : formatted;
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
