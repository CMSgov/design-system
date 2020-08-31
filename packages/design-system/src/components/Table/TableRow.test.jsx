import React from 'react';
import Table from './Table';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableRow from './TableRow';
import { mount } from 'enzyme';

const defaultTableHeadChildren = (
  <TableRow key="1" className="foo-row">
    <TableCell>Column a</TableCell>
    <TableCell>Column b</TableCell>
  </TableRow>
);
const defaultTableHeadProps = {
  className: 'foo-head',
};

function render(customProps = {}, children) {
  const props = Object.assign({}, customProps);

  if (!children) {
    children = <TableHead {...defaultTableHeadProps}>{defaultTableHeadChildren}</TableHead>;
  }

  return {
    props: props,
    wrapper: mount(<Table {...props}>{children}</Table>),
  };
}

describe('Table', function () {
  it('renders a table row', () => {
    const data = render(undefined, undefined);
    const wrapper = data.wrapper;

    const tableRow = wrapper.find('tr');
    expect(tableRow).toHaveLength(1);
    expect(tableRow.hasClass('foo-row')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });

  it('sets role="row"', () => {
    const data = render(undefined, undefined);
    const wrapper = data.wrapper;

    const tableRow = wrapper.find('tr');
    expect(tableRow).toHaveLength(1);
    expect(tableRow.prop('role')).toBe('row');
  });
});
