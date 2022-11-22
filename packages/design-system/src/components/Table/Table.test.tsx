import React from 'react';
import { render, screen } from '@testing-library/react';

import Table from './Table';
import TableCaption from './TableCaption';

const makeTable = (customProps = {}) => {
  const children = <TableCaption>A great caption</TableCaption>;
  render(<Table {...customProps}>{children}</Table>);
};

describe('Table', function () {
  it('sets role="table"', () => {
    makeTable();
    expect(screen.getAllByRole('table')).toHaveLength(1);
  });

  it('renders table with class ds-c-table', () => {
    makeTable();
    expect(screen.getByRole('table')).toHaveClass('ds-c-table');
  });

  it('applies additional classNames to root table', () => {
    makeTable({ className: 'foo-table' });
    expect(screen.getByRole('table')).toHaveClass('foo-table');
  });

  it('applies borderless classes', () => {
    makeTable({ borderless: true });
    expect(screen.getByRole('table')).toHaveClass('ds-c-table--borderless');
  });

  it('applies compact table classes', () => {
    makeTable({ compact: true });
    expect(screen.getByRole('table')).toHaveClass('ds-c-table--compact');
  });

  it('applies zebra stripe classes', () => {
    makeTable({ striped: true });
    expect(screen.getByRole('table')).toHaveClass('ds-c-table--striped');
  });

  it('applies responsive stacked table', () => {
    makeTable({ stackable: true, stackableBreakpoint: 'lg' });
    const table = screen.getByRole('table');
    expect(table).toHaveClass('ds-c-lg-table--stacked');
    expect(table).toMatchSnapshot();
  });

  it('applies scrollable prop to table', () => {
    makeTable({ scrollable: true });
    const scrollableRegion = screen.getByRole('region');

    expect(scrollableRegion).toHaveClass('ds-c-table__wrapper');
    expect(scrollableRegion).toHaveAttribute('aria-live', 'polite');
    expect(scrollableRegion).toHaveAttribute('aria-relevant', 'additions');
    expect(scrollableRegion).toMatchSnapshot();
  });

  it('scroll table aria-labelledby matches caption id', () => {
    makeTable({ scrollable: true });
    const region = screen.getByRole('region').attributes['id'];
    const caption = screen.getByText('A great caption').attributes['aria-labelledby'];

    expect(region).toEqual(caption);
  });
});
