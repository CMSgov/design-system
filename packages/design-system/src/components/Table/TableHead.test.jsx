import React from 'react';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableRow from './TableRow';
import { mount } from 'enzyme';

const defaultTableHeadChildren = (
  <TableRow>
    <TableCell>Column a</TableCell>
    <TableCell>Column b</TableCell>
  </TableRow>
);

function render(customProps = {}) {
  const props = Object.assign({}, customProps);
  const children = <TableHead {...props}>{defaultTableHeadChildren}</TableHead>;

  return {
    props: props,
    wrapper: mount(<table>{children}</table>),
  };
}

describe('TableHead', function () {
  it('renders a table head', () => {
    const { wrapper } = render();
    const tableHead = wrapper.find('thead');

    expect(tableHead).toHaveLength(1);
  });

  it('renders additional attributes', () => {
    const { wrapper } = render({ className: 'foo-head' });
    const tableHead = wrapper.find('thead');

    expect(tableHead.hasClass('foo-head')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });
});
