import React, { useRef } from 'react';
import { DropdownMenuOption } from './DropdownMenuOption';
import { DropdownMenuSection } from './DropdownMenuSection';
import { ListState, OverlayTriggerState } from 'react-stately';
import { AriaPopoverProps, AriaListBoxOptions, DismissButton, useListBox } from 'react-aria';
import usePressEscapeHandler from '../utilities/usePressEscapeHandler';
import { DropdownSize } from './Dropdown';
import classNames from 'classnames';

interface DropdownMenuProps<T> extends AriaListBoxOptions<T> {
  componentClass: string;
  labelId: string;
  menuId: string;
  rootId?: string;
  size?: DropdownSize;
  state: ListState<T> & OverlayTriggerState;
  triggerRef: AriaPopoverProps['triggerRef'];
}

export function DropdownMenu<T>({
  componentClass,
  labelId,
  menuId,
  rootId,
  size,
  state,
  ...props
}: DropdownMenuProps<T>) {
  const listBoxRef = useRef(null);
  const { listBoxProps } = useListBox(props, state, listBoxRef);

  const containerClass = classNames(
    `${componentClass}__menu-container`,
    size && `ds-c-field--${size}`
  );
  const containerRef = useRef();
  usePressEscapeHandler(containerRef, () => {
    state.setOpen(false);
    (props.triggerRef.current as HTMLButtonElement)?.focus?.();
  });

  const sharedProps = { state, rootId, componentClass };

  return (
    <div className={containerClass} ref={containerRef}>
      <DismissButton onDismiss={state.close} />
      <ul
        {...listBoxProps}
        id={menuId}
        aria-labelledby={labelId}
        className={`${componentClass}__menu`}
        ref={listBoxRef}
      >
        {[...state.collection].map((item) =>
          item.type === 'section' ? (
            <DropdownMenuSection key={item.key} section={item} {...sharedProps} />
          ) : (
            <DropdownMenuOption key={item.key} item={item} {...sharedProps} />
          )
        )}
      </ul>
      <DismissButton onDismiss={state.close} />
    </div>
  );
}

export default DropdownMenu;
