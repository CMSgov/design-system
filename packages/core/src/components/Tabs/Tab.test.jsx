import React from 'react';
import Tab from './Tab';
import { shallow } from 'enzyme';

function shallowRender(customProps = {}) {
  const props = Object.assign(
    {
      id: 'tab',
      panelId: 'panel'
    },
    customProps
  );

  return {
    props: props,
    wrapper: shallow(<Tab {...props}>Label</Tab>)
  };
}

describe('Tab', function() {
  it('renders a tab', () => {
    const data = shallowRender();

    expect(data.wrapper.prop('href')).toBe(`#${data.props.panelId}`);
    expect(data.wrapper.text()).toBe('Label');
    expect(data.wrapper.hasClass('ds-c-tabs__item')).toBe(true);
    // ARIA
    expect(data.wrapper.prop('aria-controls')).toBe(data.props.panelId);
    expect(data.wrapper.prop('role')).toBe('tab');
    expect(data.wrapper.prop('aria-selected')).toBe('false');
  });

  it('calls onClick', () => {
    const onClickMock = jest.fn();
    const data = shallowRender({ onClick: onClickMock });

    data.wrapper.simulate('click');

    expect(onClickMock.mock.calls.length).toBe(1);
    expect(onClickMock.mock.calls[0][1]).toBe(data.props.panelId);
    expect(onClickMock.mock.calls[0][2]).toBe(data.props.id);
    expect(onClickMock.mock.calls[0][3]).toBe(`#${data.props.panelId}`);
  });

  it('is selected', () => {
    const wrapper = shallowRender({ selected: true }).wrapper;
    expect(wrapper.prop('aria-selected')).toBe('true');
  });

  it('has custom href attribute', () => {
    const data = shallowRender({ href: '/example' });
    expect(data.wrapper.prop('href')).toBe(data.props.href);
  });

  it('adds additional class names', () => {
    const className = 'foo-boo';
    const data = shallowRender({ className: className });
    expect(data.wrapper.hasClass('ds-c-tabs__item')).toBe(true);
    expect(data.wrapper.hasClass(className)).toBe(true);
  });
});
