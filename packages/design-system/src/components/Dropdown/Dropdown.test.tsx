import React from 'react';
import { act, render, screen } from '@testing-library/react';
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

function getButton() {
  return screen.getByRole('button', { name: RegExp(defaultProps.label) });
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

    const button = getButton();
    expect(button).toHaveClass('foo');
    // Make sure we're not replacing the other class names
    expect(button).toHaveClass('ds-c-field');
  });

  it('adds size classes to the appropriate elements', () => {
    makeDropdown({ size: 'small' });
    const button = getButton();
    userEvent.click(button);
    const listContainer = screen.getByRole('listbox').parentElement;
    expect(button).toHaveClass('ds-c-field--small');
    expect(listContainer).toHaveClass('ds-c-field--small');
  });

  it('adds inverse class to button', () => {
    makeDropdown({ inversed: true });
    const button = getButton();
    expect(button).toHaveClass('ds-c-field--inverse');
  });

  it('shows error message', () => {
    const errorId = 'my-error';
    const { container } = makeDropdown({
      errorMessage: 'Error',
      errorPlacement: 'top',
      errorId,
    });

    const button = getButton();
    expect(button).toHaveAttribute('aria-invalid', 'true');
    expect(button).toHaveAttribute('aria-describedby', errorId);
    expect(button).toHaveClass('ds-c-field--error');

    const error = container.querySelector(`#${errorId}`);
    expect(error).toMatchSnapshot();
  });

  it('supports bottom placed error', () => {
    const errorId = 'my-error';
    const { container } = makeDropdown({
      errorMessage: 'Error',
      errorPlacement: 'bottom',
      errorId,
    });

    const button = screen.getByRole('combobox');
    expect(button).toHaveAttribute('aria-invalid', 'true');
    expect(button).toHaveAttribute('aria-describedby', errorId);
    expect(button).toHaveClass('ds-c-field--error');

    const dropdown = container.querySelector('.ds-c-dropdown');
    const error = container.querySelector(`#${errorId}`);
    expect(dropdown.lastChild).toEqual(error);
  });

  it('is disabled', () => {
    makeDropdown({ disabled: true });
    const button = getButton();
    expect(button).toHaveAttribute('disabled');
  });

  it('calls the onChange handler', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    makeDropdown({ value: '1', onChange, onBlur }, 5);
    const button = getButton();
    userEvent.click(button);
    userEvent.keyboard('{arrowdown}');
    userEvent.keyboard('{enter}');
    expect(onBlur).not.toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();
  });

  it('calls the onBlur handler', async () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    render(
      <>
        <Dropdown
          {...defaultProps}
          {...{ defaultValue: '1', onChange, onBlur }}
          options={generateOptions(10)}
        />
        <button>Another button to tab to</button>
      </>
    );
    const button = getButton();
    userEvent.click(button);
    userEvent.tab();

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await act(async () => {
      await sleep(40);
    });

    expect(onBlur).toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('pressing Escape closes the menu without making a selection', () => {
    const onChange = jest.fn();
    makeDropdown({ value: '1', onChange }, 5);
    const button = getButton();
    userEvent.click(button);
    userEvent.keyboard('{arrowdown}');
    userEvent.keyboard('{escape}');
    const list = screen.queryByRole('listbox');
    expect(list).toBeFalsy();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('pressing Tab selects the focused item and blurs away', async () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    render(
      <>
        <Dropdown
          {...defaultProps}
          {...{ defaultValue: '1', onChange, onBlur }}
          options={generateOptions(10)}
        />
        <button>Another button to tab to</button>
      </>
    );
    const button = getButton();
    userEvent.click(button);
    userEvent.keyboard('{arrowdown}');
    userEvent.tab();

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await act(async () => {
      await sleep(40);
    });

    const list = screen.queryByRole('listbox');
    expect(list).toBeFalsy();
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0].currentTarget.value).toEqual('2');
    expect(onBlur).toHaveBeenCalled();
  });

  it('automatically focuses on the selected option when opening', () => {
    makeDropdown({ defaultValue: '3' }, 10);
    const button = getButton();
    userEvent.click(button);
    const options = screen.getAllByRole('option');
    expect(options[2]).toHaveFocus();
  });

  it('focuses automatically with autoFocus prop', () => {
    makeDropdown({ defaultValue: '1', autoFocus: true }, 10);
    const button = getButton();
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
    userEvent.click(getButton());
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
    userEvent.click(getButton());
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
    userEvent.click(getButton());
    const list = screen.getByRole('listbox');
    expect(list.children.length).toEqual(3);
  });

  it('passes arbitrary attributes to rendered options', () => {
    render(
      <Dropdown {...defaultProps}>
        <option value="1">Option 1</option>
        <option value="2" data-hello-world="hi">
          Option 2
        </option>
        <option value="3">Option 3</option>
      </Dropdown>
    );
    userEvent.click(getButton());
    const options = screen.getAllByRole('option');
    expect(options[1]).toHaveAttribute('data-hello-world', 'hi');
  });

  it('passes arbitrary attributes to rendered optgroups', () => {
    const { container } = render(
      <Dropdown {...defaultProps}>
        <option value="1">Option 1</option>
        <optgroup label="Group B" id="group-label-id" data-extra-attribute="something">
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </optgroup>
      </Dropdown>
    );
    userEvent.click(getButton());
    const groupLabel = container.querySelector('#group-label-id');
    expect(groupLabel).toHaveAttribute('data-extra-attribute', 'something');
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
    const button = getButton();
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
