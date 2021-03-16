import Accordion from './Accordion';
import React from 'react';
import { shallow } from 'enzyme';

function render(customProps = {}) {
  const props = { ...customProps };
  return {
    props,
    wrapper: shallow(<Accordion {...props}></Accordion>),
  };
}

describe('Accordion', function () {
  it('renders accordion', () => {
    const { wrapper } = render();

    expect(wrapper.hasClass('ds-c-accordion')).toBe(true);
  });

  it('renders additional className', () => {
    const { wrapper } = render({
      className: 'ds-u-test',
    });

    expect(wrapper.hasClass('ds-u-test')).toBe(true);
  });

  it('renders ds-c-accordion--bordered class when a bordered prop is set', () => {
    const { wrapper } = render({
      bordered: true,
    });

    expect(wrapper.hasClass('ds-c-accordion--bordered')).toBe(true);
  });
});
