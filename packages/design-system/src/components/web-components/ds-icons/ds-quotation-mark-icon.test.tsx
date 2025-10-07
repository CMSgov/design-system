import { createTestRenderer } from '../__tests__/rendering';
import './ds-quotation-mark-icon';

const view = createTestRenderer('ds-quotation-mark-icon', (attrs = {}) => (
  <ds-quotation-mark-icon aria-hidden="false" {...attrs} />
));

describe('ds-quotation-mark-icon', () => {
  it('renders as an SVG', () => {
    const { customElement } = view();
    expect(customElement.firstElementChild.tagName).toBe('svg');
  });

  it('passes through a custom title', () => {
    const customTitle = 'test title';
    const { customElement } = view({ title: customTitle });
    const titleEl = customElement.firstElementChild.querySelector('title');

    expect(titleEl.textContent).toBe(customTitle);
  });
});
