import React from 'react';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableRow from './TableRow';
import { render, screen } from '@testing-library/react';

const renderHead = () =>
  render(
    <table>
      <TableHead>
        <TableRow>
          <TableCell>Column a</TableCell>
          <TableCell>Column b</TableCell>
        </TableRow>
      </TableHead>
    </table>
  );

const renderBody = () =>
  render(
    <table>
      <TableBody>
        <TableRow>
          <TableCell component="th">Cell a</TableCell>
          <TableCell>Cell b</TableCell>
        </TableRow>
      </TableBody>
    </table>
  );

describe('TableCell', function () {
  describe('TableHead wrap: <th> header cell - default props', () => {
    it('renders a table <th> element with correct role', () => {
      const view = renderHead();
      expect(screen.getAllByRole('columnheader')).toHaveLength(2);
      expect(view).toMatchSnapshot();
    });

    it('sets correct <th> alignment class', () => {
      renderHead();
      screen.getAllByRole('columnheader').forEach((th) => {
        expect(th).toHaveClass('ds-c-table__cell--align-left');
      });
    });

    it('sets <th> scope to col', () => {
      renderHead();
      screen.getAllByRole('columnheader').forEach((th) => {
        expect(th).toHaveAttribute('scope', 'col');
      });
    });
  });

  describe('TableBody wrap: <td> data cell - default props', () => {
    it('renders TableCell component which has the role cell', () => {
      const view = renderBody();
      const cells = screen.getAllByRole('cell');
      expect(cells).toHaveLength(1);
      expect(view).toMatchSnapshot();
    });

    it('renders a <th> row header element which overwrites default header row component to <th> and has the correct role of rowheader', () => {
      renderBody();
      const tableHeaders = screen.getAllByRole('rowheader');
      expect(tableHeaders).toHaveLength(1);
    });
  });
});
