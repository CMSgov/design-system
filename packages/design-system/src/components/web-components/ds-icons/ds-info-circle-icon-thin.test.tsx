import { createTestRenderer } from '../__tests__/rendering';
import './ds-info-circle-icon-thin';

const view = createTestRenderer('ds-info-circle-icon-thin', (attrs = {}) => (
  <ds-info-circle-icon-thin aria-hidden="false" {...attrs} />
));

describe('ds-info-circle-icon-thin', () => {
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
