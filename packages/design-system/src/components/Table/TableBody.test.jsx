import React from 'react';
import Table from './Table';
import TableBody from './TableBody';
import TableDataCell from './TableDataCell';
import TableRow from './TableRow';
import { mount } from 'enzyme';

const defaultTableBodyChildren = (
  <TableRow key="2">
    <TableDataCell key="21" data="Cell a" />
    <TableDataCell key="22" data="Cell b" />
  </TableRow>
);
const defaultTableBodyProps = {
  className: 'foo-body',
};

function render(customProps = {}, children) {
  const props = Object.assign({}, customProps);

  if (!children) {
    children = <TableBody {...defaultTableBodyProps}>{defaultTableBodyChildren}</TableBody>;
  }

  return {
    props: props,
    wrapper: mount(<Table {...props}>{children}</Table>),
  };
}

describe('Table', function () {
  it('renders a table body', () => {
    const data = render(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('tbody');
    expect(table).toHaveLength(1);
    expect(table.hasClass('ds-c-table__body')).toBe(true);
  });
});
