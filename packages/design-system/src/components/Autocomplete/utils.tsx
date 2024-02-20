import React, { ReactElement, ReactNode } from 'react';
import { AutocompleteProps, AutocompleteItem } from './Autocomplete';
import { ComboBoxState, Item } from '../react-aria'; // from react-stately
import { TextField } from '../TextField';
import { getOptionId } from '../Dropdown/DropdownMenuOption';

export function renderReactStatelyItems(
  items: AutocompleteItem[],
  itemToString: AutocompleteProps['itemToString']
) {
  return items.map((item: AutocompleteItem) => {
    const { id, name, children, isResult, ...extraAttrs } = item;
    return (
      <Item {...extraAttrs} textValue={name ?? itemToString?.(item)} key={id}>
        {children ?? name}
      </Item>
    );
  });
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

/**
 * Mutates the original object, deleting properties whose values are undefined.
 * Returns the object.
 */
export function removeUndefined<T>(obj: T): T {
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
  return obj;
}
