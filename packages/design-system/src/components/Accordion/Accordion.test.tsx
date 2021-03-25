import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import React from 'react';
import { shallow } from 'enzyme';

const defaultAccordionItemChildren = 'Foo';
const defaultAccordionItemProps = {
  id: 'accordionitem-1',
  heading: 'Accordion item header',
};

function render(customProps = {}, children) {
  const props = { ...customProps };

  if (!children) {
    children = (
      <AccordionItem {...defaultAccordionItemProps}>{defaultAccordionItemChildren}</AccordionItem>
    );
  }

  return {
    props,
    wrapper: shallow(<Accordion {...props}>{children}</Accordion>),
  };
}

describe('Accordion', function () {
  it('renders accordion', () => {
    const children = [];
    const { wrapper } = render(undefined, children);

    expect(wrapper.hasClass('ds-c-accordion')).toBe(true);
  });

  it('renders additional className', () => {
    const children = [];
    const { wrapper } = render(
      {
        className: 'ds-u-test',
      },
      children
    );

    expect(wrapper.hasClass('ds-u-test')).toBe(true);
  });

  it('renders ds-c-accordion--bordered class when a bordered prop is set', () => {
    const children = [];
    const { wrapper } = render(
      {
        bordered: true,
      },
      children
    );

    expect(wrapper.hasClass('ds-c-accordion--bordered')).toBe(true);
  });

  it('selects the second accordion item on down arrow keyDown', () => {
    const children = [
      <AccordionItem heading="First amendment" id="1">
        <p>Hello world!</p>
      </AccordionItem>,
      <AccordionItem heading="Second amendment" id="2">
        <p>Hello world!</p>
      </AccordionItem>,
    ];
    const data = render({}, children);
    const accordionitem = data.wrapper.find('AccordionItem');
    accordionitem.first().simulate('keyDown', { key: 'ArrowDown' });

    expect(accordionitem.at(1).find(':focus')).toBe(true);
  });
});
