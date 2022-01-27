import DrawerToggle, { DrawerToggleProps } from './DrawerToggle';
import React from 'react';
// import { shallow } from 'enzyme';
import { render, fireEvent, screen } from '@testing-library/react';

const defaultProps = {
  children: <p>content</p>,
  drawerOpen: false,
  inline: false,
  showDrawer: jest.fn(),
};

describe('DrawerToggle', () => {
  beforeEach(() => {
    defaultProps.showDrawer.mockClear();
  });

  it('renders a button', () => {
    const wrapper = shallow(<DrawerToggle {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls showDrawer() on toggle click', () => {
    const wrapper = shallow(<DrawerToggle {...defaultProps} />);
    const toggle = wrapper.find('Button');
    toggle.simulate('click');
    expect(defaultProps.showDrawer).toHaveBeenCalled();
  });

  it('applies inline display style via inline prop', () => {
    const wrapper = shallow(<DrawerToggle {...defaultProps} {...{ inline: true }} />);
    const toggle = wrapper.find('Button');
    expect(toggle.hasClass('ds-c-drawer__toggle--inline')).toBe(true);
  });

  it('applies custom class via className prop', () => {
    const className = 'test-class';
    const wrapper = shallow(<DrawerToggle {...defaultProps} {...{ className }} />);
    const toggle = wrapper.find('Button');
    expect(toggle.props().className).toContain(className);
  });

  it('passes through extra props', () => {
    const ariaLabel = 'test';
    const wrapper = shallow(<DrawerToggle {...defaultProps} {...{ 'aria-label': ariaLabel }} />);
    const toggle = wrapper.find('Button');
    expect(toggle.props()['aria-label']).toBe(ariaLabel);
  });
});
