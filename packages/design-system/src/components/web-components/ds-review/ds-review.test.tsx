import { render, screen } from '@testing-library/preact';
import './ds-review';

const defaultAttrs = {
  heading: 'review heading',
  'edit-href': 'edit-href',
  'edit-text': 'edit',
};

const children = 'This is an example of a default Review component.';

function renderReview(attrs = {}, children = null, slotContent = null) {
  return render(
    <ds-review {...(attrs as any)}>
      {children}
      {slotContent && <div slot="edit-content">{slotContent}</div>}
    </ds-review>
  );
}

describe('Review', () => {
  it('renders review', () => {
    renderReview(defaultAttrs, children);

    const wrappers = screen.getAllByRole('generic');
    const wrapper = wrappers[1];

    expect(wrapper.classList).toContain('ds-c-review');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a heading', () => {
    renderReview(defaultAttrs, children);

    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(1);

    const heading = headings[0];
    expect(heading.textContent).toBe(defaultAttrs.heading);
  });

  it('renders the edit link', () => {
    renderReview(defaultAttrs, children);

    const links = screen.getAllByRole('link');
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

    renderReview(defaultAttrs, children, slotContent);

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
    renderReview({ 'class-name': 'my-class' });

    const wrappers = screen.getAllByRole('generic');
    const wrapper = wrappers[1];

    expect(wrapper.classList).toContain('my-class');
  });
});
