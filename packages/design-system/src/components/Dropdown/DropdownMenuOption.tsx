import React, { useRef } from 'react';
import { Item, ListState } from 'react-stately';
import { useOption } from 'react-aria';
import classNames from 'classnames';

export interface DropdownMenuOptionProps {
  item: Item;
  state: ListState<HTMLUListElement>;
  attributes: React.HTMLAttributes<'option'>;
}

export function DropdownMenuOption({ attributes = {}, item, state }: DropdownMenuOptionProps) {
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
