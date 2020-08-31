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
    <TableCell component="th">Cell a</TableCell>
    <TableCell>Cell b</TableCell>
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
  it('renders a table thead <th> element', () => {
    const data = renderHead(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('th');
    expect(table).toHaveLength(2);

    expect(wrapper).toMatchSnapshot();
  });

  it('sets thead <th> align="left"', () => {
    const data = renderHead(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('TableCell');
    expect(table.first().prop('align')).toBe('left');
  });

  it('sets thead <th> role="columnheader"', () => {
    const data = renderHead(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('th');
    expect(table.first().prop('role')).toBe('columnheader');
  });

  it('sets thead <th> scope="col"', () => {
    const data = renderHead(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('th');
    expect(table.first().prop('scope')).toBe('col');
  });

  it('renders a table tbody row element', () => {
    const data = renderBody(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('TableCell');
    expect(table).toHaveLength(2);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a table tbody <th> row header element', () => {
    const data = renderBody(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('th');
    expect(table).toHaveLength(1);
  });

  it('sets a table tbody <th> role="rowheader"', () => {
    const data = renderBody(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('th');
    expect(table.prop('role')).toBe('rowheader');
  });

  it('sets a table tbody <th> scope="row"', () => {
    const data = renderBody(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('th');
    expect(table.prop('scope')).toBe('row');
  });

  it('renders a table tbody <td> row data element', () => {
    const data = renderBody(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('td');
    expect(table).toHaveLength(1);
  });

  it('sets a table tbody <td> role="cell"', () => {
    const data = renderBody(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('td');
    expect(table.prop('role')).toBe('cell');
  });

  it('sets a table tbody <td> scope="row"', () => {
    const data = renderBody(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('td');
    expect(table.prop('scope')).toBe('row');
  });
});
