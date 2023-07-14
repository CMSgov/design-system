import React from 'react';
import { FieldError, FieldErrorProps } from './FieldError';

export const InlineError = (props: FieldErrorProps) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'Deprecation warning: The `InlineError` has been renamed to `FieldError`. Please use `FieldError` instead. And for CSS overrides, please use the `.ds-c-field__error-message` selector rather than `.ds-c-inline-error`. The `InlineError` export will be removed in a future version of the design system.'
    );
  }

  return <FieldError {...props} />;
};
