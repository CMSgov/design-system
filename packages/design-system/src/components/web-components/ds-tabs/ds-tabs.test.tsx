import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import './ds-tabs';
import './ds-tab-panel';
const defaultProps = {
  'default-selected-id': 'panel-1',
};
function renderTabs(props = {}, children = []) {
  return render(<ds-tabs {...(props as any)}>{children}</ds-tabs>);
}
const children = [
  <ds-tab-panel key="1" id="panel-1" tab="Tab 1">
    Some content for tab 1
    <ol>
      <li>Nested content for tab 1.</li>
    </ol>
  </ds-tab-panel>,
  <ds-tab-panel key="2" id="panel-2" tab="Tab 2">
    Some content for tab 2.
  </ds-tab-panel>,
];

describe('ds-tabs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('renders tab panels', () => {
    renderTabs(defaultProps, children);
    const tabEls = screen.getAllByRole('tab');

    expect(tabEls.length).toBe(2);
    const firstTab = tabEls[0];
    expect(firstTab.textContent).toBe('Tab 1');
    const secondTab = tabEls[1];
    expect(secondTab.textContent).toBe('Tab 2');

    // Get all tab panels, including hidden ones
    const panelEls = screen.getAllByRole('tabpanel', { hidden: true });

    expect(panelEls[0]).toHaveAttribute('aria-hidden', 'false');
    expect(panelEls[1]).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders nested elements in a selected tab panel', () => {
    renderTabs(defaultProps, children);

    const tabEls = screen.getAllByRole('tab');
    expect(tabEls.length).toBe(2);

    expect(tabEls[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabEls[1]).toHaveAttribute('aria-selected', 'false');

    // Get all tab panels, including hidden ones
    const panelEls = screen.getAllByRole('tabpanel', { hidden: true });

    expect(panelEls[0]).toHaveAttribute('aria-hidden', 'false');
    expect(panelEls[1]).toHaveAttribute('aria-hidden', 'true');

    expect(screen.getByText(/Some content for tab 1/)).toBeInTheDocument();
    expect(screen.getByText(/Nested content for tab 1\./)).toBeInTheDocument();
  });

  it('switches tabs when clicked and triggers ds-change event', () => {
    renderTabs(defaultProps, children);

    const tabsElement = document.querySelector('ds-tabs');
    const mockChangeHandler = jest.fn();
    tabsElement.addEventListener('ds-change', mockChangeHandler);

    const tabEls = screen.getAllByRole('tab');

    userEvent.click(tabEls[1]);

    expect(mockChangeHandler).toHaveBeenCalledTimes(1);
    expect(mockChangeHandler.mock.calls[0][0].detail).toEqual({
      selectedId: 'panel-2',
      prevSelectedId: 'panel-1',
    });

    // Get all tab panels, including hidden ones
    const panelEls = screen.getAllByRole('tabpanel', { hidden: true });
    expect(panelEls[0]).toHaveAttribute('aria-hidden', 'true');
    expect(panelEls[1]).toHaveAttribute('aria-hidden', 'false');

    tabsElement.removeEventListener('ds-change', mockChangeHandler);
  });

  it('selects the second panel on right arrow keyDown', () => {
    renderTabs(defaultProps, children);
    const tabEls = screen.getAllByRole('tab');
    const panelEls = screen.getAllByRole('tabpanel', { hidden: true });

    tabEls[0].focus();
    expect(tabEls[0]).toHaveFocus();

    userEvent.keyboard('{ArrowRight}');

    expect(tabEls[1]).toHaveFocus();

    expect(panelEls[0]).toHaveAttribute('aria-hidden', 'true');
    expect(panelEls[1]).toHaveAttribute('aria-hidden', 'false');
  });

  it('selects the first panel on left arrow keyDown', () => {
    renderTabs(defaultProps, children);

    const tabEls = screen.getAllByRole('tab');
    const panelEls = screen.getAllByRole('tabpanel', { hidden: true });

    tabEls[1].focus();
    expect(tabEls[1]).toHaveFocus();

    userEvent.keyboard('{ArrowLeft}');

    expect(tabEls[0]).toHaveFocus();
    expect(panelEls[0]).toHaveAttribute('aria-hidden', 'false');
    expect(panelEls[1]).toHaveAttribute('aria-hidden', 'true');
  });

  it('should render a default aria-label when tabs-aria-label prop is not provided.', () => {
    renderTabs();
    const tablistElement = screen.getByRole('tablist');

    expect(tablistElement).toHaveAttribute('aria-label', 'Tab Navigation');
  });

  it('should render a custom aria-label when the tabs-aria-label attribute is provided', () => {
    const customAriaLabel = 'Custom Tab List Label';
    renderTabs({ 'tabs-aria-label': customAriaLabel });
    const tablistElement = screen.getByRole('tablist');

    expect(tablistElement).toHaveAttribute('aria-label', customAriaLabel);
  });

  it('selects the last panel on left arrow keyDown from first panel', () => {
    renderTabs(defaultProps, children);

    const tabEls = screen.getAllByRole('tab');
    const panelEls = screen.getAllByRole('tabpanel', { hidden: true });
    tabEls[0].focus();
    expect(tabEls[0]).toHaveFocus();

    userEvent.keyboard('{ArrowLeft}');

    expect(tabEls[tabEls.length - 1]).toHaveFocus();
    expect(panelEls[0]).toHaveAttribute('aria-hidden', 'true');
    expect(panelEls[1]).toHaveAttribute('aria-hidden', 'false');
  });

  it('selects the first panel on right arrow keyDown from last panel', () => {
    renderTabs(defaultProps, children);

    const tabEls = screen.getAllByRole('tab');
    const panelEls = screen.getAllByRole('tabpanel', { hidden: true });
    tabEls[tabEls.length - 1].focus();
    expect(tabEls[tabEls.length - 1]).toHaveFocus();

    userEvent.keyboard('{ArrowRight}');

    expect(tabEls[0]).toHaveFocus();
    expect(panelEls[0]).toHaveAttribute('aria-hidden', 'false');
    expect(panelEls[1]).toHaveAttribute('aria-hidden', 'true');
  });

  it('adds additional class names to tablist', () => {
    const className = 'foo-bar';
    renderTabs({ 'tablist-class-name': className, ...defaultProps }, children);
    const tabList = screen.getByRole('tablist');

    expect(tabList.classList).toContain(className);
    expect(tabList.classList).toContain('ds-c-tabs');
  });

  it('generates tab ids when no tabId is defined', () => {
    renderTabs(undefined, children);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0].id).toEqual('panel-1__tab');
    expect(tabs[1].id).toEqual('panel-2__tab');

    const panels = screen.getAllByRole('tabpanel');
    expect(panels[0].getAttribute('aria-labelledby')).toEqual(tabs[0].id);
  });

  it('applies the tabId to the tab element', () => {
    renderTabs(undefined, [
      <ds-tab-panel key="lunch" id="lunch" tab-id="lunch-tab" tab="Lunch Menu">
        Food
      </ds-tab-panel>,
      <ds-tab-panel key="dinner" id="dinner" tab-id="dinner-tab" tab="Dinner menu">
        Food
      </ds-tab-panel>,
    ]);

    const tabs = screen.getAllByRole('tab');
    expect(tabs[0].id).toEqual('lunch__tab');
    expect(tabs[1].id).toEqual('dinner__tab');

    const panels = screen.getAllByRole('tabpanel');
    expect(panels[0].getAttribute('aria-labelledby')).toEqual(tabs[0].id);
  });

  it('selects the first tab by default', () => {
    renderTabs(undefined, children);
    const panelEls = screen.getAllByRole('tabpanel', { hidden: true });
    const tabEls = screen.getAllByRole('tab');

    // checking that panels are set correctly
    expect(panelEls[0].getAttribute('aria-hidden')).toBe('false');
    expect(panelEls[1].getAttribute('aria-hidden')).toBe('true');
    // checking that tabs are set correctly
    expect(tabEls[0].getAttribute('aria-selected')).toBe('true');
    expect(tabEls[1].getAttribute('aria-selected')).toBe('false');
  });

  it('selects the specified tab', () => {
    renderTabs({ 'default-selected-id': 'panel-2' }, children);
    const panelEls = screen.getAllByRole('tabpanel', { hidden: true });
    const tabEls = screen.getAllByRole('tab');

    expect(panelEls[0].getAttribute('aria-hidden')).toBe('true');
    expect(panelEls[1].getAttribute('aria-hidden')).toBe('false');
    expect(tabEls[0].getAttribute('aria-selected')).toBe('false');
    expect(tabEls[1].getAttribute('aria-selected')).toBe('true');
  });
});
