import Alert from './Alert';
import React from 'react';
import {shallow} from 'enzyme';

describe('Alert', function() {
  const text = 'Ruhroh';

  it('should render alert', () => {
    const wrapper = shallow(<Alert>{text}</Alert>);
    const $body = wrapper.render().find('.ds-c-alert__body');

    expect(wrapper.hasClass('ds-c-alert')).toBe(true);
    expect(wrapper.prop('role')).toBeUndefined();
    expect($body.length).toBe(1);
    expect($body.text()).toBe(text);
  });

  it('should render a heading', () => {
    const props = { heading: 'Error' };
    const wrapper = shallow(<Alert {...props}>{text}</Alert>);
    const $heading = wrapper.render().find('.ds-c-alert__heading');

    expect($heading.length).toBe(1);
    expect($heading.text()).toBe(props.heading);
  });

  it('should appear as an error', () => {
    const props = {variation: 'error'};
    const wrapper = shallow(<Alert {...props}>{text}</Alert>);

    expect(wrapper.hasClass('ds-c-alert--error')).toBe(true);
  });

  it('should render additional className and role prop', () => {
    const props = {
      className: 'ds-u-test',
      role: 'alert'
    };
    const wrapper = shallow(<Alert {...props}>{text}</Alert>);

    expect(wrapper.hasClass('ds-u-test')).toBe(true);
    expect(wrapper.prop('role')).toBe('alert');
  });

  it('should render HTML children', () => {
    const wrapper = shallow(<Alert><p className='ds-text'>{text}</p></Alert>);
    const $p = wrapper.render().find('.ds-text');

    expect($p.length).toBe(1);
    expect($p.text()).toBe(text);
  });
});
