import React from 'react';
import classNames from 'classnames';

interface InlineErrorProps {
  children: React.ReactNode;
  fieldId: string;
  inversed?: boolean;
}

function InlineError({ 
  children, 
  fieldId, 
  inversed
}: InlineErrorProps): React.ReactElement {
  const classes = classNames('ds-c-field__error-message', {
    'ds-c-field__error-message--inverse': inversed,
  });
  const errorId = `${fieldId}-message`;
  
  return (
    <span className={classes} id={errorId} role="alert">
      {children}
    </span>
  );
}

export default InlineError;
