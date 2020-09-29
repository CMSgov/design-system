import React from 'react';
import Table from './Table';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableRow from './TableRow';
import { mount } from 'enzyme';

function render(customProps = {}, children) {
  const props = Object.assign({}, customProps);

  if (!children) {
    children = (
      <TableHead>
        <TableRow {...props}>
          <TableCell>Column a</TableCell>
          <TableCell>Column b</TableCell>
        </TableRow>
      </TableHead>
    );
  }

  return {
    props: props,
    wrapper: mount(<Table>{children}</Table>),
  };
}

describe('TableRow', function () {
  it('renders a table row', () => {
    const { wrapper } = render();
    const tableRow = wrapper.find('tr');

    expect(tableRow).toHaveLength(1);
  });

  it('sets role="row"', () => {
    const { wrapper } = render();
    const tableRow = wrapper.find('tr');

    expect(tableRow.prop('role')).toBe('row');
  });

  it('renders additional attributes', () => {
    const { wrapper } = render({ className: 'foo-row' });
    const tableRow = wrapper.find('tr');

    expect(tableRow.hasClass('foo-row')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });
});
