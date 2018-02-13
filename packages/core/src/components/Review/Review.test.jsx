import React from 'react';
import Review from './Review';
import { shallow } from 'enzyme';

const noop = () => {};
const text = 'review text';
const defaultProps = {
  onEditClick: noop,
  heading: 'review heading',
  editHref: 'edit-href',
  editText: 'edit'
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
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a heading', () => {
    const { props, wrapper } = render();
    const $heading = wrapper.render().find('.ds-c-review__heading');

    expect($heading.length).toBe(1);
    expect($heading.text()).toBe(props.heading);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders HTML children', () => {
    const { wrapper } = render({}, <p className="my-p">{text}</p>);
    const $p = wrapper.render().find('.my-p');

    expect($p.length).toBe(1);
    expect($p.text()).toBe(text);
    expect(wrapper).toMatchSnapshot();
  });

  it('adds a class from props', () => {
    const { wrapper } = render({ className: 'my-class' });
    expect(wrapper.hasClass('my-class')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
