import React from 'react';
import Table from './Table';
import TableHead from './TableHead';
import TableHeaderCell from './TableHeaderCell';
import TableRow from './TableRow';
import { mount } from 'enzyme';

const defaultTableHeadChildren = (
  <TableRow key="1">
    <TableHeaderCell key="11" title="Column a" />
    <TableHeaderCell key="12" title="Column b" />
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
  it('renders a table header cell', () => {
    const data = render(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('th');
    expect(table).toHaveLength(2);
    expect(table.first().hasClass('ds-c-table__header')).toBe(true);
  });
});
