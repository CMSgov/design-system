import { createTestRenderer } from '../__tests__/rendering';
import './ds-h-h-s-logo';

const view = createTestRenderer('ds-h-h-s-logo', (attrs = {}) => (
  <ds-h-h-s-logo aria-hidden="false" {...attrs} />
));

describe('ds-h-h-s-logo', () => {
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
