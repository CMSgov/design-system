import { render, screen, cleanup } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import './ds-drawer';

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
      <div slot="footer-body">
        <p className="ds-text-body--md ds-u-margin--0">{'Default slotted footer content'}</p>
      </div>
    </ds-drawer>
  );
}

function renderDrawerWithoutSlottedFooter(args, children) {
  return render(<ds-drawer {...(args as any)}>{children}</ds-drawer>);
}
const mockCloseHandler = jest.fn();

describe('Drawer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render a dialog', () => {
    renderDrawer(
      {
        'is-open': 'true',
        heading: 'Test Drawer Heading',
        'close-button-aria-label': 'Close Help Drawer',
      },
      children
    );
    const drawer = document.querySelector('ds-drawer');
    expect(drawer).toMatchSnapshot();

    const dialogElement = screen.getByRole('dialog', { name: /test drawer heading/i });
    expect(dialogElement).toBeInTheDocument();

    const closeButton = screen.getByLabelText('Close Help Drawer');
    expect(closeButton).toBeInTheDocument();

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

  it('renders footer-body when footer-body attribute is provided', () => {
    renderDrawerWithoutSlottedFooter(
      {
        'is-open': 'true',
        heading: 'Test Drawer Heading',
        'footer-body': 'Footer Attribute Content',
      },
      children
    );

    const renderedFooterBodyElement = screen.getByText('Footer Attribute Content');
    expect(renderedFooterBodyElement).toBeInTheDocument();
  });

  it('renders slotted footer-body when slot content is provided and attribute is not', () => {
    renderDrawer(
      {
        'is-open': 'true',
        heading: 'Test Drawer Heading',
      },
      children
    );

    const renderedFooterBodyElement = screen.getByText('Default slotted footer content');
    expect(renderedFooterBodyElement).toBeInTheDocument();
  });

  it('prioritizes slotted footer-body over the attribute when both are provided', () => {
    renderDrawer(
      {
        'is-open': 'true',
        heading: 'Test Drawer Heading',
        'footer-body': 'Footer-body content from attribute',
      },
      children
    );

    const renderedFooterBodyElement = screen.getByText('Default slotted footer content');
    expect(renderedFooterBodyElement).toBeInTheDocument();
  });

  it('should call the `ds-close-click` handler when the close button is clicked', async () => {
    renderDrawer(
      {
        'is-open': 'true',
        heading: 'Test Drawer Heading',
        'close-button-aria-label': 'Close help drawer',
      },
      children
    );
    const drawer = document.querySelector('ds-drawer');

    drawer.addEventListener('ds-close-click', mockCloseHandler);

    const closeButton = await screen.findByRole('button', { name: /close help drawer/i });
    userEvent.click(closeButton);

    expect(mockCloseHandler).toHaveBeenCalledTimes(1);
    drawer.removeEventListener('ds-close-click', mockCloseHandler);
  });

  it('should handle `esc` with focus trap enabled', async () => {
    renderDrawer({ 'is-open': 'true', 'has-trap-focus': 'true' }, children);

    const drawer = document.querySelector('ds-drawer');
    drawer.addEventListener('ds-close-click', mockCloseHandler);

    userEvent.keyboard('{Escape}');

    expect(mockCloseHandler).toHaveBeenCalledTimes(1);
    drawer.removeEventListener('ds-close-click', mockCloseHandler);
  });

  it('should not call the event handler after unmounting', () => {
    const { unmount } = renderDrawer({ 'is-open': 'true', 'has-trap-focus': 'true' }, children);

    const drawer = document.querySelector('ds-drawer');
    drawer.addEventListener('ds-close-click', mockCloseHandler);

    unmount();
    userEvent.keyboard('{Escape}');

    expect(mockCloseHandler).not.toHaveBeenCalled();
  });

  it('should not call onCloseClick for other key presses', () => {
    renderDrawer({ 'is-open': 'true', 'has-trap-focus': 'true' }, children);

    const drawer = document.querySelector('ds-drawer');
    drawer.addEventListener('ds-close-click', mockCloseHandler);

    userEvent.keyboard('a');

    expect(mockCloseHandler).not.toHaveBeenCalled();
    drawer.removeEventListener('ds-close-click', mockCloseHandler);
  });
});
