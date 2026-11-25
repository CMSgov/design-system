import { renderHook } from '@testing-library/react';
import usePrevious from './usePrevious';

describe('usePrevious', () => {
  it('returns the value from the previous render', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'first' },
    });

    rerender({ value: 'second' });
    expect(result.current).toBe('first');

    rerender({ value: 'third' });
    expect(result.current).toBe('second');
  });
});
