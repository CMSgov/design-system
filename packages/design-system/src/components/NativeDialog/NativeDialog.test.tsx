import NativeDialog from './NativeDialog';
import { render, screen } from '@testing-library/react';

const defaultProps = {
  children: 'Foo',
  showModal: false,
  exit: jest.fn(),
  isOpen: true,
};

function renderNativeDialog(props = {}) {
  // eslint-disable-next-line react/no-children-prop
  const result = render(<NativeDialog {...defaultProps} {...props} />);
  return {
    ...result,
    rerenderNativeDialog(newProps = {}) {
      return result.rerender(<NativeDialog {...defaultProps} {...newProps} />);
    },
  };
}

describe('NativeDialog', function () {
  it('renders with custom className', () => {
    renderNativeDialog({ className: 'custom-class' });
    expect(screen.getByRole('dialog')).toMatchSnapshot();
  });

  it('is closed until isOpen is set to true', () => {
    const { rerenderNativeDialog } = renderNativeDialog({ isOpen: false });
    expect(screen.queryByRole('dialog')).toBe(null);
    rerenderNativeDialog({ isOpen: true });
    expect((screen.getByRole('dialog') as HTMLDialogElement).open).toBe(true);
  });

  it('can be open at the start', () => {
    renderNativeDialog({ isOpen: true });
    expect((screen.getByRole('dialog') as HTMLDialogElement).open).toBe(true);
  });

  it('throws an error if the isOpen prop is undefined', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => null);
    expect(() => renderNativeDialog({ isOpen: undefined })).toThrow();
    error.mockReset();
  });
});
