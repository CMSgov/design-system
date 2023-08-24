/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef } from 'react';
import type { AriaListBoxOptions } from '@react-aria/listbox';
import type { ListState } from '@react-stately/list';
import type { Node } from '@react-types/shared';
import { useListBox, useListBoxSection, useOption } from '@react-aria/listbox';
import classNames from 'classnames';

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<unknown>;
}

interface SectionProps {
  section: Node<unknown>;
  state: ListState<unknown>;
}

interface OptionProps {
  item: Node<unknown>;
  state: ListState<unknown>;
}

export function ListBox(props: ListBoxProps) {
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);
  // TODO: Make the ListBox/Dropdown and its classes more generic and shareable with Autocomplete
  return (
    <ul {...listBoxProps} className="ds-c-dropdown__menu" ref={listBoxRef}>
      {[...state.collection].map((item) =>
        item.type === 'section' ? (
          <ListBoxSection key={item.key} section={item} state={state} />
        ) : (
          <Option key={item.key} item={item} state={state} />
        )
      )}
    </ul>
  );
}
export default ListBox;

function ListBoxSection({ section, state }: SectionProps) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  return (
    <>
      <li {...itemProps} className="pt-2">
        {section.rendered && (
          <span {...headingProps} className="ds-c-dropdown__item-group">
            {section.rendered}
          </span>
        )}
        <ul {...groupProps}>
          {[...state.collection.getChildren(section.key)].map((node) => (
            <Option key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
}

function Option({ item, state }: OptionProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isDisabled, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref
  );

  return (
    <li
      {...optionProps}
      ref={ref}
      className={classNames(
        'ds-c-dropdown__item',
        optionProps.className,
        isFocused && 'ds-c-listbox__item--highlighted',
        isSelected && 'ds-c-listbox__item--selected',
        isDisabled && 'ds-c-listbox__item--disabled'
      )}
    >
      {item.rendered}
      {isSelected && 'Checked'}
    </li>
  );
}
