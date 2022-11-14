import { useEffect, useRef } from 'react';

/**
 * Returns a ref and will focus on the element that ref is attached to
 * if the `autoFocus` boolean parameter is truthy.
 */
export const useAutofocus = <T extends HTMLElement>(autoFocus?: boolean) => {
  const ref = useRef<T>();

  useEffect(() => {
    if (autoFocus && ref.current?.focus) {
      ref.current?.focus();
    }
  }, [ref, autoFocus]);

  return ref;
};

export default useAutofocus;
