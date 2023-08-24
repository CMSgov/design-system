import React, { MutableRefObject, RefObject } from 'react';
import { Item, ListState, Section, useSelectState } from 'react-stately';
import { HiddenSelect, useSelect } from 'react-aria';
import { DismissButton, Overlay, usePopover } from 'react-aria';
import type { AriaPopoverProps, AriaListBoxOptions } from 'react-aria';
import type { OverlayTriggerState } from 'react-stately';
import { useButton } from 'react-aria';
import { useListBox, useOption } from 'react-aria';
import { useListBoxSection } from 'react-aria';

interface PopoverProps extends Omit<AriaPopoverProps, 'popoverRef'> {
  children: React.ReactNode;
  state: OverlayTriggerState;
}

interface ListBoxProps<T> extends AriaListBoxOptions<T> {
  state: ListState<T>;
  ref?: MutableRefObject<T>;
}

function Popover({ children, state, ...props }: PopoverProps) {
  const popoverRef = React.useRef(null);
  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef,
    },
    state
  );

  return (
    <Overlay>
      <div {...underlayProps} style={{ position: 'fixed', inset: 0 }} />
      <div
        {...popoverProps}
        ref={popoverRef}
        style={{
          ...popoverProps.style,
          background: 'var(--page-background)',
          border: '1px solid gray',
        }}
      >
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}

function ListBox<T>(props: ListBoxProps<T>) {
  const listBoxFallbackRef = React.useRef(null);
  const { ref = listBoxFallbackRef, state } = props;
  const { listBoxProps } = useListBox(props, state, ref);

  return (
    <ul
      {...listBoxProps}
      className="ds-c-dropdown__menu"
      ref={ref}
      style={{
        margin: 0,
        padding: 0,
        listStyle: 'none',
        maxHeight: 150,
        overflow: 'auto',
        minWidth: 100,
        background: 'lightgray',
      }}
    >
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

// function DropdownMenu({children, state, ...props}) {
//   const popoverRef = React.useRef(null);
//   const { popoverProps, underlayProps } = usePopover(
//     {
//       ...props,
//       popoverRef,
//     },
//     state
//   );

//   const listBoxFallbackRef = React.useRef(null);
//   const { listBoxRef = listBoxFallbackRef, state } = props;
//   const { listBoxProps } = useListBox(props, state, listBoxRef);

//   return (
//     <Overlay>
//       <div {...underlayProps} style={{ position: 'fixed', inset: 0 }} />
//       <div
//         {...popoverProps}
//         ref={popoverRef}
//         style={{
//           ...popoverProps.style,
//           background: 'var(--page-background)',
//           border: '1px solid gray',
//         }}
//       >
//         <DismissButton onDismiss={state.close} />
//         {children}
//         <DismissButton onDismiss={state.close} />
//       </div>
//     </Overlay>
//   );

//     <ul
//       {...listBoxProps}
//       ref={listBoxRef}
//       style={{
//         margin: 0,
//         padding: 0,
//         listStyle: 'none',
//         maxHeight: 150,
//         overflow: 'auto',
//         minWidth: 100,
//         background: 'lightgray',
//       }}
//     >
//       {[...state.collection].map((item) => (
//         <Option key={item.key} item={item} state={state} />
//       ))}
//     </ul>
// }

function Option({ item, state }) {
  const ref = React.useRef(null);
  const { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key },
    state,
    ref
  );

  return (
    <li
      {...optionProps}
      ref={ref}
      style={{
        background: isFocused ? 'gray' : 'transparent',
        color: isDisabled ? 'gray' : isFocused ? 'white' : 'black',
        padding: '2px 5px',
        outline: 'none',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
      }}
    >
      {item.rendered}
      {isSelected ? <span>✓</span> : null}
    </li>
  );
}

// Copied from https://react-spectrum.adobe.com/react-aria/useListBox.html#sections
function ListBoxSection({ section, state }) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  // If the section is not the first, add a separator element to provide visual separation.
  // The heading is rendered inside an <li> element, which contains
  // a <ul> with the child items.
  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <li
          role="presentation"
          style={{
            borderTop: '1px solid gray',
            margin: '2px 5px',
          }}
        />
      )}
      <li {...itemProps}>
        {section.rendered && (
          <span
            {...headingProps}
            style={{
              fontWeight: 'bold',
              fontSize: '1.1em',
              padding: '2px 5px',
            }}
          >
            {section.rendered}
          </span>
        )}
        <ul
          {...groupProps}
          style={{
            padding: 0,
            listStyle: 'none',
          }}
        >
          {[...section.childNodes].map((node) => (
            <Option key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
}

function Select(props) {
  // Create state based on the incoming props
  const state = useSelectState(props);

  // Get props for child elements from useSelect
  const ref = React.useRef(null);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(props, state, ref);
  const { buttonProps } = useButton(triggerProps, ref);

  return (
    <div style={{ display: 'inline-block' }}>
      <div {...labelProps}>{props.label}</div>
      <HiddenSelect
        isDisabled={props.isDisabled}
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <button {...buttonProps} ref={ref}>
        <span {...valueProps}>
          {state.selectedItem ? state.selectedItem.rendered : 'Select an option'}
        </span>
        <span aria-hidden="true" style={{ paddingLeft: 5 }}>
          ▼
        </span>
      </button>
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement="bottom start">
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </div>
  );
}

export const MySelect = (
  <Select label="Favorite Color">
    <Item>Red</Item>
    <Item>Orange</Item>
    <Item>Yellow</Item>
    <Item>Green</Item>
    <Item>Blue</Item>
    <Item>Purple</Item>
    <Section title="Outside the color wheel">
      <Item>Black</Item>
      <Item>White</Item>
      <Item>Lime</Item>
      <Item>Fuchsia</Item>
    </Section>
  </Select>
);
