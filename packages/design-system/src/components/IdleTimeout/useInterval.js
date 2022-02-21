import { useEffect, useRef } from 'react';

/**
 *  useInterval is a custom hook to get useEffect and intervals to work together
 *
 * When trying to implement setInterval in a useEffect that happens onMount, the effect would only have the value of a prop or state variable on first render
 * This custom hook is to ensure that the callback of setInterval receives updated props
 * @see https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * */
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
