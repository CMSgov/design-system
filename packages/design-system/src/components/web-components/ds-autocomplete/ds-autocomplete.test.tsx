import { render, screen, waitFor } from '@testing-library/react';
import userEvent, { Options, UserEvent } from '@testing-library/user-event';
import { config } from '../../config';
import './ds-autocomplete';

const defaultItems = JSON.stringify([{ id: 'kRf6c2fY', name: 'Cook County, IL' }]);
const updatedItems = JSON.stringify([{ id: 'Yf2c6fRk', name: 'Marion County, OR' }]);

type AutocompleteProps = JSX.IntrinsicElements['ds-autocomplete'];

function makeAutocomplete(customProps: AutocompleteProps = {}) {
  const props = {
    'root-id': 'static-id',
    id: 'autocomplete--1',
    'aria-clear-label': 'Clear search to try again',
    'clear-input-text': 'Clear search',
    'clear-search-button': 'true',
    'loading-message': 'Loading...',
    'no-results-message': 'No results',
    label: 'autocomplete label',
    items: defaultItems,
    ...customProps,
  };

  return <ds-autocomplete {...props} />;
}

function renderAutocomplete(
  customProps: AutocompleteProps = {},
  userEventSetupOptions: Options = {}
) {
  return {
    user: userEvent.setup(userEventSetupOptions),
    ...render(makeAutocomplete(customProps)),
  };
}

async function open({ user }: { user: UserEvent }) {
  const autocompleteField = screen.getByRole('combobox');
  await user.click(autocompleteField);
  await user.type(autocompleteField, 'c');
}

function expectMenuToBeOpen() {
  expect(screen.getByRole('listbox')).toBeInTheDocument();
}

function expectMenuToBeClosed() {
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
}

