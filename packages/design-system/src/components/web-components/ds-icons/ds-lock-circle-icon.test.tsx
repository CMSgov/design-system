import { createTestRenderer } from '../__tests__/rendering';
import './ds-lock-circle-icon';

const view = createTestRenderer('ds-lock-circle-icon', (attrs = {}) => (
  <ds-lock-circle-icon aria-hidden="false" {...attrs} />
));

describe('ds-lock-circle-icon', () => {
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
