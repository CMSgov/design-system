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

  it('renders additional attributes', () => {
    makeTableRow({ className: 'foo-row' });
    const tr = screen.getByRole('row');

    expect(tr).toHaveClass('foo-row');
    expect(tr).toMatchSnapshot();
  });
});
