import React from 'react';
import { DropdownOption, DropdownOptGroup } from './Dropdown';

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

  return [{ label: 'foo', value: '1-1' }] as any;
}
