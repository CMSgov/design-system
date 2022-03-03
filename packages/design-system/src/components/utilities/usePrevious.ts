import { useEffect, useRef } from 'react';

// storing a previous version of a prop for comparison
// similar to the old previousProps param from `componentDidUpdate`
const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevious;
