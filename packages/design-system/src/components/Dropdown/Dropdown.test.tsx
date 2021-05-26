import { mount, shallow } from 'enzyme';
import Dropdown from './Dropdown';
import React from 'react';

const defaultProps = { name: 'dropdown', label: 'Select an option' };

export function generateOptions(count: number): { value: string; label: string }[] {
  const options = [];

  for (let i = 1; i < count + 1; i++) {
    options.push({
      value: String(i),
      label: String(i),
    });
  }

  return options;
}

function render(customProps = {}, optionsCount = 1, deep = false) {
  const props = { ...defaultProps, ...customProps };
  const component = <Dropdown {...props} options={generateOptions(optionsCount)} />;

  return {
    props: props,
    wrapper: deep ? mount(component) : shallow(component),
  };
}

describe('Dropdown', () => {
  it('renders', () => {
    const data = render({ value: '1', label: '', ariaLabel: 'test aria label' });
    expect(data.wrapper).toMatchSnapshot();
  });
});
