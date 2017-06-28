import React from 'react';
import TextField from './TextField';
import {shallow} from 'enzyme';

function shallowRender(customProps = {}) {
  const props = Object.assign({
    label: 'Foo',
    name: 'spec-field'
  }, customProps);

  return {
    props: props,
    wrapper: shallow(<TextField {...props} />)
  };
}

describe('TextField', function() {
  it('is an input field', () => {
    const data = shallowRender();
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.is('input')).toBe(true);
    expect(field.prop('rows')).toBeUndefined();
    expect(field.prop('type')).toBe('text');
  });

  it('is a textarea', () => {
    const data = shallowRender({ multiline: true });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.is('textarea')).toBe(true);
    expect(field.prop('rows')).toBeUndefined();
    expect(field.prop('type')).toBeUndefined();
  });

  it('is a password field', () => {
    const data = shallowRender({ type: 'password' });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('type')).toBe('password');
  });

  it('is disabled', () => {
    const data = shallowRender({ disabled: true });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('disabled'))
      .toBe(data.props.disabled);
  });

  it('has a defaultValue', () => {
    const data = shallowRender({ defaultValue: 'Yay' });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('defaultValue'))
      .toBe(data.props.defaultValue);
    expect(field.prop('value'))
      .toBeUndefined();
  });

  it('has a value', () => {
    const data = shallowRender({ value: 'Yay' });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('value'))
      .toBe(data.props.value);
    expect(field.prop('defaultValue'))
      .toBeUndefined();
  });

  it('shows 5 rows of text', () => {
    const data = shallowRender({
      multiline: true,
      rows: 5
    });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('rows'))
      .toBe(data.props.rows);
  });

  it('has a unique id', () => {
    const fieldData1 = shallowRender();
    const fieldData2 = shallowRender();
    const field1 = fieldData1.wrapper.find('.ds-c-field').first();
    const label1 = fieldData1.wrapper.find('FormLabel').first();
    const field2 = fieldData2.wrapper.find('.ds-c-field').first();
    const idRegex = new RegExp('textfield_[0-9]+');

    expect(field1.prop('id')).toMatch(idRegex);
    expect(label1.prop('fieldId')).toBe(field1.prop('id'));
    expect(field1.prop('id')).not.toBe(field2.prop('id'));
  });

  it('has a label', () => {
    const data = shallowRender();
    const label = data.wrapper.find('FormLabel').first();

    expect(label.prop('children')).toBe(data.props.label);
  });

  it('has a hint', () => {
    const data = shallowRender({ hint: '123' });
    const label = data.wrapper.find('FormLabel').first();

    expect(label.prop('hint')).toBe(data.props.hint);
  });

  it('adds className to root element', () => {
    const data = shallowRender({ className: 'bar' });

    expect(data.wrapper.hasClass('bar'))
      .toBe(true);
  });

  it('adds className to field', () => {
    const data = shallowRender({ fieldClassName: 'bar' });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.hasClass('ds-c-field')).toBe(true);
    expect(field.hasClass('bar')).toBe(true);
  });

  it('adds className to label', () => {
    const data = shallowRender({ labelClassName: 'bar' });

    expect(data.wrapper.find('FormLabel').hasClass('bar'))
      .toBe(true);
  });

  describe('has error', () => {
    let data;

    beforeEach(() => {
      data = shallowRender({ errorMessage: 'Error' });
    });

    it('passes error to FormLabel', () => {
      expect(data.wrapper.find('FormLabel').prop('errorMessage'))
        .toBe(data.props.errorMessage);
    });

    it('adds error class to field', () => {
      expect(data.wrapper.find('.ds-c-field').first().hasClass('ds-c-field--error'))
        .toBe(true);
    });

    it('sets aria-describedby field attribute');
  });

  describe('has inversed theme', () => {
    let data;

    beforeEach(() => {
      data = shallowRender({ inversed: true });
    });

    it('passes inversed to FormLabel', () => {
      expect(data.wrapper.find('FormLabel').prop('inversed'))
        .toBe(true);
    });

    it('adds inversed class to field', () => {
      expect(data.wrapper.find('.ds-c-field').first().hasClass('ds-c-field--inverse'))
        .toBe(true);
    });
  });

  describe('event handlers', () => {
    let data;

    beforeEach(() => {
      data = shallowRender({
        onBlur: jest.fn(),
        onChange: jest.fn()
      });
    });

    it('calls onBlur', () => {
      data.wrapper.find('.ds-c-field').first().simulate('blur');

      expect(data.props.onBlur.mock.calls.length).toBe(1);
    });

    it('calls onChange', () => {
      data.wrapper.find('.ds-c-field').first().simulate('change');

      expect(data.props.onChange.mock.calls.length).toBe(1);
    });
  });
});
