import Choice from './Choice';
import FormLabel from '../FormLabel/FormLabel';
import React from 'react';
import { shallow } from 'enzyme';

const label = 'George Washington';

function shallowRender(customProps = {}, children = label) {
  const props = Object.assign(
    {
      name: 'foo',
      value: 'boo'
    },
    customProps
  );

  return {
    props: props,
    wrapper: shallow(<Choice {...props}>{children}</Choice>)
  };
}

describe('Choice', () => {
  it('accepts a node as innerHTML', () => {
    const wrapper = shallowRender(
      {},
      <p>
        <strong>Hello</strong> World
      </p>
    ).wrapper;
    const labelNode = wrapper.find(FormLabel).dive();

    expect(
      labelNode
        .children()
        .first()
        .children()
        .first()
        .is('p')
    ).toBe(true);
  });

  it('is not checked', () => {
    const wrapper = shallowRender().wrapper;
    const input = wrapper.find('input');

    expect(input.prop('checked')).toBeUndefined();
    expect(input.prop('defaultChecked')).toBeUndefined();
  });

  it('is checked', () => {
    const wrapper = shallowRender({ checked: true }).wrapper;
    const input = wrapper.find('input');

    expect(input.prop('checked')).toBe(true);
    expect(input.prop('defaultChecked')).toBeUndefined();
  });

  it('is defaultChecked', () => {
    const wrapper = shallowRender({ defaultChecked: true }).wrapper;
    const input = wrapper.find('input');

    expect(input.prop('checked')).toBeUndefined();
    expect(input.prop('defaultChecked')).toBe(true);
  });

  it('is required', () => {
    const wrapper = shallowRender({ required: true }).wrapper;
    const input = wrapper.find('input');

    expect(input.prop('required')).toBe(true);
  });

  it('is a checkbox by default', () => {
    const wrapper = shallowRender().wrapper;
    const input = wrapper.find('input');

    expect(input.prop('type')).toBe('checkbox');
    expect(input.prop('required')).toBeUndefined();
  });

  it('is a radio button', () => {
    const wrapper = shallowRender({ type: 'radio' }).wrapper;
    const input = wrapper.find('input');

    expect(input.prop('type')).toBe('radio');
  });

  it('applies className to input', () => {
    const wrapper = shallowRender().wrapper;
    const input = wrapper.find('input');

    expect(input.hasClass('ds-c-choice')).toBe(true);
    expect(input.hasClass('ds-c-choice--inverse')).toBe(false);
  });

  it('applies inverse className to input', () => {
    const wrapper = shallowRender({ inversed: true }).wrapper;
    const input = wrapper.find('input');

    expect(input.hasClass('ds-c-choice')).toBe(true);
    expect(input.hasClass('ds-c-choice--inverse')).toBe(true);
  });

  it('places input on left by default', () => {
    const wrapper = shallowRender().wrapper;
    const input = wrapper.find('input');

    expect(input.hasClass('ds-c-choice')).toBe(true);
    expect(input.hasClass('ds-c-choice--right')).toBe(false);
  });

  it('places input on right', () => {
    const wrapper = shallowRender({ inputPlacement: 'right' }).wrapper;
    const input = wrapper.find('input');

    expect(input.hasClass('ds-c-choice')).toBe(true);
    expect(input.hasClass('ds-c-choice--right')).toBe(true);
  });

  it('applies small className to input', () => {
    const wrapper = shallowRender({ size: 'small' }).wrapper;
    const input = wrapper.find('input');

    expect(input.hasClass('ds-c-choice')).toBe(true);
    expect(input.hasClass('ds-c-choice--small')).toBe(true);
  });

  it('applies additional classNames to root element', () => {
    const wrapper = shallowRender({ className: 'foo' }).wrapper;

    expect(wrapper.hasClass('foo')).toBe(true);
  });

  it('applies additional classNames to input element', () => {
    const wrapper = shallowRender({ inputClassName: 'foo' }).wrapper;
    const input = wrapper.find('input');

    expect(input.hasClass('foo')).toBe(true);
  });

  it('accepts a string value', () => {
    const data = shallowRender({ value: 'bar' });
    const input = data.wrapper.find('input');

    expect(input.prop('value')).toBe(data.props.value);
  });

  it('accepts a number value', () => {
    const data = shallowRender({ value: 100 });
    const input = data.wrapper.find('input');

    expect(input.prop('value')).toBe(data.props.value);
  });

  it('accepts a custom id', () => {
    const data = shallowRender({ id: 'custom_id' });
    const input = data.wrapper.find('input');
    const labelNode = data.wrapper.find(FormLabel).dive();

    expect(input.prop('id')).toBe(data.props.id);
    expect(labelNode.prop('htmlFor')).toBe(data.props.id);
  });

  it('generates a unique id', () => {
    const sharedProps = {
      name: 'presidents'
    };
    const wrapper = shallow(
      <div>
        <Choice value="a" {...sharedProps}>
          {label}
        </Choice>
        <Choice value="b" {...sharedProps}>
          {label}
        </Choice>
      </div>
    );
    const $wrapper = wrapper.render();

    const idRegex = new RegExp(`checkbox_${sharedProps.name}_[0-9]+`);
    const inputAId = $wrapper
      .find('input')
      .eq(0)
      .attr('id');
    const inputBId = $wrapper
      .find('input')
      .eq(1)
      .attr('id');

    // IDs should be unique!
    expect(inputAId).not.toBe(inputBId);

    // First Choice
    expect(inputAId).toMatch(idRegex);
    expect(
      $wrapper
        .find('label')
        .eq(0)
        .attr('for')
    ).toBe(inputAId);

    // Second choice
    expect(inputBId).toMatch(idRegex);
    expect(
      $wrapper
        .find('label')
        .eq(1)
        .attr('for')
    ).toBe(inputBId);
  });

  describe('state', () => {
    it('sets state for uncontrolled component', () => {
      const data = shallowRender({ defaultChecked: true });

      expect(data.wrapper.instance().isControlled).toBe(false);
      expect(data.wrapper.state('checked')).toBe(data.props.defaultChecked);
    });

    it('does not set state for controlled component', () => {
      const data = shallowRender({ checked: true });

      expect(data.wrapper.instance().isControlled).toBe(true);
      expect(data.wrapper.state('checked')).toBeUndefined();
    });
  });

  describe('event handlers and emitters', () => {
    let props;

    beforeEach(() => {
      props = {
        onBlur: jest.fn(),
        onChange: jest.fn()
      };
    });

    describe('onChange', () => {
      it('calls the onChange handler', () => {
        const data = shallowRender(props);
        const input = data.wrapper.find('input');

        input.simulate('change', {
          target: { checked: true }
        });

        expect(data.props.onBlur.mock.calls.length).toBe(0);
        expect(data.props.onChange.mock.calls.length).toBe(1);
      });

      it('updates state when uncontrolled component', () => {
        props.defaultChecked = true;
        const data = shallowRender(props);
        const input = data.wrapper.find('input');

        input.simulate('change', {
          target: { checked: false }
        });

        expect(data.wrapper.state('checked')).toBe(false);
      });

      it('skips updating state when controlled component', () => {
        props.checked = true;
        const data = shallowRender(props);
        const input = data.wrapper.find('input');

        input.simulate('change', {
          target: { checked: false }
        });

        expect(data.wrapper.state('checked')).toBeUndefined();
      });
    });

    it('calls the onBlur handler', () => {
      const data = shallowRender(props);
      const input = data.wrapper.find('input');

      input.simulate('blur');

      expect(data.props.onBlur.mock.calls.length).toBe(1);
      expect(data.props.onChange.mock.calls.length).toBe(0);
    });

    describe('uncheck event emitter', () => {
      it('sets uncheckEventName for uncontrolled radio buttons', () => {
        const data = shallowRender({ type: 'radio', defaultChecked: false });

        expect(data.wrapper.instance().uncheckEventName).toBe(
          `${data.props.name}-uncheck`
        );
      });

      it('does not set uncheckEventName for controlled radio buttons', () => {
        const data = shallowRender({ type: 'radio', checked: false });

        expect(data.wrapper.instance().uncheckEventName).toBeUndefined();
      });

      it('does not set uncheckEventName for uncontrolled checkbox', () => {
        const data = shallowRender({ defaultChecked: true });

        expect(data.wrapper.instance().uncheckEventName).toBeUndefined();
      });
    });
  });

  describe('nested content', () => {
    let props;

    function expectCheckedChildren(wrapper) {
      expect(wrapper.find('.unchecked-child').length).toBe(0);
      expect(wrapper.find('.checked-child').length).toBe(1);
    }

    function expectUncheckedChildren(wrapper) {
      expect(wrapper.find('.unchecked-child').length).toBe(1);
      expect(wrapper.find('.checked-child').length).toBe(0);
    }

    beforeEach(() => {
      props = {
        checkedChildren: (
          <strong className="checked-child">I am checked</strong>
        ),
        uncheckedChildren: (
          <strong className="unchecked-child">I am unchecked</strong>
        ),
        name: 'foo',
        value: 'bar'
      };
    });

    describe('controlled component', () => {
      it('renders uncheckedChildren when not checked', () => {
        const wrapper = shallow(<Choice {...props}>Foo</Choice>);

        expectUncheckedChildren(wrapper);
      });

      it('renders uncheckedChildren when checked is changed to false', () => {
        props.checked = true;
        const wrapper = shallow(<Choice {...props}>Foo</Choice>);
        wrapper.setProps({ checked: false });

        expectUncheckedChildren(wrapper);
      });

      it('renders checkedChildren when checked', () => {
        props.checked = true;
        const wrapper = shallow(<Choice {...props}>Foo</Choice>);

        expectCheckedChildren(wrapper);
      });

      it('renders checkedChildren when checked is changed to true', () => {
        props.checked = false;
        const wrapper = shallow(<Choice {...props}>Foo</Choice>);
        wrapper.setProps({ checked: true });

        expectCheckedChildren(wrapper);
      });
    });

    describe('uncontrolled component', () => {
      it('renders uncheckedChildren when not defaultChecked', () => {
        props.defaultChecked = false;
        const wrapper = shallow(<Choice {...props}>Foo</Choice>);

        expectUncheckedChildren(wrapper);
      });

      it('renders uncheckedChildren when changed to unchecked', () => {
        props.defaultChecked = true;
        const wrapper = shallow(<Choice {...props}>Foo</Choice>);

        wrapper.setState({ checked: false });
        expectUncheckedChildren(wrapper);
      });

      it('renders checkedChildren when defaultChecked', () => {
        props.defaultChecked = true;
        const wrapper = shallow(<Choice {...props}>Foo</Choice>);

        expectCheckedChildren(wrapper);
      });
    });
  });
});
