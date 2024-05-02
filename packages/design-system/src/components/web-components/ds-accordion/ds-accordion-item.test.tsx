import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './ds-accordion-item';

const defaultAttrs = {
  heading: 'Heading for accordion item',
  'content-id': 'static-id',
};

function renderAccordionItem(attrs = {}) {
  return render(
    <ds-accordion-item {...defaultAttrs} {...attrs}>
      Some content
    </ds-accordion-item>
  );
}

describe('ds-accordion-item', () => {
  it('renders a accordion item', () => {
    const { asFragment } = renderAccordionItem();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders an open accordion item', () => {
    renderAccordionItem({ 'default-open': 'true' });
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies additional classes to the button', () => {
    renderAccordionItem({ 'button-class-name': 'foobar' });
    const button = screen.getByRole('button');
    expect(button).toHaveClass('foobar');
  });

  it('applies additional classes to the content', () => {
    const { container } = renderAccordionItem({ 'content-class-name': 'foobar' });
    const contentEl = container.querySelector('.ds-c-accordion__content');
    expect(contentEl).toHaveClass('foobar');
  });

  it('fires a custom ds-change event', () => {
    renderAccordionItem();

    const accordionItemRoot = document.querySelector('ds-accordion-item');
    const mockHandler = jest.fn();
    accordionItemRoot.addEventListener('ds-change', mockHandler);

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(mockHandler).toHaveBeenCalledTimes(1);
    accordionItemRoot.removeEventListener('ds-change', mockHandler);
  });
});
