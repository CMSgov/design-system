import { render, screen } from '@testing-library/react';

import TableCell from './TableCell';
import TableHead from './TableHead';
import TableRow from './TableRow';

const defaultTableHeadChildren = (
  <TableRow>
    <TableCell>Column a</TableCell>
    <TableCell>Column b</TableCell>
  </TableRow>
);

const makeTableHead = (customProps = {}) => {
  const children = <TableHead {...customProps}>{defaultTableHeadChildren}</TableHead>;
  render(<table>{children}</table>);
};

describe('TableHead', function () {
  it('renders a table head', () => {
    makeTableHead();
    expect(screen.getByRole('rowgroup')).toBeInTheDocument();
  });

  it('renders additional attributes', () => {
    makeTableHead({ className: 'foo-head' });
    const th = screen.getByRole('rowgroup');
    expect(th).toHaveClass('foo-head');
    expect(th).toMatchSnapshot();
  });

  it('applies role columnheader to th columns', () => {
    makeTableHead();
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
  });
});
