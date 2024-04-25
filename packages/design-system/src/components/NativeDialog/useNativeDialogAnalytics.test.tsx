import NativeDialog, { NativeDialogProps } from './NativeDialog';
import { render } from '@testing-library/react';
import { useNativeDialogAnalytics } from './useNativeDialogAnalytics';

interface TestDialogProps extends Omit<NativeDialogProps, 'onClose' | 'children'> {
  onOpen: (content?: string) => any;
  onClose?: (content?: string) => any;
}

const defaultProps = {
  exit: jest.fn(),
  onOpen: jest.fn(),
  onClose: jest.fn(),
};

function renderDialog(props = {}) {
  const TestDialog = ({ onOpen, onClose, ...dialogProps }: TestDialogProps) => {
    const headingRef = useNativeDialogAnalytics({
      isOpen: dialogProps.isOpen,
      onOpen,
      onClose,
    });
    return (
      <NativeDialog {...dialogProps}>
        <h1 ref={headingRef}>Hello World</h1>
      </NativeDialog>
    );
  };

  const result = render(<TestDialog {...defaultProps} {...props} />);
  return {
    ...result,
    rerenderDialog(newProps = {}) {
      return result.rerender(<TestDialog {...defaultProps} {...newProps} />);
    },
  };
}

describe('useNativeDialogAnalytics', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("does not send analytics event when dialog isn't open", () => {
    renderDialog({ isOpen: false });
    expect(defaultProps.onOpen).not.toHaveBeenCalled();
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('sends analytics event when dialog starts open', () => {
    renderDialog({ isOpen: true });
    expect(defaultProps.onOpen).toHaveBeenCalledWith('Hello World');
    expect(defaultProps.onOpen).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('sends analytics event when opening dialog', () => {
    const { rerenderDialog } = renderDialog({ isOpen: false });
    rerenderDialog({ isOpen: true });
    expect(defaultProps.onOpen).toHaveBeenCalledWith('Hello World');
    expect(defaultProps.onOpen).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('sends analytics event when closing dialog', () => {
    const { rerenderDialog } = renderDialog({ isOpen: true });
    expect(defaultProps.onOpen).toHaveBeenCalledWith('Hello World');
    expect(defaultProps.onOpen).toHaveBeenCalledTimes(1);
    rerenderDialog({ isOpen: false });
    expect(defaultProps.onClose).toHaveBeenCalledWith('Hello World');
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    expect(defaultProps.onOpen).toHaveBeenCalledTimes(1);
  });
});
