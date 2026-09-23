import { createTestRenderer } from '../__tests__/rendering';
import './ds-accordion';
import './ds-accordion-item';

const renderAccordion = createTestRenderer('ds-accordion', (attrs = {}) => (
  <ds-accordion {...attrs}>
    <ds-accordion-item heading="First amendment">
      <p>We the People of the United States, in Order to form a more perfect Union...</p>
    </ds-accordion-item>
    <ds-accordion-item heading="Second amendment">
      <p>A well regulated Militia, being necessary to the security of a free State...</p>
    </ds-accordion-item>
  </ds-accordion>
));

describe('ds-accordion', () => {
  it('renders additional className', () => {
    const { shadowRoot } = renderAccordion({ 'class-name': 'ds-u-test' });
    const accordion = shadowRoot.querySelector('.ds-c-accordion');
    expect(accordion.classList).toContain('ds-u-test');
  });

  it('renders with border classes when a bordered prop is set', () => {
    const { customElement, shadowRoot } = renderAccordion({ bordered: 'true' });
    const accordion = shadowRoot.querySelector('.ds-c-accordion');
    expect(accordion).toHaveClass('ds-c-accordion--bordered');
    // The items are slotted, so they stay in the light DOM under the custom element.
    const items = customElement.querySelectorAll('ds-accordion-item');
    expect(items).toHaveLength(2);
    for (const item of items) {
      const contentEl = item.shadowRoot.querySelector('.ds-c-accordion__content');
      expect(contentEl).toHaveClass('ds-c-accordion__content--bordered');
    }
  });

  it('does not render border classes when the bordered attribute is absent', () => {
    const { customElement, shadowRoot } = renderAccordion();
    const accordion = shadowRoot.querySelector('.ds-c-accordion');
    expect(accordion).not.toHaveClass('ds-c-accordion--bordered');
    const items = customElement.querySelectorAll('ds-accordion-item');
    expect(items).toHaveLength(2);
    for (const item of items) {
      const contentEl = item.shadowRoot.querySelector('.ds-c-accordion__content');
      expect(contentEl).not.toHaveClass('ds-c-accordion__content--bordered');
    }
  });

  it('does not render border classes when the bordered prop is false', () => {
    const { customElement, shadowRoot } = renderAccordion({ bordered: 'false' });
    const accordion = shadowRoot.querySelector('.ds-c-accordion');
    expect(accordion).not.toHaveClass('ds-c-accordion--bordered');
    const items = customElement.querySelectorAll('ds-accordion-item');
    expect(items).toHaveLength(2);
    for (const item of items) {
      const contentEl = item.shadowRoot.querySelector('.ds-c-accordion__content');
      expect(contentEl).not.toHaveClass('ds-c-accordion__content--bordered');
    }
  });
});
