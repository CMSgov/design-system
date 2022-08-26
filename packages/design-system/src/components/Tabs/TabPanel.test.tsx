import React from 'react';
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
    expect(tabPanelEl.getAttribute('aria-disabled')).toBe(null);
  });

  it('adds additional class names', () => {
    const className = 'foo-panel';
    renderTabPanel({ className: className, selected: true });
    const tabPanelEl = screen.getByRole('tabpanel');

    expect(tabPanelEl.classList).toContain(className);
    expect(tabPanelEl.classList).toContain('ds-c-tabs__panel');
  });

  it('sets aria-disabled', () => {
    renderTabPanel({ disabled: true });
    const tabPanelEl = screen.getByRole('tabpanel', { hidden: true });
    expect(tabPanelEl.getAttribute('aria-disabled')).toBe('true');
  });
});
