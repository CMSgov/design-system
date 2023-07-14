import React from 'react';
import classNames from 'classnames';
import { AlertCircleIcon } from '../Icons/AlertCircleIcon';
import { t } from '../i18n';

/**
 * <FieldError> is an internal component used by <FormLabel>
 * <FieldError> is also exported for advanced design system use cases, where the internal component can be leveraged to build custom form components
 */

interface FieldErrorProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  inversed?: boolean;
}

export function FieldError({
  children,
  className,
  id,
  inversed,
}: FieldErrorProps): React.ReactElement {
  const classes = classNames(
    'ds-c-inline-error',
    'ds-c-field__error-message',
    { 'ds-c-field__error-message--inverse': inversed },
    className
  );
  const viewbox = '36 -12 186 186';

  return (
    <span className={classes} id={id} aria-live="assertive" aria-atomic="true">
      <AlertCircleIcon viewBox={viewbox} />
      <span className="ds-u-visibility--screen-reader">{`${t('inlineError.prefix')}: `}</span>
      {children}
    </span>
  );
}

export default FieldError;
