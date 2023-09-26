import React from 'react';
import classNames from 'classnames';
import { AlertCircleIcon } from '../Icons/AlertCircleIcon';
import { t } from '../i18n';
import useId from '../utilities/useId';

/**
 * <FieldError> is an internal component used by <Label>
 * <FieldError> is also exported for advanced design system use cases, where the internal component can be leveraged to build custom form components
 */

export interface FieldErrorProps {
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
    // TODO: This class is being included for backwards compatibility, but the
    // `ds-c-inline-error` class is deprecated and should be removed eventually
    'ds-c-inline-error',
    'ds-c-field__error-message',
    { 'ds-c-field__error-message--inverse': inversed },
    className
  );
  const viewbox = '36 -12 186 186';

  return (
    <span
      className={classes}
      id={useId('inline-error--', id)}
      aria-live="assertive"
      aria-atomic="true"
    >
      <AlertCircleIcon viewBox={viewbox} />
      <span className="ds-u-visibility--screen-reader">{`${t('inlineError.prefix')}: `}</span>
      {children}
    </span>
  );
}

export default FieldError;
