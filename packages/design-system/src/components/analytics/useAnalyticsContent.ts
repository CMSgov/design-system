import { RefObject, useRef, useEffect } from 'react';
import getAnalyticsContentFromRefs from './getAnalyticsContentFromRefs';

export interface UseAnalyticsContentProps {
  /**
   * Optional name of component for error messages
   */
  onMount: (content?: string) => any;
  onUnmount?: (content?: string) => any;
}

/**
 * Use this hook to retrieve rendered content for use in analytics events.
 * It accepts `onMount` and `onUnmount` event handlers, which will be called
 * with the rendered textContent of the desired element. It grabs text content
 * from the first element that has it, in order of the returned refs array.
 * In the example below, it will favor content from `headingRef` (first ref)
 * but will fall back to `bodyRef` (second ref) if no content is found:
 *
 * const [headingRef, bodyRef] = useAnalyticsContent({
 *   onMount: (content: string | undefined) => {
 *     if (!content) {
 *       console.error('No content found for [component-name] analytics event');
 *       return;
 *     }
 *     sendLinkEvent({
 *       event_name: 'alert_impression',
 *       event_type: EventType.UI_INTERACTION,
 *       ga_eventAction: 'alert impression',
 *       ga_eventCategory: EventCategory.UI_COMPONENTS,
 *       ga_eventLabel: content,
 *       heading: content,
 *       type: variation,
 *     });
 *   }
 * })
 *
 * return (
 *   <div>
 *     <h1 ref={headingRef}>Hello World</h1>
 *     <p ref={bodyRef}>
 *       I'm some body text
 *     </p>
 *   </div>
 * )
 */
export function useAnalyticsContent({ onMount, onUnmount }: UseAnalyticsContentProps) {
  // Three refs should be enough to support fallback content. Add more in the future if needed
  const refs: RefObject<any>[] = [useRef(), useRef(), useRef()];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // According to this lint rule, we need to include all the dependencies of this function in the
  // dependency array. However, in order for this useEffect to only fire on first render, we would
  // need to memoize the two callback functions. This is an unnecessary burden on the implementing
  // class, and there isn't a good way to memoize the props we receive here because they *also*
  // have dependencies that should be listed but are unknown. This assumes that the onMount and
  // onUnmount do not have a reason to change between renders.
  useEffect(() => {
    const content = getAnalyticsContentFromRefs(refs);
    onMount(content);
    return () => {
      if (onUnmount) onUnmount(content);
    };
  }, []);

  return refs;
}
