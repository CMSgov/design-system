import React, { ReactElement, ReactNode } from 'react';
import { AutocompleteItem } from './Autocomplete';
import { ComboBoxState, Item } from 'react-stately';
import { TextField } from '../TextField';
import { getOptionId } from '../Dropdown/DropdownMenuOption';

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
  );
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
  return child.type === TextField || componentName === 'TextField';
}

export function getTextFieldChild(children: ReactNode): ReactElement | undefined {
  let textField;
  React.Children.forEach(children, (child) => {
    if (isTextField(child)) {
      textField = child;
    }
  });
  return textField;
}

/**
 * Assumes that it will find the item, so only use in cases where react-aria
 * would define an aria-activedescendent
 */
export function getActiveDescendant(
  rootId: string,
  state: ComboBoxState<object>,
  items: AutocompleteItem[]
): string {
  const index = (items ?? []).findIndex((item) => state.selectionManager.focusedKey === item.id);
  return getOptionId(rootId, index);
}
