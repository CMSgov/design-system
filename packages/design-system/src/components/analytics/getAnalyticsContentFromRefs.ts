import { RefObject } from 'react';

/**
 * Gets text content from an element and even follows `slot` elements across Shadow DOM
 * barriers to get the full text that the user sees.
 */
function getTextContent(nodes: Node[]): string {
  return nodes
    .map((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim();
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if ((node as HTMLElement).tagName === 'SLOT') {
          // If it's a slot, it won't actually have any content in itself, so we have to
          // follow the trail to its "assigned nodes" and look there.
          const assignedNodes = (node as HTMLSlotElement).assignedNodes({ flatten: true });
          return getTextContent(assignedNodes);
        } else {
          return getTextContent(Array.from((node as HTMLElement).childNodes));
        }
      } else {
        return '';
      }
    })
    .join(' ');
}

export function getAnalyticsContentFromRefs(refs: RefObject<any>[]): string | undefined {
  return refs
    .map((ref) => (ref.current ? getTextContent(Array.from(ref.current.childNodes)) : undefined))
    .find((textContent) => textContent);
}

export default getAnalyticsContentFromRefs;
