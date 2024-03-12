import { ReactNode } from 'react';

export function clientOnly<T extends ReactNode>(node: T): T | null {
  // If we're in a non-browser environment, assume it's an SSR build and return nothing.
  // Source: https://www.gatsbyjs.com/docs/using-client-side-only-packages/
  if (typeof window === 'undefined') {
    return null;
  } else {
    return node;
  }
}
