import { mount, shallow } from 'enzyme';
import Dropdown from './Dropdown';
import React from 'react';

const defaultProps = { name: 'dropdown', label: 'Select an option' };

/**
 * Helper method for shallow rendering the <Dropdown> component. The only props
 * initially defined are the required props.
 * @param {object} customProps - Additional props
 * @param {number} optionsCount - Total number of <option>'s
 * @return {object}
 */
function render(customProps = {}, deep = false) {
  const props = { ...defaultProps, ...customProps };
  const component = <Dropdown {...props} />;

  return {
    props: props,
    wrapper: deep ? mount(component) : shallow(component),
  };
}

describe('Dropdown', () => {
  it('renders a dropdown field', () => {
    const data = render({ value: '1', label: '', ariaLabel: 'test aria label' });

    expect(data.wrapper).toMatchSnapshot();
  });

  it('is inversed', () => {
    const data = render({ inversed: true });

    expect(data.wrapper.find('select').hasClass('ds-c-field--inverse')).toBe(true);
  });

  it('has error', () => {
    const data = render({ errorMessage: 'Error' });

    expect(data.wrapper.find('select').hasClass('ds-c-field--error')).toBe(true);
  });

  it('focuses the select when focusTrigger is passed', () => {
    const data = render(
      {
        id: 'focus',
        focusTrigger: true,
      },
      null,
      true
    );

    setTimeout(() => {
      expect(data.wrapper.find('select').props().id).toEqual(document.activeElement.id);
    }, 20);
  });
});
