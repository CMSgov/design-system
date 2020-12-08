import { mount, shallow } from 'enzyme';
import React from 'react';
import TextField from './TextField';

function render(customProps = {}, deep = false) {
  const props = Object.assign(
    {
      label: 'Foo',
      name: 'spec-field',
    },
    customProps
  );
  const component = <TextField {...props} />;

  return {
    props: props,
    wrapper: deep ? mount(component) : shallow(component),
  };
}

describe('TextField', function () {
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

  it('returns reference to input field', () => {
    let ref;
    const data = render(
      {
        defaultValue: 'Yay',
        inputRef: (el) => {
          ref = el;
        },
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
      expect(data.wrapper.find('FormLabel').prop('errorMessage')).toBe(data.props.errorMessage);
    });

    it('adds error class to field', () => {
      expect(data.wrapper.find('.ds-c-field').first().hasClass('ds-c-field--error')).toBe(true);
    });
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
      expect(data.wrapper.find('.ds-c-field').first().hasClass('ds-c-field--inverse')).toBe(true);
    });
  });

  it('focuses the input when focusTrigger is passed', () => {
    const data = render(
      {
        id: 'focus',
        focusTrigger: true,
      },
      true
    );

    setTimeout(() => {
      expect(data.wrapper.find('input').props().id).toEqual(document.activeElement.id);
    }, 20);
  });
});
