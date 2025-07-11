import { useId as useReactId } from 'react';

export default function useId(prefix?: string, providedId?: string) {
  const reactId = useReactId();
  return providedId ?? `${prefix ?? ''}${reactId}`;
}
