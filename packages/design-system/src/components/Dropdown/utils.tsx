import React from 'react';
import { DropdownProps, DropdownOption, DropdownOptGroup } from './Dropdown';

export function validateProps(props: DropdownProps) {
  if (process.env.NODE_ENV !== 'production') {
    // 'ariaLabel' is provided with a `label` prop that is not an empty string
    if (props.ariaLabel && (typeof props.label !== 'string' || props.label.length > 0)) {
      console.warn(
        `Cannot use 'ariaLabel' and 'label' React properties together in the <Dropdown> component. If the 'label' prop is used, it should be written for all users so that an 'ariaLabel' is not needed. The 'ariaLabel' prop is intended to be used only when the input is missing an input label (i.e when an empty string is provided for the 'label' prop)`
      );
    }
    // An empty string `label` is provided without a corresponding `ariaLabel` prop
    if (!props.ariaLabel && typeof props.label === 'string' && props.label.length === 0) {
      console.warn(
        `Please provide an 'ariaLabel' when using the <Dropdown> component without a 'label' prop.`
      );
    }
    if (props.children && props.options?.length > 0) {
      console.warn(
        `Cannot use 'options' and 'children' React properties at the same time in the <Select> component. Please use 'children' for custom options and 'options' for general cases`
      );
    }
  }
}

export function itemToString(item: DropdownOption) {
  return item.label;
}

export function isOptGroupArray(
  optionsOrGroups: DropdownOption[] | DropdownOptGroup[]
): optionsOrGroups is DropdownOptGroup[] {
  return (
    optionsOrGroups?.length > 0 && (optionsOrGroups as DropdownOptGroup[])[0].options !== undefined
  );
}

function findElementsOfType<T extends keyof JSX.IntrinsicElements>(
  type: T,
  node: React.ReactNode
): Array<React.ReactElement<any, T>> {
  if (node && React.isValidElement(node) && type === node.type) {
    return [node as any as React.ReactElement<any, T>];
  } else if (typeof node === 'object') {
    const array: React.ReactNode[] =
      (Array.isArray(node) ? node : (node as React.ReactElement).props?.children) ?? [];
    return array.reduce(
      (acc: Array<React.ReactElement<any, T>>, child: React.ReactNode) => [
        ...acc,
        ...findElementsOfType(type, child),
      ],
      []
    ) as Array<React.ReactElement<any, T>>;
  } else {
    return [];
  }
}

function parseOptionElements(els: Array<React.ReactElement<any, 'option'>>): DropdownOption[] {
  return els.map((option) => {
    const { value, children, ...extraAttributes } = option.props;
    return {
      value: value,
      label: children?.toString?.() ?? '', // Probably should throw an error
      ...extraAttributes,
    };
  });
}

export function parseChildren(node: React.ReactNode): DropdownOptGroup[] | DropdownOption[] {
  const optgroups = findElementsOfType('optgroup', node);
  if (optgroups.length) {
    return optgroups.map((optgroup) => ({
      ...optgroup.props,
      options: parseOptionElements(findElementsOfType('option', optgroup)),
    }));
  }

  const options = findElementsOfType('option', node);
  if (options.length) {
    return parseOptionElements(options);
  }

  return [];
}
