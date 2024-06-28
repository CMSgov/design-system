import { useRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { usePressEscapeHandler } from './usePressEscapeHandler';

const TestComponentWithHook = ({ callbackFn, passRef }: { callbackFn: any; passRef?: boolean }) => {
  const divRef = useRef();
  const refToPass = passRef ? divRef : null;

  usePressEscapeHandler(refToPass, callbackFn);

  return <div ref={divRef}>Hello World.</div>;
};

describe('usePressEscapeHandler', () => {
  it('should call callback on escape press inside element', () => {
    const callback = jest.fn();
    render(<TestComponentWithHook callbackFn={callback} />);
    fireEvent.keyDown(screen.getByText('Hello World.'), { key: 'Escape' });
    expect(callback).toHaveBeenCalled();
  });

  it('should add listener to document if ref is not valid', () => {
    const callback = jest.fn();
    render(<TestComponentWithHook callbackFn={callback} passRef={false} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(callback).toHaveBeenCalled();
  });

  it('should not call handler if other key is pressed', () => {
    const callback = jest.fn();
    render(<TestComponentWithHook callbackFn={callback} />);
    fireEvent.keyDown(screen.getByText('Hello World.'), { key: 'Up' });
    expect(callback).not.toHaveBeenCalled();
  });

  it('should not call handler if unmounted', () => {
    const callback = jest.fn();
    const { container, unmount } = render(<TestComponentWithHook callbackFn={callback} />);
    unmount();
    fireEvent.keyDown(container, { key: 'Escape' });
    expect(callback).not.toHaveBeenCalled();
  });
});
