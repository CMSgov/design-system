import React from 'react';
import classNames from 'classnames';
import { getInlineErrorIconDisplay } from '../flags';
import AlertCircleIcon from '../Icons/AlertCircleIcon';

/**
 * <InlineError> is an internal component used by <FormLabel> and <FormControl>
 * <InlineError> is also exported for advanced design system use cases, where the internal component can be leveraged to build custom form components
 */

interface InlineErrorProps {
  children?: React.ReactNode;
  className?: string;
  displayErrorIcon?: boolean;
  id?: string;
  inversed?: boolean;
}

export function InlineError({
  children,
  className,
  displayErrorIcon,
  id,
  inversed,
}: InlineErrorProps): React.ReactElement {
  const displayIcon = displayErrorIcon || getInlineErrorIconDisplay();

  const classes = classNames(
    'ds-c-inline-error',
    'ds-c-field__error-message',
    { 'ds-c-field__error-message--inverse': inversed },
    className
  );
  const viewbox = '36 -12 186 186';

  return (
    <span className={classes} id={id} role="alert">
      {displayIcon && <AlertCircleIcon viewBox={viewbox} />}
      {children}
    </span>
  );
}

export default InlineError;
