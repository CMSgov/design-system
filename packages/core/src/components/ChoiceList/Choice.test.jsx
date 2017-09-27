import Choice from './Choice';
import React from 'react';
import {shallow} from 'enzyme';

describe('Choice', () => {
  const label = 'George Washington';

  it('accepts a node as innerHTML', () => {
    const props = {
      name: 'presidents',
      value: label
    };
    const wrapper = shallow(<Choice {...props}><p><strong>Hello</strong> World</p></Choice>);
    const labelNode = wrapper.find('label');

    expect(labelNode.children().first().is('p')).toBe(true);
  });

  it('is not checked', () => {
    const props = {
      name: 'presidents',
      value: label
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);
    const input = wrapper.find('input');

    expect(input.prop('checked')).toBeUndefined();
    expect(input.prop('defaultChecked')).toBeUndefined();
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
    expect(input.prop('defaultChecked')).toBeUndefined();
  });

  it('is defaultChecked', () => {
    const props = {
      defaultChecked: true,
      name: 'presidents',
      value: label
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);
    const input = wrapper.find('input');

    expect(input.prop('checked')).toBeUndefined();
    expect(input.prop('defaultChecked')).toBe(true);
  });

  it('is required', () => {
    const props = {
      name: 'presidents',
      required: true,
      value: label
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);
    const input = wrapper.find('input');

    expect(input.prop('required')).toBe(true);
  });

  it('is a checkbox by default', () => {
    const props = {
      name: 'presidents',
      value: label
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);
    const input = wrapper.find('input');

    expect(input.prop('type')).toBe('checkbox');
    expect(input.prop('required')).toBeUndefined();
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

  it('applies className to input', () => {
    const props = {
      name: 'presidents',
      value: label
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);
    const input = wrapper.find('input');

    expect(input.hasClass('ds-c-choice')).toBe(true);
    expect(input.hasClass('ds-c-choice--inverse')).toBe(false);
  });

  it('applies inverse className to input', () => {
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

  it('places input on left by default', () => {
    const props = {
      name: 'presidents',
      value: label
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);
    const input = wrapper.find('input');

    expect(input.hasClass('ds-c-choice')).toBe(true);
    expect(input.hasClass('ds-c-choice--right')).toBe(false);
  });

  it('places input on right', () => {
    const props = {
      inputPlacement: 'right',
      name: 'presidents',
      value: label
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);
    const input = wrapper.find('input');

    expect(input.hasClass('ds-c-choice')).toBe(true);
    expect(input.hasClass('ds-c-choice--right')).toBe(true);
  });

  it('applies small className to input', () => {
    const props = {
      size: 'small',
      name: 'presidents',
      value: label
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);

    const input = wrapper.find('input');

    expect(input.hasClass('ds-c-choice')).toBe(true);
    expect(input.hasClass('ds-c-choice--small')).toBe(true);
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

  it('applies additional classNames to input element', () => {
    const props = {
      inputClassName: 'foo',
      name: 'presidents',
      value: label
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);
    const input = wrapper.find('input');

    expect(input.hasClass('foo')).toBe(true);
  });

  it('accepts a string value', () => {
    const props = {
      name: 'foo',
      value: 'bar'
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);
    const input = wrapper.find('input');

    expect(input.prop('value')).toBe(props.value);
  });

  it('accepts a number value', () => {
    const props = {
      name: 'foo',
      value: 100
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);
    const input = wrapper.find('input');

    expect(input.prop('value')).toBe(props.value);
  });

  it('accepts a custom id', () => {
    const props = {
      id: 'custom_id',
      name: 'foo',
      value: 100
    };
    const wrapper = shallow(<Choice {...props}>{label}</Choice>);
    const input = wrapper.find('input');
    const labelNode = wrapper.find('label');

    expect(input.prop('id')).toBe(props.id);
    expect(labelNode.prop('htmlFor')).toBe(props.id);
  });

  it('generates a unique id', () => {
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

    it('calls the onBlur handler', () => {
      wrapper.find('input').simulate('blur');
      expect(onBlurMock.mock.calls.length).toBe(1);
      expect(onChangeMock.mock.calls.length).toBe(0);
    });
  });
});
