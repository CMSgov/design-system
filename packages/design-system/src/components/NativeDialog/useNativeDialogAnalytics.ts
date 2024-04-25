import { useRef, useEffect } from 'react';
import getAnalyticsContentFromRefs from '../analytics/getAnalyticsContentFromRefs';
import usePrevious from '../utilities/usePrevious';

export interface UseNativeDialogAnalyticsProps {
  isOpen: boolean;
  onOpen: (content?: string) => any;
  onClose?: (content?: string) => any;
}

/**
 * This hook is for any component based on `NativeDialog` that needs analytics that fire
 * upon opening and closing. You provide it the `isOpen` prop being passed to the
 * `NativeDialog` and handlers for `onOpen` and `onClose`, which will be called with the
 * rendered heading content based on where you apply the ref this hook returns. Example:
 *
 * const headingRef = useNativeDialogAnalytics({
 *   isOpen: props.isOpen,
 *   onOpen: (content) => {
 *     // Send an event
 *   },
 *  onClose: (content) => {
 *     // Send an event
 *   }
 * })
 *
 * return (
 *   <NativeDialog {...props}>
 *     <h1 ref={headingRef}>Hello World</h1>
 *   </NativeDialog>
 * )
 */
export function useNativeDialogAnalytics({
  isOpen,
  onOpen,
  onClose,
}: UseNativeDialogAnalyticsProps) {
  const headingRef = useRef();
  const prevIsOpen = usePrevious(isOpen);
  useEffect(() => {
    const headingContent = getAnalyticsContentFromRefs([headingRef]);
    // We want to call onOpen when it's open once and only once.
    // We want to call onClose only when it was open and then closed.
    if (isOpen && isOpen !== prevIsOpen) {
      // It either started open or was closed and now is open
      onOpen(headingContent);
    } else if (!isOpen && prevIsOpen === true) {
      // Only trigger if it was previously open
      onClose(headingContent);
    }
  }, [isOpen, prevIsOpen]);

  return headingRef;
}
