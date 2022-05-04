import NativeDialog from './NativeDialog';
import React from 'react';
import { render, screen } from '@testing-library/react';

const defaultProps = {
  children: 'Foo',
  showModal: false,
  exit: jest.fn(),
};

function renderNativeDialog(props = {}) {
  // eslint-disable-next-line react/no-children-prop
  return render(<NativeDialog data-testid="test-dialog" {...defaultProps} {...props} />);
}

describe('NativeDialog', function () {
  it('renders with custom className', () => {
    renderNativeDialog({
      className: 'custom-class',
    });
    expect(screen.getByTestId('test-dialog')).toMatchSnapshot();
  });
});
