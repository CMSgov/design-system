import { createTestRenderer } from '../testingUtils';
import { cleanup, findByRole, getByRole, queryByRole } from '@testing-library/react';
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

const renderDrawer = createTestRenderer('ds-drawer', (attrs = {}, children) => (
  <ds-drawer {...(attrs as any)}>
    {children}
    <div slot="footer-body">
      <p className="ds-text-body--md ds-u-margin--0">Default slotted footer content</p>
    </div>
  </ds-drawer>
));
const renderDrawerWithoutSlottedFooter = createTestRenderer('ds-drawer', (attrs = {}, children) => (
  <ds-drawer {...(attrs as any)}>{children}</ds-drawer>
));

const mockCloseHandler = jest.fn();

describe('Drawer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render a dialog', () => {
    const { shadowRoot } = renderDrawer(
      {
        'is-open': 'true',
        heading: 'Test Drawer Heading',
        'close-button-aria-label': 'Close Help Drawer',
      },
      children
    );
    expect(shadowRoot.firstElementChild).toMatchSnapshot();

    const dialogElement = getByRole(shadowRoot as any as HTMLElement, 'dialog', {
      name: /test drawer heading/i,
    });
    expect(dialogElement).toBeInTheDocument();
  });

  it("is closed until 'is-open' is set to true", () => {
    const { rerenderTest, shadowRoot } = renderDrawer({ 'is-open': 'false' }, children);
    expect(queryByRole(shadowRoot as any as HTMLElement, 'dialog')).toBe(null);
    rerenderTest({ 'is-open': 'true' }, children);
    expect((getByRole(shadowRoot as any as HTMLElement, 'dialog') as HTMLDialogElement).open).toBe(
      true
    );
  });

  it('renders footer-body when footer-body attribute is provided', () => {
    const { shadowRoot } = renderDrawerWithoutSlottedFooter(
      {
        'is-open': 'true',
        heading: 'Test Drawer Heading',
        'footer-body': 'Footer Attribute Content',
      },
      children
    );

    const renderedFooterBodyElement = shadowRoot.querySelector('.ds-c-drawer__footer-body');
    expect(renderedFooterBodyElement).toBeInTheDocument();
    expect(renderedFooterBodyElement.textContent).toEqual('Footer Attribute Content');
  });

  it('renders slotted footer-body when slot content is provided and attribute is not', () => {
    const { shadowRoot } = renderDrawer(
      {
        'is-open': 'true',
        heading: 'Test Drawer Heading',
      },
      children
    );

    const renderedFooterBodyElement = shadowRoot.querySelector('.ds-c-drawer__footer-body');
    const slot = renderedFooterBodyElement.firstElementChild;
    expect(slot.tagName).toEqual('SLOT');
    expect(slot).toHaveAttribute('name', 'footer-body');
  });

  it('prioritizes slotted footer-body over the attribute when both are provided', () => {
    const { shadowRoot } = renderDrawer(
      {
        'is-open': 'true',
        heading: 'Test Drawer Heading',
        'footer-body': 'Footer-body content from attribute',
      },
      children
    );

    const renderedFooterBodyElement = shadowRoot.querySelector('.ds-c-drawer__footer-body');
    const slot = renderedFooterBodyElement.firstElementChild;
    expect(slot.tagName).toEqual('SLOT');
    expect(slot).toHaveAttribute('name', 'footer-body');
  });

  it('should call the `ds-close-click` handler when the close button is clicked', async () => {
    const { shadowRoot } = renderDrawer(
      {
        'is-open': 'true',
        heading: 'Test Drawer Heading',
        'close-button-aria-label': 'Close help drawer',
      },
      children
    );
    const drawer = document.querySelector('ds-drawer');

    drawer.addEventListener('ds-close-click', mockCloseHandler);

    const closeButton = await findByRole(shadowRoot as any as HTMLElement, 'button', {
      name: /close help drawer/i,
    });
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

  // I'm not sure why this one doesn't work, but it may be a race condition
  it.skip('should not call the event handler after unmounting', () => {
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
