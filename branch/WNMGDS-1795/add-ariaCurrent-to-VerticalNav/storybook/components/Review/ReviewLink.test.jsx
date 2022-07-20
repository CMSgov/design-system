import React from 'react';
import ReviewLink from './ReviewLink';
import { shallow } from 'enzyme';

const noop = () => {};
const text = 'link text';
const defaultProps = {
  onClick: noop,
  href: 'my-href',
};

function render(props, children = text) {
  props = Object.assign({}, defaultProps, props);
  return {
    props,
    wrapper: shallow(<ReviewLink {...props}>{children}</ReviewLink>),
  };
}

describe('ReviewLink', function () {
  it('renders link', () => {
    const { wrapper } = render();
    const link = wrapper.render().find('a');

    expect(link.length).toBe(1);
    expect(link.text()).toBe(text);
  });

  it('props.onClick is called with correct parameters', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <ReviewLink href="my-href" onClick={onClick}>
        link text
      </ReviewLink>
    );

    const link = wrapper.find('a');
    expect(link.length).toEqual(1);

    link.simulate('click', { event: 'mock' });
    expect(onClick).toHaveBeenCalledWith({ event: 'mock' }, 'my-href');
  });
});
