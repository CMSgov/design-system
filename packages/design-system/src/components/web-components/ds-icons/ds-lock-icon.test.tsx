import { createTestRenderer } from '../__tests__/rendering';
import './ds-lock-icon';

const view = createTestRenderer('ds-lock-icon', (attrs = {}) => (
  <ds-lock-icon aria-hidden="false" {...attrs} />
));

describe('ds-lock-icon', () => {
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
