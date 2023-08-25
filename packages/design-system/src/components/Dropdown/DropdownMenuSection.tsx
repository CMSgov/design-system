import React from 'react';
import { DropdownMenuOption } from './DropdownMenuOption';
import { ListState, Section } from 'react-stately';
import { useListBoxSection } from 'react-aria';

export interface DropdownMenuOptionProps {
  section: Section;
  state: ListState<HTMLUListElement>;
}

export function DropdownMenuSection({ section, state }) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  return (
    <>
      <li {...itemProps} className="ds-c-dropdown__menu-item-group">
        {section.rendered && (
          <span {...headingProps} className="ds-c-dropdown__menu-item-group-label">
            {section.rendered}
          </span>
        )}
        <ul {...groupProps}>
          {[...section.childNodes].map((node) => (
            <DropdownMenuOption key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
}

export default DropdownMenuSection;
