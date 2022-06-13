import { RefObject, useEffect } from 'react';

/**
 * Calls a handler whenever the Escape key is pressed within an element. To capture
 * on the entire document, pass null or undefined for the ref.
 *
 * @param ref - Ref of the element to capture keystrokes in. Defaults to the document
 * @param handler - Function called if the escape key is pressed
 */
export function usePressEscapeHandler(
  ref: RefObject<HTMLElement> | null | undefined,
  handler: (e: KeyboardEvent) => any
) {
  function handleEscapeKey(event: KeyboardEvent) {
    const ESCAPE_KEY = 27;
    if (event.keyCode === ESCAPE_KEY || event.key === 'Escape') {
      handler(event);
    }
  }

  useEffect(() => {
    const node = ref ? ref.current : document;
    if (!node) return;

    node.addEventListener('keydown', handleEscapeKey);
    return () => {
      node.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleEscapeKey]);
}

export default usePressEscapeHandler;
