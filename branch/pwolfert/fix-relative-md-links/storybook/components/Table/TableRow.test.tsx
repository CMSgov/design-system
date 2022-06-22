import React from 'react';
import TableRow from './TableRow';
import { mount } from 'enzyme';

function render(customProps = {}) {
  const props = Object.assign({}, customProps);
  const children = (
    <tbody>
      <TableRow {...props}>
        <td>Column a</td>
        <td>Column b</td>
      </TableRow>
    </tbody>
  );

  return {
    props: props,
    wrapper: mount(<table>{children}</table>),
  };
}

describe('TableRow', function () {
  it('renders a table row', () => {
    const { wrapper } = render();
    const tableRow = wrapper.find('tr');

    expect(tableRow).toHaveLength(1);
  });

  it('sets role="row"', () => {
    const { wrapper } = render();
    const tableRow = wrapper.find('tr');

    expect(tableRow.prop('role')).toBe('row');
  });

  it('renders additional attributes', () => {
    const { wrapper } = render({ className: 'foo-row' });
    const tableRow = wrapper.find('tr');

    expect(tableRow.hasClass('foo-row')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });
});
