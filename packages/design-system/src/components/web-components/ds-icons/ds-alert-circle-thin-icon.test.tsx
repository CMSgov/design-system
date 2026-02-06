import { createTestRenderer } from '../__tests__/rendering';
import './ds-alert-circle-thin-icon';

const view = createTestRenderer('ds-alert-circle-thin-icon', (attrs = {}) => (
  <ds-alert-circle-thin-icon aria-hidden="false" {...attrs} />
));

describe('ds-alert-circle-thin-icon', () => {
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
