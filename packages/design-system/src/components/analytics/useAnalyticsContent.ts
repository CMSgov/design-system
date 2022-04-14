import { RefObject, useRef, useEffect } from 'react';

export interface UseAnalyticsContentProps {
  /**
   * Optional name of component for error messages
   */
  componentName?: string;
  onMount: (content: string) => any;
  onUnmount?: (content: string) => any;
}

// Should I have them pass the label override in or deal with that in the implementing component?
// Do I have them pass the potentially string original content in or let them just use rendered content?

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

// Example usage:
/*
const [headingRef, bodyRef] = useAnalyticsContent({
  onMount: (content: string) => {
    sendLinkEvent({
      event_name: 'alert_impression',
      event_type: EventCategory.UI_INTERACTION,
      ga_eventAction: 'alert impression',
      ga_eventCategory: EventCategory.UI_COMPONENTS,
      ga_eventLabel: content,
      heading: content,
      type: variation,
    });
  }
})

return (
  <div>
    <h1 ref={headingRef}>Hello World</h1>
    <p ref={bodyRef}>
      I'm some body text
    </p>
  </div>
)
*/
