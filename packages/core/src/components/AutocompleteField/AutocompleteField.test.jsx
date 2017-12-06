import { mount, shallow } from 'enzyme';
import React from 'react';
import TextField from './TextField';

function render(customProps = {}, deep = false) {
  const props = Object.assign(
    {
      label: 'Foo',
      name: 'spec-field'
    },
    customProps
  );
  const component = <TextField {...props} />;

  return {
    props: props,
    wrapper: deep ? mount(component) : shallow(component)
  };
}

describe('TextField', function() {
  it('is an input field', () => {
    const data = render();
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.is('input')).toBe(true);
    expect(field.prop('rows')).toBeUndefined();
    expect(field.prop('type')).toBe('text');
  });

  it('is a textarea', () => {
    const data = render({ multiline: true });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.is('textarea')).toBe(true);
    expect(field.prop('rows')).toBeUndefined();
    expect(field.prop('type')).toBeUndefined();
  });

  it('is a password field', () => {
    const data = render({ type: 'password' });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('type')).toBe('password');
  });

  it('is disabled', () => {
    const data = render({ disabled: true });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('disabled')).toBe(data.props.disabled);
  });

  it('has a defaultValue', () => {
    const data = render({ defaultValue: 'Yay' });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('defaultValue')).toBe(data.props.defaultValue);
    expect(field.prop('value')).toBeUndefined();
  });

  it('has a value', () => {
    const data = render({ value: 'Yay' });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('value')).toBe(data.props.value);
    expect(field.prop('defaultValue')).toBeUndefined();
  });

  it('shows 5 rows of text', () => {
    const data = render({
      multiline: true,
      rows: 5
    });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('rows')).toBe(data.props.rows);
  });

  it('has a unique id', () => {
    const fieldData1 = render();
    const fieldData2 = render();
    const field1 = fieldData1.wrapper.find('.ds-c-field').first();
    const label1 = fieldData1.wrapper.find('FormLabel').first();
    const field2 = fieldData2.wrapper.find('.ds-c-field').first();
    const idRegex = new RegExp('textfield_[0-9]+');

    expect(field1.prop('id')).toMatch(idRegex);
    expect(label1.prop('fieldId')).toBe(field1.prop('id'));
    expect(field1.prop('id')).not.toBe(field2.prop('id'));
  });

  it('has a label', () => {
    const data = render();
    const label = data.wrapper.find('FormLabel').first();

    expect(label.prop('children')).toBe(data.props.label);
  });

  it('has a hint', () => {
    const data = render({ hint: '123' });
    const label = data.wrapper.find('FormLabel').first();

    expect(label.prop('hint')).toBe(data.props.hint);
  });

  it('adds className to root element', () => {
    const data = render({ className: 'bar' });

    expect(data.wrapper.hasClass('bar')).toBe(true);
  });

  it('adds className to field', () => {
    const data = render({ fieldClassName: 'bar' });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.hasClass('ds-c-field')).toBe(true);
    expect(field.hasClass('bar')).toBe(true);
  });

  it('adds className to label', () => {
    const data = render({ labelClassName: 'bar' });

    expect(data.wrapper.find('FormLabel').hasClass('bar')).toBe(true);
  });

  it('adds min/max input attributes', () => {
    const data = render({
      max: 10,
      min: 1
    });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('max')).toBe(data.props.max);
    expect(field.prop('min')).toBe(data.props.min);
  });

  it('adds undocumented prop to input field', () => {
    const data = render({
      'data-foo': 'bar'
    });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('data-foo')).toBe(data.props['data-foo']);
  });

  it('returns reference to input field', () => {
    let ref;
    const data = render(
      {
        defaultValue: 'Yay',
        fieldRef: el => {
          ref = el;
        }
      },
      true
    );

    expect(ref.value).toBe(data.props.defaultValue);
  });

  describe('has error', () => {
    let data;

    beforeEach(() => {
      data = render({ errorMessage: 'Error' });
    });

    it('passes error to FormLabel', () => {
      expect(data.wrapper.find('FormLabel').prop('errorMessage')).toBe(
        data.props.errorMessage
      );
    });

    it('adds error class to field', () => {
      expect(
        data.wrapper
          .find('.ds-c-field')
          .first()
          .hasClass('ds-c-field--error')
      ).toBe(true);
    });

    it('sets aria-describedby field attribute');
  });

  describe('has inversed theme', () => {
    let data;

    beforeEach(() => {
      data = render({ inversed: true });
    });

    it('passes inversed to FormLabel', () => {
      expect(data.wrapper.find('FormLabel').prop('inversed')).toBe(true);
    });

    it('adds inversed class to field', () => {
      expect(
        data.wrapper
          .find('.ds-c-field')
          .first()
          .hasClass('ds-c-field--inverse')
      ).toBe(true);
    });
  });

  describe('event handlers', () => {
    let data;

    beforeEach(() => {
      data = render({
        onBlur: jest.fn(),
        onChange: jest.fn()
      });
    });

    it('calls onBlur', () => {
      data.wrapper
        .find('.ds-c-field')
        .first()
        .simulate('blur');

      expect(data.props.onBlur.mock.calls.length).toBe(1);
    });

    it('calls onChange', () => {
      data.wrapper
        .find('.ds-c-field')
        .first()
        .simulate('change');

      expect(data.props.onChange.mock.calls.length).toBe(1);
    });
  });
});
