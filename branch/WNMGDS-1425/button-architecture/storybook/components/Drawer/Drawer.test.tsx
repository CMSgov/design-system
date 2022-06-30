import Drawer from './Drawer';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

const defaultProps = {
  footerBody: (
    <div>
      <p>Some footer content</p>
    </div>
  ),
  footerTitle: 'Footer title',
  onCloseClick: () => {},
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
  describe('onCloseClick', () => {
    it('calls onCloseClick on close button click', () => {
      const onCloseClick = jest.fn();
      renderDrawer({ onCloseClick });
      fireEvent.click(screen.getByText('Close'));

      expect(onCloseClick).toHaveBeenCalled();
    });

    it('should handle `esc` with focus trap enabled', () => {
      const onCloseClick = jest.fn();
      renderDrawer({ onCloseClick, hasFocusTrap: true });
      fireEvent.keyDown(document, { code: 'Escape' });

      expect(onCloseClick).toHaveBeenCalled();
    });

    it('should not call onCloseClick for other key presses', () => {
      const onCloseClick = jest.fn();
      renderDrawer({ onCloseClick, hasFocusTrap: true });
      fireEvent.keyDown(document, { code: 'a' });

      expect(onCloseClick).not.toHaveBeenCalled();
    });
  });

  it('removes event listener on unmount', () => {
    const onCloseClick = jest.fn();
    const { unmount } = renderDrawer({ onCloseClick, hasFocusTrap: true });
    unmount();
    fireEvent.keyDown(document, { code: 'Escape' });

    expect(onCloseClick).not.toHaveBeenCalled();
  });

  describe('renders a snapshot', () => {
    it('without focus trap', () => {
      const { asFragment } = renderDrawer();

      expect(asFragment()).toMatchSnapshot();
    });

    it('with focus trap', () => {
      const { asFragment } = renderDrawer({ hasFocusTrap: true });

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
