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
    const { shadowRoot } = renderAccordion({ bordered: 'true' });
    const accordion = shadowRoot.querySelector('.ds-c-accordion');
    expect(accordion).toHaveClass('ds-c-accordion--bordered');
    const items = accordion.querySelectorAll('ds-accordion-item');
    for (const item of items) {
      const shadowRoot = item.shadowRoot;
      const contentEl = shadowRoot?.querySelector('.ds-c-accordion__content');
      expect(contentEl).toHaveClass('ds-c-accordion__content--bordered');
    }
  });

  it('does not render border classes when border prop is not set', () => {
    const { shadowRoot } = renderAccordion({ bordered: 'false' });
    const accordion = shadowRoot.querySelector('.ds-c-accordion');
    expect(accordion).not.toHaveClass('ds-c-accordion--bordered');
    const items = accordion.querySelectorAll('ds-accordion-item');
    for (const item of items) {
      const shadowRoot = item.shadowRoot;
      const contentEl = shadowRoot?.querySelector('.ds-c-accordion__content');
      expect(contentEl).not.toHaveClass('ds-c-accordion__content--bordered');
    }
  });
});
