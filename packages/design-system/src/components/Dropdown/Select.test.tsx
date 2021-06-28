import Select, { SelectProps } from './Select';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { generateOptions } from './Dropdown.test';

const defaultProps: SelectProps = {
  name: 'Select',
  errorPlacement: 'top',
  id: '1',
  setRef: jest.fn(),
  onBlur: jest.fn(),
  onChange: jest.fn(),
  options: [],
};

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

    expect(data.wrapper.length).toBe(1);
    expect(data.wrapper.children('option').length).toBe(1);
    expect(data.wrapper).toMatchSnapshot();
  });

  it('renders options correctly', () => {
    const data = render({ defaultValue: '1' }, 10);

    expect(data.wrapper.length).toBe(1);
    expect(data.wrapper.children('option').length).toBe(10);
    expect(data.wrapper).toMatchSnapshot();
  });

  it('selects <option>', () => {
    const controlledData = render({ value: '1' }, 4);
    const uncontrolledData = render({ defaultValue: '2' }, 4);

    expect(controlledData.wrapper.prop('defaultValue')).toBe(controlledData.props.defaultValue);
    expect(uncontrolledData.wrapper.prop('defaultValue')).toBe(uncontrolledData.props.defaultValue);
  });

  it('has a selected <option>', () => {
    const controlledData = render({ value: '1' }, 4);
    const uncontrolledData = render({ defaultValue: '2' }, 4);

    expect(controlledData.wrapper.prop('defaultValue')).toBe(controlledData.props.defaultValue);
    expect(uncontrolledData.wrapper.prop('defaultValue')).toBe(uncontrolledData.props.defaultValue);
  });

  it('applies additional classNames to select element', () => {
    const data = render({ fieldClassName: 'foo' });

    expect(data.wrapper.hasClass(data.props.fieldClassName)).toBe(true);
    // Make sure we're not replacing the other class names
    expect(data.wrapper.hasClass('ds-c-field')).toBe(true);
  });

  it('adds size classes to select element', () => {
    const mediumData = render({ size: 'medium' });
    const smallData = render({ size: 'small' });

    expect(mediumData.wrapper.hasClass('ds-c-field--medium')).toBe(true);
    expect(smallData.wrapper.hasClass('ds-c-field--small')).toBe(true);
  });

  it('is inversed', () => {
    const data = render({ inversed: true });

    expect(data.wrapper.hasClass('ds-c-field--inverse')).toBe(true);
  });

  it('has error', () => {
    const data = render({ errorMessage: 'Error' });

    expect(data.wrapper.prop('aria-invalid')).toBe(true);
    expect(data.wrapper.hasClass('ds-c-field--error')).toBe(true);
  });

  it('handles bottom placed error', () => {
    const data = render({
      errorMessage: 'Error',
      errorPlacement: 'bottom',
      errorId: '1_error',
    });

    expect(data.wrapper.prop('aria-invalid')).toBe(true);
    expect(data.wrapper.prop('aria-describedby')).toBe('1_error');
    expect(data.wrapper.hasClass('ds-c-field--error')).toBe(true);
    expect(data.wrapper).toMatchSnapshot();
  });

  it('is disabled', () => {
    const data = render({ disabled: true });

    expect(data.wrapper.prop('disabled')).toBe(true);
  });

  it('is not disabled', () => {
    const data = render();

    expect(data.wrapper.prop('disabled')).toBeUndefined();
  });

  describe('event handlers', () => {
    const wrapper = render().wrapper;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('calls the onChange handler', () => {
      wrapper.simulate('change');
      expect(defaultProps.onBlur).not.toHaveBeenCalled();
      expect(defaultProps.onChange).toHaveBeenCalled();
    });

    it('calls the onBlur handler', () => {
      wrapper.simulate('blur');
      expect(defaultProps.onBlur).toHaveBeenCalled();
      expect(defaultProps.onChange).not.toHaveBeenCalled();
    });
  });
});
