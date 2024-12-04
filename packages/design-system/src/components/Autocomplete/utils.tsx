import { isValidElement, Children, ReactElement, ReactNode } from 'react';
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
  return items.map((item) => {
    // Check if the item is a group
    if ('label' in item && 'items' in item) {
      const group = item as AutocompleteItemGroup;
      return (
        <Section key={group.label} title={group.label}>
          {group.items.map((groupItem) => (
            <Item
              key={groupItem.id}
              textValue={groupItem.name ?? itemToString?.(groupItem)}
              {...groupItem}
            >
              {groupItem.children ?? groupItem.name}
            </Item>
          ))}
        </Section>
      );
    }

    // If not a group, render as a standalone item
    const standaloneItem = item as AutocompleteItem;
    return (
      <Item
        key={standaloneItem.id}
        textValue={standaloneItem.name ?? itemToString?.(standaloneItem)}
        {...standaloneItem}
      >
        {standaloneItem.children ?? standaloneItem.name}
      </Item>
    );
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
  let textField;
  Children.forEach(children, (child) => {
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
