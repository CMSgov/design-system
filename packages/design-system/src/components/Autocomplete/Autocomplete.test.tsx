import { mount, shallow } from 'enzyme';
import Autocomplete from './Autocomplete';
import React from 'react';
import TextField from '../TextField/TextField';
import renderer from 'react-test-renderer';

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

    const tree = renderer
      .create(
        <Autocomplete items={items} isOpen>
          <TextField label="autocomplete" name="autocomplete_field" />
        </Autocomplete>
      )
      .toJSON();

    // TODO: Clean this up by using another rendering library or figure out how to use this one to
    // render only a portion of the tree but using their built-in functions like "findByType"
    const ul = tree.children[1].children[0];
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
    const tree = renderer
      .create(
        <Autocomplete items={[{ id: 'kRf6c2fY', name: 'Cook County, IL' }]} clearSearchButton>
          <TextField label="autocomplete" name="autocomplete_field" />
        </Autocomplete>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
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
});
