import Autocomplete from './Autocomplete';
import TextField from '../TextField/TextField';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useEffect, useRef } from 'react';

const defaultItems = [{ id: 'kRf6c2fY', name: 'Cook County, IL' }];
const updatedItems = [{ id: 'Yf2c6fRk', name: 'Marion County, OR' }];

function makeAutocomplete(customProps = {}) {
  const props = {
    items: defaultItems,
    children: <TextField label="autocomplete" name="autocomplete_field" />,
    id: 'static-id',
    ...customProps,
  };
  return <Autocomplete {...props} />;
}

function renderAutocomplete(customProps = {}) {
  return render(makeAutocomplete(customProps));
}

function open() {
  const autocompleteField = screen.getByRole('combobox');
  userEvent.click(autocompleteField);
  userEvent.type(autocompleteField, 'c');
}

function expectMenuToBeOpen() {
  expect(screen.getByRole('listbox')).toBeInTheDocument();
}

function expectMenuToBeClosed() {
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('Autocomplete', () => {
  it('renders a closed Autocomplete component', () => {
    const { container } = renderAutocomplete();

    const wrapperEl = container.querySelectorAll('.ds-c-autocomplete');
    expect(wrapperEl.length).toEqual(1);

    const input = screen.getByRole('combobox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
    expect(input).toHaveAttribute('aria-controls');
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(input).toHaveAttribute('role', 'combobox');
    expect(input).toHaveAttribute('type', 'text');

    const labelId = input.getAttribute('aria-labelledby');
    const label = container.querySelector(`#${labelId}`);
    expect(label).toBeInTheDocument();

    const menuEl = container.querySelector('.ds-c-autocomplete__menu-container');
    expect(menuEl).not.toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.classList).toContain('ds-c-autocomplete__clear-btn');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAccessibleName('Clear search to try again');
  });

  it('renders items', () => {
    renderAutocomplete();

    open();
    expectMenuToBeOpen();

    const items = screen.getByRole('option');
    expect(items).toBeInTheDocument();
    expect(items).toHaveTextContent('Cook County, IL');
  });

  it('renders items with children property', () => {
    const items = [
      {
        id: '1',
        name: 'Carrots (1)',
        children: (
          <>
            Carrots <strong>(1)</strong>
          </>
        ),
      },
      {
        id: '2',
        name: 'Cookies (3)',
        children: (
          <>
            Cookies <strong>(3)</strong>
          </>
        ),
      },
      {
        id: '3',
        name: 'Crackers (2)',
        children: (
          <>
            Crackers <strong>(2)</strong>
          </>
        ),
      },
      {
        id: '4',
        name: 'Search all snacks',
        children: <a href="https://duckduckgo.com/?q=snacks">Search all snacks</a>,
      },
    ];

    renderAutocomplete({ items });
    open();
    const ul = screen.getByRole('listbox');
    expect(ul).toMatchSnapshot();
  });

  it('generates ids when no id is provided', () => {
    renderAutocomplete({ id: undefined });
    open();
    const idRegex = /autocomplete--\d+/;
    expect(screen.getByRole('listbox').id).toMatch(idRegex);
    expect(screen.getByRole('combobox').id).toMatch(idRegex);
  });

  it('renders item with custom className', () => {
    const items = [
      { id: '1a', name: 'Normal item' },
      { id: '5b', name: 'Special item', className: 'custom-class' },
    ];
    renderAutocomplete({ items });

    open();
    expectMenuToBeOpen();

    const listItems = screen.queryAllByRole('option');
    expect(listItems[1]).toHaveClass('custom-class');
    expect(listItems).toMatchSnapshot();
  });

  it('renders Autocomplete component without items', () => {
    renderAutocomplete({ items: undefined });
    open();
    expectMenuToBeClosed();
  });

  it('renders grouped items with headers', () => {
    const items = [
      {
        label: 'Group 1',
        id: 'group-1',
        items: [
          { id: '1', name: 'Option 1' },
          { id: '2', name: 'Option 2' },
        ],
      },
      {
        label: 'Group 2',
        id: 'group-2',
        items: [
          { id: '3', name: 'Option 3' },
          { id: '4', name: 'Option 4' },
        ],
      },
    ];

    renderAutocomplete({ items });

    open();
    const groups = screen.getAllByRole('group');
    expect(groups).toHaveLength(2);
    expect(groups[0]).toHaveAccessibleName('Group 1');
    expect(groups[1]).toHaveAccessibleName('Group 2');

    const headers = screen.getAllByText(/Group/, {
      selector: '.ds-c-autocomplete__menu-item-group-label',
    });
    expect(headers).toHaveLength(2);

    expect(headers[0]).toHaveTextContent('Group 1');
    expect(headers[0]).toHaveAttribute('id', 'static-id__group--0');

    expect(headers[1]).toHaveTextContent('Group 2');
    expect(headers[1]).toHaveAttribute('id', 'static-id__group--1');

    const listItems = screen.getAllByRole('option');
    expect(listItems).toHaveLength(4);
    expect(listItems[0]).toHaveTextContent('Option 1');
    expect(listItems[1]).toHaveTextContent('Option 2');
    expect(listItems[2]).toHaveTextContent('Option 3');
    expect(listItems[3]).toHaveTextContent('Option 4');
  });

  it('renders mixed grouped and standalone items', () => {
    const items = [
      {
        label: 'Group 1',
        id: 'group-1',
        items: [
          { id: '1', name: 'Group item 1' },
          { id: '2', name: 'Group item 2' },
        ],
      },
      { id: '3', name: 'Standalone Item 1' },
    ];

    renderAutocomplete({ items });

    open();
    const groups = screen.getAllByRole('group');
    expect(groups).toHaveLength(1);
    expect(groups[0]).toHaveAccessibleName('Group 1');

    const headers = screen.getAllByText(/Group/, {
      selector: '.ds-c-autocomplete__menu-item-group-label',
    });
    expect(headers).toHaveLength(1);
    expect(headers[0]).toHaveTextContent('Group 1');
    expect(headers[0]).toHaveAttribute('id', 'static-id__group--0');

    const listItems = screen.getAllByRole('option');
    expect(listItems).toHaveLength(3);
    expect(listItems[0]).toHaveTextContent('Group item 1');
    expect(listItems[1]).toHaveTextContent('Group item 2');
    expect(listItems[2]).toHaveTextContent('Standalone Item 1');
  });

  it('renders Autocomplete component no results', () => {
    renderAutocomplete({ items: [] });
    open();
    expect(screen.queryByRole('listbox').children.length).toEqual(1);
    expect(screen.queryByRole('option')).toHaveTextContent('No results');
  });

  it('renders "no results" message when groups contain no items', () => {
    renderAutocomplete({
      items: [
        {
          label: 'Group 1',
          id: 'group-1',
          items: [],
        },
      ],
    });
    open();
    expect(screen.queryByRole('listbox').children.length).toEqual(1);
    expect(screen.queryByRole('option')).toHaveTextContent('No results');
  });

  it('shows the menu when open', () => {
    renderAutocomplete();
    open();
    expectMenuToBeOpen();
  });

  it('opens the menu when focusing on an input that has text in it', () => {
    renderAutocomplete({
      children: <TextField label="autocomplete" name="autocomplete_field" value="abc" />,
    });
    const autocompleteField = screen.getByRole('combobox');
    autocompleteField.focus();
    expectMenuToBeOpen();
  });

  it('opens the menu if typing resulted in results that were delayed by async data fetching', async () => {
    const { rerender } = renderAutocomplete({ items: undefined });
    const autocompleteField = screen.getByRole('combobox');
    userEvent.click(autocompleteField);
    userEvent.type(autocompleteField, 'ac');
    await sleep(100);
    rerender(makeAutocomplete({ items: defaultItems }));
    expectMenuToBeOpen();
  });

  it('displays menu with default items and updates items after async data fetching', async () => {
    const { rerender } = renderAutocomplete({ items: defaultItems });
    const autocompleteField = screen.getByRole('combobox');
    userEvent.click(autocompleteField);
    expectMenuToBeOpen();
    userEvent.type(autocompleteField, 'mar');
    await sleep(100);
    rerender(makeAutocomplete({ items: updatedItems }));
    expectMenuToBeOpen();
  });

  it('does not render a clear search button when clearSearchButton is set to false', () => {
    renderAutocomplete({ clearSearchButton: false });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders custom class names', () => {
    const { container } = renderAutocomplete({ className: 'additional-class' });
    const child = container.querySelector('.ds-c-autocomplete');

    expect(child).toHaveClass('additional-class');
  });

  describe('default props', () => {
    it('defaults ariaClearLabel', () => {
      renderAutocomplete();
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      expect(button).toHaveAttribute('aria-label', 'Clear search to try again');
    });

    it('defaults clearInputText', () => {
      renderAutocomplete();
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      expect(button).toHaveTextContent('Clear search');
    });
  });

  it('should set the input value correctly when a listbox selection is clicked', () => {
    const onChange = jest.fn();
    renderAutocomplete({ onChange });
    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    userEvent.click(autocompleteField);
    userEvent.type(autocompleteField, 'c');

    const listboxItem = screen.getByRole('option');
    userEvent.click(listboxItem);

    expect(autocompleteField.value).toBe('Cook County, IL');
    expect(onChange).toHaveBeenCalledWith(defaultItems[0]);
    expectMenuToBeClosed();
  });

  it('should set the input value to empty when "Clear search" is clicked', () => {
    renderAutocomplete();
    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    userEvent.click(autocompleteField);
    userEvent.type(autocompleteField, 'c');

    const listboxItem = screen.getByRole('option');
    userEvent.click(listboxItem);

    const clearButton = screen.getByText('Clear search');
    userEvent.click(clearButton);

    expect(autocompleteField.value).toBe('');
  });

  it('should return focus to the input when "Clear search" is clicked', () => {
    renderAutocomplete();
    const input = screen.getByRole('combobox') as HTMLInputElement;

    userEvent.click(input);
    userEvent.type(input, 'c');

    const option = screen.getByRole('option');
    userEvent.click(option);

    const clearButton = screen.getByText('Clear search');
    userEvent.click(clearButton);

    expect(document.activeElement).toBe(input);
  });

  it('should call onChange with null item when "Clear search" is clicked', () => {
    const onChange = jest.fn();
    renderAutocomplete({ onChange });
    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    userEvent.click(autocompleteField);
    userEvent.type(autocompleteField, 'c');

    const listboxItem = screen.getByRole('option');
    userEvent.click(listboxItem);

    const clearButton = screen.getByText('Clear search');
    userEvent.click(clearButton);

    expect(autocompleteField.value).toBe('');
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it('calls onChange when a grouped item is selected', async () => {
    const onChange = jest.fn();
    const items = [
      {
        label: 'Fruits',
        id: 'group-fruits',
        items: [
          { id: 'apple', name: 'Apple' },
          { id: 'banana', name: 'Banana' },
        ],
      },
      {
        label: 'Vegetables',
        id: 'group-vegetables',
        items: [
          { id: 'carrot', name: 'Carrot' },
          { id: 'lettuce', name: 'Lettuce' },
        ],
      },
    ];

    renderAutocomplete({ items, onChange });

    const input = screen.getByRole('combobox');
    userEvent.click(input);
    userEvent.type(input, 'ban');

    const bananaOption = await screen.findByRole('option', { name: 'Banana' });
    userEvent.click(bananaOption);

    expect(onChange).toHaveBeenCalledWith({ id: 'banana', name: 'Banana' });
  });

  it('should select list items by keyboard', () => {
    const onChange = jest.fn();
    renderAutocomplete({ onChange });
    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    userEvent.click(autocompleteField);
    userEvent.type(autocompleteField, 'c');
    userEvent.type(autocompleteField, '{arrowdown}');
    userEvent.type(autocompleteField, '{enter}');

    expect(autocompleteField.value).toBe('Cook County, IL');
    expect(onChange).toHaveBeenCalledWith(defaultItems[0]);
    expectMenuToBeClosed();
  });

  it('should not call onChange when an item was not selected', () => {
    const onChange = jest.fn();
    renderAutocomplete({ onChange });
    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    userEvent.click(autocompleteField);
    userEvent.type(autocompleteField, 'c');
    userEvent.type(autocompleteField, 'o');
    userEvent.type(autocompleteField, '{enter}');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should clear the input value by keyboard', () => {
    renderAutocomplete();
    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    autocompleteField.focus();
    userEvent.click(autocompleteField);
    userEvent.type(autocompleteField, 'c');
    userEvent.type(autocompleteField, '{arrowdown}');
    userEvent.type(autocompleteField, '{enter}');

    expect(autocompleteField.value).toBe('Cook County, IL');

    userEvent.tab();

    const clearButton = screen.getByText('Clear search');
    userEvent.click(clearButton);

    expect(autocompleteField.value).toBe('');
  });

  it('closes the listbox when ESC is pressed', () => {
    renderAutocomplete();
    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    userEvent.click(autocompleteField);
    userEvent.type(autocompleteField, 'c');

    expectMenuToBeOpen();

    expect(autocompleteField.value).toEqual('c');

    userEvent.type(autocompleteField, '{esc}');

    expectMenuToBeClosed();
  });

  it("calls child TextField's event handlers", () => {
    const props = {
      label: 'autocomplete',
      name: 'autocomplete_field',
      onFocus: jest.fn(),
      onChange: jest.fn(),
      onKeyDown: jest.fn(),
      // onTouchEnd : jest.fn(), Doesn't look like we can actually test onTouchEnd
      onBlur: jest.fn(),
    };
    renderAutocomplete({ children: <TextField {...props} /> });
    const field = screen.getByRole('combobox');
    userEvent.click(field);
    expect(props.onFocus).toHaveBeenCalledTimes(1);
    userEvent.type(field, 'c');
    expect(props.onKeyDown).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledTimes(1);
    userEvent.tab();
    expect(props.onBlur).toHaveBeenCalledTimes(1);
  });

  it('allows arbitrary props to remain on the TextField', () => {
    const props = {
      label: 'autocomplete',
      name: 'autocomplete_field',
      placeholder: 'Hello world!',
      fieldClassName: 'a-custom-class',
    };
    renderAutocomplete({ children: <TextField {...props} /> });
    const field = screen.getByRole('combobox');
    expect(field).toHaveAttribute('placeholder', props.placeholder);
    expect(field).toHaveClass(props.fieldClassName);
  });

  it('inherits size prop from the TextField', () => {
    const { container } = renderAutocomplete({
      children: <TextField label="autocomplete" name="field" size="medium" />,
    });
    const field = screen.getByRole('combobox');
    expect(field).toHaveClass('ds-c-field--medium');
    open();
    const menuContainer = container.querySelector('.ds-c-autocomplete__menu-container');
    expect(menuContainer).toHaveClass('ds-c-field--medium');
  });

  it('can have a disabled TextField', () => {
    renderAutocomplete({
      children: <TextField label="autocomplete" name="field" disabled />,
    });
    const field = screen.getByRole('combobox');
    expect(field).toHaveAttribute('disabled');
    const clearButton = screen.getByText('Clear search');
    expect(clearButton).toHaveAttribute('disabled');
  });

  it('forwards an object inputRef', () => {
    const inputRef = createRef<HTMLInputElement>();
    renderAutocomplete({ inputRef });
    expect(inputRef.current).toBeInTheDocument();
    expect(inputRef.current.tagName).toEqual('INPUT');
  });

  it('forwards a mutable object inputRef', () => {
    const MyComponent = () => {
      const inputRef = useRef<HTMLButtonElement>();
      useEffect(() => {
        expect(inputRef.current).toBeInTheDocument();
        expect(inputRef.current.tagName).toEqual('INPUT');
      }, []);
      return (
        <Autocomplete items={defaultItems} inputRef={inputRef}>
          <TextField label="autocomplete" name="autocomplete_field" />
        </Autocomplete>
      );
    };

    render(<MyComponent />);
  });

  it('forwards a function inputRef', () => {
    const inputRef = jest.fn();
    renderAutocomplete({ inputRef });
    expect(inputRef).toHaveBeenCalled();
    expect(inputRef.mock.lastCall[0].tagName).toEqual('INPUT');
  });
});
