import { useEffect, useRef } from 'react';

export default function useAutofocus(autoFocus?: boolean) {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (autoFocus && ref.current?.focus) {
      ref.current?.focus();
    }
  }, [ref, autoFocus]);

  return ref;
}
