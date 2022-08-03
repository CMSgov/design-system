import { TextField, unmaskValue } from './TextField';
import { mount, shallow } from 'enzyme';
import React from 'react';

function render(customProps = {}, deep = false) {
  const props = Object.assign(
    {
      label: 'Foo',
      name: 'spec-field',
    },
    customProps
  );
  const component = <TextField {...props} />;

  return {
    props: props,
    wrapper: deep ? mount(component) : shallow(component),
  };
}

describe('TextField', function () {
  it('renders', () => {
    const data = render();
    expect(data.wrapper).toMatchSnapshot();
  });

  it('exports unmaskValue method', () => {
    expect(typeof unmaskValue).toBe('function');
  });
});
