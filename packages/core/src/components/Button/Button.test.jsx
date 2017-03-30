import React from 'react';
import {shallow} from 'enzyme';

import Button from './Button.jsx';

describe('Button', () => {
  const buttonText = 'required label';

  function testDisabledState(disabled) {
    const onClickMock = jest.fn();
    const expectedCallCount = disabled ? 0 : 1;
    const props = {
      onClick: onClickMock,
      disabled: disabled
    };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);

    wrapper.simulate('click');

    expect(wrapper.text()).toBe(buttonText);
    expect(wrapper.prop('disabled')).toBe(disabled);
    expect(wrapper.hasClass('ds-c-button--disabled')).toBe(disabled);
    expect(onClickMock.mock.calls.length).toBe(expectedCallCount);
  }

  it('appears disabled', () => {
    testDisabledState(true);
  });

  it('appears enabled', () => {
    testDisabledState(false);
  });

  it('renders as button', () => {
    const wrapper = shallow(<Button>{buttonText}</Button>);
    expect(wrapper.prop('type')).toBe('button');
  });

  it('renders as submit button', () => {
    const props = {type: 'submit'};
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);
    expect(wrapper.prop('type')).toBe('submit');
  });

  it('appends additional class names', () => {
    const props = {className: 'foobar'};
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);
    expect(wrapper.hasClass('foobar')).toBe(true);
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
  });

  it('renders as a success button', () => {
    const props = {modifier: 'success'};
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);

    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--success')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--primary')).toBe(false);
  });

  it('renders as a small button', () => {
    const props = {size: 'small'};
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);

    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--small')).toBe(true);
  });

  it('overrides modifier class when disabled', () => {
    const props = {
      disabled: true,
      modifier: 'primary'
    };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);

    expect(wrapper.hasClass('ds-c-button--disabled')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--primary')).toBe(false);
  });

  it('applies inverse suffix to modifier class', () => {
    const props = {
      inverse: true,
      modifier: 'transparent'
    };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);

    expect(wrapper.hasClass('ds-c-button--transparent-inverse')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--transparent')).toBe(false);
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--inverse')).toBe(false);
  });

  it('applies inverse suffix to disabled class', () => {
    const props = {
      inverse: true,
      disabled: true
    };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);

    expect(wrapper.hasClass('ds-c-button--disabled-inverse')).toBe(true);
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
  });

  it('applies inverse suffix to default button class', () => {
    const props = {inverse: true};
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);

    expect(wrapper.hasClass('ds-c-button--inverse')).toBe(true);
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
  });
});
