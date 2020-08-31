import React from 'react';
import Table from './Table';
import TableCaption from './TableCaption';
import { shallow } from 'enzyme';

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
    wrapper: shallow(<Table {...props}>{children}</Table>),
  };
}

describe('Table', function () {
  it('renders a table', () => {
    const data = render(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('table');
    expect(table).toHaveLength(1);

    expect(table.hasClass('ds-c-table')).toBe(true);
  });

  it('sets role="table"', () => {
    const data = render(undefined, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('table');
    expect(table).toHaveLength(1);

    expect(table.prop('role')).toBe('table');
  });

  it('supports zebra stripe', () => {
    const data = render({ striped: true }, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('table');
    expect(table.hasClass('ds-c-table')).toBe(true);
    expect(table.hasClass('ds-c-table--striped')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });

  it('supports responsive table', () => {
    const data = render({ stackable: true, stackableBreakpoint: 'lg' }, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('table');
    expect(table.hasClass('ds-c-table')).toBe(true);
    expect(table.hasClass('ds-c-table--stacked-lg')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });

  it('supports scroll table', () => {
    const data = render({ scrollable: true }, undefined);
    const wrapper = data.wrapper;

    const table = wrapper.find('table');
    const divWrapper = data.wrapper.find('div');
    expect(table.hasClass('ds-c-table')).toBe(true);
    expect(divWrapper.hasClass('ds-c-table__wrapper')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });
});
