import { render, getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './ds-accordion-item';

const defaultAttrs = {
  heading: 'Heading for accordion item',
  'content-id': 'static-id',
};

function renderAccordionItem(attrs = {}) {
  const renderResult = render(
    <ds-accordion-item {...defaultAttrs} {...attrs}>
      Some content
    </ds-accordion-item>
  );
  const root = renderResult.container.querySelector('ds-accordion-item');
  return {
    ...renderResult,
    root,
    shadowRoot: root.shadowRoot,
  };
}

describe('ds-accordion-item', () => {
  it('renders an open accordion item', () => {
    const { shadowRoot } = renderAccordionItem({ 'default-open': 'true' });
    const button = getByRole(shadowRoot as any as HTMLElement, 'button');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies additional classes to the button', () => {
    const { shadowRoot } = renderAccordionItem({ 'button-class-name': 'foobar' });
    const button = getByRole(shadowRoot as any as HTMLElement, 'button');
    expect(button).toHaveClass('foobar');
  });

  it('applies additional classes to the content', () => {
    const { shadowRoot } = renderAccordionItem({ 'content-class-name': 'foobar' });
    const contentEl = shadowRoot.querySelector('.ds-c-accordion__content');
    expect(contentEl).toHaveClass('foobar');
  });

  it('fires a custom ds-change event', () => {
    const { root, shadowRoot } = renderAccordionItem();

    const mockHandler = jest.fn();
    root.addEventListener('ds-change', mockHandler);

    const button = getByRole(shadowRoot as any as HTMLElement, 'button');
    userEvent.click(button);

    expect(mockHandler).toHaveBeenCalledTimes(1);
    root.removeEventListener('ds-change', mockHandler);
  });
});
