import { render, screen } from '@testing-library/react';

import TableRow from './TableRow';

const makeTableRow = (customProps = {}) => {
  const children = (
    <tbody>
      <TableRow {...customProps}>
        <td>Column a</td>
        <td>Column b</td>
      </TableRow>
    </tbody>
  );
  render(<table>{children}</table>);
};

describe('TableRow', function () {
  it('renders a table row', () => {
    makeTableRow();
    expect(screen.getByRole('row')).toBeInTheDocument();
  });

  it('renders valid children when _isTableHeadChild is true', () => {
    makeTableRow({ _isTableHeadChild: true });
    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(2);
    expect(cells[0]).toHaveTextContent('Column a');
  });

  it('renders valid children when _isTableHeadChild is undefined', () => {
    makeTableRow();
    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(2);
    expect(cells[0]).toHaveTextContent('Column a');
  });

  it('renders additional attributes', () => {
    makeTableRow({ className: 'foo-row' });
    const tr = screen.getByRole('row');

    expect(tr).toHaveClass('foo-row');
    expect(tr).toMatchSnapshot();
  });

  describe('handling invalid children', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      (console.error as jest.Mock).mockRestore();
    });

    it('renders an empty row when there are no children', () => {
      render(
        <table>
          <tbody>
            <TableRow />
          </tbody>
        </table>
      );

      const row = screen.getByRole('row');
      expect(row).toBeInTheDocument();
      expect(row).toBeEmptyDOMElement();
    });

    it('renders only valid elements when invalid children are present', () => {
      const renderInvalid = () =>
        render(
          <table>
            <tbody>
              <TableRow>
                text node
                {123}
                {false}
                <td>First valid table cell</td>
                another random text node
                <td>Second valid table cell</td>
              </TableRow>
            </tbody>
          </table>
        );

      expect(renderInvalid).not.toThrow();
      const cells = screen.getAllByRole('cell');
      expect(cells).toHaveLength(2);
      expect(cells[0].textContent).toBe('First valid table cell');
      expect(cells[1].textContent).toBe('Second valid table cell');
    });
  });
});
