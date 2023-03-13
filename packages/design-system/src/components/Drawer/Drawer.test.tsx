import React from 'react';
import Drawer from './Drawer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultProps = {
  footerBody: (
    <div>
      <p>Some footer content</p>
    </div>
  ),
  footerTitle: 'Footer title',
  onCloseClick: jest.fn(),
  heading: 'Drawer title',
};

function renderDrawer(overwriteProps = {}) {
  const props = Object.assign({}, defaultProps, overwriteProps);
  return render(
    <Drawer {...props}>
      <p>content</p>
    </Drawer>
  );
}

describe('Drawer', () => {
  it('renders a dialog', () => {
    renderDrawer();
    expect(screen.getByRole('dialog')).toMatchSnapshot();
  });

  describe('onCloseClick', () => {
    it('calls onCloseClick on close button click', () => {
      const onCloseClick = jest.fn();
      renderDrawer({ onCloseClick });
      userEvent.click(screen.getByText('Close'));

      expect(onCloseClick).toHaveBeenCalled();
    });

    it('should handle `esc` with focus trap enabled', () => {
      const onCloseClick = jest.fn();
      renderDrawer({ onCloseClick, hasFocusTrap: true });
      userEvent.keyboard('{Escape}');

      expect(onCloseClick).toHaveBeenCalled();
    });

    it('removes event listener on unmount', () => {
      const onCloseClick = jest.fn();
      const { unmount } = renderDrawer({ onCloseClick, hasFocusTrap: true });
      unmount();
      userEvent.keyboard('{Escape}');

      expect(onCloseClick).not.toHaveBeenCalled();
    });

    it('should not call onCloseClick for other key presses', () => {
      const onCloseClick = jest.fn();
      renderDrawer({ onCloseClick, hasFocusTrap: true });
      userEvent.keyboard('a');

      expect(onCloseClick).not.toHaveBeenCalled();
    });
  });
});
