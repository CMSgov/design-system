import { mount, shallow } from 'enzyme';
import React from 'react';
import Table from './Table';
import TableCaption from './TableCaption';

const defaultCaptionChildren = 'Foo';
const tableCaption = <TableCaption>{defaultCaptionChildren}</TableCaption>;

function render(customProps = {}, children = tableCaption, deep = false) {
  const props = Object.assign({}, customProps);
  const component = <Table {...props}>{children}</Table>;

  return {
    props: props,
    wrapper: deep ? mount(component) : shallow(component),
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
  });

  it('applies borderless classes', () => {
    const { wrapper } = render({ borderless: true });
    const table = wrapper.find('table');

    expect(table.hasClass('ds-c-table--borderless')).toBe(true);
  });

  it('applies compact table classes', () => {
    const { wrapper } = render({ compact: true });
    const table = wrapper.find('table');

    expect(table.hasClass('ds-c-table--compact')).toBe(true);
  });

  it('applies zebra stripe classes', () => {
    const { wrapper } = render({ striped: true });
    const table = wrapper.find('table');

    expect(table.hasClass('ds-c-table--striped')).toBe(true);
  });

  it('applies default ContextProvider', () => {
    const { wrapper } = render();
    const context = wrapper.find('ContextProvider');

    expect(context.prop('value')).toMatchObject({ stackable: false, warningDisabled: false });
  });

  describe('table responsive stacked table true', () => {
    it('applies responsive stacked table', () => {
      const { wrapper } = render({ stackable: true, stackableBreakpoint: 'lg' });
      const table = wrapper.find('table');

      expect(table.hasClass('ds-c-lg-table--stacked')).toBe(true);

      expect(wrapper).toMatchSnapshot();
    });

    it('applies responsive stacked table ContextProvider', () => {
      const { wrapper } = render({ stackable: true, warningDisabled: true });
      const context = wrapper.find('ContextProvider');

      expect(context.prop('value')).toMatchObject({ stackable: true, warningDisabled: true });

      expect(wrapper).toMatchSnapshot();
    });
  });

  it('applies scroll table', () => {
    const { wrapper } = render({ scrollable: true });
    const divWrapper = wrapper.find('div');

    expect(divWrapper.hasClass('ds-c-table__wrapper')).toBe(true);
  });

  it('renders additional attributes', () => {
    const { wrapper } = render({ ariaLabel: 'test additional attribute' });
    const table = wrapper.find('table');

    expect(table.prop('ariaLabel')).toBe('test additional attribute');
  });

  describe('table caption scrollable true', () => {
    it('applies scroll table wrapper and classes', () => {
      const { wrapper } = render({ scrollable: true }, undefined, true);
      const divWrapper = wrapper.find('div');

      expect(wrapper.prop('scrollable')).toBe(true);

      expect(divWrapper.hasClass('ds-c-table__wrapper')).toBe(true);
      expect(divWrapper.prop('role')).toBe('region');
      expect(divWrapper.prop('aria-live')).toBe('polite');
      expect(divWrapper.prop('aria-relevant')).toBe('additions');
      expect(divWrapper.prop('tabindex')).toBeUndefined();

      expect(wrapper).toMatchSnapshot();
    });

    it('scroll table aria-labelledby matches caption id', () => {
      const { wrapper } = render({ scrollable: true }, undefined, true);
      const divWrapper = wrapper.find('div');
      const caption = wrapper.find('caption');

      expect(caption.prop('id')).toBe(divWrapper.prop('aria-labelledby'));
    });

    it('contains scroll table notice ', () => {
      const { wrapper } = render({ scrollable: true }, undefined, true);
      const tableCaption = wrapper.find('TableCaption');

      expect(tableCaption.prop('_scrollableNotice')).toBeDefined();
    });

    it('applies scrollableNotice', () => {
      const { wrapper } = render(
        { scrollable: true, scrollableNotice: 'foo scrollable notice' },
        undefined,
        true
      );
      const tableCaption = wrapper.find('TableCaption');

      expect(tableCaption.prop('_scrollableNotice')).toBe('foo scrollable notice');

      expect(wrapper).toMatchSnapshot();
    });
  });
});
