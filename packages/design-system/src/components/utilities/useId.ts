import uniqueId from 'lodash/uniqueId';
import { useRef } from 'react';

/**
 * Generates a unique id.
 *
 * TODO: Once we're on React 18, we can use the `useId` hook instead of rolling
 * our own with `useRef` and lodash.
 */
export default function useId(prefix?: string, providedId?: string) {
  console.log('📏 ', providedId);
  console.log('🍕 ', uniqueId(prefix));
  return useRef(providedId ?? uniqueId(prefix)).current;
}
