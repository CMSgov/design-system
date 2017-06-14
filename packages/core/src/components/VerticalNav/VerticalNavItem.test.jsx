import React from 'react';
import VerticalNavItem from './VerticalNavItem';
import {shallow} from 'enzyme';

function shallowRender(customProps = {}) {
  const props = Object.assign({
    label: 'Foo'
  }, customProps);

  return {
    props: props,
    wrapper: shallow(<VerticalNavItem {...props} />)
  };
}

describe('VerticalNavItem', () => {
  it('renders list item', () => {
    const data = shallowRender();
    const wrapper = data.wrapper;

    expect(wrapper.is('li')).toBe(true);
    expect(wrapper.hasClass('ds-c-vertical-nav__item')).toBe(true);
    expect(wrapper.text()).toBe(data.props.label);
  });

  it('is not a link', () => {
    const data = shallowRender();
    const wrapper = data.wrapper;
    const link = wrapper.find('.ds-c-vertical-nav__link').first();

    expect(link.is('div')).toBe(true);
    expect(link.prop('href')).toBeUndefined();
    expect(link.hasClass('ds-c-vertical-nav__link--current')).toBe(false);
  });

  it('is a link', () => {
    const data = shallowRender({ url: '/bar' });
    const wrapper = data.wrapper;
    const link = wrapper.find('.ds-c-vertical-nav__link').first();

    expect(link.is('a')).toBe(true);
    expect(link.prop('href')).toBe(data.props.url);
  });

  it('is selected', () => {
    const data = shallowRender({ selected: true });
    const link = data.wrapper.find('.ds-c-vertical-nav__link').first();

    expect(link.hasClass('ds-c-vertical-nav__link--current')).toBe(true);
  });

  it('has additional class names', () => {
    const data = shallowRender({ className: 'bar' });

    expect(data.wrapper.hasClass('ds-c-vertical-nav__item')).toBe(true);
    expect(data.wrapper.hasClass('bar')).toBe(true);
  });

  it('calls onClick', () => {
    const data = shallowRender({
      id: 'bar',
      onClick: jest.fn(),
      url: '/bar'
    });
    const link = data.wrapper.find('.ds-c-vertical-nav__link').first();

    link.simulate('click');
    expect(data.props.onClick.mock.calls.length).toBe(1);
    expect(data.props.onClick.mock.calls[0][1]).toBe(data.props.id);
    expect(data.props.onClick.mock.calls[0][2]).toBe(data.props.url);
  });

  it('calls onSubnavToggle', () => {
    const data = shallowRender({
      id: 'bar',
      onSubnavToggle: jest.fn()
    });

    data.wrapper.setState({ expanded: false });

    expect(data.props.onSubnavToggle.mock.calls.length)
      .toBe(1);
    expect(data.props.onSubnavToggle.mock.calls[0][0])
      .toBe(data.props.id);
    expect(data.props.onSubnavToggle.mock.calls[0][1])
      .toBe(false); // not expanded
  });

  describe('with nested menu', () => {
    let props;

    beforeEach(() => {
      props = {
        items: [
          { label: 'Child 1' },
          { label: 'Child 2' },
          {
            label: 'Child 3 with items',
            items: [ { label: 'Grandchild' } ]
          }
        ]
      };
    });

    it('renders subnavs', () => {
      const data = shallowRender(props);

      expect(data.wrapper.render().find('ul').length)
        .toBe(2);
      expect(data.wrapper.find('VerticalNav').first().prop('expanded'))
        .toBe(true);
      expect(data.wrapper.find('VerticalNav').first().prop('id'))
        .not.toBeUndefined();
    });

    it('renders toggle button', () => {
      const data = shallowRender(props);
      const button = data.wrapper.find('.ds-c-vertical-nav__subnav-toggle');
      const subnavId = data.wrapper.find('VerticalNav').prop('id');

      expect(button.prop('aria-controls')).toBe(subnavId);
      expect(button.prop('aria-expanded')).toBe(true);
    });

    it('is not expanded', () => {
      props.defaultExpanded = false;
      const data = shallowRender(props);

      expect(data.wrapper.find('VerticalNav').first().prop('expanded'))
        .toBe(false);
    });

    it('toggles expanded state', () => {
      props.ariaExpandedStateButtonLabel = 'Collapse me';
      props.ariaCollapsedStateButtonLabel = 'Expand me';
      const data = shallowRender(props);
      let button = data.wrapper.find('.ds-c-vertical-nav__subnav-toggle');

      expect(data.wrapper.find('VerticalNav').first().prop('expanded'))
        .toBe(true);
      expect(button.text())
        .toBe(data.props.ariaExpandedStateButtonLabel);

      button.simulate('click');
      // Get updated render...
      data.wrapper.update();
      button = data.wrapper.find('.ds-c-vertical-nav__subnav-toggle');

      expect(data.wrapper.find('VerticalNav').first().prop('expanded'))
        .toBe(false);
      expect(button.text())
        .toBe(data.props.ariaCollapsedStateButtonLabel);
    });
  });
});
