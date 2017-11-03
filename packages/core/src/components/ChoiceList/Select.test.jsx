import React from 'react';
import Select from './Select';
import { shallow } from 'enzyme';

/**
 * Generate <option> elements
 * @param {number} count
 */
function generateOptions(count) {
  const options = [];

  for (let i = 1; i < count + 1; i++) {
    options.push(
      <option key={i} value={String(i)}>
        {i}
      </option>
    );
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
function shallowRender(customProps = {}, optionsCount = 1) {
  const props = Object.assign(
    {
      name: 'presidents'
    },
    customProps
  );

  return {
    props: props,
    wrapper: shallow(
      <Select {...props}>{generateOptions(optionsCount)}</Select>
    )
  };
}

describe('Select', () => {
  it('renders a select menu', () => {
    const data = shallowRender();

    expect(data.wrapper.is('select')).toBe(true);
    expect(data.wrapper.prop('name')).toBe(data.props.name);
  });

  it('has correct class names', () => {
    const data = shallowRender();

    expect(data.wrapper.hasClass('ds-c-field')).toBe(true);
  });

  it("renders <option>'s as children", () => {
    const data = shallowRender({}, 10);

    expect(data.wrapper.children('option').length).toBe(10);
  });

  it('has a selected <option>', () => {
    const data = shallowRender(
      {
        defaultValue: '2' // the second generated option
      },
      4
    );
    const $wrapper = data.wrapper.render();

    expect(data.wrapper.prop('defaultValue')).toBe(data.props.defaultValue);
    expect($wrapper.find('option:selected').length).toBe(1);
    expect(
      $wrapper
        .find('option')
        .eq(1)
        .attr('selected')
    ).toBe('selected');
  });

  it('applies additional classNames to root element', () => {
    const data = shallowRender({ className: 'foo' });

    expect(data.wrapper.hasClass(data.props.className)).toBe(true);
    // Make sure we're not replacing the other class names
    expect(data.wrapper.hasClass('ds-c-field')).toBe(true);
  });

  it('is disabled', () => {
    const data = shallowRender({ disabled: true });

    expect(data.wrapper.prop('disabled')).toBe(true);
  });

  it('is not disabled', () => {
    const data = shallowRender();

    expect(data.wrapper.prop('disabled')).toBeUndefined();
  });

  it('is required', () => {
    const data = shallowRender({ required: true });

    expect(data.wrapper.prop('required')).toBe(true);
  });

  it('is inversed', () => {
    const data = shallowRender({ inversed: true });

    expect(data.wrapper.hasClass('ds-c-field--inverse')).toBe(true);
  });

  it('accepts a custom id', () => {
    const data = shallowRender({ id: 'custom_id' });

    expect(data.wrapper.prop('id')).toBe(data.props.id);
  });

  it('generates a unique id', () => {
    const data = shallowRender();
    const idRegex = new RegExp(`select_${data.props.name}_[0-9]+`);

    expect(data.wrapper.prop('id')).toMatch(idRegex);
  });

  describe('event handlers', () => {
    let wrapper;
    let onBlurMock;
    let onChangeMock;

    beforeEach(() => {
      onBlurMock = jest.fn();
      onChangeMock = jest.fn();

      const sharedProps = {
        name: 'presidents',
        onBlur: onBlurMock,
        onChange: onChangeMock
      };

      wrapper = shallow(
        <Select {...sharedProps}>{generateOptions(10)}</Select>
      );
    });

    it('calls the onChange handler', () => {
      wrapper.simulate('change');
      expect(onBlurMock.mock.calls.length).toBe(0);
      expect(onChangeMock.mock.calls.length).toBe(1);
    });

    it('calls the onBlur handler', () => {
      wrapper.simulate('blur');
      expect(onBlurMock.mock.calls.length).toBe(1);
      expect(onChangeMock.mock.calls.length).toBe(0);
    });
  });
});
