import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useClickOutsideHandler } from './useClickOutsideHandler';

const TestComponent = ({ callbackFn }) => {
  const divRef = useRef();

  useClickOutsideHandler([divRef], callbackFn);

  return <div ref={divRef}>Hello World.</div>;
};

describe('useClickOutsideHandler', () => {
  it('should call callback on mousedown outside of element', () => {
    const callback = jest.fn();
    render(<TestComponent callbackFn={callback} />);
    fireEvent.click(document);
    expect(callback).toHaveBeenCalled();
  });

  it('should call callback on touchstart outside of element', () => {
    const callback = jest.fn();
    render(<TestComponent callbackFn={callback} />);
    fireEvent.click(document);
    expect(callback).toHaveBeenCalled();
  });

  it('should not call callback for mousedown inside of element', () => {});

  describe('on unmount', () => {
    it('should  remove mousedown listener', () => {});

    it('should remove touchstart listener', () => {});
  });
});
