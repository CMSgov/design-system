import React from 'react';

import TableBody from './TableBody';
import { mount } from 'enzyme';

const defaultTableBodyChildren = (
  <tr>
    <td>Cell a</td>
    <td>Cell a</td>
  </tr>
);

function render(customProps = {}) {
  const props = Object.assign({}, customProps);
  const children = <TableBody {...props}>{defaultTableBodyChildren}</TableBody>;

  return {
    props: props,
    wrapper: mount(<table>{children}</table>),
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
