/* eslint-disable no-useless-escape */
import { cloneElement, useEffect, useRef, useState } from 'react';
import type * as React from 'react';
import classNames from 'classnames';
import { maskValue, unmaskValue, coerceToString, getOnlyChild } from './maskHelpers';
import { TextInputProps } from './TextInput';

/**
 * Note: Chrome appends a /v modifier to regular expressions, which enables all unicode character set features. As a result,
 * - and { } characters must be escaped.
 */
const maskPattern = {
  phone: '[0-9\\-]*',
  ssn: '[0-9\\-*]*',
  zip: '[0-9\\-]*',
  currency: '[0-9.,\\-]*',
};

// Naming here is left overly general to support future masks
const maskOverlayContent = {
  currency: '$',
};

export type MaskType = 'currency' | 'phone' | 'ssn' | 'zip';

export interface MaskProps {
  /**
   * Must contain a `TextField` component
   */
  children: React.ReactNode;
  /**
   * The type of mask
   */
  mask: MaskType;
}

export const Mask = ({ children, mask }: MaskProps) => {
  const field = getOnlyChild(children) as React.ReactElement<TextInputProps>;
  const fieldProps = field.props;

  const [value, setValue] = useState<string>(() => {
    const initialValue = coerceToString(fieldProps.value ?? fieldProps.defaultValue);
    return maskValue(initialValue, mask);
  });
  const debouncedOnBlurEventRef = useRef<React.ChangeEvent<HTMLInputElement> | null>(null);
  const prevFieldValueRef = useRef<string>(coerceToString(fieldProps.value));

  useEffect(() => {
    if (debouncedOnBlurEventRef.current) {
      fieldProps.onBlur?.(debouncedOnBlurEventRef.current);
      debouncedOnBlurEventRef.current = null;
    }

    const fieldValue = coerceToString(fieldProps.value);
    const prevFieldValue = prevFieldValueRef.current;
    const isControlled = fieldProps.value !== undefined;

    if (isControlled && prevFieldValue !== fieldValue) {
      // For controlled components, the value prop should ideally be changed by
      // the controlling component once we've called onChange with our updates.
      // If the change was triggered this way through user input, then the prop
      // given should match our internal state when unmasked. If what we're
      // given and what we have locally don't match, that means the controlling
      // component has made its own unrelated change, so we should update our
      // state and mask this new value.

      if (unmaskValue(fieldValue, mask) !== unmaskValue(value, mask)) {
        setValue(maskValue(fieldValue, mask));
      }
    }

    prevFieldValueRef.current = fieldValue;
  }, [fieldProps, mask, value]);

  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>): void => {
    const nextValue = maskValue(evt.target.value, mask);

    // We only debounce the onBlur when we know for sure that
    // this component will re-render (AKA when the value changes)
    // and when an onBlur callback is present
    const debounce = nextValue !== value && typeof fieldProps.onBlur === 'function';

    if (debounce) {
      // We need to retain a reference to the event after the callback
      // has been called. We pass this onto the consuming app's onBlur
      // only after the value has been manipulated – this way, the
      // value returned by event.target.value is the value after masking
      evt.persist();
      debouncedOnBlurEventRef.current = evt;
    }

    setValue(nextValue);

    if (!debounce && typeof fieldProps.onBlur === 'function') {
      // If we didn't debounce the onBlur event, then we need to
      // call the onBlur callback from here
      fieldProps.onBlur(evt);
    }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(evt.target.value);

    if (typeof fieldProps.onChange === 'function') {
      fieldProps.onChange(evt);
    }
  };

  const modifiedTextField = cloneElement(field, {
    defaultValue: undefined,
    fieldClassName: classNames(field.props.fieldClassName, `ds-c-field--${mask}`),
    onBlur: handleBlur,
    onChange: handleChange,
    value,
    type: 'text',
    inputMode: 'numeric',
    pattern: maskPattern[mask],
  });

  // UI overlayed on top of a field to support certain masks
  const currencyOverlay =
    mask === 'currency' ? (
      <div className={`ds-c-field__before ds-c-field__before--currency`}>
        {maskOverlayContent[mask]}
      </div>
    ) : null;

  return (
    <div className={`ds-c-field-mask ds-c-field-mask--${mask}`}>
      {currencyOverlay}
      {modifiedTextField}
    </div>
  );
};

export default Mask;
