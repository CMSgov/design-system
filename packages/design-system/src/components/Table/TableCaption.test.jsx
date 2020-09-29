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
    const caption = wrapper.find('caption');

    expect(caption).toHaveLength(1);
    expect(caption.hasClass('ds-c-table__caption')).toBe(true);
  });

  it('applies additional classNames to caption', () => {
    const { wrapper } = render(undefined, { className: 'foo-caption' });
    const caption = wrapper.find('caption');

    expect(caption.hasClass('foo-caption')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });

  describe('table caption scrollable true', () => {
    it('applies scroll table wrapper and classes', () => {
      const { wrapper } = render({ scrollable: true });
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
      const { wrapper } = render({ scrollable: true });
      const divWrapper = wrapper.find('div');
      const caption = wrapper.find('caption');

      expect(caption.prop('id')).toBe(divWrapper.prop('aria-labelledby'));
    });

    it('contains scroll table notice ', () => {
      const { wrapper } = render({ scrollable: true });
      const tableCaption = wrapper.find('TableCaption');

      expect(tableCaption.prop('_scrollableNotice')).toBeDefined();
    });

    it('applies scrollableNotice', () => {
      const { wrapper } = render({ scrollable: true, scrollableNotice: 'foo scrollable notice' });
      const tableCaption = wrapper.find('TableCaption');

      expect(tableCaption.prop('_scrollableNotice')).toBe('foo scrollable notice');

      expect(wrapper).toMatchSnapshot();
    });
  });
});
