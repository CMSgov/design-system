import { isValidElement, ReactNode, ReactElement } from 'react';

export function findElementsOfType<T extends keyof JSX.IntrinsicElements>(
  types: T[],
  node: ReactNode
): ReactElement<any, T>[] {
  if (!node || !(isValidElement(node) || Array.isArray(node))) {
    // There's nothing to recurse on, and this is not the droid we're looking for
    return [];
  }

  if (isValidElement(node) && types.includes(node.type as T)) {
    // We found it! Return an array because it will be flattened
    return [node as ReactElement<any, T>];
  }

  if (Array.isArray(node)) {
    // Recurse on each member of the array and flatten the result
    return node.reduce(
      (acc: ReactElement<any, T>[], child: ReactNode) => [
        ...acc,
        ...findElementsOfType(types, child),
      ],
      []
    ) as ReactElement<any, T>[];
  }

  // It's a React element, so recurse on its children (a ReactNode)
  return findElementsOfType(types, (node as ReactElement).props?.children);
}
