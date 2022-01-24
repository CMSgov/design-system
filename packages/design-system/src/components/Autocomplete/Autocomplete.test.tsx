import { mount, shallow } from 'enzyme';
import Autocomplete from './Autocomplete';
import React from 'react';
import TextField from '../TextField/TextField';
import { render as TLrender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function render(customProps = {}, deep = false) {
  const props = {
    ...{
      items: [{ id: 'kRf6c2fY', name: 'Cook County, IL' }],
      children: <TextField label="autocomplete" name="autocomplete_field" />,
    },
    ...customProps,
  };
  const component = <Autocomplete {...props} />;

  return {
    props: props,
    wrapper: deep ? mount(component) : shallow(component),
  };
}

describe('Autocomplete', () => {
  it('renders Autocomplete component', () => {
    const data = render({}, false);
    const wrapper = data.wrapper;
    const inst = wrapper.instance();

    expect(inst).toBeInstanceOf(Autocomplete);
  });

  it('renders items', () => {
    const { wrapper } = render({ isOpen: true }, true);

    const list = wrapper.find('ul');
    expect(list.exists()).toBe(true);

    const items = list.find('li');
    expect(items.length).toEqual(1);
    expect(items.text()).toEqual('Cook County, IL');
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

    const { wrapper } = render({ items, isOpen: true }, true);
    const ul = wrapper.find('ul');
    expect(ul).toMatchSnapshot();
  });

  it('renders item with custom className', () => {
    const items = [
      { id: '1a', name: 'Normal item' },
      { id: '5b', name: 'Special item', className: 'custom-class' },
    ];
    const { wrapper } = render({ isOpen: true, items }, true);

    const list = wrapper.find('ul');
    expect(list.exists()).toBe(true);

    const listItems = list.find('li');
    expect(listItems.at(0).prop('className')).toMatchSnapshot();
    expect(listItems.at(1).prop('className')).toMatchSnapshot();
  });

  it('renders Autocomplete component without items', () => {
    const { wrapper } = render({ items: undefined, isOpen: true }, true);
    expect(wrapper.find('ul').exists()).toBe(false);
  });

  it('only renders expected elements', () => {
    const data = render({}, true);
    const wrapper = data.wrapper;
    const downshift = wrapper.find('Downshift');

    expect(downshift.find('div').first().exists()).toBe(true);
    expect(downshift.find('ul').exists()).toBe(false);
    expect(downshift.find('li').exists()).toBe(false);
    expect(downshift.find('button').exists()).toBe(true);
  });

  it('does not render a clear search button when clearSearchButton is set to false', () => {
    const { wrapper } = render({ clearSearchButton: false }, true);
    const downshift = wrapper.find('Downshift');

    expect(downshift.find('div').first().exists()).toBe(true);
    expect(downshift.find('button').exists()).toBe(false);
  });

  it('renders default class names', () => {
    const data = render({}, true);
    const wrapper = data.wrapper;
    const child = wrapper.find('Downshift').childAt(0);

    expect(child.hasClass('ds-c-autocomplete')).toBe(true);
  });

  it('renders custom class names', () => {
    const data = render({ className: 'additional-class' }, true);
    const wrapper = data.wrapper;
    const child = wrapper.find('Downshift').childAt(0);

    expect(child.hasClass('ds-c-autocomplete')).toBe(true);
    expect(child.hasClass('additional-class')).toBe(true);
  });

  it('allows default props to be overridden', () => {
    const data = render(
      {
        ariaClearLabel: 'New ARIA label',
        clearInputText: 'Clear search box',
        loading: true,
        loadingMessage: 'Custom loading message',
        noResultsMessage: 'Custom no results message',
      },
      true
    );
    const wrapper = data.wrapper;

    expect(wrapper.prop('ariaClearLabel')).toBe('New ARIA label');
    expect(wrapper.prop('clearInputText')).toBe('Clear search box');
    expect(wrapper.prop('loading')).toBe(true);
    expect(wrapper.prop('loadingMessage')).toBe('Custom loading message');
    expect(wrapper.prop('noResultsMessage')).toBe('Custom no results message');
  });

  it('renders a snapshot', () => {
    const { container } = TLrender(
      <Autocomplete items={[{ id: 'kRf6c2fY', name: 'Cook County, IL' }]} clearSearchButton>
        <TextField label="autocomplete" name="autocomplete_field" />
      </Autocomplete>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('default props', () => {
    it('defaults ariaClearLabel', () => {
      const data = render({}, true);
      const wrapper = data.wrapper;
      const downshift = wrapper.find('Downshift');

      const buttonEl = downshift.find('button');
      expect(buttonEl.exists()).toBe(true);

      expect(buttonEl.prop('aria-label')).toBe('Clear search to try again');
    });

    it('defaults clearInputText', () => {
      const data = render({}, true);
      const wrapper = data.wrapper;
      const downshift = wrapper.find('Downshift');

      const buttonEl = downshift.find('button');
      expect(buttonEl.exists()).toBe(true);

      expect(buttonEl.text()).toBe('Clear search');
    });
  });

  describe('Downshift integration', () => {
    const props = {
      items: [{ id: 'kRf6c2fY', name: 'Cook County, IL' }],
      children: <TextField label="autocomplete" name="autocomplete_field" />,
    };

    it('Should expand the listbox when keys are pressed', () => {
      const { getByLabelText, getByRole } = TLrender(<Autocomplete {...props} />);
      const autocompleteField = getByLabelText('autocomplete');
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');

      expect(getByRole('listbox')).toBeTruthy();
    });

    it('Should set the input value correctly when a listbox selection is clicked', () => {
      const { getByLabelText, getByRole } = TLrender(<Autocomplete {...props} />);
      const autocompleteField = getByLabelText('autocomplete') as HTMLInputElement;
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');

      const listboxItem = getByRole('option');
      userEvent.click(listboxItem);

      expect(autocompleteField.value).toBe('Cook County, IL');
    });

    it('Should set the input value to empty when Clear search is clicked', () => {
      const { getByLabelText, getByRole, getByText } = TLrender(<Autocomplete {...props} />);
      const autocompleteField = getByLabelText('autocomplete') as HTMLInputElement;
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');

      const listboxItem = getByRole('option');
      userEvent.click(listboxItem);

      const clearButton = getByText('Clear search');
      userEvent.click(clearButton);

      expect(autocompleteField.value).toBe('');
    });

    it('Should select list items by keyboard', () => {
      const { getByLabelText } = TLrender(<Autocomplete {...props} />);
      const autocompleteField = getByLabelText('autocomplete') as HTMLInputElement;
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');
      userEvent.type(autocompleteField, '{arrowdown}');
      userEvent.type(autocompleteField, '{enter}');

      expect(autocompleteField.value).toBe('Cook County, IL');
    });

    it('Should clear the input value by keyboard', () => {
      const { getByLabelText, getByText } = TLrender(<Autocomplete {...props} />);
      const autocompleteField = getByLabelText('autocomplete') as HTMLInputElement;
      autocompleteField.focus();
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');
      userEvent.type(autocompleteField, '{arrowdown}');
      userEvent.type(autocompleteField, '{enter}');

      expect(autocompleteField.value).toBe('Cook County, IL');

      userEvent.tab();

      const clearButton = getByText('Clear search');
      userEvent.click(clearButton);

      expect(autocompleteField.value).toBe('');
    });

    it('Closes the listbox when ESC is pressed', () => {
      const { getByLabelText, queryByRole } = TLrender(<Autocomplete {...props} />);
      const autocompleteField = getByLabelText('autocomplete') as HTMLInputElement;
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');

      let listboxEl = queryByRole('listbox');
      expect(listboxEl).toBeTruthy();

      expect(autocompleteField.value).toEqual('c');

      userEvent.type(autocompleteField, '{esc}');

      listboxEl = queryByRole('listbox');
      expect(listboxEl).toBeNull();
      expect(autocompleteField.value).toEqual('');
    });
  });
});
