import { RefObject } from 'react';

export function getAnalyticsContentFromRefs(
  refs: RefObject<any>[],
  componentName?: string
): string | undefined {
  const content = refs.map((ref) => ref.current?.textContent).find((textContent) => textContent);
  if (!content) {
    console.error(`No content found for ${componentName ?? ''} analytics event`);
    return;
  }
  return content;
}

export default getAnalyticsContentFromRefs;
