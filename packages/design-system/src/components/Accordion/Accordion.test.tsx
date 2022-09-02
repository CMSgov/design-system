import React from 'react';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const children = [
  <AccordionItem key="1" heading="First amendment" id="1">
    <p>Hello world!</p>
  </AccordionItem>,
  <AccordionItem key="2" heading="Second amendment" id="2">
    <p>Hello world!</p>
  </AccordionItem>,
];

function renderAccordion(customProps = {}) {
  const props = { ...customProps };

  return render(<Accordion {...props}>{children}</Accordion>);
}

describe('Accordion', function () {
  it('renders accordion', () => {
    const { container, asFragment } = renderAccordion();
    const accordion = container.firstChild as HTMLElement; // eslint-disable-line testing-library/no-node-access

    expect(accordion.classList).toContain('ds-c-accordion');
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders additional className', () => {
    const { container } = renderAccordion({ className: 'ds-u-test' });
    const accordion = container.firstChild as HTMLElement; // eslint-disable-line testing-library/no-node-access

    expect(accordion.classList).toContain('ds-u-test');
  });

  it('renders ds-c-accordion--bordered class when a bordered prop is set', () => {
    const { container } = renderAccordion({ bordered: true });
    const accordion = container.firstChild as HTMLElement; // eslint-disable-line testing-library/no-node-access

    expect(accordion.classList).toContain('ds-c-accordion--bordered');
  });
});

describe('Accordion focus', function () {
  it('selects the second accordion item on down arrow keyDown', () => {
    renderAccordion();

    const buttonEls = screen.getAllByRole('button');
    const firstButton = buttonEls[0];
    const lastButton = buttonEls[1];

    firstButton.focus();
    expect(firstButton).toHaveFocus();

    userEvent.keyboard('[ArrowDown]');
    expect(lastButton).toHaveFocus();
  });

  it('cycles back to the first accordion item on down arrow keyDown when you are on the last accordion item', () => {
    renderAccordion();

    const buttonEls = screen.getAllByRole('button');
    const firstButton = buttonEls[0];
    const lastButton = buttonEls[1];

    lastButton.focus();
    expect(lastButton).toHaveFocus();

    userEvent.keyboard('[ArrowDown]');
    expect(firstButton).toHaveFocus();
  });

  it('selects the first accordion item on up arrow keyDown', () => {
    renderAccordion();

    const buttonEls = screen.getAllByRole('button');
    const firstButton = buttonEls[0];
    const lastButton = buttonEls[1];

    lastButton.focus();
    expect(lastButton).toHaveFocus();

    userEvent.keyboard('[ArrowUp]');
    expect(firstButton).toHaveFocus();
  });
});
