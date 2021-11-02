import SlidingPanelToggle from './SlidingPanelToggle.jsx';
import React from 'react';
import { shallow } from 'enzyme';

const defaultProps = {
  panelOpen: false,
  inline: false,
  showPanel: jest.fn(),
};

function renderSlidingPanelToggle(props) {
  props = Object.assign({}, defaultProps, props);
  const wrapper = shallow(
    <SlidingPanelToggle {...props}>
      <p>content</p>
    </SlidingPanelToggle>
  );
  return { props, wrapper };
}

describe('SlidingPanelToggle', () => {
  beforeEach(() => {
    defaultProps.showPanel.mockClear();
  });

  it('renders a button', () => {
    const { wrapper } = renderSlidingPanelToggle();
    expect(wrapper).toMatchSnapshot();
  });

  it('calls showPanel() on toggle click', () => {
    const { wrapper } = renderSlidingPanelToggle();
    const toggle = wrapper.find('Button');
    toggle.simulate('click');
    expect(defaultProps.showPanel).toHaveBeenCalled();
  });

  it('applies inline display style via inline prop', () => {
    const { wrapper } = renderSlidingPanelToggle({ inline: true });
    const toggle = wrapper.find('Button');
    expect(toggle.hasClass('ds-c-help-drawer__toggle--inline')).toBe(true);
  });

  it('applies custom class via className prop', () => {
    const className = 'test-class';
    const { wrapper } = renderSlidingPanelToggle({ className });
    const toggle = wrapper.find('Button');
    expect(toggle.props().className).toContain(className);
  });

  it('passes through extra props', () => {
    const ariaLabel = 'test';
    const { wrapper } = renderSlidingPanelToggle({ ariaLabel });
    const toggle = wrapper.find('Button');
    expect(toggle.props().ariaLabel).toBe(ariaLabel);
  });
});
