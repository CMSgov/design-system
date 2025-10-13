import { createTestRenderer } from '../__tests__/rendering';
import './ds-alert-icon';

const view = createTestRenderer('ds-alert-icon', (attrs = {}) => (
  <ds-alert-icon aria-hidden="false" {...attrs} />
));

describe('ds-alert-icon', () => {
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
