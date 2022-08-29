import React from 'react';
import { render, screen } from '@testing-library/react';

import TableBody from './TableBody';

const defaultTableBodyChildren = (
  <tr>
    <td>Cell a</td>
    <td>Cell a</td>
  </tr>
);

const makeTableBody = (customProps = {}) => {
  const children = <TableBody {...customProps}>{defaultTableBodyChildren}</TableBody>;
  render(<table>{children}</table>);
};

describe('TableBody', function () {
  it('renders a table body', () => {
    makeTableBody();
    expect(screen.getAllByRole('rowgroup')).toHaveLength(1);
  });

  it('renders additional attributes', () => {
    makeTableBody({ className: 'foo-body' });
    const rg = screen.getByRole('rowgroup');
    expect(rg).toHaveClass('foo-body');
    expect(rg).toMatchSnapshot();
  });
});
