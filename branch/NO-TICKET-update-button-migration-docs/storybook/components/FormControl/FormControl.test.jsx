import { mount, shallow } from 'enzyme';
import FormControl from './FormControl';
import React from 'react';

const defaultProps = {
  label: 'Foo',
  component: 'div',
  labelComponent: 'label',
  errorPlacement: 'top',
  render: ({ id, labelId, setRef }) => {
    return <input id={id} aria-describedby={labelId} ref={setRef} />;
  },
};

function render(customProps = {}, deep = false) {
  const props = { ...defaultProps, ...customProps };
  const component = <FormControl {...props} />;

  return {
    props,
    wrapper: deep ? mount(component) : shallow(component),
  };
}

describe('FormControl', function () {
  it('renders default component and labelComponent elements', () => {
    const data = render({});

    expect(data.wrapper.find('div').length).toBe(1);
    expect(data.wrapper.find('FormLabel').length).toBe(1);
    expect(data.wrapper).toMatchSnapshot();
  });

  it('renders custom component and labelComponent elements', () => {
    const data = render({
      component: 'fieldset',
      labelComponent: 'legend',
    });

    expect(data.wrapper.find('fieldset').length).toBe(1);
    expect(data.wrapper.find('FormLabel').prop('component')).toEqual('legend');
    expect(data.wrapper).toMatchSnapshot();
  });

  it('passes label to FormLabel', () => {
    const data = render();
    const children = data.wrapper.find('FormLabel').prop('children');
    expect(children.props.children).toContain(data.props.label);
  });

  it('passes hint to FormLabel', () => {
    const data = render({ hint: '123' });

    expect(data.wrapper.find('FormLabel').prop('hint')).toBe(data.props.hint);
  });

  it('passes errorMessage to FormLabel', () => {
    const data = render({ errorMessage: 'error' });

    expect(data.wrapper.find('FormLabel').prop('errorMessage')).toBe(data.props.errorMessage);
  });

  it('passes error to FormLabel', () => {
    const data = render({ errorMessage: 'Error' });

    expect(data.wrapper.find('FormLabel').prop('errorMessage')).toBe(data.props.errorMessage);
  });

  it('renders bottom placed errors ', () => {
    const data = render({ errorMessage: 'Error', errorPlacement: 'bottom' });

    expect(data.wrapper.find('FormLabel').prop('errorMessage')).toBeUndefined();
    expect(data.wrapper.find('InlineError').prop('children')).toEqual('Error');
    expect(data.wrapper).toMatchSnapshot();
  });

  it('uses aria-invalid for fieldsets with errorMessage', () => {
    const data = render({ errorMessage: 'Error', component: 'fieldset' });

    expect(data.wrapper.find('fieldset').prop('aria-invalid')).toBe(true);
    expect(data.wrapper).toMatchSnapshot();
  });

  it('passes inversed to FormLabel', () => {
    const data = render({ inversed: true });

    expect(data.wrapper.find('FormLabel').prop('inversed')).toBe(data.props.inversed);
  });

  it('adds className to root element', () => {
    const data = render({ className: 'bar' });

    expect(data.wrapper.hasClass(data.props.className)).toBe(true);
  });

  it('generates a unique label id when labelId is not defined', () => {
    const data = render();

    expect(data.wrapper.find('FormLabel').prop('id')).toBeDefined();
  });

  it('passes labelId to the label', () => {
    const data = render({ labelId: '1' });

    expect(data.wrapper.find('FormLabel').prop('id')).toBe(data.props.labelId);
  });

  it('generates a unique field input id when id is not defined', () => {
    const data = render({});

    expect(data.wrapper.find('input').prop('id')).toBeDefined();
  });

  it('passes id to the field input', () => {
    const data = render({ id: '1' });

    expect(data.wrapper.find('input').prop('id')).toBe(data.props.id);
  });

  it('returns reference to input field', () => {
    let ref;
    const data = render(
      {
        defaultValue: 'Yay',
        inputRef: (el) => {
          ref = el;
        },
      },
      true
    );

    setTimeout(() => {
      expect(ref.value).toBe(data.props.defaultValue);
    }, 20);
  });

  it('focuses the input when focusTrigger is passed', () => {
    const data = render(
      {
        id: 'focus',
        focusTrigger: true,
      },
      true
    );

    setTimeout(() => {
      expect(data.wrapper.find('input').props().id).toEqual(document.activeElement.id);
    }, 20);
  });
});
