import AccordionItem from './AccordionItem';
import React from 'react';
import { shallow } from 'enzyme';

const defaultChildren = '<p> Content for accotdion item</p>';

function render(customProps = {}) {
  const props = { ...customProps };
  return {
    props: props,
    wrapper: shallow(<AccordionItem heading {...props}></AccordionItem>),
  };
}

describe('AccordionItem', function () {
  it('renders an accordion item', () => {
    const { wrapper } = render();
    wrapper.render().find('.ds-c-accordion__content');
    wrapper.render().find('.ds-c-accordion__header');
    wrapper.render().find('.ds-text');
  });

  it('renders additional className for header', () => {
    const { wrapper } = render({
      headingClassName: 'ds-u-test',
    });
    wrapper.render().find('.ds-c-accordion__content');
    wrapper.render().find('.ds-c-accordion__header');
    expect(wrapper.hasClass('ds-u-test')).toBe(true);
  });

  it('renders additional className for content', () => {
    const { wrapper } = render({
      contentClassName: 'ds-u-test',
    });

    const content_class = wrapper.render().find('div.ds-c-accordion__content');
    expect(content_class.hasClass('ds-u-test')).toBe(true);
  });

  it('renders header text', () => {
    const { props, wrapper } = render({ heading: 'Foo' });
    const heading_text = wrapper.render().find('.ds-c-accordion__button');

    expect(heading_text.text()).toBe('Foo');
  });

  it('renders a user set id ', () => {});
  it('renders an id automatically', () => {});
  it('renders an expanded or open accordion item', () => {});
  it('renders an collapsed or closed accordion item', () => {});

  it('renders HTML in the content', () => {});
});
