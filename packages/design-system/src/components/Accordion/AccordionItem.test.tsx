import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import React from 'react';
import { mount } from 'enzyme';

const defaultChildren = '<p>Content for accordion item</p>';
const defaultProps = {
  heading: 'Heading for accordion item',
};

function render(customProps = {}) {
  const props = { ...defaultProps, ...customProps };
  const children = <AccordionItem {...props}>{defaultChildren}</AccordionItem>;

  return {
    props: props,
    wrapper: mount(<Accordion>{children}</Accordion>),
  };
}

describe('AccordionItem', function () {
  it('renders an accordion item', () => {
    const { wrapper } = render();
    const accordionItem = wrapper.find('AccordionItem');

    expect(accordionItem).toHaveLength(1);
  });
  it('renders an accordion heading', () => {
    const { wrapper } = render();
    const headerWrapper = wrapper.find('h2');

    expect(headerWrapper).toHaveLength(1);
    expect(headerWrapper.hasClass('ds-c-accordion__heading')).toBe(true);
  });

  it('renders an accordion content', () => {
    const { wrapper } = render();
    const contentWrapper = wrapper.find('div');
    expect(contentWrapper.hasClass('ds-c-accordion__content')).toBe(true);
  });

  it('renders additional className for header', () => {
    const { wrapper } = render({
      headingClassName: 'ds-u-test',
    });
    const header_class = wrapper.render().find('div.ds-c-accordion__header');
    expect(header_class.hasClass('ds-c-accordion__header ds-u-test')).toBe(true);
  });

  it('renders additional className for content', () => {
    const { wrapper } = render({
      contentClassName: 'ds-u-test',
    });

    const content_class = wrapper.render().find('div.ds-c-accordion__content');
    expect(content_class.hasClass('ds-c-accordion__content ds-u-test')).toBe(true);
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
