import React from 'react';
import { render, screen } from '@testing-library/react';
import TableCell from './TableCell';
import TableRow from './TableRow';
import TableHead from './TableHead';

const makeTableCells = (customProps = {}) => {
  const children = (
    <>
      <TableHead>
        <TableRow>
          <TableCell>Column 1</TableCell>
          <TableCell>Column 2</TableCell>
        </TableRow>
      </TableHead>
      <tbody>
        <TableRow>
          <TableCell>Column a</TableCell>
          <TableCell>Column b</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">Column a2</TableCell>
          <TableCell component="th">Column b2</TableCell>
        </TableRow>
      </tbody>
    </>
  );
  render(<table {...customProps}>{children}</table>);
};

describe('TableCell', function () {
  it('renders TableCell components', () => {
    makeTableCells();
    const tds = screen.getAllByRole('cell');
    expect(tds).toHaveLength(3);
    expect(tds).toMatchSnapshot();
  });

  it('sets alignment default to left', () => {
    makeTableCells();
    expect(screen.getByText('Column a')).toHaveClass('ds-c-table__cell--align-left');
  });

  it('accepts alternate align options', () => {
    makeTableCells();
    expect(screen.getByText('Column a2')).toHaveClass('ds-c-table__cell--align-right');
  });

  it('accepts alternate component roles', () => {
    makeTableCells();
    expect(screen.getAllByRole('rowheader')).toHaveLength(1);
  });

  it('renders TableCell components as <th> elements when inside a TableHeader', () => {
    makeTableCells();
    const tds = screen.getAllByRole('columnheader');
    expect(tds).toHaveLength(2);
  });

  it('applies col scope when parent is TableHead', () => {
    makeTableCells();
    const cell = screen.getByText('Column 1');
    expect(cell).toHaveAttribute('scope', 'col');
  });
});
