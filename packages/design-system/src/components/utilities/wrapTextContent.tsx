import React from 'react';

/**
 * Wraps text content in a `<span>` element to prevent Google Translate
 * from breaking React's reconciliation process.
 *
 * @param content - The content to be wrapped. Can be `null`, `undefined`, or a React node.
 * @returns The original content if it is a valid React element, or the content wrapped in a `<span>` element.
 * @see https://github.com/facebook/react/issues/11538
 */
export const wrapInSpan = (content: React.ReactNode): React.ReactNode => {
  if (content === null || content === undefined) {
    return content;
  }

  // If it's already a React element, don't wrap it
  if (React.isValidElement(content)) {
    return content;
  }

  // Wrap text/numbers in a span
  return <span>{content}</span>;
};

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
