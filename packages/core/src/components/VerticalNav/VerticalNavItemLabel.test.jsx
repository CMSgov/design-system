import React from 'react';
import VerticalNavItemLabel from './VerticalNavItemLabel';
import { shallow } from 'enzyme';

function shallowRender(customProps = {}) {
  const props = Object.assign(
    {
      label: 'Foo',
      subnavId: 'foo-subnav'
    },
    customProps
  );

  return {
    props: props,
    wrapper: shallow(<VerticalNavItemLabel {...props} />)
  };
}

describe('VerticalNavItemLabel', () => {
  it('accepts a node as a label', () => {
    const wrapper = shallowRender({
      label: <strong>Foo</strong>
    }).wrapper;

    expect(wrapper.html()).toMatch(/<strong>/);
  });

  it('is not selected', () => {
    const data = shallowRender();
    expect(data.wrapper.hasClass('ds-c-vertical-nav__label--current')).toBe(
      false
    );
  });

  it('is selected', () => {
    const data = shallowRender({ selected: true });
    expect(data.wrapper.hasClass('ds-c-vertical-nav__label--current')).toBe(
      true
    );
  });

  it('calls onClick', () => {
    const data = shallowRender({
      onClick: jest.fn()
    });

    data.wrapper.simulate('click');
    expect(data.props.onClick.mock.calls.length).toBe(1);
  });

  describe('without subnav', () => {
    it('is a div element', () => {
      const data = shallowRender();
      const wrapper = data.wrapper;

      expect(wrapper.is('div')).toBe(true);
      expect(wrapper.prop('href')).toBeUndefined();
    });

    it('is an anchor element', () => {
      const data = shallowRender({ url: '/bar' });
      const wrapper = data.wrapper;

      expect(wrapper.is('a')).toBe(true);
      expect(wrapper.prop('href')).toBe(data.props.url);
    });

    it('ignores ARIA subnav attributes', () => {
      const data = shallowRender();
      const wrapper = data.wrapper;

      expect(wrapper.prop('title')).toBeUndefined();
      expect(wrapper.prop('aria-controls')).toBeUndefined();
      expect(wrapper.prop('aria-expanded')).toBeUndefined();
    });
  });

  describe('with subnav', () => {
    let props;

    beforeEach(() => {
      props = { hasSubnav: true };
    });

    it('is a button when URL isnt present', () => {
      const data = shallowRender(props);

      expect(data.wrapper.is('button')).toBe(true);
    });

    it('is a button even when URL is present', () => {
      props.url = '/foo';
      const data = shallowRender(props);
      const wrapper = data.wrapper;

      expect(wrapper.is('button')).toBe(true);
      expect(wrapper.prop('href')).toBeUndefined();
    });

    it('has ARIA attributes', () => {
      props.collapsed = true;
      const data = shallowRender(props);
      const wrapper = data.wrapper;

      expect(wrapper.prop('aria-controls')).toBe(`${data.props.subnavId}`);
      expect(wrapper.prop('aria-expanded')).toBe(false);
    });

    it('has collapsed state title', () => {
      props.collapsed = true;
      props.ariaCollapsedStateButtonLabel = 'Expand me';
      const data = shallowRender(props);

      expect(data.wrapper.prop('title')).toBe(
        data.props.ariaCollapsedStateButtonLabel
      );
    });

    it('has expanded state title', () => {
      props.collapsed = false;
      props.ariaExpandedStateButtonLabel = 'Collapse me';
      const data = shallowRender(props);

      expect(data.wrapper.prop('title')).toBe(
        data.props.ariaExpandedStateButtonLabel
      );
    });
  });
});
