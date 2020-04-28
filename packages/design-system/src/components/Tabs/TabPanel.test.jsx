import React from 'react';
import TabPanel from './TabPanel';
import { shallow } from 'enzyme';

const defaultChildren = 'Content';

function shallowRender(customProps = {}) {
  const props = Object.assign(
    {
      id: 'panel-1',
      tabId: 'tab-1'
    },
    customProps
  );

  return {
    props: props,
    wrapper: shallow(<TabPanel {...props}>{defaultChildren}</TabPanel>)
  };
}

describe('TabPanel', function() {
  it('is selected', () => {
    const wrapper = shallowRender({ selected: true }).wrapper;
    expect(wrapper.prop('aria-hidden')).toBe('false');
  });

  it('sets ARIA attributes', () => {
    const data = shallowRender({ selected: true });
    const panel = data.wrapper;

    expect(panel.prop('role')).toBe('tabpanel');
    expect(panel.prop('aria-labelledby')).toBe(data.props.tabId);
    expect(panel.prop('aria-hidden')).toBe('false');
  });

  it('adds additional class names', () => {
    const className = 'foo-panel';
    const wrapper = shallowRender({ className: className }).wrapper;

    expect(wrapper.hasClass(className)).toBe(true);
    expect(wrapper.hasClass('ds-c-tabs__panel')).toBe(true);
  });
});
