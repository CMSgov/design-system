import { RefObject, useRef, useEffect } from 'react';

export interface UseAnalyticsContentProps {
  /**
   * Optional name of component for error messages
   */
  componentName?: string;
  onMount: (content: string) => any;
  onUnmount?: (content: string) => any;
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
 *   onMount: (content: string) => {
 *     sendLinkEvent({
 *       event_name: 'alert_impression',
 *       event_type: EventCategory.UI_INTERACTION,
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
export function useAnalyticsContent({
  componentName,
  onMount,
  onUnmount,
}: UseAnalyticsContentProps) {
  // Three refs should be enough to support fallback content. Add more in the future if needed
  const refs: RefObject<any>[] = [useRef(), useRef(), useRef()];

  useEffect(() => {
    const content = refs.map((ref) => ref.current?.textContent).find((textContent) => textContent);
    if (!content) {
      console.error(`No content found for ${componentName ?? ''} analytics event`);
      return;
    }

    onMount(content);
    return () => {
      if (onUnmount) onUnmount(content);
    };
  }, []);

  return refs;
}
