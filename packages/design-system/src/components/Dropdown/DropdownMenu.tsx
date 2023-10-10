import React, { RefObject, useRef } from 'react';
import { DropdownMenuOption } from './DropdownMenuOption';
import { DropdownMenuSection } from './DropdownMenuSection';
import { ListState, OverlayTriggerState } from '../react-aria'; // from react-stately
import { AriaPopoverProps, AriaListBoxOptions, useListBox } from '../react-aria'; // from react-aria
import usePressEscapeHandler from '../utilities/usePressEscapeHandler';
import { DropdownSize } from './Dropdown';
import classNames from 'classnames';

interface DropdownMenuProps<T> extends AriaListBoxOptions<T> {
  children?: React.ReactNode;
  componentClass: string;
  heading?: React.ReactNode;
  labelId: string;
  menuId: string;
  rootId?: string;
  size?: DropdownSize;
  state: ListState<T> & OverlayTriggerState;
  triggerRef: AriaPopoverProps['triggerRef'];
  listBoxRef?: RefObject<any>;
}

export function DropdownMenu<T>({
  children,
  componentClass,
  heading,
  labelId,
  menuId,
  rootId,
  size,
  state,
  ...props
}: DropdownMenuProps<T>) {
  const fallbackListBoxRef = useRef(null);
  const listBoxRef = props.listBoxRef ?? fallbackListBoxRef;
  const { listBoxProps } = useListBox(props, state, listBoxRef);

  const headingId = `${rootId}__heading`;
  const containerClass = classNames(
    `${componentClass}__menu-container`,
    size && `ds-c-field--${size}`
  );
  const containerRef = useRef<HTMLDivElement>();
  usePressEscapeHandler(containerRef, () => {
    state.setOpen(false);
    (props.triggerRef.current as HTMLButtonElement)?.focus?.();
  });

  // Workaround for react/react-aria #1513
  // React.useEffect(() => {
  //   const listener = (event: TouchEvent) => {  event.preventDefault(); }
  //   containerRef.current?.addEventListener('touchend', listener, { passive: false, once: true });
  //   return () => {
  //     containerRef.current?.removeEventListener('touchend', listener);
  //   }
  // }, []);
  React.useEffect(() => {
    const listener = (event: TouchEvent) => {
      event.preventDefault();
    };
    containerRef.current?.addEventListener('touchend', listener, { passive: false });
    return () => {
      containerRef.current?.removeEventListener('touchend', listener);
    };
  }, []);

  function handleTabKey(event: React.KeyboardEvent<HTMLDivElement>) {
    const TAB_KEY = 9;
    if (event.keyCode === TAB_KEY || event.key === 'Tab') {
      if (!state.selectionManager.selectedKeys.has(state.selectionManager.focusedKey)) {
        state.selectionManager.setSelectedKeys([state.selectionManager.focusedKey]);
      }
    }
  }

  const sharedProps = { state, rootId, componentClass };

  // These must be mutually exclusive, because when we force the menu to render open when
  // react-aria's state doesn't consider it open (state.isOpen), it seems to actually
  // render unexpected items. Currently we don't have a reason to render both at the same
  // time, so this is fine.
  const contents =
    children ??
    [...state.collection].map((item) =>
      item.type === 'section' ? (
        <DropdownMenuSection key={item.key} section={item} {...sharedProps} />
      ) : (
        <DropdownMenuOption key={item.key} item={item} {...sharedProps} />
      )
    );

  return (
    <div className={containerClass} ref={containerRef} onKeyDown={handleTabKey}>
      {heading && (
        <h5 className="ds-c-autocomplete__label" id={headingId}>
          {heading}
        </h5>
      )}
      <ul
        {...listBoxProps}
        id={menuId}
        aria-labelledby={classNames(labelId, heading && headingId)}
        className={`${componentClass}__menu`}
        ref={listBoxRef}
      >
        {contents}
      </ul>
    </div>
  );
}

export default DropdownMenu;
