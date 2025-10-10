import { createTestRenderer } from '../__tests__/rendering';
import './ds-white-house-logo';

const view = createTestRenderer('ds-white-house-logo', (attrs = {}) => (
  <ds-white-house-logo aria-hidden="false" {...attrs} />
));

describe('ds-white-house-logo', () => {
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
