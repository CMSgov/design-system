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
  const props = Object.assign({ id: 'tabs' }, customProps);

  if (!children) {
    children = <TabPanel {...defaultPanelProps}>{defaultPanelChildren}</TabPanel>;
  }

  return {
    props: props,
    wrapper: shallow(<Tabs {...props}>{children}</Tabs>)
  };
}

describe('Tabs', function() {
  it('renders root component with id', () => {
    const data = shallowRender();
    expect(data.wrapper.prop('id')).toBe(data.props.id);
  });

  it('renders tabs', () => {
    const data = shallowRender();
    const tabs = data.wrapper.find('Tab');

    expect(tabs.length).toBe(1);
    expect(tabs.first().children().text()).toBe(defaultPanelProps.tab);
  });

  it('renders panels', () => {
    const data = shallowRender();
    const panels = data.wrapper.find('TabPanel');

    expect(panels.length).toBe(1);
    expect(panels.first().prop('id')).toBe(defaultPanelProps.id);
  });

  it('selects the first panel by default');
  it('selects the second panel');
});
