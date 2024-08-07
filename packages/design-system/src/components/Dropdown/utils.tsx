import { ReactNode, ReactElement } from 'react';
import { findElementsOfType } from '../utilities/findElementsOfType';
import { DropdownProps, DropdownOption, DropdownOptGroup, DropdownValue } from './Dropdown';

export function validateProps(props: DropdownProps) {
  if (process.env.NODE_ENV !== 'production') {
    if (props.children && props.options?.length > 0) {
      console.warn(
        `Cannot use 'options' and 'children' React properties at the same time in the <Select> component. Please use 'children' for custom options and 'options' for general cases`
      );
    }
  }
}

export function isOptGroup(
  optionsOrGroups: DropdownOption | DropdownOptGroup
): optionsOrGroups is DropdownOptGroup {
  return (optionsOrGroups as DropdownOptGroup).options !== undefined;
}

export function getFirstOptionValue(
  optionsAndGroups: Array<DropdownOptGroup | DropdownOption>
): DropdownValue | undefined {
  for (const optOrGroup of optionsAndGroups) {
    if (!isOptGroup(optOrGroup)) {
      return optOrGroup.value;
    } else if (optOrGroup.options[0]) {
      return optOrGroup.options[0].value;
    }
  }
  console.warn('Dropdown component could not determine a default selected option');
}

function parseOptionElement(option: ReactElement<any, 'option'>): DropdownOption {
  const { value, children, ...extraAttributes } = option.props;
  // The web-component Preact parser sometimes wraps text content in an array, but
  // react-aria doesn't like that because it wants its labels/children to only be
  // strings, or it will warn "<Item> with non-plain text contents is unsupported".
  const label = children.length === 1 ? children[0] : children;
  return {
    value,
    label,
    ...extraAttributes,
  };
}

function parseOptGroupElement(optgroup: ReactElement<any, 'optgroup'>): DropdownOptGroup {
  const { label, ...extraProps } = optgroup.props;
  if (!label) {
    throw new Error('Could not find a label on `<optgroup>` element');
  }
  return {
    label,
    options: findElementsOfType(['option'], optgroup).map(parseOptionElement),
    ...extraProps,
  };
}

export function parseChildren(node: ReactNode): Array<DropdownOptGroup | DropdownOption> {
  const elements = findElementsOfType(['optgroup', 'option'], node);
  if (elements.length) {
    return elements.map((element) => {
      if (element.type === 'optgroup') {
        return parseOptGroupElement(element as ReactElement<any, 'optgroup'>);
      }
      return parseOptionElement(element as ReactElement<any, 'option'>);
    });
  }

  return [];
}
