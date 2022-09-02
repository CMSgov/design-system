import React from 'react';
import ReviewLink from './ReviewLink';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const noop = () => {};
const text = 'link text';
const defaultProps = {
  onClick: noop,
  href: 'my-href',
};

function renderLink(customProps?, children = text) {
  const props = { ...defaultProps, ...customProps };
  return render(<ReviewLink {...props}>{children}</ReviewLink>);
}

describe('ReviewLink', function () {
  it('renders link', () => {
    renderLink();

    const els = screen.getAllByRole('link');
    expect(els.length).toBe(1);

    const el = els[0];
    expect(el.textContent).toBe(text);
  });

  it('props.onClick is called with correct parameters', () => {
    const click = jest.fn();
    renderLink({ onClick: click });

    const els = screen.getAllByRole('link');
    expect(els.length).toBe(1);

    const el = screen.getByRole('link');
    expect(el.textContent).toBe(text);

    userEvent.click(el);

    expect(click).toHaveBeenCalledWith(expect.anything(), defaultProps.href);
    expect(click).toHaveBeenCalledTimes(1);
  });
});
