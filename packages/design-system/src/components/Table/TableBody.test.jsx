import React from 'react';
import Table from './Table';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableRow from './TableRow';
import { mount } from 'enzyme';

const defaultTableBodyChildren = (
  <TableRow>
    <TableCell>Cell a</TableCell>
    <TableCell>Cell a</TableCell>
  </TableRow>
);

function render(customProps = {}, children) {
  const props = Object.assign({}, customProps);

  if (!children) {
    children = <TableBody {...props}>{defaultTableBodyChildren}</TableBody>;
  }
  return {
    props: props,
    wrapper: mount(<Table>{children}</Table>),
  };
}

describe('TableBody', function () {
  it('renders a table body', () => {
    const { wrapper } = render();
    const tableBody = wrapper.find('tbody');

    expect(tableBody).toHaveLength(1);
  });

  it('renders additional attributes', () => {
    const { wrapper } = render({ className: 'foo-body' });
    const tableBody = wrapper.find('tbody');

    expect(tableBody.hasClass('foo-body')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });
});
