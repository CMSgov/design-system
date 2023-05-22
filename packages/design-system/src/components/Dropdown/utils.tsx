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
): React.ReactElement<any, T>[] {
  if (!node || !(React.isValidElement(node) || Array.isArray(node))) {
    // There's nothing to recurse on, and this is not the droid we're looking for
    return [];
  }

  if (React.isValidElement(node) && type === node.type) {
    // We found it! Return an array because it will be flattened
    return [node as React.ReactElement<any, T>];
  }

  if (Array.isArray(node)) {
    // Recurse on each member of the array and flatten the result
    return node.reduce(
      (acc: React.ReactElement<any, T>[], child: React.ReactNode) => [
        ...acc,
        ...findElementsOfType(type, child),
      ],
      []
    ) as React.ReactElement<any, T>[];
  }

  // It's a React element, so recurse on its children (a ReactNode)
  return findElementsOfType(type, (node as React.ReactElement).props?.children);
}

function parseOptionElement(option: React.ReactElement<any, 'option'>): DropdownOption {
  const { value, children, ...extraAttributes } = option.props;
  return {
    value,
    label: children?.toString?.() ?? '', // Probably should throw an error
    ...extraAttributes,
  };
}

function parseOptGroupElement(optgroup: React.ReactElement<any, 'optgroup'>): DropdownOptGroup {
  const { label, ...extraProps } = optgroup.props;
  if (!label) {
    throw new Error('Could not find a label on `<optgroup>` element');
  }
  return {
    label,
    options: findElementsOfType('option', optgroup).map(parseOptionElement),
    ...extraProps,
  };
}

export function parseChildren(node: React.ReactNode): DropdownOptGroup[] | DropdownOption[] {
  const optgroups = findElementsOfType('optgroup', node);
  if (optgroups.length) {
    return optgroups.map(parseOptGroupElement);
  }

  const options = findElementsOfType('option', node);
  if (options.length) {
    return options.map(parseOptionElement);
  }

  return [];
}
