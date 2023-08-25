import React, { useRef } from 'react';
import { DropdownMenuOption } from './DropdownMenuOption';
import { DropdownMenuSection } from './DropdownMenuSection';
import { ListState, OverlayTriggerState } from 'react-stately';
import {
  AriaPopoverProps,
  AriaListBoxOptions,
  DismissButton,
  Overlay,
  usePopover,
  useListBox,
} from 'react-aria';

interface DropdownMenuProps extends AriaListBoxOptions<HTMLUListElement> {
  className?: string;
  placement: AriaPopoverProps['placement'];
  state: ListState<HTMLUListElement> & OverlayTriggerState;
  triggerRef: AriaPopoverProps['triggerRef'];
}

export function DropdownMenu({ className, state, ...props }: DropdownMenuProps) {
  const popoverRef = useRef(null);
  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef,
    },
    state
  );

  const listBoxRef = useRef(null);
  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <Overlay>
      <div {...underlayProps} style={{ position: 'fixed', inset: 0 }} />
      <div
        {...popoverProps}
        ref={popoverRef}
        // This contains logic for opening the menu above the button if there's
        // not enough space below, but our styles don't yet support that.
        // style={popoverProps.style}
        style={undefined}
        className={className}
      >
        <DismissButton onDismiss={state.close} />
        <ul {...listBoxProps} className="ds-c-dropdown__menu" ref={listBoxRef}>
          {[...state.collection].map((item) =>
            item.type === 'section' ? (
              <DropdownMenuSection key={item.key} section={item} state={state} />
            ) : (
              <DropdownMenuOption key={item.key} item={item} state={state} />
            )
          )}
        </ul>
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}

export default DropdownMenu;
