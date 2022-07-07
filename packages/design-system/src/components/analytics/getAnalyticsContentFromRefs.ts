import { RefObject } from 'react';

export function getAnalyticsContentFromRefs(
  refs: RefObject<any>[],
  componentName?: string
): string | undefined {
  return refs.map((ref) => ref.current?.textContent).find((textContent) => textContent);
}

export default getAnalyticsContentFromRefs;
