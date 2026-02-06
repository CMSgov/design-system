import { createTestRenderer } from '../__tests__/rendering';
import './ds-alert-triangle-icon';

const view = createTestRenderer('ds-alert-triangle-icon', (attrs = {}) => (
  <ds-alert-triangle-icon aria-hidden="false" {...attrs} />
));

describe('ds-alert-triangle-icon', () => {
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
