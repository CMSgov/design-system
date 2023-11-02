import React from 'react';
import classNames from 'classnames';
import { AlertCircleIcon } from '../Icons/AlertCircleIcon';
import { t } from '../i18n';
import useId from '../utilities/useId';

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
    'ds-c-inline-error',
    { 'ds-c-inline-error--inverse': inversed },
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

export default InlineError;
