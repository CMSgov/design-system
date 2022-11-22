import React from 'react';
import Review from './Review';
import { render, screen } from '@testing-library/react';

const text = 'review text';
const defaultProps = {
  onEditClick: jest.fn(),
  heading: 'review heading',
  editHref: 'edit-href',
  editText: 'edit',
};

function renderReview(customProps?, children: React.ReactNode = text) {
  const props = { ...defaultProps, ...customProps };
  return render(<Review {...props}>{children}</Review>);
}

describe('Review', function () {
  it('renders review', () => {
    renderReview();

    const wrappers = screen.getAllByRole('generic');
    const wrapper = wrappers[1];

    expect(wrapper.classList).toContain('ds-c-review');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a heading', () => {
    renderReview();

    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(1);

    const heading = headings[0];
    expect(heading.textContent).toBe(defaultProps.heading);
  });

  it('renders the edit link', () => {
    renderReview();

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(1);

    const link = links[0];
    expect(link.textContent).toBe(defaultProps.editText);
  });

  it('does not render the edit link if editHref is undefined', () => {
    renderReview({ editHref: undefined });
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('it renders the edit content', () => {
    const content = <div data-testid="editContent" />;
    renderReview({ editContent: content });

    const editContent = screen.getAllByTestId('editContent');
    expect(editContent.length).toBe(1);

    expect(screen.queryByRole('link')).toBeNull();
  });

  it('renders HTML children', () => {
    renderReview({}, <p className="my-p">{text}</p>);
    const els = screen.getAllByText(text);
    expect(els.length).toBe(1);

    const el = els[0];
    expect(el.classList).toContain('my-p');
  });

  it('adds a class from props', () => {
    renderReview({ className: 'my-class' });

    const wrappers = screen.getAllByRole('generic');
    const wrapper = wrappers[1];

    expect(wrapper.classList).toContain('my-class');
  });
});
