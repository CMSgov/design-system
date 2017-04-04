import Choice from './Choice';
import React from 'react';
import {shallow} from 'enzyme';

describe('Choice', () => {
  const label = 'George Washington';

  it('is not checked', () => {
    const props = {
      name: 'presidents',
      value: label
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);
    const input = wrapper.find('input');

    expect(input.prop('checked')).toBeUndefined();
  });

  it('is checked', () => {
    const props = {
      checked: true,
      name: 'presidents',
      value: label
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);
    const input = wrapper.find('input');

    expect(input.prop('checked')).toBe(true);
  });

  it('is a checkbox by default', () => {
    const props = {
      name: 'presidents',
      value: label
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);
    const input = wrapper.find('input');

    expect(input.prop('type')).toBe('checkbox');
  });

  it('is a radio button', () => {
    const props = {
      name: 'presidents',
      type: 'radio',
      value: label
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);
    const input = wrapper.find('input');

    expect(input.prop('type')).toBe('radio');
  });

  it('applies component class to input', () => {
    const props = {
      name: 'presidents',
      value: label
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);
    const input = wrapper.find('input');

    expect(input.hasClass('ds-c-choice')).toBe(true);
    expect(input.hasClass('ds-c-choice--inverse')).toBe(false);
  });

  it('applies inverse class to input', () => {
    const props = {
      inversed: true,
      name: 'presidents',
      value: label
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);
    const input = wrapper.find('input');

    expect(input.hasClass('ds-c-choice')).toBe(true);
    expect(input.hasClass('ds-c-choice--inverse')).toBe(true);
  });

  it('applies additional classNames to root element', () => {
    const props = {
      className: 'foo',
      name: 'presidents',
      value: label
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);

    expect(wrapper.hasClass('foo')).toBe(true);
  });

  it('sets a unique id', () => {
    const sharedProps = {
      name: 'presidents'
    };
    const wrapper = shallow(
      <div>
        <Choice value='a' {...sharedProps}>{label}</Choice>
        <Choice value='b' {...sharedProps}>{label}</Choice>
      </div>
    );
    const $wrapper = wrapper.render();
    const idRegex = new RegExp(`checkbox_${sharedProps.name}_[0-9]+`);
    const inputAId = $wrapper.find('input').eq(0).attr('id');
    const inputBId = $wrapper.find('input').eq(1).attr('id');

    // IDs should be unique!
    expect(inputAId).not.toBe(inputBId);

    // First Choice
    expect(inputAId).toMatch(idRegex);
    expect($wrapper.find('label').eq(0).attr('for')).toBe(inputAId);

    // Second choice
    expect(inputBId).toMatch(idRegex);
    expect($wrapper.find('label').eq(1).attr('for')).toBe(inputBId);
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
        onChange: onChangeMock,
        value: 'b'
      };

      wrapper = shallow(<Choice {...sharedProps}>{label}</Choice>);
    });

    it('calls the onChange handler', () => {
      wrapper.find('input').simulate('change');
      expect(onBlurMock.mock.calls.length).toBe(0);
      expect(onChangeMock.mock.calls.length).toBe(1);
    });

    it('calls the onChange handler', () => {
      wrapper.find('input').simulate('blur');
      expect(onBlurMock.mock.calls.length).toBe(1);
      expect(onChangeMock.mock.calls.length).toBe(0);
    });
  });
});
