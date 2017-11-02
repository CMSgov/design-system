import React from 'react';
import Spinner from './Spinner.jsx';
import { shallow } from 'enzyme';

function shallowRender(customProps = {}) {
  const props = Object.assign(
    {
      items: [{ label: 'Foo' }, { label: 'Bar' }]
    },
    customProps
  );

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
    expect(wrapper.hasClass('ds-c-spinner')).toBe(true);
    expect(wrapper.hasClass('ds-u-fill--background-inverse')).toBe(false);
    expect(wrapper.hasClass('ds-u-color--base-inverse')).toBe(false);
    expect(wrapper.hasClass('ds-c-spinner--filled')).toBe(false);
  });
});
