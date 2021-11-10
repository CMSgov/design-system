import Drawer from './Drawer.jsx';
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
  heading: 'Drawer title',
};

function renderDrawer(props) {
  props = Object.assign({}, defaultProps, props);
  const wrapper = shallow(
    <Drawer {...props}>
      <p>content</p>
    </Drawer>
  );
  return { props, wrapper };
}

describe('Drawer', () => {
  it('calls props.onCloseClick on close button click', () => {
    const onCloseClick = jest.fn();
    const { wrapper } = renderDrawer({ onCloseClick });
    const closeBtn = wrapper.find('Button');
    closeBtn.simulate('click');
    expect(onCloseClick).toHaveBeenCalled();
  });

  it('renders a snapshot', () => {
    const tree = renderer
      .create(
        <Drawer {...defaultProps}>
          <p>content</p>
        </Drawer>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
