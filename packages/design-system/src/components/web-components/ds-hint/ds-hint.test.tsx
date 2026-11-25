import { createTestRenderer } from '../__tests__/rendering';
import './ds-hint';

// Renaming the renderButton function to view to match TestingLibrary's naming conventions
const view = createTestRenderer('ds-hint', (attrs = {}) => <ds-hint {...attrs}>Foo</ds-hint>);

describe('Hint', () => {
  it('should render a default hint', () => {
    const { shadowRoot } = view();
    expect(shadowRoot.firstChild).toMatchSnapshot();
  });

  it('should apply an inverse class', () => {
    const { shadowRoot } = view({ inversed: 'true' });
    const hint = shadowRoot.firstChild as HTMLElement;
    expect(hint.className).toContain('ds-c-hint--inverse');
  });

  it('should apply custom classes', () => {
    const { shadowRoot } = view({ 'class-name': 'bar' });
    const hint = shadowRoot.firstChild as HTMLElement;
    expect(hint.className).toContain('bar');
  });

  it('should render a requirement label', () => {
    const { shadowRoot } = view({ 'requirement-label': 'Optional' });
    const hint = shadowRoot.firstChild as HTMLElement;
    expect(hint).toContainHTML('Optional. <slot />');
  });

  it('should generate an id when no root-id is given', () => {
    const { shadowRoot } = view();
    const hint = shadowRoot.firstChild as HTMLElement;
    // A field points its `aria-describedby` at this id, so one has to exist whether or
    // not the consumer supplied one.
    expect(hint.id).toMatch(/^hint--\d+$/);
  });

  it('should use a given root-id', () => {
    const { shadowRoot } = view({ 'root-id': 'custom_id' });
    const hint = shadowRoot.firstChild as HTMLElement;
    expect(hint.id).toBe('custom_id');
  });
});
