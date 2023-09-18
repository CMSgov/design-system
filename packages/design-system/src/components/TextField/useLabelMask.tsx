import React from 'react';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { TextInputProps } from './TextInput';
import mergeIds from '../utilities/mergeIds';
import useId from '../utilities/useId';

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
export const RE_CURRENCY = /\$?[\d,.-]*/;

/**
 * This function returns a mask function which returns either the formatted match only, or
 * the formatted match + the hint substring which the regular expressions above match against
 * when determining what content has been filled in.
 */
const makeMask = (regex: RegExp, hint: string, formatter: (stringMatch: string[]) => string) => {
  return (rawInput = '', valueOnly = false) => {
    const match = regex.exec(rawInput);
    const formattedMatch = match ? formatter(match) : '';

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
 * Does the same thing as SSN_MASK except that it obfuscates the first five digits
 */
export const SSN_MASK_OBFUSCATED: MaskFunction = (rawInput: string, valueOnly?: boolean) => {
  // Use the normal SSN_MASK function just to clean the raw input and format it
  const formatted = SSN_MASK(rawInput, true);
  // We only hide the first five digits of the SSNs
  const obfuscation = '***-**';

  let obfuscated: string;
  if (formatted.length < obfuscation.length) {
    obfuscated = obfuscation.substring(0, formatted.length);
  } else {
    obfuscated = obfuscation + formatted.substring(obfuscation.length);
  }

  return SSN_MASK(obfuscated, valueOnly);
};

/**
 * Currency mask is a little different, we need to modify the incoming content to strip
 * out any commas or dollar signs before evaluating it via the Intl.NumberFormat function.
 */
export const CURRENCY_MASK = makeMask(RE_CURRENCY, '$', (match) => {
  const signed = match[0].includes('-');
  const stripped = match[0].replace(/[^0-9.]/g, '');
  const clipped = stripped.includes('.') ? stripped.slice(0, stripped.indexOf('.') + 3) : stripped;
  const USDollar = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const formatted = USDollar.format(Number(clipped)).replace(/\.00/, '');

  if (Number(clipped) > 0) {
    return signed ? '-' + formatted : formatted;
  } else {
    return '';
  }
});

export function useLabelMask(maskFn: MaskFunction, originalInputProps: TextInputProps) {
  // TODO: Once we're on React 18, we can use the `useId` hook
  const generatedId = useId('label-mask--');
  const labelMaskId = originalInputProps.id ? `${originalInputProps.id}__label-mask` : generatedId;
  const [focused, setFocused] = useState(false);
  const { onFocus, onBlur, onChange } = originalInputProps;
  const value =
    originalInputProps.value?.toString() ?? originalInputProps.defaultValue?.toString() ?? '';
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value, setCurrentValue]);

  const inputProps = {
    ...originalInputProps,
    defaultValue: undefined,
    value: currentValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentValue(e.currentTarget.value);

      if (onChange) {
        onChange(e);
      }
    },
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      if (onFocus) {
        onFocus(e);
      }

      setFocused(true);
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      const maskedValue = maskFn(currentValue, true);
      e.currentTarget.value = maskedValue;
      e.target.value = maskedValue;
      setCurrentValue(maskedValue);

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
    'aria-describedby': mergeIds(originalInputProps['aria-describedby'], labelMaskId),
  };

  let currentMask = maskFn(currentValue);

  // Date mask needs to return the default empty mask when not focused
  if (maskFn === DATE_MASK && !focused) {
    currentMask = maskFn('');
  }

  // SSN mask needs to obfuscate the SSN when not focused
  if (maskFn === SSN_MASK && !focused && currentValue !== '') {
    currentMask = SSN_MASK_OBFUSCATED(currentValue);
    inputProps.value = SSN_MASK_OBFUSCATED(currentValue, true);
  }

  return {
    labelMask: (
      <div className="ds-c-label-mask" id={labelMaskId}>
        <span className={classNames(focused && 'ds-u-visibility--screen-reader')}>
          {currentMask}
        </span>
        <span className={classNames(!focused && 'ds-u-display--none')} aria-hidden="true">
          {currentMask}
        </span>
      </div>
    ),
    inputProps,
  };
}

export default useLabelMask;
