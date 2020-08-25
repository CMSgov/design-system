import React from 'react';
import Table from './Table';
import TableBody from './TableBody';
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

const defaultTableBodyChildren = (
  <TableRow key="2">
    <TableCell key="21" data="Cell a" />
    <TableCell key="22" data="Cell b" />
  </TableRow>
);
const defaultTableBodyProps = {
  className: 'foo-body',
};

function renderHeader(customProps = {}, children) {
  const props = Object.assign({}, customProps);

  if (!children) {
    children = <TableHead {...defaultTableHeadProps}>{defaultTableHeadChildren}</TableHead>;
  }

  return {
    props: props,
    wrapper: mount(<Table {...props}>{children}</Table>),
  };
}

function renderBody(customProps = {}, children) {
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
  it('renders a table header cell', () => {
    const data = renderHeader(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('th');
    expect(table).toHaveLength(2);
    expect(table.first().hasClass('ds-c-table__header')).toBe(true);
  });

  it('renders a table body', () => {
    const data = renderBody(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('td');
    expect(table).toHaveLength(2);
    expect(table.first().hasClass('ds-c-table__cell')).toBe(true);
  });
});
