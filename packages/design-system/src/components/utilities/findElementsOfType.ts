import { isValidElement, ReactNode, ReactElement } from 'react';

type CustomElements =
  | 'ds-choice'
  | 'ds-accordion'
  | 'ds-tooltip-icon'
  | 'ds-third-party-external-link';

type AllowedElements = keyof React.JSX.IntrinsicElements | CustomElements;

export function findElementsOfType(types: AllowedElements[], node: ReactNode): ReactElement<any>[] {
  if (!node || !(isValidElement(node) || Array.isArray(node))) {
    return [];
  }

  if (isValidElement(node) && types.includes(node.type as AllowedElements)) {
    return [node];
  }

  if (Array.isArray(node)) {
    return node.reduce(
      (acc: ReactElement<any>[], child: ReactNode) => [...acc, ...findElementsOfType(types, child)],
      []
    );
  }

  return findElementsOfType(types, (node as ReactElement<any>).props?.children);
}
