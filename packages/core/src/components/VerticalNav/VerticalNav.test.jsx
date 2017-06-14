import React from 'react';
import VerticalNav from './VerticalNav';
import {shallow} from 'enzyme';

function shallowRender(customProps = {}) {
  const props = Object.assign({
    items: [
      { label: 'Foo' },
      { label: 'Bar' }
    ]
  }, customProps);

  return {
    props: props,
    wrapper: shallow(<VerticalNav {...props} />)
  };
}

describe('VerticalNav', () => {
  it('renders list', () => {
    const data = shallowRender();
    const wrapper = data.wrapper;

    expect(wrapper.is('ul')).toBe(true);
    expect(wrapper.hasClass('ds-c-vertical-nav')).toBe(true);
    expect(data.wrapper.hasClass('ds-c-vertical-nav__subnav')).toBe(false);
    expect(data.wrapper.hasClass('ds-u-display--none')).toBe(false);
    expect(wrapper.find('VerticalNavItem').length).toBe(data.props.items.length);
  });

  it('adds additional class names', () => {
    const data = shallowRender({ className: 'foo' });

    expect(data.wrapper.hasClass('ds-c-vertical-nav')).toBe(true);
    expect(data.wrapper.hasClass('foo')).toBe(true);
  });

  it('has an id attribute', () => {
    const data = shallowRender({ id: 'foo' });

    expect(data.wrapper.prop('id')).toBe(data.props.id);
  });

  it('is a subnav list', () => {
    const data = shallowRender({ nested: true });

    expect(data.wrapper.hasClass('ds-c-vertical-nav')).toBe(false);
    expect(data.wrapper.hasClass('ds-c-vertical-nav__subnav')).toBe(true);
  });

  it('is not expanded', () => {
    const data = shallowRender({ expanded: false });

    expect(data.wrapper.hasClass('ds-u-display--none')).toBe(true);
  });
});
