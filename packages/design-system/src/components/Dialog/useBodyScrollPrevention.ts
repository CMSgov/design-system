import { Reducer, useReducer, useLayoutEffect } from 'react';

const CLASS_NAME = 'ds--dialog-open';
const PROPERTY_NAME = '--body_top--dialog-open';

interface OpenState {
  name: 'open';
  bodyScrollY: number;
}

interface ClosedState {
  name: 'closed';
}

const OPEN = (_state: ClosedState): OpenState => {
  // https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
  const y = window.scrollY ?? 0;
  document.body.classList.add(CLASS_NAME);
  document.body.style.setProperty(PROPERTY_NAME, `-${y}px`);
  document.documentElement.style.setProperty('scroll-behavior', 'auto');
  return {
    name: 'open',
    bodyScrollY: y,
  };
};

const CLOSE = (state: OpenState): ClosedState => {
  document.body.classList.remove(CLASS_NAME);
  document.body.style.removeProperty(PROPERTY_NAME);
  window.scrollTo({ top: state.bodyScrollY, behavior: 'auto' });
  document.documentElement.style.removeProperty('scroll-behavior');
  return {
    name: 'closed',
  };
};

type FiniteState = OpenState | ClosedState;
type FiniteStateTransition = typeof OPEN | typeof CLOSE;

const reducer: Reducer<FiniteState, FiniteStateTransition> = (state, transition) => {
  if (state.name === 'open' && transition === CLOSE) {
    return transition(state);
  } else if (state.name === 'closed' && transition === OPEN) {
    return transition(state);
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
    dispatch(isOpen ? OPEN : CLOSE);
  }, [isOpen]);
}
