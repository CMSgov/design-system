import React from 'react';
import { DropdownMenuOption } from './DropdownMenuOption';
import { ListState, Node } from 'react-stately';
import { useListBoxSection } from 'react-aria';

export interface DropdownMenuOptionProps<T> {
  section: Node<T>;
  state: ListState<T>;
  rootId?: string;
}

export function DropdownMenuSection<T>({ section, state, rootId }: DropdownMenuOptionProps<T>) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });
  const headingId = `${rootId}__group--${section.index}`;

  return (
    <>
      <li {...itemProps} className="ds-c-dropdown__menu-item-group">
        {section.rendered && (
          <div
            {...section.props}
            {...headingProps}
            id={headingId}
            className="ds-c-dropdown__menu-item-group-label"
          >
            {section.rendered}
          </div>
        )}
        <ul {...groupProps} aria-labelledby={headingId}>
          {[...section.childNodes].map((node) => (
            <DropdownMenuOption key={node.key} item={node} state={state} rootId={rootId} />
          ))}
        </ul>
      </li>
    </>
  );
}

export default DropdownMenuSection;
