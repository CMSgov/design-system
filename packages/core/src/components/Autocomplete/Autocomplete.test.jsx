import { mount, shallow } from 'enzyme';
import Autocomplete from './Autocomplete';
import React from 'react';
import renderer from 'react-test-renderer';

function render(customProps = {}, deep = false) {
  const props = Object.assign(
    {
      items: [{ id: 'kRf6c2fY', name: 'Cook County, IL' }]
    },
    customProps
  );
  const component = <Autocomplete {...props} />;

  return {
    props: props,
    wrapper: deep ? mount(component) : shallow(component)
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

  it('renders Autocomplete component without items', () => {
    const { wrapper } = render({ items: undefined, isOpen: true }, true);
    expect(wrapper.find('ul').exists()).toBe(false);
  });

  it('returns correct default props', () => {
    const data = render({}, true);
    const wrapper = data.wrapper;

    expect(wrapper.prop('ariaClearLabel')).toBe(
      'Clear typeahead and search again'
    );
    expect(wrapper.prop('clearInputText')).toBe('Clear search');
    expect(wrapper.prop('label')).toBe(undefined);
    expect(wrapper.prop('loading')).toBe(undefined);
    expect(wrapper.prop('onChange')).toBe(undefined);
    expect(wrapper.prop('onInputValueChange')).toBe(undefined);
  });

  it('only renders expected elements', () => {
    const data = render({}, true);
    const wrapper = data.wrapper;
    const downshift = wrapper.find('Downshift');

    expect(
      downshift
        .find('div')
        .first()
        .exists()
    ).toBe(true);
    expect(downshift.find('ul').exists()).toBe(false);
    expect(downshift.find('li').exists()).toBe(false);
    expect(downshift.find('button').exists()).toBe(true);
  });

  it('renders default class names', () => {
    const data = render({}, true);
    const wrapper = data.wrapper;
    const child = wrapper.find('Downshift').childAt(0);

    expect(child.hasClass('ds-c-autocomplete')).toBe(true);
  });

  it('allows default props to be overridden', () => {
    const data = render(
      {
        ariaClearLabel: 'New ARIA label',
        clearInputText: 'Clear search box',
        loading: true
      },
      true
    );
    const wrapper = data.wrapper;

    expect(wrapper.prop('ariaClearLabel')).toBe('New ARIA label');
    expect(wrapper.prop('clearInputText')).toBe('Clear search box');
    expect(wrapper.prop('loading')).toBe(true);
  });

  it('renders a snapshot', () => {
    const tree = renderer
      .create(
        <Autocomplete items={[{ id: 'kRf6c2fY', name: 'Cook County, IL' }]} />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
