import { render, screen } from '@testing-library/react';
import './ds-tab-panel';

const defaultChildren = 'Content';
const defaultAttrs = {
  id: 'panel-1',
  'tab-id': 'tab-1',
};

function renderTabPanel(attrs = {}, children: any) {
  return render(<ds-tab-panel {...(attrs as any)}>{children}</ds-tab-panel>);
}

describe('TabPanel', () => {
  it('is selected', () => {
    renderTabPanel({ selected: 'true' }, defaultChildren);
    const tabPanelEl = screen.getByRole('tabpanel');
    expect(tabPanelEl.getAttribute('aria-hidden')).toBe('false');
  });
  it('sets ARIA attributes', () => {
    renderTabPanel({ selected: 'true', ...defaultAttrs }, defaultChildren);
    const tabPanelEl = screen.getByRole('tabpanel');

    expect(tabPanelEl).toBeDefined();
    expect(tabPanelEl.getAttribute('aria-labelledby')).toBe('tab-1');
    expect(tabPanelEl.getAttribute('aria-hidden')).toBe('false');
    expect(tabPanelEl.getAttribute('aria-disabled')).toBe('false');
  });

  it('adds additional class names', () => {
    const className = 'foo-panel';
    renderTabPanel({ 'class-name': className, selected: 'true', ...defaultAttrs }, defaultChildren);
    const tabPanelEl = screen.getByRole('tabpanel');

    expect(tabPanelEl.classList).toContain(className);
    expect(tabPanelEl.classList).toContain('ds-c-tabs__panel');
  });
  it('sets aria-disabled', () => {
    renderTabPanel({ disabled: true, ...defaultAttrs }, defaultChildren);
    const tabPanelEl = screen.getByRole('tabpanel', { hidden: true });
    expect(tabPanelEl.getAttribute('aria-disabled')).toBe('true');
  });
});
