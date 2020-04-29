import HelpDrawer from './HelpDrawer.jsx';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

const defaultProps = {
  footerBody: (
    <div>
      <p>Some footer content</p>
    </div>
  ),
  footerTitle: 'Footer title',
  onCloseClick: () => {},
  title: 'HelpDrawer title'
};

function renderHelpDrawer(props) {
  props = Object.assign({}, defaultProps, props);
  const wrapper = shallow(
    <HelpDrawer {...props}>
      <p>content</p>
    </HelpDrawer>
  );
  return { props, wrapper };
}

describe('HelpDrawer', () => {
  it('calls props.onCloseClick on close button click', () => {
    const onCloseClick = jest.fn();
    const { wrapper } = renderHelpDrawer({ onCloseClick });
    const closeBtn = wrapper.find('Button');
    closeBtn.simulate('click');
    expect(onCloseClick).toHaveBeenCalled();
  });

  it('renders a snapshot', () => {
    const tree = renderer
      .create(
        <HelpDrawer {...defaultProps}>
          <p>content</p>
        </HelpDrawer>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
