import { createTestRenderer } from '../__tests__/rendering';
import './ds-arrow-icon';

const view = createTestRenderer('ds-arrow-icon', (attrs = {}) => (
  <ds-arrow-icon aria-hidden="false" {...attrs} />
));

describe('ds-arrow-icon', () => {
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

  it('passes through the direction attribute', () => {
    const direction = 'down';
    const { customElement } = view({ direction: direction });

    expect(customElement.firstElementChild).toHaveClass(`ds-c-icon--arrow-${direction}`);
  });
});
