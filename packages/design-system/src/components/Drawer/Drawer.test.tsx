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
    user: userEvent.setup(),
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
    it('calls onCloseClick on close button click', async () => {
      const onCloseClick = jest.fn();
      const { user } = renderDrawer({ onCloseClick });
      await user.click(screen.getByText('Close'));

      expect(onCloseClick).toHaveBeenCalled();
    });

    it('should handle `esc` with focus trap enabled', async () => {
      const onCloseClick = jest.fn();
      const { user } = renderDrawer({ onCloseClick, hasFocusTrap: true });
      await user.keyboard('{Escape}');

      expect(onCloseClick).toHaveBeenCalled();
    });

    it('removes event listener on unmount', async () => {
      const onCloseClick = jest.fn();
      const { unmount, user } = renderDrawer({ onCloseClick, hasFocusTrap: true });
      unmount();
      await user.keyboard('{Escape}');

      expect(onCloseClick).not.toHaveBeenCalled();
    });

    it('should not call onCloseClick for other key presses', async () => {
      const onCloseClick = jest.fn();
      const { user } = renderDrawer({ onCloseClick, hasFocusTrap: true });
      await user.keyboard('a');

      expect(onCloseClick).not.toHaveBeenCalled();
    });
  });
});
