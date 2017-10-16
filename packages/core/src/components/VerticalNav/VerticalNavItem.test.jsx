import { mount, shallow } from 'enzyme';
import React from 'react';
import VerticalNavItem from './VerticalNavItem';

function render(customProps = {}, deep) {
  const props = Object.assign(
    {
      label: 'Foo'
    },
    customProps
  );

  const component = <VerticalNavItem {...props} />;

  return {
    props: props,
    wrapper: deep ? mount(component) : shallow(component)
  };
}

describe('VerticalNavItem', () => {
  it('renders list item', () => {
    const data = render();
    const wrapper = data.wrapper;

    expect(wrapper.is('li')).toBe(true);
    expect(wrapper.hasClass('ds-c-vertical-nav__item')).toBe(true);
  });

  it('renders VerticalNavItemLabel', () => {
    const data = render();
    const label = data.wrapper.find('VerticalNavItemLabel').first();

    expect(label.prop('collapsed')).toBe(data.wrapper.state('collapsed'));
    expect(label.prop('label')).toBe(data.props.label);
  });

  it('has additional class names', () => {
    const data = render({ className: 'bar' });

    expect(data.wrapper.hasClass('ds-c-vertical-nav__item')).toBe(true);
    expect(data.wrapper.hasClass('bar')).toBe(true);
  });

  it('calls onSubnavToggle', () => {
    const data = render({
      id: 'bar',
      onSubnavToggle: jest.fn()
    });

    // Collapsed state changes, triggering the event!
    data.wrapper.setState({ collapsed: true });

    expect(data.props.onSubnavToggle.mock.calls.length).toBe(1);
    expect(data.props.onSubnavToggle.mock.calls[0][0]).toBe(data.props.id);
    expect(data.props.onSubnavToggle.mock.calls[0][1]).toBe(true); // collapsed
  });

  describe('without subnav', () => {
    it('is not selected', () => {
      const data = render();

      expect(data.wrapper.find('VerticalNavItemLabel').prop('selected')).toBe(
        false
      );
    });

    it('is selected', () => {
      const data = render({ selected: true });

      expect(data.wrapper.find('VerticalNavItemLabel').prop('selected')).toBe(
        true
      );
    });

    it('has no subnav', () => {
      const data = render();
      const label = data.wrapper.find('VerticalNavItemLabel').first();

      expect(label.prop('hasSubnav')).toBe(false);
      expect(data.wrapper.find('VerticalNav').length).toBe(0);
    });

    it('calls onClick', () => {
      const data = render({
        id: 'bar',
        onClick: jest.fn(),
        url: '/bar'
      });

      data.wrapper
        .find('VerticalNavItemLabel')
        .first()
        .simulate('click');

      expect(data.props.onClick.mock.calls.length).toBe(1);
      expect(data.props.onClick.mock.calls[0][1]).toBe(data.props.id);
      expect(data.props.onClick.mock.calls[0][2]).toBe(data.props.url);
    });
  });

  describe('with subnav', () => {
    let props;

    beforeEach(() => {
      props = {
        items: [
          { label: 'Child 1' },
          { label: 'Child 2' },
          {
            label: 'Child 3 with items',
            items: [{ label: 'Grandchild' }]
          }
        ]
      };
    });

    it('has subnav', () => {
      const data = render(props);
      const label = data.wrapper.find('VerticalNavItemLabel').first();
      const subnav = data.wrapper.find('VerticalNav').first();

      expect(label.prop('hasSubnav')).toBe(true);
      expect(data.wrapper.render().find('ul').length).toBe(2);
      expect(subnav.prop('collapsed')).toBe(false);
      expect(subnav.prop('id')).not.toBeUndefined();
      expect(subnav.prop('nested')).toBe(true);
    });

    it('is not selected', () => {
      const data = render(props);

      expect(data.wrapper.find('VerticalNavItemLabel').prop('selected')).toBe(
        false
      );
    });

    it('is selected', () => {
      props._selectedId = 'selected-child';
      props.items[0].id = 'selected-child';
      const data = render(props);

      expect(data.wrapper.find('VerticalNavItemLabel').prop('selected')).toBe(
        true
      );
    });

    it('has collapsed subnav', () => {
      props.defaultCollapsed = true;
      const data = render(props);

      expect(
        data.wrapper
          .find('VerticalNav')
          .first()
          .prop('collapsed')
      ).toBe(true);
    });

    it('toggles collapsed state', () => {
      props.onClick = jest.fn();
      const data = render(props);
      const label = data.wrapper.find('VerticalNavItemLabel').first();

      expect(
        data.wrapper
          .find('VerticalNav')
          .first()
          .prop('collapsed')
      ).toBe(false);

      label.simulate('click');
      data.wrapper.update();

      expect(
        data.wrapper
          .find('VerticalNav')
          .first()
          .prop('collapsed')
      ).toBe(true);
    });

    it('does not add top-level link to top of subnav', () => {
      const data = render(props);
      const subnav = data.wrapper
        .find('VerticalNav')
        .first()
        .shallow();
      const firstSubnavItem = subnav.find('VerticalNavItem').first();

      expect(firstSubnavItem.prop('label')).toBe(data.props.items[0].label);
    });

    describe('with url', () => {
      beforeEach(() => {
        props.url = '/foo';
      });

      it('adds top-level link to top of subnav', () => {
        props.id = 'foo';
        const data = render(props);
        const subnav = data.wrapper
          .find('VerticalNav')
          .first()
          .shallow();
        const firstSubnavItem = subnav.find('VerticalNavItem').first();

        expect(firstSubnavItem.prop('id')).toBe(data.props.id);
        expect(firstSubnavItem.prop('items')).toBeUndefined();
        expect(firstSubnavItem.prop('label')).toBe(data.props.label);
        expect(firstSubnavItem.prop('url')).toBe(data.props.url);
      });

      it('calls onSubnavToggle rather than onClick', () => {
        props.onClick = jest.fn();
        props.onSubnavToggle = jest.fn();

        const data = render(props, true);
        const label = data.wrapper.find('VerticalNavItemLabel').first();

        label.simulate('click');

        expect(data.props.onClick.mock.calls.length).toBe(0);
        expect(data.props.onSubnavToggle.mock.calls.length).toBe(1);
      });
    });
  });
});
