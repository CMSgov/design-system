import { RefObject, useEffect } from 'react';

type ClickOutsideEvent = MouseEvent | TouchEvent;

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
