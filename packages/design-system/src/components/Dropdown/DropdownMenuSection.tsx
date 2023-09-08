import React from 'react';
import { DropdownMenuOption } from './DropdownMenuOption';
import { ListState, Node } from 'react-stately';
import { useListBoxSection } from 'react-aria';

export interface DropdownMenuOptionProps<T> {
  componentClass: string;
  section: Node<T>;
  state: ListState<T>;
  rootId?: string;
}

export function DropdownMenuSection<T>({
  componentClass,
  section,
  state,
  rootId,
}: DropdownMenuOptionProps<T>) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });
  const headingId = section.props.id ?? `${rootId}__group--${section.index}`;
  const sharedProps = { state, rootId, componentClass };

  return (
    <>
      <li {...itemProps} className={`${componentClass}__menu-item-group`}>
        {section.rendered && (
          <div
            {...section.props}
            {...headingProps}
            id={headingId}
            className={`${componentClass}__menu-item-group-label`}
          >
            {section.rendered}
          </div>
        )}
        <ul {...groupProps} aria-labelledby={headingId}>
          {[...section.childNodes].map((node) => (
            <DropdownMenuOption key={node.key} item={node} {...sharedProps} />
          ))}
        </ul>
      </li>
    </>
  );
}

export default DropdownMenuSection;
