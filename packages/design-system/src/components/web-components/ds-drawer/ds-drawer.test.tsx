import {
  render,
  cleanup,
  findByRole,
  getByRole,
  getByLabelText,
  getByText,
  queryByRole,
} from '@testing-library/react';
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
  const result = render(
    <ds-drawer {...args}>
      {children}
      <div slot="footer-body">
        <p className="ds-text-body--md ds-u-margin--0">Default slotted footer content</p>
      </div>
    </ds-drawer>
  );

  function createRerenderFunction(renderResult) {
    return (newArgs, newChildren) => {
      const rerenderResult = renderResult.rerender(
        <ds-drawer {...newArgs}>
          {newChildren}
          <div slot="footer-body">
            <p className="ds-text-body--md ds-u-margin--0">Default slotted footer content</p>
          </div>
        </ds-drawer>
      );
      return {
        ...rerenderResult,
        shadowRoot: getShadowRoot(result),
        rerenderDrawer: createRerenderFunction(rerenderResult),
      };
    };
  }

  function getShadowRoot(renderResult): ShadowRoot {
    return renderResult.container.querySelector('ds-drawer').shadowRoot;
  }

  return {
    ...result,
    rerenderDrawer: createRerenderFunction(result),
    shadowRoot: getShadowRoot(result),
  };
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

    const closeButton = getByLabelText(shadowRoot as any as HTMLElement, 'Close Help Drawer');
    expect(closeButton).toBeInTheDocument();

    const headingElement = getByText(shadowRoot as any as HTMLElement, 'Test Drawer Heading');
    expect(headingElement).toBeInTheDocument();

    const explanationText = getByText(shadowRoot as any as HTMLElement, 'An Explanation');
    expect(explanationText).toBeInTheDocument();

    const paragraphText = getByText(
      shadowRoot as any as HTMLElement,
      /Lorem ipsum dolor sit amet, consectetur adipiscing elit/i
    );
    expect(paragraphText).toBeInTheDocument();
  });

  it("is closed until 'is-open' is set to true", () => {
    const { rerenderDrawer, shadowRoot } = renderDrawer({ 'is-open': 'false' }, children);
    expect(queryByRole(shadowRoot as any as HTMLElement, 'dialog')).toBe(null);
    rerenderDrawer({ 'is-open': 'true' }, children);
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

    const renderedFooterBodyElement = getByText(
      shadowRoot as any as HTMLElement,
      'Footer Attribute Content'
    );
    expect(renderedFooterBodyElement).toBeInTheDocument();
  });

  it('renders slotted footer-body when slot content is provided and attribute is not', () => {
    const { shadowRoot } = renderDrawer(
      {
        'is-open': 'true',
        heading: 'Test Drawer Heading',
      },
      children
    );

    const renderedFooterBodyElement = getByText(
      shadowRoot as any as HTMLElement,
      'Default slotted footer content'
    );
    expect(renderedFooterBodyElement).toBeInTheDocument();
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

    const renderedFooterBodyElement = getByText(
      shadowRoot as any as HTMLElement,
      'Default slotted footer content'
    );
    expect(renderedFooterBodyElement).toBeInTheDocument();
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
