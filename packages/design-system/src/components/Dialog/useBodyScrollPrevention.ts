import { Reducer, useReducer, useEffect, useLayoutEffect, useState } from 'react';

export const CLASS_NAME = 'ds--dialog-open';
export const PROPERTY_NAME = '--body_top--dialog-open';

interface OpenState {
  name: 'open';
  bodyScrollY: number;
}

interface ClosedState {
  name: 'closed';
}

const OPEN = (_state: ClosedState): OpenState => {
  console.log('opening')
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
  console.log('closing')
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
  console.log('hitting the reducer', state, transition)
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
  // const [state, dispatch] = useReducer(reducer, { name: 'closed' });
  const [state, setState] = useState<FiniteState>({name: 'closed'});


  // Needs to use useLayoutEffect because we need to grab the window scroll position
  // before the dialog renders and messes it up.
  useLayoutEffect(() => {
    console.log('in useLayoutEffect', state, isOpen)
    // dispatch(isOpen ? OPEN : CLOSE);
    if (state.name === 'open' && !isOpen) {
      setState(CLOSE(state));
    } else if (state.name === 'closed' && isOpen) {
      setState(OPEN(state));
    }
  }, [isOpen, state, setState]);

  useEffect(() => {
    // Component mounts
    console.log('mount')
    return () => {
      // Component unmounts, which does not result in isOpen=false, so we need to make
      // sure we clean up after ourselves.
      console.log('unmount')
      console.log(state)
      // dispatch(CLOSE); Doesn't actually get called

      // if (_state.name === 'open') {
      //   console.log('about to call CLOSE')
      //   CLOSE(_state);
      // } else {
      //   // For some reason we're in the closed state here even though "closing" was never
      //   // printed to the console before this and "opening" was.
      //   console.log('did not call CLOSE', _state)
      // }
    }
  }, []);

  console.log('state during render:', state)
}
