import { mount, shallow } from 'enzyme';
import React from 'react';
import TabPanel from './TabPanel';
import Tabs from './Tabs';

const defaultPanelChildren = 'Foo';
const defaultPanelProps = {
  id: 'panel-1',
  tab: 'Tab label'
};

function render(customProps = {}, children, deep) {
  const props = Object.assign({}, customProps);

  if (!children) {
    children = (
      <TabPanel {...defaultPanelProps}>{defaultPanelChildren}</TabPanel>
    );
  }

  return {
    props: props,
    wrapper: deep
      ? mount(<Tabs {...props}>{children}</Tabs>)
      : shallow(<Tabs {...props}>{children}</Tabs>)
  };
}

describe('Tabs', function() {
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
      </TabPanel>
    ];
    const data = render(undefined, children);
    const tabs = data.wrapper.find('Tab');

    expect(tabs.length).toBe(1);
    expect(tabs.first().hasClass('bar')).toBe(true);
    expect(tabs.first().prop('id')).toBe(
      `ds-c-tabs__item--${defaultPanelProps.id}`
    );
    expect(tabs.first().prop('panelId')).toBe(defaultPanelProps.id);
    expect(tabs.first().prop('href')).toBe('/foo');
    expect(
      tabs
        .first()
        .children()
        .text()
    ).toBe(defaultPanelProps.tab);
  });

  it('renders panels', () => {
    const data = render();
    const panels = data.wrapper.find('TabPanel');

    expect(panels.length).toBe(1);
    expect(panels.first().prop('id')).toBe(defaultPanelProps.id);
    expect(panels.first().prop('tabId')).toBe(
      `ds-c-tabs__item--${defaultPanelProps.id}`
    );
  });

  it('adds additional class names to tablist', () => {
    const className = 'foo-bar';
    const data = render({ tablistClassName: className });
    const list = data.wrapper.find('.ds-c-tabs');

    expect(list.hasClass(className)).toBe(true);
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
        </TabPanel>
      ];
    });

    it('selects the first tab by default', () => {
      const data = render(undefined, children);
      const panels = data.wrapper.find('TabPanel');
      const tabs = data.wrapper.find('Tab');

      expect(panels.first().prop('selected')).toBe(true);
      expect(tabs.first().prop('selected')).toBe(true);
    });

    it('selects the specified tab', () => {
      const data = render({ defaultSelectedId: 'panel-2' }, children);
      const panels = data.wrapper.find('TabPanel');
      const tabs = data.wrapper.find('Tab');

      expect(panels.at(1).prop('selected')).toBe(true);
      expect(tabs.at(1).prop('selected')).toBe(true);
    });

    it('calls onChange', () => {
      const onChangeMock = jest.fn();
      const data = render(
        {
          onChange: onChangeMock,
          selectedId: 'panel-1'
        },
        children,
        true
      );

      data.wrapper.setState({ selectedId: 'panel-2' });

      expect(onChangeMock.mock.calls.length).toBe(1);
    });

    it('selects the second panel on right arrow keyDown', () => {
      const data = render({ defaultSelectedId: 'panel-1' }, children, true);
      const tabs = data.wrapper.find('Tab');

      tabs.first().simulate('keyDown', { key: 'ArrowRight' });

      const panelsUpdated = data.wrapper.find('TabPanel');
      const tabsUpdated = data.wrapper.find('Tab');

      expect(panelsUpdated.at(1).prop('selected')).toBe(true);
      expect(tabsUpdated.at(1).prop('selected')).toBe(true);
    });

    it('selects the first panel on left arrow keyDown', () => {
      const data = render({ defaultSelectedId: 'panel-2' }, children, true);
      const tabs = data.wrapper.find('Tab');

      tabs.at(1).simulate('keyDown', { key: 'ArrowLeft' });

      const panelsUpdated = data.wrapper.find('TabPanel');
      const tabsUpdated = data.wrapper.find('Tab');

      expect(panelsUpdated.first().prop('selected')).toBe(true);
      expect(tabsUpdated.first().prop('selected')).toBe(true);
    });
  });
});
