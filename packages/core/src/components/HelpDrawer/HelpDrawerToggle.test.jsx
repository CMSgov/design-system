import HelpDrawerToggle from './HelpDrawerToggle.jsx';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

const defaultProps = {
  helpDrawerOpen: false,
  inline: true,
  showDrawer: () => {}
};

function renderHelpDrawerToggle(props) {
  props = Object.assign({}, defaultProps, props);
  const wrapper = shallow(
    <HelpDrawerToggle {...props}>
      <p>content</p>
    </HelpDrawerToggle>
  );
  return { props, wrapper };
}

describe('HelpDrawerToggle', () => {
  it('calls props.showDrawer on link click', () => {
    const showDrawer = jest.fn();
    const { wrapper } = renderHelpDrawerToggle({ showDrawer });
    const link = wrapper.find('a');
    link.simulate('click');
    expect(showDrawer).toHaveBeenCalled();
  });

  it('renders a snapshot', () => {
    const tree = renderer
      .create(
        <HelpDrawerToggle {...defaultProps}>
          <p>link content</p>
        </HelpDrawerToggle>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
