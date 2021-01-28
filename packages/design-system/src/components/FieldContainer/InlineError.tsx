import React from 'react';
import classNames from 'classnames';

interface InlineErrorProps {
  children?: React.ReactNode;
  id?: string;
  inversed?: boolean;
}

function InlineError({ children, id, inversed }: InlineErrorProps): React.ReactElement {
  const classes = classNames('ds-c-field__error-message', {
    'ds-c-field__error-message--inverse': inversed,
  });
  return (
    <span className={classes} id={id} role="alert">
      {children}
    </span>
  );
}

export default InlineError;
