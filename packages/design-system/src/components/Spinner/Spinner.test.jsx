import React from 'react';
import Spinner from './Spinner.jsx';
import { shallow } from 'enzyme';

function shallowRender(customProps = {}) {
  const props = Object.assign({}, customProps);

  return {
    props: props,
    wrapper: shallow(<Spinner {...props} />)
  };
}

describe('Spinner', () => {
  it('renders spinner', () => {
    const data = shallowRender();
    const wrapper = data.wrapper;

    expect(wrapper.is('span')).toBe(true);
  });

  it('returns correct default props', () => {
    const data = shallowRender();
    const wrapper = data.wrapper;

    expect(wrapper.prop('aria-valuetext')).toEqual('Loading');
    expect(wrapper.prop('role')).toEqual('progressbar');
  });

  it('returns default class names', () => {
    const data = shallowRender();
    const wrapper = data.wrapper;

    expect(wrapper.hasClass('ds-c-spinner')).toBe(true);
    expect(wrapper.hasClass('ds-u-fill--background-inverse')).toBe(false);
    expect(wrapper.hasClass('ds-u-color--base-inverse')).toBe(false);
    expect(wrapper.hasClass('ds-c-spinner--filled')).toBe(false);
  });

  it('adds additional class names', () => {
    const data = shallowRender({
      inversed: true,
      filled: true,
      size: 'small'
    });
    const wrapper = data.wrapper;

    expect(wrapper.hasClass('ds-u-fill--background-inverse')).toBe(true);
    expect(wrapper.hasClass('ds-u-color--base-inverse')).toBe(true);
    expect(wrapper.hasClass('ds-c-spinner--filled')).toBe(true);
    expect(wrapper.hasClass('ds-c-spinner--small')).toBe(true);
  });

  it('does not add the wrong class name for size prop', () => {
    const data = shallowRender({ size: 'big' });
    const wrapper = data.wrapper;

    expect(wrapper.hasClass('ds-c-spinner--big')).toBe(true);
    expect(wrapper.hasClass('ds-c-spinner--small')).toBe(false);
  });
});
