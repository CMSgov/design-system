import React from 'react';
import Table from './Table';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableRow from './TableRow';
import { mount } from 'enzyme';

const defaultTableBodyChildren = (
  <TableRow key="2">
    <TableCell>Cell a</TableCell>
    <TableCell>Cell a</TableCell>
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

    const tableBody = wrapper.find('tbody');
    expect(tableBody).toHaveLength(1);
    expect(tableBody.hasClass('foo-body')).toBe(true);
  });
});
