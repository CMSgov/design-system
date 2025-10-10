import { createTestRenderer } from '../__tests__/rendering';
import './ds-rss-icon';

const view = createTestRenderer('ds-rss-icon', (attrs = {}) => (
  <ds-rss-icon aria-hidden="false" {...attrs} />
));

describe('ds-rss-icon', () => {
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
