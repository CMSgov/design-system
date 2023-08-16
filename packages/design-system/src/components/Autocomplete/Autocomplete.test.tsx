import React from 'react';
import Autocomplete from './Autocomplete';
import TextField from '../TextField/TextField';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultItems = [{ id: 'kRf6c2fY', name: 'Cook County, IL' }];

function makeAutocomplete(customProps = {}) {
  const props = {
    items: defaultItems,
    children: <TextField label="autocomplete" name="autocomplete_field" />,
    id: 'static-id',
    ...customProps,
  };
  return render(<Autocomplete {...props} />);
}

describe('Autocomplete', () => {
  it('renders Autocomplete component', () => {
    const { container } = makeAutocomplete();
    const page = container.firstChild;
    expect(page).toMatchSnapshot();
  });

  it('renders items', () => {
    makeAutocomplete({ isOpen: true });

    const list = screen.getByRole('listbox');
    expect(list).toBeInTheDocument();

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
        children: <a href="https://duckduckgo.com/?q=snacks">Search all snacks</a>,
      },
    ];

    makeAutocomplete({ items, isOpen: true });
    const ul = screen.getByRole('listbox');
    expect(ul).toMatchSnapshot();
  });

  it('generates ids when no id is provided', () => {
    makeAutocomplete({ isOpen: true, id: undefined });
    const idRegex = /autocomplete--\d+/;
    expect(screen.getByRole('listbox').id).toMatch(idRegex);
    expect(screen.getByRole('combobox').id).toMatch(idRegex);
  });

  it('renders item with custom className', () => {
    const items = [
      { id: '1a', name: 'Normal item' },
      { id: '5b', name: 'Special item', className: 'custom-class' },
    ];
    makeAutocomplete({ isOpen: true, items });

    const list = screen.queryByRole('listbox');
    expect(list).toBeInTheDocument();

    const listItems = screen.queryAllByRole('option');
    expect(listItems[1]).toHaveClass('custom-class');
    expect(listItems).toMatchSnapshot();
  });

  it('renders Autocomplete component without items', () => {
    makeAutocomplete({ items: undefined, isOpen: true });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('renders Autocomplete component no results', () => {
    makeAutocomplete({ items: [], isOpen: true });
    expect(screen.queryByRole('listbox').children.length).toEqual(1);
    expect(screen.queryByRole('option')).toHaveTextContent('No results');
  });

  it('shows the menu when open', () => {
    const { container } = makeAutocomplete({ isOpen: true });
    const child = container.querySelector('.ds-c-autocomplete__menu-container');
    expect(child).not.toHaveAttribute('hidden');
  });

  it('does not render a clear search button when clearSearchButton is set to false', () => {
    makeAutocomplete({ clearSearchButton: false });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders default class names', () => {
    const { container } = makeAutocomplete();
    const child = container.querySelectorAll('.ds-c-autocomplete');

    expect(child.length).toEqual(1);
  });

  it('renders custom class names', () => {
    const { container } = makeAutocomplete({ className: 'additional-class' });
    const child = container.querySelector('.ds-c-autocomplete');

    expect(child).toHaveClass('additional-class');
  });

  describe('default props', () => {
    it('defaults ariaClearLabel', () => {
      makeAutocomplete();
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      expect(button).toHaveAttribute('aria-label', 'Clear search to try again');
    });

    it('defaults clearInputText', () => {
      makeAutocomplete();
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      expect(button).toHaveTextContent('Clear search');
    });
  });

  describe('Downshift integration', () => {
    it('Should expand the listbox when keys are pressed', () => {
      makeAutocomplete();
      const autocompleteField = screen.getByRole('combobox');
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('Should set the input value correctly when a listbox selection is clicked', () => {
      const onChange = jest.fn();
      makeAutocomplete({ onChange });
      const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');

      const listboxItem = screen.getByRole('option');
      userEvent.click(listboxItem);

      expect(autocompleteField.value).toBe('Cook County, IL');
      expect(onChange).toHaveBeenCalledWith(
        defaultItems[0],
        expect.objectContaining({ inputValue: defaultItems[0].name })
      );
    });

    it('Should set the input value to empty when "Clear search" is clicked', () => {
      makeAutocomplete();
      const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');

      const listboxItem = screen.getByRole('option');
      userEvent.click(listboxItem);

      const clearButton = screen.getByText('Clear search');
      userEvent.click(clearButton);

      expect(autocompleteField.value).toBe('');
    });

    it('Should call onChange with null item when "Clear search" is clicked', () => {
      const onChange = jest.fn();
      makeAutocomplete({ onChange });
      const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');

      const listboxItem = screen.getByRole('option');
      userEvent.click(listboxItem);

      const clearButton = screen.getByText('Clear search');
      userEvent.click(clearButton);

      expect(autocompleteField.value).toBe('');
      expect(onChange).toHaveBeenLastCalledWith(null, expect.objectContaining({ inputValue: '' }));
    });

    it('Should select list items by keyboard', () => {
      const onChange = jest.fn();
      makeAutocomplete({ onChange });
      const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');
      userEvent.type(autocompleteField, '{arrowdown}');
      userEvent.type(autocompleteField, '{enter}');

      expect(autocompleteField.value).toBe('Cook County, IL');
      expect(onChange).toHaveBeenCalledWith(
        defaultItems[0],
        expect.objectContaining({ inputValue: defaultItems[0].name })
      );
    });

    it('Should not call onChange when an item was not selected', () => {
      const onChange = jest.fn();
      makeAutocomplete({ onChange });
      const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');
      userEvent.type(autocompleteField, 'o');
      userEvent.type(autocompleteField, '{enter}');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('Should clear the input value by keyboard', () => {
      makeAutocomplete();
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

    it('Closes the listbox when ESC is pressed', () => {
      const { container } = makeAutocomplete();
      const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');

      const menuContainer = container.querySelector('.ds-c-autocomplete__menu-container');
      expect(menuContainer).not.toHaveAttribute('hidden');

      expect(autocompleteField.value).toEqual('c');

      userEvent.type(autocompleteField, '{esc}');

      expect(menuContainer).toHaveAttribute('hidden');
    });
  });
});
