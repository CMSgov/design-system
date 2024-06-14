import Drawer from './Drawer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultProps = {
  children: <p>content</p>,
  footerBody: (
    <div>
      <p>Some footer content</p>
    </div>
  ),
  footerTitle: 'Footer title',
  isOpen: true,
  onCloseClick: jest.fn(),
  heading: 'Drawer title',
};

function renderDrawer(props = {}) {
  // eslint-disable-next-line react/no-children-prop
  const result = render(<Drawer {...defaultProps} {...props} />);
  return {
    ...result,
    rerenderDrawer(newProps = {}) {
      return result.rerender(<Drawer {...defaultProps} {...newProps} />);
    },
  };
}

describe('Drawer', () => {
  it('renders a dialog', () => {
    renderDrawer();
    expect(screen.getByRole('dialog')).toMatchSnapshot();
  });

  it('is closed until isOpen is set to true', () => {
    const { rerenderDrawer } = renderDrawer({ isOpen: false });
    expect(screen.queryByRole('dialog')).toBe(null);
    rerenderDrawer({ isOpen: true });
    expect((screen.getByRole('dialog') as HTMLDialogElement).open).toBe(true);
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
