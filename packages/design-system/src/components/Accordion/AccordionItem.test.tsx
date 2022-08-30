import React from 'react';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultChildren = '<p>Content for accordion item</p>';
const defaultProps = {
  heading: 'Heading for accordion item',
};

function renderAccordion(customProps = {}) {
  const props = { ...defaultProps, ...customProps };
  const children = <AccordionItem {...props}>{defaultChildren}</AccordionItem>;

  return render(<Accordion>{children}</Accordion>);
}

describe('AccordionItem', function () {
  it('renders an accordion item', () => {
    renderAccordion();

    const wrapper = screen.getAllByRole('generic');

    // Returns Accordion code without RTL wrapping <div>
    const accordion = wrapper[1];
    expect(accordion.classList).toContain('ds-c-accordion');
    expect(accordion).toMatchSnapshot();
  });

  it('renders an accordion heading', () => {
    renderAccordion();

    const headerEls = screen.getAllByRole('heading');
    expect(headerEls).toHaveLength(1);

    const headerEl = headerEls[0];
    expect(headerEl.classList).toContain('ds-c-accordion__heading');
  });

  it('renders accordion content', () => {
    renderAccordion();

    const contentEl = screen.getByText(defaultChildren);
    expect(contentEl.classList).toContain('ds-c-accordion__content');
  });

  it('renders additional className for header button', () => {
    renderAccordion({ buttonClassName: 'ds-u-test' });

    const buttonEl = screen.getByRole('button');
    expect(buttonEl.classList).toContain('ds-u-test');
  });

  it('renders additional className for content', () => {
    renderAccordion({ contentClassName: 'ds-u-test' });

    const contentEl = screen.getByText(defaultChildren);
    expect(contentEl.classList).toContain('ds-u-test');
  });

  it('renders header text', () => {
    renderAccordion({ heading: 'Foo' });

    const headingEl = screen.getByRole('heading');
    expect(headingEl.textContent).toBe('FooOpen');
  });

  it('renders an id automatically', () => {
    renderAccordion();

    const buttonEl = screen.getByRole('button');
    const contentEl = screen.getByText(defaultChildren);

    expect(buttonEl).toHaveAttribute('aria-controls');
    expect(buttonEl).toHaveAttribute('id');
    expect(contentEl).toHaveAttribute('aria-labelledby');
    expect(contentEl).toHaveAttribute('id');
  });

  it('renders a user set id ', () => {
    renderAccordion({ id: 'test-id' });

    const buttonEl = screen.getByRole('button');
    const contentEl = screen.getByText(defaultChildren);

    expect(buttonEl).toHaveAttribute('aria-controls', 'test-id');
    expect(buttonEl).toHaveAttribute('id', 'test-id-button');
    expect(contentEl).toHaveAttribute('aria-labelledby', 'test-id-button');
    expect(contentEl).toHaveAttribute('id', 'test-id');
  });

  it('renders an expanded or open accordion item', () => {
    renderAccordion({ defaultOpen: true });

    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders an collapsed or closed accordion item', () => {
    renderAccordion({ defaultOpen: false });

    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('Controlled accordion item', function () {
  it('renders button and should call onClick function when clicked', () => {
    const onClick = jest.fn();
    renderAccordion({ heading: 'Foo', onChange: onClick });

    const buttonEl = screen.getByRole('button');
    userEvent.click(buttonEl);
    expect(onClick).toHaveBeenCalled();
  });
});
