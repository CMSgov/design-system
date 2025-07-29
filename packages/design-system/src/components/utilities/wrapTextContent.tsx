import React from 'react';

/**
 * Wraps all text children of a component in `<span>` elements.
 * This function ensures that text-based children are safely wrapped to prevent
 * issues with Google Translate breaking React's reconciliation process.
 *
 * @param children - The children to be wrapped. Can be `null`, `undefined`, or a React node.
 * @returns The children wrapped in `<span>` elements, or the original React elements if they are valid.
 */
export const wrapChildrenInSpans = (children: React.ReactNode): React.ReactNode => {
  const wrapped = React.Children.map(children, (child, index) => {
    // Skip null/undefined
    if (child === null || child === undefined) {
      return null;
    }

    // If it's already a React element (component), don't wrap it
    if (React.isValidElement(child)) {
      return child;
    }

    // Wrap text/numbers in a span
    return <span key={index}>{child}</span>;
  });

  // React.Children.map returns null for empty children, but we need to return React.ReactNode
  return wrapped || null;
};
