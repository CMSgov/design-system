import TabPanel from './TabPanel';
import { render, screen } from '@testing-library/react';

const defaultChildren = 'Content';
const defaultProps = {
  id: 'panel-1',
  tabId: 'tab-1',
};

function renderTabPanel(customProps = {}) {
  const props = {
    ...defaultProps,
    ...customProps,
  };

  return render(<TabPanel {...props}>{defaultChildren}</TabPanel>);
}

describe('TabPanel', () => {
  it('is selected', () => {
    renderTabPanel({ selected: true });
    const tabPanelEl = screen.getByRole('tabpanel');
    expect(tabPanelEl.getAttribute('aria-hidden')).toBe('false');
  });

  it('sets ARIA attributes', () => {
    renderTabPanel({ selected: true });
    const tabPanelEl = screen.getByRole('tabpanel');

    expect(tabPanelEl).toBeDefined();
    expect(tabPanelEl.getAttribute('aria-labelledby')).toBe(defaultProps.tabId);
    expect(tabPanelEl.getAttribute('aria-hidden')).toBe('false');
  });

  it('adds additional class names', () => {
    const className = 'foo-panel';
    renderTabPanel({ className: className, selected: true });
    const tabPanelEl = screen.getByRole('tabpanel');

    expect(tabPanelEl.classList).toContain(className);
    expect(tabPanelEl.classList).toContain('ds-c-tabs__panel');
  });

  it('sets aria-hidden="true" if tabPanel is disabled', () => {
    renderTabPanel({ disabled: true });
    const tabPanelEl = screen.getByRole('tabpanel', { hidden: true });
    expect(tabPanelEl).toHaveAttribute('aria-hidden', 'true');
  });
});
