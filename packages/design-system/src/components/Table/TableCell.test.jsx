import React from 'react';
import Table from './Table';
import TableBody from './TableBody';
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

const defaultTableBodyChildren = (
  <TableRow>
    <TableCell component="th">Cell a</TableCell>
    <TableCell>Cell b</TableCell>
  </TableRow>
);

function renderHead(customProps = {}, children) {
  const props = Object.assign({}, customProps);

  if (!children) {
    children = <TableHead>{defaultTableHeadChildren}</TableHead>;
  }

  return {
    props: props,
    wrapper: mount(<Table {...props}>{children}</Table>),
  };
}

function renderBody(customProps = {}, children) {
  const props = Object.assign({}, customProps);

  if (!children) {
    children = <TableBody>{defaultTableBodyChildren}</TableBody>;
  }

  return {
    props: props,
    wrapper: mount(<Table {...props}>{children}</Table>),
  };
}

describe('TableCell', function () {
  describe('th default props', () => {
    it('renders a table thead <th> element', () => {
      const { wrapper } = renderHead();
      const table = wrapper.find('th');

      expect(table).toHaveLength(2);

      expect(wrapper).toMatchSnapshot();
    });

    it('sets thead <th> align="left"', () => {
      const { wrapper } = renderHead();
      const table = wrapper.find('TableCell');

      expect(table.first().prop('align')).toBe('left');
    });

    it('sets thead <th> role="columnheader"', () => {
      const { wrapper } = renderHead();
      const table = wrapper.find('th');

      expect(table.first().prop('role')).toBe('columnheader');
    });

    it('sets thead <th> scope="col"', () => {
      const { wrapper } = renderHead();
      const table = wrapper.find('th');

      expect(table.first().prop('scope')).toBe('col');
    });
  });

  describe('td default props', () => {
    it('renders a table tbody row element', () => {
      const { wrapper } = renderBody();
      const table = wrapper.find('TableCell');

      expect(table).toHaveLength(2);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders a table tbody <th> row header element which overwrites default header row component to <th>', () => {
      const { wrapper } = renderBody();
      const table = wrapper.find('th');

      expect(table).toHaveLength(1);
    });

    it('sets a table tbody <th> role="rowheader" which overwrites default role value "cell"', () => {
      const { wrapper } = renderBody();
      const table = wrapper.find('th');

      expect(table.prop('role')).toBe('rowheader');
    });

    it('sets a table tbody <th> scope="row"', () => {
      const { wrapper } = renderBody();
      const table = wrapper.find('th');

      expect(table.prop('scope')).toBe('row');
    });

    it('renders a table tbody <td> row data element', () => {
      const { wrapper } = renderBody();
      const table = wrapper.find('td');

      expect(table).toHaveLength(1);
    });

    it('sets a table tbody <td> role="cell"', () => {
      const { wrapper } = renderBody();
      const table = wrapper.find('td');

      expect(table.prop('role')).toBe('cell');
    });

    it('sets a table tbody <td> scope="row"', () => {
      const { wrapper } = renderBody();
      const table = wrapper.find('td');

      expect(table.prop('scope')).toBe('row');
    });
  });
});
