import React, {ReactElement, ReactNode} from 'react';
import { AutocompleteItem } from './Autocomplete';
import { Item } from 'react-stately';
import {TextField} from '../TextField';

export function renderReactStatelyItems(items: AutocompleteItem[]) {
  return items.map(({ id, name, children, isResult, ...extraAttrs }: AutocompleteItem) => (
    <Item {...extraAttrs} key={id}>
      {name ?? children}
    </Item>
  ));
}

export function renderStatusMessage(message: ReactNode) {
  return (
    <li aria-selected="false" className="ds-c-autocomplete__menu-item-message" role="option">
      {message}
    </li>
  )
}

/**
 * Determine if a React component is a TextField
 */
function isTextField(child?: ReactNode): child is ReactElement {
  if (!child || !React.isValidElement(child)) {
    return false;
  }

  // Check child.type first and as a fallback, check child.type.displayName follow by child.type.name
  const componentName = (child.type as any)?.displayName || (child.type as any)?.name;
  return (child.type === TextField || componentName === 'TextField');
}

export function transformTextFieldChild(children: ReactNode, transform: (textField: ReactElement) => ReactElement) {
  return React.Children.map(children, (child) => {
    if (isTextField(child)) {
      return transform(child);
    } else {
      return child;
    }
  })
}