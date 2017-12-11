import { mount, shallow } from 'enzyme';
import AutocompleteField from './AutocompleteField';
import React from 'react';
import renderer from 'react-test-renderer';

function render(customProps = {}, deep = false) {
  const props = Object.assign(
    {
      items: [{ id: 'kRf6c2fY', name: 'Cook County, IL' }]
    },
    customProps
  );
  const component = <AutocompleteField {...props} />;

  return {
    props: props,
    wrapper: deep ? mount(component) : shallow(component)
  };
}

describe('AutocompleteField', () => {
  it('renders AutocompleteField component', () => {
    const data = render({}, false);
    const wrapper = data.wrapper;
    const inst = wrapper.instance();

    expect(inst).toBeInstanceOf(AutocompleteField);
  });

  it('returns correct default props', () => {
    const data = render({}, true);
    const wrapper = data.wrapper;

    expect(wrapper.prop('clearAriaLabel')).toBe(
      'Clear typeahead and search again'
    );
    expect(wrapper.prop('clearInputText')).toBe('Search again');
    expect(wrapper.prop('disabled')).toBe(undefined);
    expect(wrapper.prop('itemToString')).toBe(undefined);
    expect(wrapper.prop('fieldRef')).toBe(undefined);
    expect(wrapper.prop('labelHint')).toBe(
      'This is an autocomplete field. Begin typing to search for relevant information. The number of results will be updated as you type.'
    );
    expect(wrapper.prop('labelText')).toBe('Generic autocomplete label');
    expect(wrapper.prop('onChange')).toBe(undefined);
    expect(wrapper.prop('onStateChange')).toBe(undefined);
  });

  it('renders expected elements', () => {
    const data = render({}, true);
    const wrapper = data.wrapper;
    const downshift = wrapper.find('Downshift');

    expect(downshift.find('label').exists()).toBe(true);
    expect(downshift.find('span.ds-c-autocomplete__label').exists()).toBe(true);
    expect(downshift.find('span.ds-c-field__hint').exists()).toBe(true);
    expect(downshift.find('input').exists()).toBe(true);
    expect(downshift.find('a').exists()).toBe(true);
  });

  it('renders default class names', () => {
    const data = render({}, true);
    const wrapper = data.wrapper;
    const downshift = wrapper.find('Downshift');

    expect(downshift.find('label').hasClass('ds-c-label')).toBe(true);
    expect(downshift.find('input').hasClass('ds-c-autocomplete__input')).toBe(
      true
    );
    expect(downshift.find('a').hasClass('ds-c-autocomplete__button')).toBe(
      true
    );
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

  it('allows custom props to be passed to the input', () => {
    const data = render(
      {
        example_prop: 'Example string'
      },
      true
    );
    const wrapper = data.wrapper;
    const input = wrapper.find('input');
    const label = wrapper.find('label');

    expect(input.prop('example_prop')).toBe('Example string');
    expect(label.prop('example_prop')).toBe(undefined);
  });

  it('renders a snapshot', () => {
    const tree = renderer
      .create(
        <AutocompleteField
          items={[{ id: 'kRf6c2fY', name: 'Cook County, IL' }]}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
