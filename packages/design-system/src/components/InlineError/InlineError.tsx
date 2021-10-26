import React from 'react';
import classNames from 'classnames';

/**
 * <InlineError> is an internal component used by <FormLabel> and <FormControl>
 * <InlineError> is also exported for advanced design system use cases, where the internal component can be leveraged to build custom form components
 */

interface InlineErrorProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  inversed?: boolean;
}

export function InlineError({
  children,
  className,
  id,
  inversed,
}: InlineErrorProps): React.ReactElement {
  const classes = classNames(
    'ds-c-field__error-message',
    { 'ds-c-field__error-message--inverse': inversed },
    className
  );

  return (
    <span className={classes} id={id} role="alert">
      {children}
    </span>
  );
}

export default InlineError;
