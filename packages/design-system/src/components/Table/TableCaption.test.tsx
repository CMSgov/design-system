import React from 'react';
import TableCaption from './TableCaption';
import { render, screen } from '@testing-library/react';

const defaultCaptionChildren = 'Foo';

function renderCaption(customProps = {}) {
  const props = Object.assign({}, customProps);
  const children = <TableCaption {...props}>{defaultCaptionChildren}</TableCaption>;

  return {
    props: props,
    view: render(<table>{children}</table>),
  };
}

describe('TableCaption', function () {
  it('renders a table caption', () => {
    renderCaption();
    const caption = screen.getByText(defaultCaptionChildren);
    expect(caption).toHaveClass('ds-c-table__caption');
  });

  it('applies additional classNames to caption', () => {
    const view = renderCaption({ className: 'foo-caption' });
    const caption = screen.getByText(defaultCaptionChildren);
    expect(caption).toHaveClass('foo-caption');
    expect(view).toMatchSnapshot();
  });
});
