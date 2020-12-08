import { mount, shallow } from 'enzyme';
import React from 'react';
import Select from './Select';

const defaultProps = { name: 'Select', label: 'Select an option' };

/**
 * Generate <option> elements
 * @param {number} count
 */
function generateOptions(count) {
  const options = [];

  for (let i = 1; i < count + 1; i++) {
    options.push({
      value: String(i),
      label: String(i),
    });
  }

  return options;
}

/**
 * Helper method for shallow rendering the <Select> component. The only props
 * initially defined are the required props.
 * @param {object} customProps - Additional props
 * @param {number} optionsCount - Total number of <option>'s
 * @return {object}
 */
function render(customProps = {}, optionsCount = 1, deep = false) {
  const props = { ...defaultProps, ...customProps };
  const component = <Select {...props} options={generateOptions(optionsCount)} />;

  return {
    props: props,
    wrapper: deep ? mount(component) : shallow(component),
  };
}

describe('Select', () => {
  it('renders a select menu', () => {
    const data = render({ value: '1', label: '', ariaLabel: 'test aria label' });

    expect(data.wrapper.find('select').length).toBe(1);
    expect(data.wrapper.find('select').children('option').length).toBe(1);
    expect(data.wrapper).toMatchSnapshot();
  });

  it('renders options correctly', () => {
    const data = render({ defaultValue: '1' }, 10);

    expect(data.wrapper.find('select').length).toBe(1);
    expect(data.wrapper.find('select').children('option').length).toBe(10);
    expect(data.wrapper).toMatchSnapshot();
  });

  it('selects <option>', () => {
    const controlledData = render({ value: '1' }, 4);
    const uncontrolledData = render({ defaultValue: '2' }, 4);

    expect(controlledData.wrapper.find('select').prop('defaultValue')).toBe(
      controlledData.props.defaultValue
    );
    expect(uncontrolledData.wrapper.find('select').prop('defaultValue')).toBe(
      uncontrolledData.props.defaultValue
    );
  });

  it('has a selected <option>', () => {
    const controlledData = render({ value: '1' }, 4);
    const uncontrolledData = render({ defaultValue: '2' }, 4);

    expect(controlledData.wrapper.find('select').prop('defaultValue')).toBe(
      controlledData.props.defaultValue
    );
    expect(uncontrolledData.wrapper.find('select').prop('defaultValue')).toBe(
      uncontrolledData.props.defaultValue
    );
  });

  it('applies additional classNames to select element', () => {
    const data = render({ className: 'foo' });

    expect(data.wrapper.find('select').hasClass(data.props.className)).toBe(true);
    // Make sure we're not replacing the other class names
    expect(data.wrapper.find('select').hasClass('ds-c-field')).toBe(true);
  });

  it('adds size classes to select element', () => {
    const mediumData = render({ size: 'medium' });
    const smallData = render({ size: 'small' });

    expect(mediumData.wrapper.find('select').hasClass('ds-c-field--medium')).toBe(true);
    expect(smallData.wrapper.find('select').hasClass('ds-c-field--small')).toBe(true);
  });

  it('is disabled', () => {
    const data = render({ disabled: true });

    expect(data.wrapper.find('select').prop('disabled')).toBe(true);
  });

  it('is not disabled', () => {
    const data = render();

    expect(data.wrapper.find('select').prop('disabled')).toBeUndefined();
  });

  describe('event handlers', () => {
    let wrapper;
    let onBlurMock;
    let onChangeMock;

    beforeEach(() => {
      onBlurMock = jest.fn();
      onChangeMock = jest.fn();

      const sharedProps = {
        ...defaultProps,
        onBlur: onBlurMock,
        onChange: onChangeMock,
      };

      wrapper = shallow(<Select {...sharedProps} options={generateOptions(10)} />);
    });

    it('calls the onChange handler', () => {
      wrapper.find('select').simulate('change');
      expect(onBlurMock.mock.calls.length).toBe(0);
      expect(onChangeMock.mock.calls.length).toBe(1);
    });

    it('calls the onBlur handler', () => {
      wrapper.find('select').simulate('blur');
      expect(onBlurMock.mock.calls.length).toBe(1);
      expect(onChangeMock.mock.calls.length).toBe(0);
    });
  });
});
