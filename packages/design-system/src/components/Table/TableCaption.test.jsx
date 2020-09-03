import React from 'react';
import Table from './Table';
import TableCaption from './TableCaption';
import { mount } from 'enzyme';

const defaultCaptionChildren = 'Foo';
const defaultCaptionProps = {
  className: 'foo-caption',
};

function render(customProps = {}, children) {
  const props = Object.assign({}, customProps);

  if (!children) {
    children = <TableCaption {...defaultCaptionProps}>{defaultCaptionChildren}</TableCaption>;
  }

  return {
    props: props,
    wrapper: mount(<Table {...props}>{children}</Table>),
  };
}

describe('Table', function () {
  it('renders a table caption', () => {
    const data = render(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('caption');
    expect(table).toHaveLength(1);
    expect(table.hasClass('ds-c-table__caption')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });
});
