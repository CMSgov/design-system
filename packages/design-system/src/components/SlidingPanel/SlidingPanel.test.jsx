import SlidingPanel from './SlidingPanel.jsx';
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
  heading: 'Sliding panel title',
};

function renderSlidingPanel(props) {
  props = Object.assign({}, defaultProps, props);
  const wrapper = shallow(
    <SlidingPanel {...props}>
      <p>content</p>
    </SlidingPanel>
  );
  return { props, wrapper };
}

describe('SlidingPanel', () => {
  it('calls props.onCloseClick on close button click', () => {
    const onCloseClick = jest.fn();
    const { wrapper } = renderSlidingPanel({ onCloseClick });
    const closeBtn = wrapper.find('Button');
    closeBtn.simulate('click');
    expect(onCloseClick).toHaveBeenCalled();
  });

  it('renders a snapshot', () => {
    const tree = renderer
      .create(
        <SlidingPanel {...defaultProps}>
          <p>content</p>
        </SlidingPanel>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
