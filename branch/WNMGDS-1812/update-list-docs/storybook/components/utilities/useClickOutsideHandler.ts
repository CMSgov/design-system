import { RefObject, useEffect } from 'react';

type ClickOutsideEvent = MouseEvent | TouchEvent;

/**
 * Listens for mouse and touch events on the document and calls the provided
 * handler function as long as the event did not originate in one of the
 * elements corresponding to the React Refs in the `insideRefs` array. For
 * example, if you want to know if the user clicked outside of a dialog or
 * its trigger, you can pass it an array containing the refs to the dialog
 * and the trigger.
 *
 * @param insideRefs - Refs to elements that are considered "inside"
 * @param handler - called when the event target was outside the "inside" elements
 */
export function useClickOutsideHandler(
  insideRefs: RefObject<HTMLElement>[],
  handler: (e: ClickOutsideEvent) => any
) {
  function handleClickOutside(event: ClickOutsideEvent) {
    if (!insideRefs.some((ref) => ref.current?.contains(event.target as HTMLElement))) {
      handler(event);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handleClickOutside]);
}

export default useClickOutsideHandler;
