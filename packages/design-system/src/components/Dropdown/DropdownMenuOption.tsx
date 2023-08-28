import React, { useRef } from 'react';
import { ListState, Node } from 'react-stately';
import { useOption } from 'react-aria';
import classNames from 'classnames';

export interface DropdownMenuOptionProps<T> {
  item: Node<T>;
  state: ListState<T>;
  attributes: React.HTMLAttributes<'option'>;
}

export function DropdownMenuOption<T>({
  attributes = {},
  item,
  state,
}: DropdownMenuOptionProps<T>) {
  const ref = useRef(null);
  const { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key },
    state,
    ref
  );

  return (
    <li
      {...optionProps}
      {...attributes}
      ref={ref}
      className={classNames(
        attributes.className,
        'ds-c-dropdown__menu-item',
        isFocused && 'ds-c-dropdown__menu-item--highlighted',
        isSelected && 'ds-c-dropdown__menu-item--selected'
      )}
    >
      {item.rendered}
      {isSelected ? <span>✓</span> : null}
    </li>
  );
}

export default DropdownMenuOption;
