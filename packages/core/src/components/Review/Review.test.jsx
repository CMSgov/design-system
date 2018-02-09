import React from 'react';
import Review from './Review';
import { shallow } from 'enzyme';

const noop = () => {};
const text = 'review text';
const defaultProps = {
  onClick: noop,
  heading: 'review heading',
  href: 'my-href',
  linkText: 'edit'
};

function render(props, children = text) {
  props = Object.assign({}, defaultProps, props);
  return {
    props,
    wrapper: shallow(<Review {...props}>{children}</Review>)
  };
}

describe('Review', function() {
  it('renders review', () => {
    const { wrapper } = render();
    const $body = wrapper.render().find('.ds-c-review__body');

    expect(wrapper.hasClass('ds-c-review')).toBe(true);
    expect($body.length).toBe(1);
    expect($body.text()).toBe(text);
  });

  it('renders a heading', () => {
    const { props, wrapper } = render();
    const $heading = wrapper.render().find('.ds-c-review__heading');

    expect($heading.length).toBe(1);
    expect($heading.text()).toBe(props.heading);
  });

  it('renders HTML children', () => {
    const { wrapper } = render({}, <p className="my-p">{text}</p>);
    const $p = wrapper.render().find('.my-p');

    expect($p.length).toBe(1);
    expect($p.text()).toBe(text);
  });

  it('vertically centers if props.alignTop is false', () => {
    const { wrapper } = render({ alignTop: false });
    expect(wrapper.hasClass('ds-u-align-items--center')).toBe(true);
  });
});
