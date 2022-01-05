import HelpDrawerToggle from './HelpDrawerToggle';
import React from 'react';
import { shallow } from 'enzyme';

const defaultProps = {
  helpDrawerOpen: false,
  inline: false,
  showDrawer: jest.fn(),
};

function renderHelpDrawerToggle(props?) {
  props = Object.assign({}, defaultProps, props);
  const wrapper = shallow(
    <HelpDrawerToggle {...props}>
      <p>content</p>
    </HelpDrawerToggle>
  );
  return { props, wrapper };
}

describe('HelpDrawerToggle', () => {
  beforeEach(() => {
    defaultProps.showDrawer.mockClear();
  });

  it('renders a button', () => {
    const { wrapper } = renderHelpDrawerToggle();
    expect(wrapper).toMatchSnapshot();
  });

  it('calls props.showDrawer on toggle click', () => {
    const { wrapper } = renderHelpDrawerToggle();
    const toggle = wrapper.dive().find('Button');
    toggle.simulate('click');
    expect(defaultProps.showDrawer).toHaveBeenCalled();
  });

  it('applies display utility through inline props', () => {
    const { wrapper } = renderHelpDrawerToggle({ inline: true });
    const toggle = wrapper.dive().find('Button');
    expect(toggle.hasClass('ds-c-drawer__toggle--inline')).toBe(true);
  });

  it('passes through extra props', () => {
    const ariaLabel = 'test';
    const { wrapper } = renderHelpDrawerToggle({ ariaLabel });
    const toggle = wrapper.dive().find('Button');
    expect(toggle.props().ariaLabel).toBe(ariaLabel);
  });
});
