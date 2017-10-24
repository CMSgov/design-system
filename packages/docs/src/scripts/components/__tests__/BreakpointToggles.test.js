jest.mock('../../shared/breakpoints', () => {
  return {
    sm: 100,
    lg: 200
  };
});

/* eslint-disable import/first */
import BreakpointToggles from '../BreakpointToggles';
import React from 'react';
import { shallow } from 'enzyme';
/* eslint-enable import/first */

function shallowRender(customProps = {}) {
  const props = Object.assign(
    {
      onClick: jest.fn()
    },
    customProps
  );

  return {
    props: props,
    wrapper: shallow(<BreakpointToggles {...props} />)
  };
}

describe('BreakpointToggles', () => {
  it('renders button for each breakpoint', () => {
    const wrapper = shallowRender().wrapper;
    expect(wrapper.find('button').length).toBe(2);
  });

  it('sets active breakpoint', () => {
    const wrapper = shallowRender({ activeBreakpoint: 'sm' }).wrapper;
    const buttonSm = wrapper.find('.bp-toggle--sm');
    const buttonLg = wrapper.find('.bp-toggle--lg');

    expect(buttonSm.hasClass('bp-toggle--active')).toBe(true);
    expect(buttonLg.hasClass('bp-toggle--active')).toBe(false);
  });

  it('calls onClick with breakpoint key', () => {
    const data = shallowRender();
    const buttonSm = data.wrapper.find('.bp-toggle--sm');

    buttonSm.simulate('click');
    expect(data.props.onClick.mock.calls.length).toBe(1);
    expect(data.props.onClick.mock.calls[0][0]).toBe('sm');
  });
});
