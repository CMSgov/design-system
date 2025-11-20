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

const makeTableHead = (customProps = {}, children = defaultTableHeadChildren) => {
  const tableHead = <TableHead {...customProps}>{children}</TableHead>;
  render(<table>{tableHead}</table>);
};

describe('TableHead', () => {
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

  describe('handling invalid children', () => {
    it('renders an empty row when there are no children', () => {
      const children = <TableRow />;
      makeTableHead({ className: 'foo-head' }, children);

      const row = screen.getByRole('row');
      expect(row).toBeInTheDocument();
      expect(row).toBeEmptyDOMElement();
    });

    it('renders only valid elements when invalid children are present', () => {
      const children = (
        <TableRow>
          text node
          {123}
          {false}
          <td>First valid table cell</td>
          another random text node
          <td>Second valid table cell</td>
        </TableRow>
      );
      const renderInvalid = () => {
        makeTableHead({ className: 'foo-head' }, children);
      };

      expect(renderInvalid).not.toThrow();
      const cells = screen.getAllByRole('cell');
      expect(cells).toHaveLength(2);
      expect(cells[0].textContent).toBe('First valid table cell');
      expect(cells[1].textContent).toBe('Second valid table cell');
    });
  });
});
