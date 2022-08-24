import React from 'react';
import TabPanel from './TabPanel';
import Tabs from './Tabs';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultPanelChildren = 'Foo';
const defaultPanelProps = {
  id: 'panel-1',
  tab: 'Tab label',
};

function renderTabs(customProps = {}, children?: React.ReactNode) {
  if (!children) {
    children = <TabPanel {...defaultPanelProps}>{defaultPanelChildren}</TabPanel>;
  }

  return render(<Tabs {...customProps}>{children}</Tabs>);
}

describe('Tabs', function () {
  it('renders a tab', () => {
    const children = [
      <TabPanel
        key="1"
        id={defaultPanelProps.id}
        tab={defaultPanelProps.tab}
        tabClassName="bar"
        tabHref="/foo"
      >
        {defaultPanelChildren}
      </TabPanel>,
    ];
    renderTabs(undefined, children);
    const tabEls = screen.getAllByRole('tab');

    expect(tabEls.length).toBe(1);
    const firstTab = tabEls[0];
    expect(firstTab.classList).toContain('bar');
    expect(firstTab.id).toBe(`ds-c-tabs__item--${defaultPanelProps.id}`);
    expect(firstTab.getAttribute('aria-controls')).toBe(defaultPanelProps.id);
    expect(firstTab.getAttribute('href')).toBe('/foo');
    expect(firstTab.textContent).toBe(defaultPanelProps.tab);
  });

  it('renders panels', () => {
    renderTabs();
    const panelEls = screen.getAllByRole('tabpanel');

    expect(panelEls.length).toBe(1);
    const firstPanel = panelEls[0];
    expect(firstPanel.id).toBe(defaultPanelProps.id);
    expect(firstPanel.getAttribute('aria-labelledby')).toBe(
      `ds-c-tabs__item--${defaultPanelProps.id}`
    );
  });

  it('adds additional class names to tablist', () => {
    const className = 'foo-bar';
    renderTabs({ tablistClassName: className });
    const tabList = screen.getByRole('tablist');

    expect(tabList.classList).toContain(className);
    expect(tabList.classList).toContain('ds-c-tabs');
  });

  describe('with multiple panels', () => {
    let children;

    beforeEach(() => {
      children = [
        <TabPanel key="1" id="panel-1" tab="Tab 1">
          {defaultPanelChildren}
        </TabPanel>,
        <TabPanel key="2" id="panel-2" tab="Tab 2">
          {defaultPanelChildren}
        </TabPanel>,
      ];
    });

    it('selects the first tab by default', () => {
      renderTabs(undefined, children);
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
      renderTabs({ defaultSelectedId: 'panel-2' }, children);
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
          selectedId: 'panel-1',
        },
        children
      );

      const tabEls = screen.getAllByRole('tab');
      userEvent.click(tabEls[1]);

      expect(onChangeMock).toHaveBeenCalledTimes(1);
    });

    it('selects the second panel on right arrow keyDown', () => {
      renderTabs({ defaultSelectedId: 'panel-1' }, children);
      const tabEls = screen.getAllByRole('tab');
      // Grab all panels. Hidden and visible
      const panelEls = screen.getAllByRole('tabpanel', { hidden: true });

      tabEls[0].focus();
      userEvent.keyboard('{ArrowRight}');

      expect(panelEls[1].getAttribute('aria-hidden')).toBe('false');
      expect(tabEls[1].getAttribute('aria-selected')).toBe('true');
    });

    it('selects the first panel on left arrow keyDown', () => {
      renderTabs({ defaultSelectedId: 'panel-2' }, children);
      const tabEls = screen.getAllByRole('tab');
      // Grab all panels. Hidden and visible
      const panelEls = screen.getAllByRole('tabpanel', { hidden: true });

      tabEls[1].focus();
      userEvent.keyboard('{ArrowLeft}');

      expect(panelEls[0].getAttribute('aria-hidden')).toBe('false');
      expect(tabEls[0].getAttribute('aria-selected')).toBe('true');
    });

    it('selects the last panel on left arrow keyDown from first panel', () => {
      renderTabs({ defaultSelectedId: 'panel-1' }, children);
      const tabEls = screen.getAllByRole('tab');
      // Grab all panels. Hidden and visible
      const panelEls = screen.getAllByRole('tabpanel', { hidden: true });

      tabEls[0].focus();
      userEvent.keyboard('{ArrowLeft}');

      expect(panelEls[1].getAttribute('aria-hidden')).toBe('false');
      expect(tabEls[1].getAttribute('aria-selected')).toBe('true');
    });

    it('selects the first panel on right arrow keyDown from last panel', () => {
      renderTabs({ defaultSelectedId: 'panel-2' }, children);
      const tabEls = screen.getAllByRole('tab');
      // Grab all panels. Hidden and visible
      const panelEls = screen.getAllByRole('tabpanel', { hidden: true });

      tabEls[1].focus();
      userEvent.keyboard('{ArrowRight}');

      expect(panelEls[0].getAttribute('aria-hidden')).toBe('false');
      expect(tabEls[0].getAttribute('aria-selected')).toBe('true');
    });
  });
});
