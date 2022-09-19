import TextInput, { OmitProps, TextInputProps } from './TextInput';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

const defaultProps: Omit<React.ComponentPropsWithRef<'textarea'>, OmitProps> &
  Omit<React.ComponentPropsWithRef<'input'>, OmitProps> &
  TextInputProps = {
  name: 'spec-field',
  setRef: jest.fn(),
  id: '1',
  type: 'text',
  errorPlacement: 'top',
};

function renderInput(props = {}) {
  return render(<TextInput {...defaultProps} {...props} />);
}

function getInput() {
  return screen.getByRole('textbox');
}

describe('TextInput', function () {
  it('is an input field', () => {
    renderInput();

    expect(getInput().tagName).toBe('INPUT');
    expect(getInput().getAttribute('rows')).toBeNull();
    expect(getInput()).toMatchSnapshot();
  });

  it('is a textarea', () => {
    renderInput({ multiline: true });

    expect(getInput().tagName).toBe('TEXTAREA');
    expect(getInput().getAttribute('rows')).toBeNull();
    expect(getInput().getAttribute('type')).toBeNull();
    expect(getInput()).toMatchSnapshot();
  });

  it('is a password field', () => {
    const { container } = renderInput({ type: 'password' });
    // The password field doesn't have an accessible role!
    const input = container.querySelector('.ds-c-field'); // eslint-disable-line
    expect(input.getAttribute('type')).toBe('password');
  });

  it('is disabled', () => {
    renderInput({ disabled: true });
    expect(getInput().getAttribute('disabled')).toBe('');
  });

  it('has error', () => {
    renderInput({ errorMessage: 'Error' });
    expect(getInput().getAttribute('aria-invalid')).toBe('true');
    expect(getInput().classList.contains('ds-c-field--error')).toBe(true);
  });

  it('handles bottom placed error', () => {
    renderInput({
      errorMessage: 'Error',
      errorPlacement: 'bottom',
      errorId: '1_error',
      'aria-describedby': '1_label',
    });

    expect(getInput().getAttribute('aria-invalid')).toBe('true');
    expect(getInput().getAttribute('aria-describedby')).toBe('1_label 1_error');
    expect(getInput().classList.contains('ds-c-field--error')).toBe(true);
    expect(getInput()).toMatchSnapshot();
  });

  it('has inversed theme', () => {
    renderInput({ inversed: true });
    expect(getInput().classList.contains('ds-c-field--inverse')).toBe(true);
  });

  it('has a defaultValue', () => {
    renderInput({ defaultValue: 'Yay' });
    expect(getInput().getAttribute('value')).toEqual('Yay');
  });

  it('has a value', () => {
    const value = 'Yay';
    renderInput({ value });
    expect(getInput().getAttribute('value')).toBe(value);
  });

  it('shows 5 rows of text', () => {
    renderInput({
      multiline: true,
      rows: 5,
    });
    expect(getInput().getAttribute('rows')).toBe('5');
  });

  it('adds className to field', () => {
    renderInput({ fieldClassName: 'bar' });
    expect(getInput().classList.contains('ds-c-field')).toBe(true);
    expect(getInput().classList.contains('bar')).toBe(true);
  });

  it('adds size classes to input (small)', () => {
    renderInput({ size: 'small' });
    expect(getInput().classList.contains('ds-c-field--small')).toBe(true);
  });

  it('adds size classes to input (medium)', () => {
    renderInput({ size: 'medium' });
    expect(getInput().classList.contains('ds-c-field--medium')).toBe(true);
  });

  it('adds min/max input attributes', () => {
    renderInput({ min: 1, max: 10 });
    expect(getInput().getAttribute('min')).toBe('1');
    expect(getInput().getAttribute('max')).toBe('10');
  });

  it('adds aria-label attribute', () => {
    const ariaLabel = 'Foo';
    renderInput({ ariaLabel });
    expect(getInput().getAttribute('aria-label')).toBe(ariaLabel);
  });

  it('adds aria-describedby attribute', () => {
    renderInput({ 'aria-describedby': '1_label' });
    expect(getInput().getAttribute('aria-describedby')).toBe('1_label');
  });

  it('adds undocumented prop to input field', () => {
    renderInput({ 'data-foo': 'bar' });
    expect(getInput().getAttribute('data-foo')).toBe('bar');
  });

  it('calls onBlur', () => {
    const onBlur = jest.fn();
    renderInput({ onBlur });
    fireEvent.blur(getInput());
    expect(onBlur).toHaveBeenCalled();
  });

  it('calls onChange', () => {
    const onChange = jest.fn();
    renderInput({ onChange });
    fireEvent.change(getInput(), { target: { value: 'hello world' } });
    expect(onChange).toHaveBeenCalled();
  });
});
