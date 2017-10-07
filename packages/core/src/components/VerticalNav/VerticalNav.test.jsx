import { mount, shallow } from 'enzyme';
import React from 'react';
import VerticalNav from './VerticalNav';

function shallowRender(customProps = {}) {
  const props = Object.assign(
    {
      items: [{ label: 'Foo' }, { label: 'Bar' }]
    },
    customProps
  );

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
    expect(wrapper.find('VerticalNavItem').length).toBe(
      data.props.items.length
    );
    expect(
      wrapper
        .find('VerticalNavItem')
        .first()
        .prop('onClick')
    ).toBeUndefined();
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

  it('is collapsed', () => {
    const data = shallowRender({ collapsed: true });

    expect(data.wrapper.hasClass('ds-u-display--none')).toBe(true);
  });

  it('passes onLinkClick to items', () => {
    const data = shallowRender({
      onLinkClick: jest.fn()
    });

    expect(
      data.wrapper
        .find('VerticalNavItem')
        .first()
        .prop('onClick')
    ).toBe(data.props.onLinkClick);
  });

  it("gives precedence to item's onClick callback", () => {
    const data = shallowRender({
      onLinkClick: jest.fn(),
      items: [
        {
          label: 'Foo',
          onClick: jest.fn()
        }
      ]
    });

    expect(
      data.wrapper
        .find('VerticalNavItem')
        .first()
        .prop('onClick')
    ).toBe(data.props.items[0].onClick);
  });

  it('sets selected prop on selected item and its parents', () => {
    const props = {
      selectedId: 'grandchild-1',
      items: [
        {
          label: 'Parent',
          id: 'parent',
          items: [
            {
              label: 'Child',
              id: 'child',
              items: [
                {
                  label: 'Grandchild 1',
                  id: 'grandchild-1'
                },
                {
                  label: 'Grandchild 2',
                  id: 'grandchild-2'
                }
              ]
            }
          ]
        },
        {
          label: 'Foo'
        }
      ]
    };
    const wrapper = mount(<VerticalNav {...props} />);
    const parentWrapper = wrapper
      .findWhere(n => n.prop('id') === 'parent')
      .first();
    const childWrapper = wrapper
      .findWhere(n => n.prop('id') === 'child')
      .first();
    const grandchild1Wrapper = wrapper
      .findWhere(n => n.prop('id') === 'grandchild-1')
      .first();
    const grandchild2Wrapper = wrapper
      .findWhere(n => n.prop('id') === 'grandchild-2')
      .first();
    const fooWrapper = wrapper
      .findWhere(n => n.prop('label') === 'Foo')
      .first();

    // Parents and self are selected
    expect(
      parentWrapper
        .find('.ds-c-vertical-nav__label')
        .first()
        .hasClass('ds-c-vertical-nav__label--current')
    ).toBe(true);

    expect(
      childWrapper
        .find('.ds-c-vertical-nav__label')
        .first()
        .hasClass('ds-c-vertical-nav__label--current')
    ).toBe(true);

    expect(
      grandchild1Wrapper
        .find('.ds-c-vertical-nav__label')
        .first()
        .hasClass('ds-c-vertical-nav__label--current')
    ).toBe(true);

    // Siblings or unrelated items aren't selected
    expect(
      grandchild2Wrapper
        .find('.ds-c-vertical-nav__label')
        .first()
        .hasClass('ds-c-vertical-nav__label--current')
    ).toBe(false);

    expect(
      fooWrapper
        .find('.ds-c-vertical-nav__label')
        .first()
        .hasClass('ds-c-vertical-nav__label--current')
    ).toBe(false);
  });
});
