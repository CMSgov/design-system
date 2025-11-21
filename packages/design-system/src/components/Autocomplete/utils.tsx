import { isValidElement, ReactElement, ReactNode } from 'react';
import {
  AutocompleteProps,
  AutocompleteItem,
  AutocompleteItems,
  AutocompleteItemGroup,
} from './Autocomplete';
import { ComboBoxState, Item, Section } from '../react-aria'; // from react-stately
import { TextField } from '../TextField';
import { getOptionId } from '../Dropdown/DropdownMenuOption';

export function renderReactStatelyItems(
  items: AutocompleteItems,
  itemToString: AutocompleteProps['itemToString']
) {
  const renderItem = (item: AutocompleteItem) => {
    const { id, name, children, ...extraAttrs } = item;
    return (
      <Item key={id} textValue={name ?? itemToString?.(item)} {...extraAttrs}>
        {children ?? name}
      </Item>
    );
  };

  return items.map((item, index) => {
    if ('label' in item && 'items' in item) {
      const { id, label, items, ...extraAttrs } = item as AutocompleteItemGroup;
      const groupKey = `group-${label.replace(/\s+/g, '-').toLowerCase()}-${index}`;
      return (
        <Section {...extraAttrs} key={groupKey} title={label}>
          {items.map(renderItem)}
        </Section>
      );
    } else {
      return renderItem(item as AutocompleteItem);
    }
  });
}

export function renderStatusMessage(message: ReactNode) {
  return (
    <li className="ds-c-autocomplete__menu-item-message" role="option">
      {message}
    </li>
  );
}

/**
 * Determine if a React component is a TextField
 */
function isTextField(child?: ReactNode): child is ReactElement {
  if (!child || !isValidElement(child)) {
    return false;
  }

  // Check child.type first and as a fallback, check child.type.displayName follow by child.type.name
  const componentName = (child.type as any)?.displayName || (child.type as any)?.name;
  return child.type === TextField || componentName === 'TextField';
}

export function getTextFieldChild(children: ReactNode): ReactElement | undefined {
  const all = Array.isArray(children) ? children : [children];

  let textField;
  for (const child of all) {
    if (isTextField(child)) {
      textField = child;
    }
  }
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

export const findItemById = (
  id: string,
  items: AutocompleteItems
): AutocompleteItem | undefined => {
  for (const item of items) {
    if ('items' in item) {
      const match = item.items.find((child) => child.id === id);
      if (match) return match;
    } else {
      if (item.id === id) return item;
    }
  }
};
