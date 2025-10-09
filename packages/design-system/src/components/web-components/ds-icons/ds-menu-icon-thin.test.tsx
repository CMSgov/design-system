import { createTestRenderer } from '../__tests__/rendering';
import './ds-menu-icon-thin';

const view = createTestRenderer('ds-menu-icon-thin', (attrs = {}) => (
  <ds-menu-icon-thin aria-hidden="false" {...attrs} />
));

describe('ds-menu-icon-thin', () => {
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
