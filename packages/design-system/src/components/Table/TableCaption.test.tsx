import { render, screen } from '@testing-library/react';

import TableCaption from './TableCaption';

const defaultCaptionChildren = 'Foo';

const makeTableCaption = (customProps = {}) => {
  const children = <TableCaption {...customProps}>{defaultCaptionChildren}</TableCaption>;
  render(<table>{children}</table>);
};

describe('TableCaption', function () {
  it('renders a table caption with default ds caption class', () => {
    makeTableCaption();
    const caption = screen.getByText(defaultCaptionChildren);
    expect(caption).toBeInTheDocument();
    expect(caption).toHaveClass('ds-c-table__caption');
  });

  it('applies additional classNames to caption', () => {
    makeTableCaption({ className: 'foo-caption' });
    const caption = screen.getByText(defaultCaptionChildren);
    expect(caption).toHaveClass('foo-caption');
    expect(caption).toMatchSnapshot();
  });
});
