import React from 'react';
import ReviewLink from './ReviewLink';
import { shallow } from 'enzyme';

const noop = () => {};
const text = 'link text';
const defaultProps = {
  onClick: noop,
  href: 'my-href'
};

function render(props, children = text) {
  props = Object.assign({}, defaultProps, props);
  return {
    props,
    wrapper: shallow(<ReviewLink {...props}>{children}</ReviewLink>)
  };
}

describe('ReviewLink', function() {
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

    link.simulate('click', { preventDefault: () => {} });
    expect(onClick).toHaveBeenCalledWith('my-href');
  });

  // it('renders a heading', () => {
  //   const { props, wrapper } = render();
  //   const $heading = wrapper.render().find('.ds-c-review__heading');
  //
  //   expect($heading.length).toBe(1);
  //   expect($heading.text()).toBe(props.heading);
  // });
  //
  // it('renders HTML children', () => {
  //   const { wrapper } = render({}, <p className="my-p">{text}</p>);
  //   const $p = wrapper.render().find('.my-p');
  //
  //   expect($p.length).toBe(1);
  //   expect($p.text()).toBe(text);
  // });
  //
  // it('vertically centers if props.alignTop is false', () => {
  //   const { wrapper } = render({ alignTop: false });
  //   expect(wrapper.hasClass('ds-u-align-items--center')).toBe(true);
  // });
});
