import { mount, shallow } from 'enzyme';
import InlineError from './InlineError';
import React from 'react';

const defaultProps = {
  children: 'Error message',
  id: 'error1',
  inversed: false,
};

function render(customProps = {}, deep = false) {
  const props = { ...defaultProps, ...customProps };
  const component = <InlineError {...props} />;

  return {
    props,
    wrapper: deep ? mount(component) : shallow(component),
  };
}

describe('InlineError', function () {
  it('renders inline error', () => {
    const data = render({});

    expect(data.wrapper.hasClass('ds-c-field__error-message')).toBe(true);
    expect(data.wrapper).toMatchSnapshot();
  });

  it('renders inverse error', () => {
    const data = render({ inversed: true });

    expect(data.wrapper.hasClass('ds-c-field__error-message--inverse')).toBe(true);
    expect(data.wrapper).toMatchSnapshot();
  });
});
