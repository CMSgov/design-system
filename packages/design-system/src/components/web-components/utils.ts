import { useRef } from 'react';
import uniqueId from 'lodash/uniqueId';

export function useUniqueId(prefix = '') {
  const idRef = useRef<string | null>(null);
  if (idRef.current === null) {
    idRef.current = uniqueId(prefix);
  }
  return idRef.current;
}

export const isPossibleValue = <T extends string>(
  value: string,
  possibleValues: readonly T[]
): value is T => {
  return possibleValues.includes(value as T);
};
