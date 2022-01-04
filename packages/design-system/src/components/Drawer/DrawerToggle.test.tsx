import DrawerToggle from './DrawerToggle';
import React from 'react';
import { shallow } from 'enzyme';

const defaultProps = {
  drawerOpen: false,
  inline: false,
  showDrawer: jest.fn(),
};

function renderDrawerToggle(props?: any) {
  props = Object.assign({}, defaultProps, props);
  const wrapper = shallow(
    <DrawerToggle {...props}>
      <p>content</p>
    </DrawerToggle>
  );
  return { props, wrapper };
}

describe('DrawerToggle', () => {
  beforeEach(() => {
    defaultProps.showDrawer.mockClear();
  });

  it('renders a button', () => {
    const { wrapper } = renderDrawerToggle();
    expect(wrapper).toMatchSnapshot();
  });

  it('calls showDrawer() on toggle click', () => {
    const { wrapper } = renderDrawerToggle();
    const toggle = wrapper.find('Button');
    toggle.simulate('click');
    expect(defaultProps.showDrawer).toHaveBeenCalled();
  });

  it('applies inline display style via inline prop', () => {
    const { wrapper } = renderDrawerToggle({ inline: true });
    const toggle = wrapper.find('Button');
    expect(toggle.hasClass('ds-c-drawer__toggle--inline')).toBe(true);
  });

  it('applies custom class via className prop', () => {
    const className = 'test-class';
    const { wrapper } = renderDrawerToggle({ className });
    const toggle = wrapper.find('Button');
    expect(toggle.props().className).toContain(className);
  });

  it('passes through extra props', () => {
    const ariaLabel = 'test';
    const { wrapper } = renderDrawerToggle({ ariaLabel });
    const toggle = wrapper.find('Button');
    expect(toggle.props().ariaLabel).toBe(ariaLabel);
  });
});
