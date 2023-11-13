import React, { useEffect, useRef } from 'react';
import { ListState, Node, OverlayTriggerState } from '../react-aria'; // from react-stately
import { SvgIcon } from '../Icons';
import { useOption } from '../react-aria'; // from react-aria
import classNames from 'classnames';

export function getOptionId(rootId: string, index: number): string {
  return `${rootId}__item--${index}`;
}

export interface DropdownMenuOptionProps<T> {
  componentClass: string;
  item: Node<T>;
  state: ListState<T> & OverlayTriggerState;
  rootId?: string;
}

export function DropdownMenuOption<T>({
  componentClass,
  item,
  state,
  rootId,
}: DropdownMenuOptionProps<T>) {
  const ref = useRef(null);
  const { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key },
    state,
    ref
  );

  const selectedIndicator = (
    <span className={`${componentClass}__menu-item-selected-indicator`}>
      <SvgIcon title="selected option icon" viewBox="0 0 448 512" className="ds-u-font-size--sm">
        <path d="M443.3 100.7c6.2 6.2 6.2 16.4 0 22.6l-272 272c-6.2 6.2-16.4 6.2-22.6 0l-144-144c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L160 361.4l260.7-260.7c6.2-6.2 16.4-6.2 22.6 0z" />
      </SvgIcon>
    </span>
  );

  const { textValue, ...extraAttrs } = item.props;

  // Work around [this issue](https://github.com/adobe/react-spectrum/issues/4974) by manually
  // scrolling the selected option into view. At the time of writing this, we are using
  // `@react-aria/selection` version 3.16.1
  useEffect(() => {
    if (state.isOpen && isSelected) {
      ref.current?.scrollIntoView({ block: 'nearest' });
    }
  }, [isSelected, state.isOpen]);

  return (
    <li
      {...optionProps}
      id={getOptionId(rootId, item.index)}
      {...extraAttrs}
      ref={ref}
      className={classNames(
        item.props.className,
        `${componentClass}__menu-item`,
        isFocused && `${componentClass}__menu-item--highlighted`,
        isSelected && `${componentClass}__menu-item--selected`,
        isDisabled && `${componentClass}__menu-item--disabled`
      )}
    >
      {isSelected && selectedIndicator}
      {item.rendered}
    </li>
  );
}

export default DropdownMenuOption;
