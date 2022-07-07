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
    expect(wrapper).toMatchSnapshot();
  });

  it('renders an accordion heading', () => {
    const { wrapper } = render();
    const headerWrapper = wrapper.find('h2');

    expect(headerWrapper).toHaveLength(1);
    expect(headerWrapper.hasClass('ds-c-accordion__heading')).toBe(true);
  });

  it('renders an accordion content', () => {
    const { wrapper } = render();
    const contentWrapper = wrapper.find('div').at(1);

    expect(contentWrapper.hasClass('ds-c-accordion__content')).toBe(true);
    expect(contentWrapper.text()).toBe(defaultChildren);
  });

  it('renders additional className for header button', () => {
    const { wrapper } = render({
      buttonClassName: 'ds-u-test',
    });
    const headerWrapper = wrapper.find('button');

    expect(headerWrapper.hasClass('ds-u-test')).toBe(true);
  });

  it('renders additional className for content', () => {
    const { wrapper } = render({
      contentClassName: 'ds-u-test',
    });
    const contentWrapper = wrapper.find('div').at(1);
    expect(contentWrapper.hasClass('ds-u-test')).toBe(true);
  });

  it('renders header text', () => {
    const { wrapper } = render({ heading: 'Foo' });
    const accordionButton = wrapper.find('button');

    expect(accordionButton.text()).toBe('FooOpen');
  });

  it('renders an id automatically', () => {
    const { wrapper } = render();
    const accordionButton = wrapper.find('button');
    const contentWrapper = wrapper.find('div').at(1);

    expect(accordionButton.props()).toHaveProperty('aria-controls');
    expect(accordionButton.props()).toHaveProperty('id');
    expect(contentWrapper.props()).toHaveProperty('aria-labelledby');
    expect(contentWrapper.props()).toHaveProperty('id');
  });

  it('renders a user set id ', () => {
    const { wrapper } = render({
      id: 'test-id',
    });
    const accordionButton = wrapper.find('button');
    const contentWrapper = wrapper.find('div').at(1);

    expect(accordionButton.props()).toHaveProperty('aria-controls', 'test-id');
    expect(accordionButton.props()).toHaveProperty('id', 'test-id-button');

    expect(contentWrapper.props()).toHaveProperty('id', 'test-id');
    expect(contentWrapper.props()).toHaveProperty('aria-labelledby', 'test-id-button');
  });

  it('renders an expanded or open accordion item', () => {
    const { wrapper } = render({ defaultOpen: true });
    const accordionButton = wrapper.find('button');

    expect(accordionButton.props()).toHaveProperty('aria-expanded', true);
  });

  it('renders an collapsed or closed accordion item', () => {
    const { wrapper } = render({ expanded: false });
    const accordionButton = wrapper.find('button');

    expect(accordionButton.props()).toHaveProperty('aria-expanded', false);
  });
});

describe('Controlled accordion item', function () {
  it('renders button and should call onClick function when clicked', () => {
    const onClick = jest.fn();

    const { wrapper } = render({ heading: 'Foo', onChange: onClick });

    const button = wrapper.find('button');
    expect(button.length).toEqual(1);

    button.simulate('click');
    wrapper.update();
    expect(onClick).toHaveBeenCalled();
  });
});
