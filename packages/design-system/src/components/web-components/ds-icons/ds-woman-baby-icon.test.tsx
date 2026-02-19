import { createTestRenderer } from '../__tests__/rendering';
import './ds-woman-baby-icon';

const view = createTestRenderer('ds-woman-baby-icon', (attrs = {}) => (
  <ds-woman-baby-icon aria-hidden="false" {...attrs} />
));

describe('ds-woman-baby-icon', () => {
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
