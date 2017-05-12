import React from 'react';
import TabPanel from './TabPanel';
import Tabs from './Tabs';
import {shallow} from 'enzyme';

const defaultPanelChildren = 'Foo';
const defaultPanelProps = {
  id: 'panel-1',
  tab: 'Tab label'
};

function shallowRender(customProps = {}, children) {
  const props = Object.assign({}, customProps);

  if (!children) {
    children = <TabPanel {...defaultPanelProps}>{defaultPanelChildren}</TabPanel>;
  }

  return {
    props: props,
    wrapper: shallow(<Tabs {...props}>{children}</Tabs>)
  };
}

describe('Tabs', function() {
  it('renders tabs', () => {
    const data = shallowRender();
    const tabs = data.wrapper.find('Tab');

    expect(tabs.length)
      .toBe(1);
    expect(tabs.first().prop('id'))
      .toBe(`ds-c-tabs__item--${defaultPanelProps.id}`);
    expect(tabs.first().prop('panelId'))
      .toBe(defaultPanelProps.id);
    expect(tabs.first().children().text())
      .toBe(defaultPanelProps.tab);
  });

  it('renders panels', () => {
    const data = shallowRender();
    const panels = data.wrapper.find('TabPanel');

    expect(panels.length)
      .toBe(1);
    expect(panels.first().prop('id'))
      .toBe(defaultPanelProps.id);
    expect(panels.first().prop('tabId'))
      .toBe(`ds-c-tabs__item--${defaultPanelProps.id}`);
  });

  it('selects the first tab by default', () => {
    const children = [
      <TabPanel key='1' id='panel-1' tab='Tab 1'>
        {defaultPanelChildren}
      </TabPanel>,
      <TabPanel key='2' id='panel-2' tab='Tab 2'>
        {defaultPanelChildren}
      </TabPanel>
    ];
    const data = shallowRender(undefined, children);
    const panels = data.wrapper.find('TabPanel');
    const tabs = data.wrapper.find('Tab');

    expect(panels.first().prop('selected')).toBe(true);
    expect(tabs.first().prop('selected')).toBe(true);
  });

  it('selects the specified tab', () => {
    const children = [
      <TabPanel key='1' id='panel-1' tab='Tab 1'>
        {defaultPanelChildren}
      </TabPanel>,
      <TabPanel key='2' id='panel-2' tab='Tab 2'>
        {defaultPanelChildren}
      </TabPanel>
    ];
    const data = shallowRender(
      { defaultSelectedId: 'panel-2' },
      children
    );
    const panels = data.wrapper.find('TabPanel');
    const tabs = data.wrapper.find('Tab');

    expect(panels.at(1).prop('selected')).toBe(true);
    expect(tabs.at(1).prop('selected')).toBe(true);
  });
});
