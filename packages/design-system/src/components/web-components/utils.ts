import { useRef } from 'react';

let globalIdCounter = 0;

export function useUniqueId(prefix = '') {
  const idRef = useRef<string | null>(null);
  if (idRef.current === null) {
    idRef.current = `${prefix}${++globalIdCounter}`;
  }
  return idRef.current;
}

export const isPossibleValue = <T extends string>(
  value: string,
  possibleValues: readonly T[]
): value is T => {
  return possibleValues.includes(value as T);
};
