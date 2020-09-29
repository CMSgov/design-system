import React from 'react';
import Table from './Table';
import TableCaption from './TableCaption';
import { shallow } from 'enzyme';

const defaultCaptionChildren = 'Foo';
const tableCaption = <TableCaption>{defaultCaptionChildren}</TableCaption>;

function render(customProps = {}, children = tableCaption) {
  const props = Object.assign({}, customProps);

  return {
    props: props,
    wrapper: shallow(<Table {...props}>{children}</Table>),
  };
}

describe('Table', function () {
  it('renders a table', () => {
    const { wrapper } = render();
    const table = wrapper.find('table');

    expect(table).toHaveLength(1);

    expect(table.hasClass('ds-c-table')).toBe(true);
  });

  it('sets role="table"', () => {
    const { wrapper } = render();
    const table = wrapper.find('table');

    expect(table.prop('role')).toBe('table');
  });

  it('applies additional classNames to root table', () => {
    const { wrapper } = render({ className: 'foo-table' });
    const table = wrapper.find('table');

    expect(table.hasClass('foo-table')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });

  it('applies borderless classes', () => {
    const { wrapper } = render({ borderless: true });
    const table = wrapper.find('table');

    expect(table.hasClass('ds-c-table--borderless')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });

  it('applies zebra stripe classes', () => {
    const { wrapper } = render({ striped: true });
    const table = wrapper.find('table');

    expect(table.hasClass('ds-c-table--striped')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });

  it('applies responsive table', () => {
    const { wrapper } = render({ stackable: true, stackableBreakpoint: 'lg' });
    const table = wrapper.find('table');

    expect(table.hasClass('ds-c-lg-table--stacked')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });

  it('applies scroll table', () => {
    const { wrapper } = render({ scrollable: true });
    const divWrapper = wrapper.find('div');

    expect(divWrapper.hasClass('ds-c-table__wrapper')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders additional attributes', () => {
    const { wrapper } = render({ ariaLabel: 'test additional attribute' });
    const table = wrapper.find('table');

    expect(table.prop('ariaLabel')).toBe('test additional attribute');

    expect(wrapper).toMatchSnapshot();
  });
});
