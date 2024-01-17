import { Reducer, useReducer, useLayoutEffect } from 'react';

const CLASS_NAME = 'ds--dialog-open';
const PROPERTY_NAME = '--body_top--dialog-open';

type FiniteStates =
  | {
      name: 'open';
      bodyScrollY: number;
    }
  | {
      name: 'closed';
    };

type FiniteStateTransitions = 'open' | 'close';

const reducer: Reducer<FiniteStates, FiniteStateTransitions> = (state, transition) => {
  switch (state.name) {
    case 'closed':
      if (transition === 'open') {
        // https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
        const y = window.scrollY ?? 0;
        document.body.classList.add(CLASS_NAME);
        document.body.style.setProperty(PROPERTY_NAME, `-${y}px`);
        document.documentElement.style.setProperty('scroll-behavior', 'auto');
        return {
          name: 'open',
          bodyScrollY: y,
        };
      }
      break;
    case 'open':
      if (transition === 'close') {
        document.body.classList.remove(CLASS_NAME);
        window.scrollTo({ top: state.bodyScrollY, behavior: 'auto' });
        document.documentElement.style.removeProperty('scroll-behavior');
        return {
          name: 'closed',
        };
      }
      break;
  }
  return state;
};

/**
 * Prevents scrolling the page behind the dialog
 */
export function useBodyScrollPrevention(isOpen: boolean) {
  const [_state, dispatch] = useReducer(reducer, { name: 'closed' });
  // Needs to use useLayoutEffect because we need to grab the window scroll position
  // before the dialog renders and messes it up.
  useLayoutEffect(() => {
    dispatch(isOpen ? 'open' : 'close');
  }, [isOpen]);
}
