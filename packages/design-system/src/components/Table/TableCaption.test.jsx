import React from 'react';
import Table from './Table';
import TableCaption from './TableCaption';
import { mount } from 'enzyme';

const defaultCaptionChildren = 'Foo';

function render(customProps = {}, captionProps = {}, children) {
  const props = Object.assign({}, customProps);
  const captProps = Object.assign({}, captionProps);

  if (!children) {
    children = <TableCaption {...captProps}>{defaultCaptionChildren}</TableCaption>;
  }

  return {
    props: props,
    wrapper: mount(<Table {...props}>{children}</Table>),
  };
}

describe('TableCaption', function () {
  it('renders a table caption', () => {
    const { wrapper } = render();
    const table = wrapper.find('caption');

    expect(table).toHaveLength(1);
    expect(table.hasClass('ds-c-table__caption')).toBe(true);
  });

  it('applies additional classNames', () => {
    const { wrapper } = render(undefined, { className: 'foo-caption' });
    const table = wrapper.find('caption');

    expect(table.hasClass('foo-caption')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });

  it('applies scroll table wrapper and classes', () => {
    const { wrapper } = render({ scrollable: true });
    const divWrapper = wrapper.find('div');
    const table = wrapper.find('table');

    expect(divWrapper.hasClass('ds-c-table__wrapper')).toBe(true);
    expect(divWrapper.prop('role')).toBe('region');
    expect(divWrapper.prop('aria-live')).toBe('polite');
    expect(divWrapper.prop('aria-relevant')).toBe('additions');
    expect(divWrapper.prop('tabindex')).toBeUndefined();

    expect(table.hasClass('ds-c-table')).toBe(true);
    expect(table.prop('id')).toBe(divWrapper.prop('aria-labelleby'));

    expect(wrapper).toMatchSnapshot();
  });
});
