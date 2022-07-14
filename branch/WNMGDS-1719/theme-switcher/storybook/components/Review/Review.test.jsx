import React from 'react';
import Review from './Review';
import ReviewLink from './ReviewLink';
import { shallow } from 'enzyme';

const noop = () => {};
const text = 'review text';
const defaultProps = {
  onEditClick: noop,
  heading: 'review heading',
  editHref: 'edit-href',
  editText: 'edit',
};

function render(props, children = text) {
  props = Object.assign({}, defaultProps, props);
  return {
    props,
    wrapper: shallow(<Review {...props}>{children}</Review>),
  };
}

describe('Review', function () {
  it('renders review', () => {
    const { wrapper } = render();
    const body = wrapper.find('.ds-c-review__body');

    expect(wrapper.hasClass('ds-c-review')).toBe(true);
    expect(body.length).toBe(1);
    expect(body.text()).toBe(text);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a heading', () => {
    const { props, wrapper } = render();
    const heading = wrapper.find('.ds-c-review__heading');

    expect(heading.length).toBe(1);
    expect(heading.text()).toBe(props.heading);
  });

  it('renders the edit link', () => {
    const { props, wrapper } = render();
    const reviewLink = wrapper.find(ReviewLink);

    expect(reviewLink.length).toBe(1);
    expect(reviewLink.props().children).toBe(props.editText);
  });

  it('does not render the edit link if editHref is undefined', () => {
    const { wrapper } = render({ editHref: undefined });
    const reviewLink = wrapper.find(ReviewLink);
    expect(reviewLink.length).toBe(0);
  });

  it('it renders the edit content', () => {
    const content = <div id="editContent" />;
    const { wrapper } = render({ editContent: content });
    const editContent = wrapper.find('#editContent');
    const reviewLink = wrapper.find(ReviewLink);
    expect(editContent.length).toBe(1);
    expect(reviewLink.length).toBe(0);
  });

  it('renders HTML children', () => {
    const { wrapper } = render({}, <p className="my-p">{text}</p>);
    const p = wrapper.find('.my-p');

    expect(p.length).toBe(1);
    expect(p.text()).toBe(text);
  });

  it('adds a class from props', () => {
    const { wrapper } = render({ className: 'my-class' });
    expect(wrapper.hasClass('my-class')).toBe(true);
  });
});
