import React, { useRef } from 'react';
import { DropdownMenuOption } from './DropdownMenuOption';
import { DropdownMenuSection } from './DropdownMenuSection';
import { ListState, OverlayTriggerState } from 'react-stately';
import { AriaPopoverProps, AriaListBoxOptions, DismissButton, useListBox } from 'react-aria';
import usePressEscapeHandler from '../utilities/usePressEscapeHandler';

interface DropdownMenuProps<T> extends AriaListBoxOptions<T> {
  className?: string;
  state: ListState<T> & OverlayTriggerState;
  triggerRef: AriaPopoverProps['triggerRef'];
}

export function DropdownMenu<T>({ className, state, ...props }: DropdownMenuProps<T>) {
  const listBoxRef = useRef(null);
  const { listBoxProps } = useListBox(props, state, listBoxRef);
  const containerRef = useRef();
  usePressEscapeHandler(containerRef, () => {
    state.setOpen(false);
    (props.triggerRef.current as HTMLButtonElement)?.focus?.();
  });

  return (
    <div className={className} ref={containerRef}>
      <DismissButton onDismiss={state.close} />
      <ul {...listBoxProps} className="ds-c-dropdown__menu" ref={listBoxRef}>
        {[...state.collection].map((item) =>
          item.type === 'section' ? (
            <DropdownMenuSection key={item.key} section={item} state={state} />
          ) : (
            <DropdownMenuOption key={item.key} item={item} state={state} attributes={{}} />
          )
        )}
      </ul>
      <DismissButton onDismiss={state.close} />
    </div>
  );
}

export default DropdownMenu;
