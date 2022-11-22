import React from 'react';
import { useRef } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useClickOutsideHandler } from './useClickOutsideHandler';

const TestComponentWithHook = ({ callbackFn }) => {
  const divRef = useRef();

  useClickOutsideHandler([divRef], callbackFn);

  return <div ref={divRef}>Hello World.</div>;
};

TestComponentWithHook.propTypes = {
  callbackFn: typeof jest.fn(),
};

describe('useClickOutsideHandler', () => {
  it('should call callback on mousedown outside of element', () => {
    const callback = jest.fn();
    render(<TestComponentWithHook callbackFn={callback} />);
    fireEvent.mouseDown(document);
    expect(callback).toHaveBeenCalled();
  });

  it('should call callback on touchstart outside of element', () => {
    const callback = jest.fn();
    render(<TestComponentWithHook callbackFn={callback} />);
    fireEvent.touchStart(document);
    expect(callback).toHaveBeenCalled();
  });

  it('should not call callback for mousedown inside of element', () => {
    const callback = jest.fn();
    render(<TestComponentWithHook callbackFn={callback} />);
    fireEvent.mouseDown(screen.getByText('Hello World.'));
    expect(callback).not.toHaveBeenCalled();
  });

  describe('on unmount', () => {
    it('should  remove mousedown listener', () => {
      const callback = jest.fn();
      const { unmount, container } = render(<TestComponentWithHook callbackFn={callback} />);
      unmount();
      fireEvent.click(container);
      expect(callback).not.toHaveBeenCalled();
    });

    it('should remove touchstart listener', () => {
      const callback = jest.fn();
      const { unmount, container } = render(<TestComponentWithHook callbackFn={callback} />);
      unmount();
      fireEvent.touchStart(container);
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
