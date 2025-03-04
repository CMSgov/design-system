import { useCssDebugger } from './useCssDebugger';
import { renderHook } from '@testing-library/react';

describe('useCssDebugger', () => {
  it('should set --debugger to true', () => {
    renderHook(() => useCssDebugger());
    const debugValue = getComputedStyle(document.documentElement).getPropertyValue('--debugger');
    expect(debugValue).toBe('true');
  });

  it('should not set --debugger if the variable already has a value', () => {
    document.documentElement.style.setProperty('--debugger', 'false');
    renderHook(() => useCssDebugger());
    const debugValue = getComputedStyle(document.documentElement).getPropertyValue('--debugger');
    expect(debugValue).toBe('false');
  });
});
