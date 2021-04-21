import React from 'react';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableRow from './TableRow';
import { mount } from 'enzyme';

function renderHead(customProps = {}) {
  const props = Object.assign({}, customProps);
  const children = (
    <TableHead>
      <TableRow>
        <TableCell>Column a</TableCell>
        <TableCell>Column b</TableCell>
      </TableRow>
    </TableHead>
  );

  return {
    props: props,
    wrapper: mount(<table>{children}</table>),
  };
}

function renderBody(customProps = {}) {
  const props = Object.assign({}, customProps);
  const children = (
    <TableBody>
      <TableRow>
        <TableCell component="th">Cell a</TableCell>
        <TableCell>Cell b</TableCell>
      </TableRow>
    </TableBody>
  );

  return {
    props: props,
    wrapper: mount(<table>{children}</table>),
  };
}

describe('TableCell', function () {
  describe('TableHead wrap: <th> header cell - default props', () => {
    it('renders a table <th> element', () => {
      const { wrapper } = renderHead();
      const table = wrapper.find('th');

      expect(table).toHaveLength(2);

      expect(wrapper).toMatchSnapshot();
    });

    it('sets <th> align="left"', () => {
      const { wrapper } = renderHead();
      const table = wrapper.find('TableCell');

      expect(table.first().prop('align')).toBe('left');
    });

    it('sets <th> role="columnheader"', () => {
      const { wrapper } = renderHead();
      const table = wrapper.find('th');

      expect(table.first().prop('role')).toBe('columnheader');
    });

    it('sets <th> scope="col"', () => {
      const { wrapper } = renderHead();
      const table = wrapper.find('th');

      expect(table.first().prop('scope')).toBe('col');
    });
  });

  describe('TableBody wrap: <td> data cell - default props', () => {
    it('renders TableCell component', () => {
      const { wrapper } = renderBody();
      const table = wrapper.find('TableCell');

      expect(table).toHaveLength(2);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders a table <th> row header element which overwrites default header row component to <th>', () => {
      const { wrapper } = renderBody();
      const table = wrapper.find('th');

      expect(table).toHaveLength(1);
    });

    it('sets a table <th> role="rowheader" which overwrites default role value "cell"', () => {
      const { wrapper } = renderBody();
      const table = wrapper.find('th');

      expect(table.prop('role')).toBe('rowheader');
    });

    it('renders a table <td> row data element', () => {
      const { wrapper } = renderBody();
      const table = wrapper.find('td');

      expect(table).toHaveLength(1);
    });

    it('sets a table <td> role="cell"', () => {
      const { wrapper } = renderBody();
      const table = wrapper.find('td');

      expect(table.prop('role')).toBe('cell');
    });
  });
});
