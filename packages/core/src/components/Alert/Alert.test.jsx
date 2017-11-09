import Alert from './Alert';
import React from 'react';
import { shallow } from 'enzyme';

const text = 'Ruhroh';

function render(props = {}, children = text) {
  return {
    props: props,
    wrapper: shallow(<Alert {...props}>{children}</Alert>)
  };
}

describe('Alert', function() {
  it('renders alert', () => {
    const { wrapper } = render();
    const $body = wrapper.render().find('.ds-c-alert__body');

    expect(wrapper.hasClass('ds-c-alert')).toBe(true);
    expect(wrapper.prop('role')).toBeUndefined();
    expect($body.length).toBe(1);
    expect($body.text()).toBe(text);
  });

  it('renders a heading', () => {
    const { props, wrapper } = render({ heading: 'Error' });
    const $heading = wrapper.render().find('.ds-c-alert__heading');

    expect($heading.length).toBe(1);
    expect($heading.text()).toBe(props.heading);
  });

  it('appears as an error', () => {
    const { wrapper } = render({ variation: 'error' });

    expect(wrapper.hasClass('ds-c-alert--error')).toBe(true);
  });

  it('renders additional className and role prop', () => {
    const { props, wrapper } = render({
      className: 'ds-u-test',
      role: 'alert'
    });

    expect(wrapper.hasClass(props.className)).toBe(true);
    expect(wrapper.prop('role')).toBe(props.role);
  });

  it('renders HTML children', () => {
    const { wrapper } = render({}, <p className="ds-text">{text}</p>);
    const $p = wrapper.render().find('.ds-text');

    expect($p.length).toBe(1);
    expect($p.text()).toBe(text);
  });

  it('hides icon', () => {
    const { wrapper } = render({ hideIcon: true });

    expect(wrapper.hasClass('ds-c-alert--hide-icon')).toBe(true);
  });
});
