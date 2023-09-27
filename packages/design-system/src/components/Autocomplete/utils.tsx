import React, { ReactElement, ReactNode } from 'react';
import { TextField } from '../TextField';

export function renderStatusMessage(message: ReactNode) {
  return (
    <li aria-selected="false" className="ds-c-autocomplete__menu-item-message" role="option">
      {message}
    </li>
  );
}

/**
 * Determine if a React component is a TextField
 */
export function isTextField(child?: ReactNode): child is ReactElement {
  if (!child || !React.isValidElement(child)) {
    return false;
  }

  // Check child.type first and as a fallback, check child.type.displayName follow by child.type.name
  const componentName = (child.type as any)?.displayName || (child.type as any)?.name;
  return child.type === TextField || componentName === 'TextField';
}
