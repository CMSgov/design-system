import { FC } from 'react';

/**
 * Turns a component function into a client-side-only component by always returning null
 * if `window` isn't defined.
 */
export function clientOnly<P>(Component: FC<P>): FC<P> {
  return (props: P) => {
    // If we're in a non-browser environment, assume it's an SSR build and return nothing.
    // Based on workaround from: https://www.gatsbyjs.com/docs/using-client-side-only-packages/
    if (typeof window === 'undefined') {
      return null;
    }
    return <Component {...props} />;
  };
}
