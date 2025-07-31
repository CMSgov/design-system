import { useBodyScrollPrevention, CLASS_NAME, PROPERTY_NAME } from './useBodyScrollPrevention';
import { renderHook } from '@testing-library/react';

describe('useBodyScrollPrevention', () => {
  it('should not add body class when isOpen is false', () => {
    renderHook(() => useBodyScrollPrevention(false));
    expect(document.body).not.toHaveClass(CLASS_NAME);
  });

  it('should add body class when isOpen is true', () => {
    renderHook(() => useBodyScrollPrevention(true));
    expect(document.body).toHaveClass(CLASS_NAME);
  });

  it('should add and remove body class as value changes', () => {
    const { rerender } = renderHook((isOpen) => useBodyScrollPrevention(isOpen), {
      initialProps: false,
    });
    expect(document.body).not.toHaveClass(CLASS_NAME);
    rerender(true);
    expect(document.body).toHaveClass(CLASS_NAME);
    rerender(false);
    expect(document.body).not.toHaveClass(CLASS_NAME);
  });

  it('should set the scroll property to 0 if the page is not scrolled', () => {
    renderHook(() => useBodyScrollPrevention(true));
    expect(document.body.style.getPropertyValue(PROPERTY_NAME)).toEqual('-0px');
  });

  it('should properly set the scroll propery when the page is scrolled', () => {
    const originalScrollY = window.scrollY;
    window.scrollY = 500;
    renderHook(() => useBodyScrollPrevention(true));
    expect(document.body.style.getPropertyValue(PROPERTY_NAME)).toEqual('-500px');
    window.scrollY = originalScrollY;
  });

  it('should clean up when unmounted', () => {
    const { unmount } = renderHook(() => useBodyScrollPrevention(true));
    unmount();
    expect(document.body).not.toHaveClass(CLASS_NAME);
    expect(document.body).not.toHaveStyle({ [PROPERTY_NAME]: '-0px' });
  });
});
