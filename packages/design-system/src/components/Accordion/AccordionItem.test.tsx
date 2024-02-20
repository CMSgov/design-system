import React from 'react';
import AccordionItem from './AccordionItem';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultChildren = '<p>Content for accordion item</p>';
const defaultProps = {
  heading: 'Heading for accordion item',
  id: 'static-id',
};

function renderAccordionItem(customProps = {}) {
  const props = { ...defaultProps, ...customProps };

  return render(<AccordionItem {...props}>{defaultChildren}</AccordionItem>);
}

describe('AccordionItem', function () {
  it('renders an accordion item', () => {
    const { asFragment } = renderAccordionItem();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders an accordion heading', () => {
    renderAccordionItem();

    const headerEls = screen.getAllByRole('heading');
    expect(headerEls).toHaveLength(1);

    const headerEl = headerEls[0];
    expect(headerEl.classList).toContain('ds-c-accordion__heading');
  });

  it('renders accordion content', () => {
    renderAccordionItem();

    const contentEl = screen.getByText(defaultChildren);
    expect(contentEl.classList).toContain('ds-c-accordion__content');
  });

  it('renders additional className for header button', () => {
    renderAccordionItem({ buttonClassName: 'ds-u-test' });

    const buttonEl = screen.getByRole('button');
    expect(buttonEl.classList).toContain('ds-u-test');
  });

  it('renders additional className for content', () => {
    renderAccordionItem({ contentClassName: 'ds-u-test' });

    const contentEl = screen.getByText(defaultChildren);
    expect(contentEl.classList).toContain('ds-u-test');
  });

  it('renders header text', () => {
    renderAccordionItem({ heading: 'Foo' });

    const headingEl = screen.getByRole('heading');
    expect(headingEl.textContent).toBe('FooOpen');
  });

  it('renders an id automatically', () => {
    renderAccordionItem({ heading: defaultProps.heading });

    const buttonEl = screen.getByRole('button');
    const contentEl = screen.getByText(defaultChildren);

    expect(buttonEl).toHaveAttribute('aria-controls', contentEl.id);
    expect(buttonEl).toHaveAttribute('id');
    expect(contentEl).toHaveAttribute('aria-labelledby', buttonEl.id);
    expect(contentEl).toHaveAttribute('id');
  });

  it('renders a user set id ', () => {
    renderAccordionItem({ id: 'test-id' });

    const buttonEl = screen.getByRole('button');
    const contentEl = screen.getByText(defaultChildren);

    expect(buttonEl).toHaveAttribute('aria-controls', 'test-id');
    expect(buttonEl).toHaveAttribute('id', 'test-id__button');
    expect(contentEl).toHaveAttribute('aria-labelledby', 'test-id__button');
    expect(contentEl).toHaveAttribute('id', 'test-id');
  });

  it('renders an expanded or open accordion item', () => {
    renderAccordionItem({ defaultOpen: true });

    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders an collapsed or closed accordion item', () => {
    renderAccordionItem({ defaultOpen: false });

    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('Controlled accordion item', function () {
  it('renders button and should call onClick function when clicked', () => {
    const onClick = jest.fn();
    renderAccordionItem({ heading: 'Foo', onChange: onClick });

    const buttonEl = screen.getByRole('button');
    userEvent.click(buttonEl);
    expect(onClick).toHaveBeenCalled();
  });
  it('uses isControlledOpen as source of truth', () => {
    const onChange = jest.fn();
    const baseProps = { ...defaultProps, children: defaultChildren, onChange };
    const { rerender } = renderAccordionItem({ ...baseProps, isControlledOpen: false });

    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toHaveAttribute('aria-expanded', 'false');

    rerender(
      <AccordionItem {...baseProps} isControlledOpen={true}>
        {defaultChildren}
      </AccordionItem>
    );
    expect(buttonEl).toHaveAttribute('aria-expanded', 'true');

    rerender(
      <AccordionItem {...baseProps} isControlledOpen={false}>
        {defaultChildren}
      </AccordionItem>
    );
    expect(buttonEl).toHaveAttribute('aria-expanded', 'false');

    // Even clicking the button shouldn't expand it if it's controlled
    userEvent.click(buttonEl);
    expect(buttonEl).toHaveAttribute('aria-expanded', 'false');
  });
});
