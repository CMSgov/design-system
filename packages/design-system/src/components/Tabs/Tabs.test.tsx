import React from 'react';
import TabPanel from './TabPanel';
import Tabs from './Tabs';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function getPanelId(number) {
  return `panel-${number}`;
}

function createPanels(count = 1) {
  const panels = [];
  for (let i = 1; i <= count; i++) {
    panels.push(
      <TabPanel key={i} id={getPanelId(i)} tab={`Tab ${i}`}>
        Some content on panel {i}
      </TabPanel>
    );
  }
  return panels;
}

function renderTabs(customProps = {}, children?: React.ReactNode) {
  if (!children) {
    children = createPanels(1);
  }

  return render(<Tabs {...customProps}>{children}</Tabs>);
}

describe('Tabs', function () {
  it('renders a tab', () => {
    const children = [
      <TabPanel key="1" id="panel-1" tab="Tab 1" tabClassName="bar" tabHref="/foo">
        Some content
      </TabPanel>,
    ];
    renderTabs(undefined, children);
    const tabEls = screen.getAllByRole('tab');

    expect(tabEls.length).toBe(1);
    const firstTab = tabEls[0];
    expect(firstTab.classList).toContain('bar');
    expect(firstTab.getAttribute('aria-controls')).toBe(getPanelId(1));
    expect(firstTab.getAttribute('href')).toBe('/foo');
    expect(firstTab.textContent).toBe('Tab 1');
  });

  it('labels panels by their tabs', () => {
    renderTabs();
    const firstTab = screen.getAllByRole('tab')[0];
    const firstPanel = screen.getAllByRole('tabpanel')[0];
    expect(firstPanel.getAttribute('aria-labelledby')).toEqual(firstTab.id);
  });

  it('adds additional class names to tablist', () => {
    const className = 'foo-bar';
    renderTabs({ tablistClassName: className });
    const tabList = screen.getByRole('tablist');

    expect(tabList.classList).toContain(className);
    expect(tabList.classList).toContain('ds-c-tabs');
  });

  it('generates tab ids when no tabId is defined', () => {
    renderTabs(undefined, createPanels(2));
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0].id).toEqual('panel-1__tab');
    expect(tabs[1].id).toEqual('panel-2__tab');

    const panels = screen.getAllByRole('tabpanel');
    expect(panels[0].getAttribute('aria-labelledby')).toEqual(tabs[0].id);
  });

  it('applies the tabId to the tab element', () => {
    renderTabs(undefined, [
      <TabPanel key="lunch" id="lunch" tabId="lunch-tab" tab="Lunch Menu">
        Food
      </TabPanel>,
      <TabPanel key="dinner" id="dinner" tabId="dinner-tab" tab="Dinner menu">
        Food
      </TabPanel>,
    ]);

    const tabs = screen.getAllByRole('tab');
    expect(tabs[0].id).toEqual('lunch-tab');
    expect(tabs[1].id).toEqual('dinner-tab');

    const panels = screen.getAllByRole('tabpanel');
    expect(panels[0].getAttribute('aria-labelledby')).toEqual(tabs[0].id);
  });

  it('selects the first tab by default', () => {
    renderTabs(undefined, createPanels(2));
    // Grab all panels. Hidden and visible
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
    renderTabs({ defaultSelectedId: 'panel-2' }, createPanels(2));
    // Grab all panels. Hidden and visible
    const panelEls = screen.getAllByRole('tabpanel', { hidden: true });
    const tabEls = screen.getAllByRole('tab');

    // checking that panels are set correctly
    expect(panelEls[0].getAttribute('aria-hidden')).toBe('true');
    expect(panelEls[1].getAttribute('aria-hidden')).toBe('false');
    // checking that tabs are set correctly
    expect(tabEls[0].getAttribute('aria-selected')).toBe('false');
    expect(tabEls[1].getAttribute('aria-selected')).toBe('true');
  });

  it('calls onChange', () => {
    const onChangeMock = jest.fn();
    renderTabs(
      {
        onChange: onChangeMock,
        selectedId: getPanelId(1),
      },
      createPanels(2)
    );

    const tabEls = screen.getAllByRole('tab');
    userEvent.click(tabEls[1]);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it('selects the second panel on right arrow keyDown', () => {
    renderTabs({ defaultSelectedId: getPanelId(1) }, createPanels(2));
    const tabEls = screen.getAllByRole('tab');
    // Grab all panels. Hidden and visible
    const panelEls = screen.getAllByRole('tabpanel', { hidden: true });

    tabEls[0].focus();
    userEvent.keyboard('{ArrowRight}');

    expect(panelEls[1].getAttribute('aria-hidden')).toBe('false');
    expect(tabEls[1].getAttribute('aria-selected')).toBe('true');
  });

  it('selects the first panel on left arrow keyDown', () => {
    renderTabs({ defaultSelectedId: 'panel-2' }, createPanels(2));
    const tabEls = screen.getAllByRole('tab');
    // Grab all panels. Hidden and visible
    const panelEls = screen.getAllByRole('tabpanel', { hidden: true });

    tabEls[1].focus();
    userEvent.keyboard('{ArrowLeft}');

    expect(panelEls[0].getAttribute('aria-hidden')).toBe('false');
    expect(tabEls[0].getAttribute('aria-selected')).toBe('true');
  });

  it('selects the last panel on left arrow keyDown from first panel', () => {
    renderTabs({ defaultSelectedId: getPanelId(1) }, createPanels(2));
    const tabEls = screen.getAllByRole('tab');
    // Grab all panels. Hidden and visible
    const panelEls = screen.getAllByRole('tabpanel', { hidden: true });

    tabEls[0].focus();
    userEvent.keyboard('{ArrowLeft}');

    expect(panelEls[1].getAttribute('aria-hidden')).toBe('false');
    expect(tabEls[1].getAttribute('aria-selected')).toBe('true');
  });

  it('selects the first panel on right arrow keyDown from last panel', () => {
    renderTabs({ defaultSelectedId: 'panel-2' }, createPanels(2));
    const tabEls = screen.getAllByRole('tab');
    // Grab all panels. Hidden and visible
    const panelEls = screen.getAllByRole('tabpanel', { hidden: true });

    tabEls[1].focus();
    userEvent.keyboard('{ArrowRight}');

    expect(panelEls[0].getAttribute('aria-hidden')).toBe('false');
    expect(tabEls[0].getAttribute('aria-selected')).toBe('true');
  });

  it('can be a controlled component', () => {
    const onChange = jest.fn();
    const children = createPanels(3);
    const baseProps = { onChange };
    const { rerender } = renderTabs({ ...baseProps, selectedId: getPanelId(3) }, children);
    const tabEls = screen.getAllByRole('tab');
    const panelEls = screen.getAllByRole('tabpanel', { hidden: true });

    expect(panelEls[0].getAttribute('aria-hidden')).toBe('true');
    expect(panelEls[1].getAttribute('aria-hidden')).toBe('true');
    expect(panelEls[2].getAttribute('aria-hidden')).toBe('false');

    // Clicking the first tab shoudl call `onChange` but should do nothing else
    // because this is a controlled component
    tabEls[0].click();
    expect(onChange).toHaveBeenCalledWith(getPanelId(1), getPanelId(3));
    expect(panelEls[0].getAttribute('aria-hidden')).toBe('true');
    expect(panelEls[1].getAttribute('aria-hidden')).toBe('true');
    expect(panelEls[2].getAttribute('aria-hidden')).toBe('false');

    // But then if we re-render with a different panel selected, it should update
    rerender(
      <Tabs {...baseProps} selectedId={getPanelId(2)}>
        {children}
      </Tabs>
    );
    expect(panelEls[0].getAttribute('aria-hidden')).toBe('true');
    expect(panelEls[1].getAttribute('aria-hidden')).toBe('false');
    expect(panelEls[2].getAttribute('aria-hidden')).toBe('true');
  });
});
