// should handle `esc` with focus trap enabled.
// removes event listener on unmount.
// should not call onCloseClick for other key presses.

import { render, screen, cleanup, fireEvent } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import './ds-drawer';

const defaultProps = {};
const children = (
  <>
    <strong>An Explanation</strong>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  </>
);

function renderDrawer(args, children) {
  return render(
    <ds-drawer {...(args as any)}>
      {children}
      {args['footer-body'] && (
        <div slot="footer-body">
          <p className="ds-text-body--md ds-u-margin--0">{args['footer-body']}</p>
        </div>
      )}
    </ds-drawer>
  );
}

describe('Drawer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render a dialog', () => {
    renderDrawer({ 'is-open': 'true', heading: 'Test Drawer Heading' }, children);

    const dialogElement = screen.getByRole('dialog', { name: /test drawer heading/i });
    expect(dialogElement).toBeInTheDocument();

    const headingElement = screen.getByText('Test Drawer Heading');
    expect(headingElement).toBeInTheDocument();

    const explanationText = screen.getByText('An Explanation');
    expect(explanationText).toBeInTheDocument();

    const paragraphText = screen.getByText(
      /Lorem ipsum dolor sit amet, consectetur adipiscing elit/i
    );
    expect(paragraphText).toBeInTheDocument();
  });

  it('should be closed until isOpen is set to true', () => {
    renderDrawer({ 'is-open': 'false', heading: 'Test Drawer Heading' }, children);

    const dialogElement = screen.queryByRole('dialog', { name: /test drawer heading/i });
    expect(dialogElement).not.toBeInTheDocument();

    // Re-render the drawer with `is-open` set to 'true'
    renderDrawer({ 'is-open': 'true', heading: 'Test Drawer Heading' }, children);

    const openDialogElement = screen.getByRole('dialog', { name: /test drawer heading/i });
    expect(openDialogElement).toBeInTheDocument();
  });

  it('should render a footer-body when footer-body attribute is provided', () => {
    renderDrawer(
      { 'is-open': 'true', heading: 'Test Drawer Heading', 'footer-body': 'Footer Content' },
      children
    );
    const renderedFooterBodyElement = screen.getByText('Footer Content');
    expect(renderedFooterBodyElement).toBeInTheDocument();
  });
  //       it.only('should call the `ds-close-click` handler when the close button is clicked', () => {
  //         renderDrawer({ 'is-open': 'true', heading: 'Test Drawer Heading', 'aria-label': 'Close help drawer' }, children);

  //         const drawerElement = screen.getByRole('dialog');
  //         const mockCloseHandler = jest.fn();

  //         console.log('Drawer Element:', drawerElement);

  //         const closeButton = screen.getByRole('button', { name: /close help drawer/i });
  //         drawerElement.addEventListener('ds-close-click', mockCloseHandler as EventListener);

  //         userEvent.click(closeButton);
  //         console.log('Close button', closeButton)

  //         expect(mockCloseHandler).toHaveBeenCalledTimes(1);

  //         // expect(drawerElement).not.toBeInTheDocument();
  //         drawerElement.removeEventListener('ds-close-click', mockCloseHandler as EventListener);
  //       });
});
