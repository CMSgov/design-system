/**
 * Combines multiple refs into one, even old-style ref functions
 *
 * Borrowed from https://github.com/gregberge/react-merge-refs/blob/main/src/index.tsx
 */
export default function mergeRefs<T = any>(
  refs: Array<React.RefObject<T> | React.Ref<T>>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.RefObject<T | null>).current = value;
      }
    });
  };
}
