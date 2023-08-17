import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown from './Dropdown';

const defaultProps = {
  name: 'dropdown',
  label: 'Select an option',
  id: 'static-id',
  onBlur: jest.fn(),
  onChange: jest.fn((e) => {
    e.stopPropagation();
  }),
};

export function generateOptions(count: number): { value: string; label: string }[] {
  const options = [];

  for (let i = 1; i < count + 1; i++) {
    options.push({
      value: String(i),
      label: String(i),
    });
  }

  return options;
}

function makeDropdown(customProps = {}, optionsCount = 1) {
  const props = { ...defaultProps, ...customProps };
  const component = <Dropdown {...props} options={generateOptions(optionsCount)} />;

  return render(component);
}

describe('Dropdown', () => {
  it('dropdown matches snapshot', () => {
    const { container } = makeDropdown(
      {
        value: '2',
      },
      4
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('applies additional classes to root element', () => {
    const { container } = makeDropdown({ className: 'bar' });
    expect(container.firstChild).toHaveClass('bar');
    // Make sure we're not replacing the other class names
    expect(container.firstChild).toHaveClass('ds-c-dropdown');
  });

  it('applies additional classes to button element', () => {
    makeDropdown({ fieldClassName: 'foo' });

    const button = screen.getByRole('combobox');
    expect(button).toHaveClass('foo');
    // Make sure we're not replacing the other class names
    expect(button).toHaveClass('ds-c-field');
  });

  it('adds size classes to the appropriate elements', () => {
    makeDropdown({ size: 'small' });
    const button = screen.getByRole('combobox');
    userEvent.click(button);
    const listContainer = screen.getByRole('listbox').parentElement;
    expect(button).toHaveClass('ds-c-field--small');
    expect(listContainer).toHaveClass('ds-c-field--small');
  });

  it('adds inverse class to button', () => {
    makeDropdown({ inversed: true });
    const button = screen.getByRole('combobox');
    expect(button).toHaveClass('ds-c-field--inverse');
  });

  it('has error', () => {
    makeDropdown({ errorMessage: 'Really bad error' });
    const button = screen.getByRole('combobox', { name: /Really bad error/ });
    expect(button).toHaveAttribute('aria-invalid', 'true');
  });

  it('supports bottom placed error', () => {
    const { container } = makeDropdown({
      errorMessage: 'Error',
      errorPlacement: 'bottom',
      errorId: '1_error',
    });

    const button = screen.getByRole('combobox');
    expect(button).toHaveAttribute('aria-invalid', 'true');
    expect(button).toHaveAttribute('aria-describedby', '1_error');
    expect(button).toHaveClass('ds-c-field--error');
    expect(container).toMatchSnapshot();
  });

  it('is disabled', () => {
    makeDropdown({ disabled: true });
    const button = screen.getByRole('combobox');
    expect(button).toHaveAttribute('disabled');
  });

  it('calls the onChange handler', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    makeDropdown({ value: '1', onChange, onBlur }, 5);
    const button = screen.getByRole('combobox');
    userEvent.click(button);
    userEvent.keyboard('{arrowdown}');
    userEvent.keyboard('{enter}');
    expect(onBlur).not.toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();
  });

  it('calls the onBlur handler', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    makeDropdown({ defaultValue: '1', onChange, onBlur }, 10);
    const button = screen.getByRole('combobox');
    userEvent.click(button);
    expect(button).toHaveFocus();
    userEvent.tab();
    expect(onBlur).toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('focuses automatically with autoFocus prop', () => {
    makeDropdown({ defaultValue: '1', autoFocus: true }, 10);
    const button = screen.getByRole('combobox');
    expect(button).toHaveFocus();
  });

  it('accepts optgroup children', () => {
    render(
      <Dropdown {...defaultProps}>
        <optgroup label="Group A">
          <option value="a-1">Option A-1</option>
          <option value="a-2">Option A-2</option>
          <option value="a-3">Option A-3</option>
        </optgroup>
        <optgroup label="Group B">
          <option value="b-1">Option B-1</option>
          <option value="b-2">Option B-2</option>
          <option value="b-3">Option B-3</option>
        </optgroup>
      </Dropdown>
    );
    userEvent.click(screen.getByRole('combobox'));
    expect(screen.getAllByRole('option').length).toEqual(6);
    const list = screen.getByRole('listbox');
    expect(list).toMatchSnapshot();
  });

  it('accepts DropdownOptGroup objects in options prop', () => {
    const options = [
      {
        label: 'Group A',
        options: [
          { value: 'a-1', label: 'Option A-1' },
          { value: 'a-2', label: 'Option A-2' },
          { value: 'a-3', label: 'Option A-3' },
        ],
      },
      {
        label: 'Group B',
        options: [
          { value: 'b-1', label: 'Option B-1' },
          { value: 'b-2', label: 'Option B-2' },
          { value: 'b-3', label: 'Option B-3' },
        ],
      },
    ];
    render(<Dropdown {...defaultProps} options={options} />);
    userEvent.click(screen.getByRole('combobox'));
    const list = screen.getByRole('listbox');
    expect(list.children.length).toEqual(2); // Groups
    const items = screen.getAllByRole('option');
    expect(items.length).toEqual(6);
  });

  it('accepts option children', () => {
    render(
      <Dropdown {...defaultProps}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Dropdown>
    );
    userEvent.click(screen.getByRole('combobox'));
    const list = screen.getByRole('listbox');
    expect(list.children.length).toEqual(3);
  });

  it('passes through a ref', () => {
    const inputRefCallback = jest.fn();
    render(
      <Dropdown {...defaultProps} inputRef={inputRefCallback}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Dropdown>
    );
    expect(inputRefCallback).toHaveBeenCalled();
  });

  it('can be a controlled component', () => {
    const onChange = jest.fn();
    const options = generateOptions(3);
    const baseProps = { ...defaultProps, onChange, options };
    const { rerender } = render(<Dropdown {...baseProps} value="2" />);
    const button = screen.getByRole('combobox');
    expect(button.textContent).toEqual(options[1].label);

    // Clicking an item should call `onChange` but should do nothing else
    // because this is a controlled component
    userEvent.click(button);
    userEvent.keyboard('{arrowdown}');
    userEvent.keyboard('{enter}');
    expect(onChange).toHaveBeenCalled();
    expect(button.textContent).toEqual(options[1].label);

    // But then if we re-render with a different option selected, it should update
    rerender(<Dropdown {...baseProps} value="3" />);
    expect(button.textContent).toEqual(options[2].label);
  });
});
