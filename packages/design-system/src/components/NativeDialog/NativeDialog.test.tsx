import React from 'react';
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

  // TODO: Remove this when we remove this functionality in v10
  it('opens if the isOpen prop is undefined', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => null);
    renderNativeDialog({ isOpen: undefined });
    expect((screen.getByRole('dialog') as HTMLDialogElement).open).toBe(true);
    expect(warn).toHaveBeenCalled();
    warn.mockReset();
  });
});
