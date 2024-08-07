import { useLayoutEffect } from 'react';

export const CLASS_NAME = 'ds--dialog-open';
export const PROPERTY_NAME = '--body_top--dialog-open';

function freezeScroll() {
  if (document.body.classList.contains(CLASS_NAME)) {
    return;
  }

  const y = window.scrollY ?? 0;
  document.body.classList.add(CLASS_NAME);
  document.body.style.setProperty(PROPERTY_NAME, `-${y}px`);
  document.documentElement.style.setProperty('scroll-behavior', 'auto');
}

function unfreezeScroll() {
  if (!document.body.classList.contains(CLASS_NAME)) {
    return;
  }

  document.body.classList.remove(CLASS_NAME);
  const top = -parseInt(document.body.style.getPropertyValue(PROPERTY_NAME));
  document.body.style.removeProperty(PROPERTY_NAME);
  if (!isNaN(top)) {
    window.scrollTo({ top, behavior: 'auto' });
  }
  document.documentElement.style.removeProperty('scroll-behavior');
}

/**
 * Prevents scrolling the page behind the dialog
 */
export function useBodyScrollPrevention(isOpen: boolean) {
  // Needs to use useLayoutEffect because we need to grab the window scroll position
  // before the dialog renders and messes it up.
  useLayoutEffect(() => {
    if (isOpen) {
      freezeScroll();
    } else {
      unfreezeScroll();
    }
    return () => {
      unfreezeScroll();
    };
  }, [isOpen]);
}
