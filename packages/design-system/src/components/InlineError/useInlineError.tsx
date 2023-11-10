import React from 'react';
import InlineError from './InlineError';
import classNames from 'classnames';
import { ErrorPlacement, errorPlacementDefault } from '../flags';

export { ErrorPlacement };

// TODO: We should conditionally return an errorId, because we want to be able
// to include it in the aria-describedby without conditional logic in the component

export interface UseInlineErrorProps {
  /**
   * The ID of the error message applied to this field. If none is provided, the id
   * will be derived from the `id` prop for the field.
   */
  errorId?: string;
  /**
   * Location of the error message relative to the field input
   */
  errorPlacement?: ErrorPlacement;
  /**
   * Enable the error state by providing an error message.
   */
  errorMessage?: React.ReactNode;
  /**
   * Additional classes to be added to the error message
   */
  errorMessageClassName?: string;
  /**
   * A unique `id` for the field element
   */
  id: string;
  /**
   * Set to `true` to apply the "inverse" color scheme
   */
  inversed?: boolean;
}

export function useInlineError<T extends UseInlineErrorProps>(props: T) {
  const errorId = props.errorId ?? `${props.id}__error`;
  const {
    errorMessage,
    errorMessageClassName,
    errorPlacement = errorPlacementDefault(),
    inversed,
  } = props;

  const errorElement = errorMessage ? (
    <InlineError
      id={errorId}
      inversed={inversed}
      className={classNames(
        errorMessageClassName,
        errorPlacement === ErrorPlacement.Bottom && 'ds-c-inline-error--bottom'
      )}
    >
      {errorMessage}
    </InlineError>
  ) : undefined;

  let topError;
  let bottomError;
  if (errorPlacement === ErrorPlacement.Top) {
    topError = errorElement;
  } else {
    bottomError = errorElement;
  }

  // If the user has provided an `aria-invalid` attribute, use that as the source
  // of truth; otherwise, it's invalid if there's an error message.
  const invalid = props['aria-invalid'] ?? !!errorMessage;

  return {
    errorId: errorMessage ? errorId : undefined,
    invalid,
    topError,
    bottomError,
  };
}