describe('Autocomplete', () => {
  it('renders correctly', () => {
    const { asFragment } = renderAutocomplete();
    expect(asFragment()).toMatchSnapshot();
  });

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

  it('renders items', async () => {
    const { user } = renderAutocomplete();

    await open({ user });
    expectMenuToBeOpen();

    const items = screen.getByRole('option');
    expect(items).toBeInTheDocument();
    expect(items).toHaveTextContent('Cook County, IL');
  });

  it('renders grouped items with headers', async () => {
    const items = JSON.stringify([
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
    ]);

    const { user } = renderAutocomplete({ items });

    await open({ user });
    const groups = screen.getAllByRole('group');
    expect(groups).toHaveLength(2);
    expect(groups[0]).toHaveAccessibleName('Group 1');
    expect(groups[1]).toHaveAccessibleName('Group 2');

    const listItems = screen.getAllByRole('option');
    expect(listItems).toHaveLength(4);
    expect(listItems[0]).toHaveTextContent('Option 1');
    expect(listItems[1]).toHaveTextContent('Option 2');
    expect(listItems[2]).toHaveTextContent('Option 3');
    expect(listItems[3]).toHaveTextContent('Option 4');
  });

  it('renders mixed grouped and standalone items', async () => {
    const items = JSON.stringify([
      {
        label: 'Group 1',
        id: 'group-1',
        items: [
          { id: '1', name: 'Group item 1' },
          { id: '2', name: 'Group item 2' },
        ],
      },
      { id: '3', name: 'Standalone Item 1' },
    ]);

    const { user } = renderAutocomplete({ items });

    await open({ user });

    const groups = screen.getAllByRole('group');
    expect(groups).toHaveLength(1);

    const listItems = screen.getAllByRole('option');
    expect(listItems).toHaveLength(3);
  });

  it('renders "no results" message when groups contain no items', async () => {
    const { user } = renderAutocomplete({
      items: JSON.stringify([
        {
          label: 'Group 1',
          id: 'group-1',
          items: [],
        },
      ]),
    });

    await open({ user });
    expect(screen.queryByRole('listbox').children.length).toEqual(1);
    expect(screen.queryByRole('option')).toHaveTextContent('No results');
  });

  // TODO: Fix how items with children are rendered
  // it('renders items with children property', () => {
  //   const items = [
  //     {
  //       id: '1',
  //       name: 'Carrots (1)',
  //       children: (
  //         <>
  //           Carrots <strong>(1)</strong>
  //         </>
  //       ),
  //     },
  //     {
  //       id: '2',
  //       name: 'Cookies (3)',
  //       children: (
  //         <>
  //           Cookies <strong>(3)</strong>
  //         </>
  //       ),
  //     },
  //     {
  //       id: '3',
  //       name: 'Crackers (2)',
  //       children: (
  //         <>
  //           Crackers <strong>(2)</strong>
  //         </>
  //       ),
  //     },
  //     {
  //       id: '4',
  //       name: 'Search all snacks',
  //       children: <a href="https://duckduckgo.com/?q=snacks">Search all snacks</a>,
  //     },
  //   ];

  //   renderAutocomplete({ items: JSON.stringify(items) });

  //   open();
  //   const ul = screen.getByRole('listbox');
  //   expect(ul).toMatchSnapshot();
  // });

  it('generates ids when no root id is provided', async () => {
    const { user } = renderAutocomplete({ 'root-id': undefined, items: defaultItems });
    await open({ user });
    const idRegex = /autocomplete--\d+/;
    expect(screen.getByRole('listbox').id).toMatch(idRegex);
    expect(screen.getByRole('combobox').id).toMatch(idRegex);
  });

  it('renders item with custom className', async () => {
    const items = [
      { id: '1a', name: 'Normal item' },
      { id: '5b', name: 'Special item', className: 'custom-class' },
    ];
    const { user } = renderAutocomplete({ items: JSON.stringify(items) });

    await open({ user });
    expectMenuToBeOpen();

    const listItems = screen.queryAllByRole('option');
    expect(listItems[1]).toHaveClass('custom-class');
    expect(listItems).toMatchSnapshot();
  });

  it('renders Autocomplete component without items', async () => {
    const { user } = renderAutocomplete({ items: 'null' });
    await open({ user });
    expectMenuToBeClosed();
  });

  it('renders Autocomplete component no results', async () => {
    const { user } = renderAutocomplete({ items: JSON.stringify([]) });
    await open({ user });
    expect(screen.queryByRole('listbox').children.length).toEqual(1);
    expect(screen.queryByRole('option')).toHaveTextContent('No results');
  });

  it('shows the menu when open', async () => {
    const { user } = renderAutocomplete();
    await open({ user });
    expectMenuToBeOpen();
  });

  it('opens the menu when focusing on an input that has text in it', async () => {
    const { user } = renderAutocomplete();
    const autocompleteField = screen.getByRole('combobox');

    await user.click(autocompleteField);
    await user.type(autocompleteField, 'no-results-found');

    expect(autocompleteField).toHaveValue('no-results-found');
    await user.tab();
    expect(autocompleteField).not.toHaveFocus();
    await user.tab({ shift: true });
    expect(autocompleteField).toHaveFocus();
    expectMenuToBeOpen();
  });

  it('opens the menu if typing resulted in results that were delayed by async data fetching', async () => {
    const { user, rerender } = renderAutocomplete({ items: undefined });
    const autocompleteField = screen.getByRole('combobox');
    await user.click(autocompleteField);
    await user.type(autocompleteField, 'c');

    rerender(makeAutocomplete({ items: defaultItems }));
    expectMenuToBeOpen();
  });

  it('displays menu with default items and updates items after async data fetching', async () => {
    const { user, rerender } = renderAutocomplete();
    const autocompleteField = screen.getByRole('combobox');
    await user.click(autocompleteField);
    expectMenuToBeOpen();
    await user.type(autocompleteField, 'mar');
    rerender(makeAutocomplete({ items: updatedItems }));
    expectMenuToBeOpen();
    const items = screen.getByRole('option');
    expect(items).toBeInTheDocument();
    expect(items).toHaveTextContent('Marion County, OR');
  });

  it('does not render a clear search button when clearSearchButton is set to false', () => {
    renderAutocomplete({ 'clear-search-button': 'false', items: defaultItems });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders custom class names', () => {
    const { container } = renderAutocomplete({
      'class-name': 'additional-class',
      items: defaultItems,
    });
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

  it('should set the input value correctly when a listbox selection is clicked', async () => {
    const { user } = renderAutocomplete();

    const autocompleteRoot = document.querySelector('ds-autocomplete');
    const mockHandler = jest.fn();
    autocompleteRoot.addEventListener('ds-change', mockHandler);

    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    await user.click(autocompleteField);
    await user.type(autocompleteField, 'c');

    const listboxItem = screen.getByRole('option');
    await user.click(listboxItem);

    await waitFor(() => {
      expect(listboxItem).not.toBeInTheDocument();
    });

    expect(autocompleteField.value).toBe('Cook County, IL');
    expect(mockHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: {
          selectedItem: JSON.parse(defaultItems)[0],
        },
      })
    );
    expect(mockHandler).toHaveBeenCalledTimes(1);

    expectMenuToBeClosed();
    autocompleteRoot.removeEventListener('ds-change', mockHandler);
  });

  it('should set the input value to empty when "Clear search" is clicked', async () => {
    const { user } = renderAutocomplete();
    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    await user.click(autocompleteField);
    await user.type(autocompleteField, 'c');

    const listboxItem = screen.getByRole('option');
    await user.click(listboxItem);

    await waitFor(() => {
      expect(listboxItem).not.toBeInTheDocument();
    });

    const clearButton = screen.getByText('Clear search');
    await user.click(clearButton);

    expect(autocompleteField.value).toBe('');
  });

  it('should dispatch ds-change when a grouped item is selected', async () => {
    const groupedItems = JSON.stringify([
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
    ]);
    const { user } = renderAutocomplete({ items: groupedItems }, { delay: 50 });

    const autocompleteRoot = document.querySelector('ds-autocomplete');
    const mockHandler = jest.fn();
    autocompleteRoot.addEventListener('ds-change', mockHandler);

    const input = screen.getByRole('combobox') as HTMLInputElement;
    await user.click(input);
    await user.type(input, 'ban');

    const matchingItem = screen.getByRole('option', { name: 'Banana' });
    await user.click(matchingItem);

    expect(input.value).toBe('Banana');
    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: {
          selectedItem: { id: 'banana', name: 'Banana' },
        },
      })
    );

    expectMenuToBeClosed();
    autocompleteRoot.removeEventListener('ds-change', mockHandler);
  });

  it('should call onChange with null item when "Clear search" is clicked', async () => {
    const { user } = renderAutocomplete();

    const autocompleteRoot = document.querySelector('ds-autocomplete');
    const mockChangeHandler = jest.fn();
    autocompleteRoot.addEventListener('ds-change', mockChangeHandler);

    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    await user.click(autocompleteField);
    await user.type(autocompleteField, 'c');

    const listboxItem = screen.getByRole('option');
    await user.click(listboxItem);

    await waitFor(() => {
      expect(listboxItem).not.toBeInTheDocument();
    });

    const clearButton = screen.getByText('Clear search');
    await user.click(clearButton);

    expect(autocompleteField.value).toBe('');
    expect(mockChangeHandler).toHaveBeenCalledTimes(2);
    // expect the last call to contain null
    expect(mockChangeHandler.mock.calls[1][0].detail).toEqual({
      selectedItem: null,
    });

    expectMenuToBeClosed();
    autocompleteRoot.removeEventListener('ds-change', mockChangeHandler);
  });

  it('should select list items by keyboard', async () => {
    const { user } = renderAutocomplete({}, { delay: 50 });

    const autocompleteRoot = document.querySelector('ds-autocomplete');
    const mockChangeHandler = jest.fn();
    autocompleteRoot.addEventListener('ds-change', mockChangeHandler);

    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    autocompleteField.focus();
    await user.click(autocompleteField);
    await user.type(autocompleteField, 'c');
    await user.type(autocompleteField, 'o');

    const listboxItem = screen.getByRole('option');
    await user.type(autocompleteField, '{ArrowDown}');
    await user.type(autocompleteField, '{Enter}');

    await waitFor(() => {
      expect(listboxItem).not.toBeInTheDocument();
    });

    expect(autocompleteField.value).toBe('Cook County, IL');
    expect(mockChangeHandler).toHaveBeenCalledTimes(1);
    expect(mockChangeHandler.mock.calls[0][0].detail).toEqual({
      selectedItem: JSON.parse(defaultItems)[0],
    });

    expectMenuToBeClosed();
    autocompleteRoot.removeEventListener('ds-change', mockChangeHandler);
  });

  it('should not call onChange when an item was not selected', async () => {
    const { user } = renderAutocomplete();

    const autocompleteRoot = document.querySelector('ds-autocomplete');
    const mockChangeHandler = jest.fn();
    autocompleteRoot.addEventListener('ds-change', mockChangeHandler);

    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    await user.click(autocompleteField);
    await user.type(autocompleteField, 'c');
    await user.type(autocompleteField, 'o');
    await user.type(autocompleteField, '{Enter}');
    expect(mockChangeHandler).not.toHaveBeenCalled();

    autocompleteRoot.removeEventListener('ds-change', mockChangeHandler);
  });

  it('should clear the input value by keyboard', async () => {
    const { user } = renderAutocomplete({}, { delay: 50 });
    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    autocompleteField.focus();
    await user.click(autocompleteField);
    await user.type(autocompleteField, 'c');
    await user.type(autocompleteField, 'o');

    const listboxItem = screen.getByRole('option');

    await user.type(autocompleteField, '{ArrowDown}');
    await user.type(autocompleteField, '{Enter}');

    await waitFor(() => {
      expect(listboxItem).not.toBeInTheDocument();
    });

    expect(autocompleteField.value).toBe('Cook County, IL');

    await user.tab();

    const clearButton = screen.getByText('Clear search');
    await user.click(clearButton);

    expect(autocompleteField.value).toBe('');
  });

  it('closes the listbox when ESC is pressed', async () => {
    const { user } = renderAutocomplete();
    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    await user.click(autocompleteField);
    await user.type(autocompleteField, 'c');

    expectMenuToBeOpen();

    expect(autocompleteField.value).toEqual('c');

    await user.type(autocompleteField, '{Escape}');

    expectMenuToBeClosed();
  });

  it('displays a custom error message', () => {
    renderAutocomplete({ 'error-message': 'Something went wrong' });
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('displays an error message in the default position for Core', () => {
    const { asFragment } = renderAutocomplete({
      'error-message': 'Something went wrong',
      items: undefined,
    });
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays an error message in the default location for Healthcare', () => {
    config({ errorPlacementDefault: 'bottom' });
    const { asFragment } = renderAutocomplete({
      'error-message': 'Something went wrong',
      items: undefined,
    });
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('sets the display location of the error message', () => {
    const { asFragment } = renderAutocomplete({
      'error-placement': 'bottom',
      'error-message': 'Something went wrong',
      items: undefined,
    });
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('can add a custom class name to the error message', () => {
    const { asFragment } = renderAutocomplete({
      'error-message-class-name': 'custom-class-name',
      'error-message': 'Something went wrong',
      items: undefined,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  // it("calls child TextField's event handlers", () => {
  //   const props = {
  //     label: 'autocomplete',
  //     name: 'autocomplete_field',
  //     onFocus: jest.fn(),
  //     onChange: jest.fn(),
  //     onKeyDown: jest.fn(),
  //     // onTouchEnd : jest.fn(), Doesn't look like we can actually test onTouchEnd
  //     onBlur: jest.fn(),
  //   };
  //   renderAutocomplete({ children: <TextField {...props} /> });
  //   const field = screen.getByRole('combobox');
  //   userEvent.click(field);
  //   expect(props.onFocus).toHaveBeenCalledTimes(1);
  //   userEvent.type(field, 'c');
  //   expect(props.onKeyDown).toHaveBeenCalledTimes(1);
  //   expect(props.onChange).toHaveBeenCalledTimes(1);
  //   userEvent.tab();
  //   expect(props.onBlur).toHaveBeenCalledTimes(1);
  // });

  // it('allows arbitrary props to remain on the TextField', () => {
  //   const props = {
  //     label: 'autocomplete',
  //     name: 'autocomplete_field',
  //     placeholder: 'Hello world!',
  //     fieldClassName: 'a-custom-class',
  //   };
  //   renderAutocomplete({ children: <TextField {...props} /> });
  //   const field = screen.getByRole('combobox');
  //   expect(field).toHaveAttribute('placeholder', props.placeholder);
  //   expect(field).toHaveClass(props.fieldClassName);
  // });

  // it('inherits size prop from the TextField', () => {
  //   const { container } = renderAutocomplete({
  //     children: <TextField label="autocomplete" name="field" size="medium" />,
  //   });
  //   const field = screen.getByRole('combobox');
  //   expect(field).toHaveClass('ds-c-field--medium');
  //   open();
  //   const menuContainer = container.querySelector('.ds-c-autocomplete__menu-container');
  //   expect(menuContainer).toHaveClass('ds-c-field--medium');
  // });

  // it('can have a disabled TextField', () => {
  //   renderAutocomplete({
  //     children: <TextField label="autocomplete" name="field" disabled />,
  //   });
  //   const field = screen.getByRole('combobox');
  //   expect(field).toHaveAttribute('disabled');
  //   const clearButton = screen.getByText('Clear search');
  //   expect(clearButton).toHaveAttribute('disabled');
  // });
});
