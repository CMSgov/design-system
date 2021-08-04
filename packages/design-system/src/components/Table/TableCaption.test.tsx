import React from 'react';
import TableCaption from './TableCaption';
import { mount } from 'enzyme';

const defaultCaptionChildren = 'Foo';

function render(customProps = {}) {
  const props = Object.assign({}, customProps);
  const children = <TableCaption {...props}>{defaultCaptionChildren}</TableCaption>;

  return {
    props: props,
    wrapper: mount(<table>{children}</table>),
  };
}

describe('TableCaption', function () {
  it('renders a table caption', () => {
    const { wrapper } = render();
    const caption = wrapper.find('caption');

    expect(caption).toHaveLength(1);
    expect(caption.hasClass('ds-c-table__caption')).toBe(true);
    expect(caption.text()).toBe(defaultCaptionChildren);
  });

  it('applies additional classNames to caption', () => {
    const { wrapper } = render({ className: 'foo-caption' });
    const caption = wrapper.find('caption');

    expect(caption.hasClass('foo-caption')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });
});
