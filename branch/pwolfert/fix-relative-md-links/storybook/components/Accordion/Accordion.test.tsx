import { mount, shallow } from 'enzyme';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import React from 'react';

const defaultAccordionItemChildren = 'Foo';
const defaultAccordionItemProps = {
  id: 'accordionitem-1',
  heading: 'Accordion item header',
};

const children = [
  <AccordionItem key="1" heading="First amendment" id="1">
    <p>Hello world!</p>
  </AccordionItem>,
  <AccordionItem key="2" heading="Second amendment" id="2">
    <p>Hello world!</p>
  </AccordionItem>,
];

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
    const { wrapper } = render(undefined, children);

    expect(wrapper.hasClass('ds-c-accordion')).toBe(true);
  });

  it('renders additional className', () => {
    const { wrapper } = render(
      {
        className: 'ds-u-test',
      },
      children
    );

    expect(wrapper.hasClass('ds-u-test')).toBe(true);
  });

  it('renders ds-c-accordion--bordered class when a bordered prop is set', () => {
    const { wrapper } = render(
      {
        bordered: true,
      },
      children
    );

    expect(wrapper.hasClass('ds-c-accordion--bordered')).toBe(true);
  });
});

describe('Accordion focus', function () {
  const wrapper = mount(<Accordion>{children}</Accordion>, { attachTo: document.body });
  const accordionitemButton0 = wrapper.find('button.ds-c-accordion__button').at(0);
  const accordionitemButton1 = wrapper.find('button.ds-c-accordion__button').at(1);

  it('selects the second accordion item on down arrow keyDown', () => {
    accordionitemButton0.simulate('focus').simulate('keyDown', { key: 'ArrowDown' });
    const focusedElement = document.activeElement;
    expect(focusedElement.id).toEqual(accordionitemButton1.props().id);
  });

  it('cycles back to the first accordion item on down arrow keyDown when you are on the last accordion item', () => {
    accordionitemButton1.simulate('focus').simulate('keyDown', { key: 'ArrowDown' });
    const focusedElement = document.activeElement;
    expect(focusedElement.id).toEqual(accordionitemButton0.props().id);
  });

  it('selects the first accordion item on up arrow keyDown', () => {
    accordionitemButton1.simulate('focus').simulate('keyUp', { key: 'ArrowUp' });
    const focusedElement = document.activeElement;
    expect(focusedElement.id).toEqual(accordionitemButton0.props().id);
  });
});
