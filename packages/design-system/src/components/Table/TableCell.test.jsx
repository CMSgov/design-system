import React from 'react';
import Table from './Table';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableRow from './TableRow';
import { mount } from 'enzyme';

const defaultTableHeadChildren = (
  <TableRow key="1">
    <TableCell>Column a</TableCell>
    <TableCell>Column b</TableCell>
  </TableRow>
);
const defaultTableHeadProps = {
  className: 'foo-head',
};

const defaultTableBodyChildren = (
  <TableRow key="2">
    <TableCell>Cell a</TableCell>
    <TableCell>Cell a</TableCell>
  </TableRow>
);
const defaultTableBodyProps = {
  className: 'foo-body',
};

function renderHead(customProps = {}, children) {
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
  it('renders a table <th> tag', () => {
    const data = renderHead(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('th');
    expect(table).toHaveLength(2);
    expect(table.first().find({ scope: 'col' })).toHaveLength(1);
  });

  it('renders a table <td> tag', () => {
    const data = renderBody(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('td');
    expect(table).toHaveLength(2);
    expect(table.first().find({ scope: 'row' })).toHaveLength(1);
  });
});
