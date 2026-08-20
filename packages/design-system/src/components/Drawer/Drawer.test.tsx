import Drawer from './Drawer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const footerBodyContent = 'Some footer content';
const footerTitle = 'Footer title';
const defaultProps = {
  children: <p>content</p>,
  footerBody: (
    <div>
      <p>{footerBodyContent}</p>
    </div>
  ),
  footerTitle: footerTitle,
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

  describe('footer', () => {
    it('does not render an empty footer title when footerTitle is not provided', () => {
      renderDrawer({ footerTitle: undefined });

      expect(screen.queryByRole('heading', { level: 4 })).not.toBeInTheDocument();
      expect(screen.getByText(footerBodyContent)).toBeInTheDocument();
    });

    it('renders the footer title and body when both are provided', () => {
      const { container } = renderDrawer({ footerTitle: footerTitle });

      expect(container.querySelector('.ds-c-drawer__footer')).toBeInTheDocument();
      expect(container.querySelector('.ds-c-drawer__footer-title')).toHaveTextContent(footerTitle);
      expect(container.querySelector('.ds-c-drawer__footer-body')).toHaveTextContent(
        footerBodyContent
      );
    });

    it('renders the footer without a body when only footerTitle is provided', () => {
      const { container } = renderDrawer({
        footerTitle: footerTitle,
        footerBody: undefined,
      });

      expect(container.querySelector('.ds-c-drawer__footer')).toBeInTheDocument();
      expect(container.querySelector('.ds-c-drawer__footer-title')).toHaveTextContent(footerTitle);
      expect(container.querySelector('.ds-c-drawer__footer-body')).not.toBeInTheDocument();
    });
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
