import React from 'react';
import Table from './Table';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableRow from './TableRow';
import { mount } from 'enzyme';

const defaultTableHeadChildren = (
  <TableRow key="1">
    <TableCell key="11" title="Column a" />
    <TableCell key="12" title="Column b" />
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
  it('renders a table head', () => {
    const data = render(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('thead');
    expect(table).toHaveLength(1);
    expect(table.hasClass('ds-c-table__head')).toBe(true);
  });
});
