import { mount, shallow } from 'enzyme';
import Dropdown from './Dropdown';
import React from 'react';

const defaultProps = { name: 'dropdown', label: 'Select an option' };

/**
 * Generate <option> elements
 * @param {number} count
 */
function generateOptions(count) {
  const options = [];

  for (let i = 1; i < count + 1; i++) {
    options.push({
      value: String(i),
      label: String(i)
    });
  }

  return options;
}

/**
 * Helper method for shallow rendering the <Dropdown> component. The only props
 * initially defined are the required props.
 * @param {object} customProps - Additional props
 * @param {number} optionsCount - Total number of <option>'s
 * @return {object}
 */
function render(customProps = {}, optionsCount = 1, deep = false) {
  const props = { ...defaultProps, ...customProps };
  const component = <Dropdown {...props} options={generateOptions(optionsCount)} />;

  return {
    props: props,
    wrapper: deep ? mount(component) : shallow(component)
  };
}

describe('Dropdown', () => {
  it('renders a select menu', () => {
    const data = render({ value: '1', ariaLabel: 'test aria label' });

    expect(data.wrapper.find('FormLabel').length).toBe(1);
    expect(data.wrapper.find('select').length).toBe(1);
    expect(data.wrapper.find('select').children('option').length).toBe(1);
    expect(data.wrapper).toMatchSnapshot();
  });

  it('renders options correctly', () => {
    const data = render({ defaultValue: '1' }, 10);

    expect(data.wrapper.find('FormLabel').length).toBe(1);
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

  it('applies additional classNames to root element', () => {
    const data = render({ className: 'foo' });

    expect(data.wrapper.hasClass(data.props.className)).toBe(true);
  });

  it('applies additional classNames to select element', () => {
    const data = render({ fieldClassName: 'foo' });

    expect(data.wrapper.find('select').hasClass(data.props.fieldClassName)).toBe(true);
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

  it('is inversed', () => {
    const data = render({ inversed: true });

    expect(data.wrapper.find('select').hasClass('ds-c-field--inverse')).toBe(true);
  });

  it('focuses the select when focusTrigger is passed', () => {
    const data = render(
      {
        id: 'focus',
        focusTrigger: true
      },
      null,
      true
    );

    expect(data.wrapper.find('select').props().id).toEqual(document.activeElement.id);
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
        onChange: onChangeMock
      };

      wrapper = shallow(<Dropdown {...sharedProps} options={generateOptions(10)} />);
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
