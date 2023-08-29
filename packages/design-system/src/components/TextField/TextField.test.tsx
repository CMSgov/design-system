import React from 'react';
import TextField from './TextField';
import { render, screen } from '@testing-library/react';
import { DATE_MASK } from './useLabelMask';
import userEvent from '@testing-library/user-event';

const defaultProps = {
  label: 'Foo',
  name: 'spec-field',
  id: 'static-id',
};

function renderTextField(customProps = {}) {
  return render(<TextField {...defaultProps} {...customProps} />);
}

describe('TextField', function () {
  it('renders', () => {
    expect(renderTextField().asFragment()).toMatchSnapshot();
  });

  it('renders with a label mask', () => {
    expect(renderTextField({ labelMask: DATE_MASK }).asFragment()).toMatchSnapshot();
  });

  it('renders with a mask', () => {
    expect(renderTextField({ mask: 'currency' }).asFragment()).toMatchSnapshot();
  });

  it('can accept custom ids', () => {
    const id = 'custom-id';
    const labelId = 'custom-label-id';
    const errorId = 'custom-error-id';
    const { container } = renderTextField({ id, labelId, errorId, errorMessage: 'hello' });
    expect(container.querySelector('input').id).toEqual(id);
    expect(container.querySelector('label').id).toEqual(labelId);
    expect(container.querySelector('.ds-c-inline-error').id).toEqual(errorId);
  });

  it('generates ids when no id is provided', () => {
    const { container } = renderTextField({ id: undefined });
    const idRegex = /text-field--\d+/;
    expect(container.querySelector('input').id).toMatch(idRegex);
    expect(container.querySelector('label').id).toMatch(idRegex);
  });

  it('calls onChange when user types', () => {
    const onChange = jest.fn();
    renderTextField({ onChange });
    const input = screen.getByRole('textbox') as HTMLInputElement;
    userEvent.click(input);
    userEvent.type(input, 'c');
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: expect.objectContaining({ value: 'c' }) })
    );
  });

  it('calls onBlur when input loses focus', () => {
    const onBlur = jest.fn();
    renderTextField({ onBlur });
    const input = screen.getByRole('textbox') as HTMLInputElement;
    userEvent.click(input);
    expect(onBlur).not.toHaveBeenCalled();
    userEvent.tab();
    expect(onBlur).toHaveBeenCalled();
  });
});
