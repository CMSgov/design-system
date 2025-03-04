import { createTestRenderer } from '../__tests__/rendering';
import { getByRole } from '@testing-library/react';
import './ds-accordion-item';

const defaultAttrs = {
  heading: 'Heading for accordion item',
  'content-id': 'static-id',
};

const renderAccordionItem = createTestRenderer('ds-accordion-item', (attrs = {}) => (
  <ds-accordion-item {...defaultAttrs} {...attrs}>
    Some content
  </ds-accordion-item>
));

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

  it('fires a custom ds-change event', async () => {
    const { customElement, shadowRoot, user } = renderAccordionItem();

    const mockHandler = jest.fn();
    customElement.addEventListener('ds-change', mockHandler);

    const button = getByRole(shadowRoot as any as HTMLElement, 'button');
    await user.click(button);

    expect(mockHandler).toHaveBeenCalledTimes(1);
    customElement.removeEventListener('ds-change', mockHandler);
  });
});
