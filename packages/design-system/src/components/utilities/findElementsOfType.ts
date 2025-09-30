import { isValidElement, ReactNode, ReactElement } from 'react';

type CustomElements =
  | 'ds-choice'
  | 'ds-accordion'
  | 'ds-tooltip-icon'
  | 'ds-third-party-external-link';

type AllowedElements = keyof React.JSX.IntrinsicElements | CustomElements;

export function findElementsOfType(types: AllowedElements[], node: ReactNode): ReactElement<any>[] {
  if (!node || !(isValidElement(node) || Array.isArray(node))) {
    // There's nothing to recurse on, and this is not the droid we're looking for
    return [];
  }

  if (isValidElement(node) && types.includes(node.type as AllowedElements)) {
    // We found it! Return an array because it will be flattened
    return [node];
  }

  if (Array.isArray(node)) {
    // Recurse on each member of the array and flatten the result
    return node.reduce(
      (acc: ReactElement<any>[], child: ReactNode) => [...acc, ...findElementsOfType(types, child)],
      []
    );
  }
  // It's a React element, so recurse on its children (a ReactNode)
  return findElementsOfType(types, (node as ReactElement<any>).props?.children);
}
