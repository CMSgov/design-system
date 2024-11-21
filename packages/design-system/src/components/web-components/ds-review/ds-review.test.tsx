import { createGenericTestRenderer } from '../testingUtils';
import { getAllByRole, screen } from '@testing-library/preact';
import './ds-review';

const defaultAttrs = {
  heading: 'review heading',
  'edit-href': 'edit-href',
  'edit-text': 'edit',
};

const defaultChildren = 'This is an example of a default Review component.';

const renderReview = createGenericTestRenderer(
  'ds-review',
  (attrs = {}, children: React.ReactNode = null, slotContent: React.ReactElement = null) => (
    <ds-review {...(attrs as any)}>
      {children}
      {slotContent && <div slot="edit-content">{slotContent}</div>}
    </ds-review>
  )
);

describe('Review', () => {
  it('renders review', () => {
    const { shadowRoot } = renderReview(defaultAttrs, defaultChildren);

    expect(shadowRoot.firstElementChild.classList).toContain('ds-c-review');
    expect(shadowRoot.firstElementChild).toMatchSnapshot();
  });

  it('renders a heading', () => {
    const { shadowRoot } = renderReview(defaultAttrs, defaultChildren);

    const headings = getAllByRole(shadowRoot as any as HTMLElement, 'heading');
    expect(headings.length).toBe(1);

    const heading = headings[0];
    expect(heading.textContent).toBe(defaultAttrs.heading);
  });

  it('renders the edit link', () => {
    const { shadowRoot } = renderReview(defaultAttrs, defaultChildren);

    const links = getAllByRole(shadowRoot as any as HTMLElement, 'link');
    expect(links.length).toBe(1);

    const link = links[0];
    expect(link.textContent).toBe(defaultAttrs['edit-text']);
  });

  it('renders custom content in the edit-content slot', () => {
    const slotContent = (
      <div>
        <a href="#">Edit</a>
        <span> | </span>
        <a href="#">Remove</a>
      </div>
    );

    renderReview(defaultAttrs, defaultChildren, slotContent);

    const editLink = screen.getByText('Edit');
    const removeLink = screen.getByText('Remove');

    expect(editLink).toBeInTheDocument();
    expect(removeLink).toBeInTheDocument();
  });

  it('renders HTML children', () => {
    const text = 'review text';
    renderReview({}, <p className="my-p">{text}</p>);
    const els = screen.getAllByText(text);
    expect(els.length).toBe(1);

    const el = els[0];
    expect(el.classList).toContain('my-p');
  });

  it('adds a class from props', () => {
    const { shadowRoot } = renderReview({ 'class-name': 'my-class' });
    expect(shadowRoot.firstElementChild.classList).toContain('my-class');
  });
});
