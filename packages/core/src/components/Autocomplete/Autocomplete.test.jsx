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

  it('returns correct default props', () => {
    const data = render({}, true);
    const wrapper = data.wrapper;

    expect(wrapper.prop('clearAriaLabel')).toBe(
      'Clear typeahead and search again'
    );
    expect(wrapper.prop('constrainedList')).toBe(undefined);
    expect(wrapper.prop('constrainedListText')).toBe(
      'Select from the options below:'
    );
    expect(wrapper.prop('clearInputText')).toBe('Search again');
    expect(wrapper.prop('isDisabled')).toBe(undefined);
    expect(wrapper.prop('itemToString')).toBe(undefined);
    expect(wrapper.prop('onChange')).toBe(undefined);
    expect(wrapper.prop('onStateChange')).toBe(undefined);
  });

  it('only renders expected elements', () => {
    const data = render({}, true);
    const wrapper = data.wrapper;
    const downshift = wrapper.find('Downshift');

    expect(downshift.find('ul').exists()).toBe(false);
    expect(downshift.find('li').exists()).toBe(false);
    expect(downshift.find('a').exists()).toBe(true);
  });

  it('renders default class names', () => {
    const data = render({}, true);
    const wrapper = data.wrapper;
    const child = wrapper.find('Downshift').childAt(0);

    expect(child.type()).toBe('div');
    expect(child.hasClass('ds-c-autocomplete')).toBe(true);
  });

  it('allows default props to be overridden', () => {
    const data = render(
      {
        clearAriaLabel: 'New ARIA label'
      },
      true
    );
    const wrapper = data.wrapper;

    expect(wrapper.prop('clearAriaLabel')).toBe('New ARIA label');
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
