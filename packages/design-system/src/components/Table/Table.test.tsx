import { render, screen } from '@testing-library/react';

import Table from './Table';
import TableCaption from './TableCaption';

const makeTable = (customProps = {}) => {
  const children = <TableCaption>A great caption</TableCaption>;
  render(
    <Table id="static-id" {...customProps}>
      {children}
    </Table>
  );
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

  it('accepts custom id', () => {
    // Only scrollable tables put ids on the table captions
    makeTable({ scrollable: true });
    const el = screen.getByRole('region');
    expect(el).toMatchSnapshot();
  });

  it('generates caption id when no id is provided', () => {
    // Only scrollable tables put ids on the table captions
    makeTable({ scrollable: true, id: undefined });
    const table = screen.getByRole('table');
    const caption = table.querySelector('caption');
    expect(caption.id).toMatch(/table-caption--\d+/);
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
  describe('handling non-standard children', () => {
    it('renders without crashing when children are wrapped in a fragment', () => {
      const children = (
        <>
          <TableCaption>Fragment caption</TableCaption>
        </>
      );

      expect(() => {
        render(<Table>{children}</Table>);
      }).not.toThrow();
      const captions = screen.getAllByRole('caption');
      expect(captions).toHaveLength(1);
      expect(captions[0].textContent).toBe('Fragment caption');
    });

    it('renders without crashing when children are nested arrays', () => {
      const nestedChildren = [
        [<TableCaption key="a">Caption A</TableCaption>],
        [<TableCaption key="b">Caption B</TableCaption>],
      ];

      expect(() => {
        render(<Table>{nestedChildren}</Table>);
      }).not.toThrow();

      expect(screen.getAllByText(/Caption/).length).toBe(2);
    });

    it('renders and logs a validateDOMNesting warning when children include text nodes', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const children = [
        'Plain text',
        <TableCaption key="caption">Caption after text</TableCaption>,
      ];

      expect(() => {
        render(<Table>{children}</Table>);
      }).not.toThrow();

      const captions = screen.getAllByRole('caption');
      expect(captions).toHaveLength(1);
      expect(captions[0].textContent).toBe('Caption after text');
      const errorCalls = consoleSpy.mock.calls
        .flat()
        .filter((msg) => typeof msg === 'string' && msg.includes('validateDOMNesting'));

      expect(errorCalls.length).toBeGreaterThan(0);
      expect(errorCalls[0]).toMatch(/validateDOMNesting/);

      consoleSpy.mockRestore();
    });
  });
});
