import Choice, { ChoiceProps, ChoiceType } from './Choice';
import FormLabel from '../FormLabel/FormLabel';
import React from 'react';
import { shallow } from 'enzyme';

const defaultProps = {
  name: 'foo',
  value: 'boo',
  type: 'checkbox' as ChoiceType,
  label: 'George Washington',
};

function render(customProps = {}) {
  const props: ChoiceProps = { ...defaultProps, ...customProps };
  return {
    props,
    wrapper: shallow(<Choice {...props} />),
  };
}

describe('Choice', () => {
  it('accepts a node as innerHTML', () => {
    const { wrapper } = render({
      label: (
        <p>
          <strong>Hello</strong> World
        </p>
      ),
    });
    const labelNode = wrapper.find(FormLabel).dive();

    expect(labelNode.children().first().children().first().is('p')).toBe(true);
  });

  it('is not checked', () => {
    const { wrapper } = render();
    const input = wrapper.find('input');

    expect(input.prop('checked')).toBeUndefined();
    expect(input.prop('defaultChecked')).toBeUndefined();
  });

  it('is checked', () => {
    const { wrapper } = render({ checked: true });
    const input = wrapper.find('input');

    expect(input.prop('checked')).toBe(true);
    expect(input.prop('defaultChecked')).toBeUndefined();
  });

  it('is defaultChecked', () => {
    const { wrapper } = render({ defaultChecked: true });
    const input = wrapper.find('input');

    expect(input.prop('checked')).toBeUndefined();
    expect(input.prop('defaultChecked')).toBe(true);
  });

  it('is required', () => {
    const { wrapper } = render({ required: true });
    const input = wrapper.find('input');

    expect(input.prop('required')).toBe(true);
  });

  it('is a checkbox field', () => {
    const { wrapper } = render();
    const input = wrapper.find('input');

    expect(input.prop('type')).toBe('checkbox');
    expect(input.prop('required')).toBeUndefined();
  });

  it('is a radio button', () => {
    const { wrapper } = render({ type: 'radio' });
    const input = wrapper.find('input');

    expect(input.prop('type')).toBe('radio');
  });

  it('applies className to input', () => {
    const { wrapper } = render();
    const input = wrapper.find('input');

    expect(input.hasClass('ds-c-choice')).toBe(true);
    expect(input.hasClass('ds-c-choice--inverse')).toBe(false);
  });

  it('applies className to label', () => {
    const { wrapper } = render({ labelClassName: 'ds-u-font-weight--bold' });
    expect(wrapper.find('FormLabel')).toMatchSnapshot();
  });

  it('has a hint and requirementLabel', () => {
    const { wrapper } = render({
      hint: 'Hello world',
      requirementLabel: 'Optional ',
    });

    expect(wrapper.find('FormLabel')).toMatchSnapshot();
  });

  it('applies inverse className to input', () => {
    const { wrapper } = render({ inversed: true });
    const input = wrapper.find('input');

    expect(input.hasClass('ds-c-choice')).toBe(true);
    expect(input.hasClass('ds-c-choice--inverse')).toBe(true);
  });

  it('places input on left by default', () => {
    const { wrapper } = render();
    const input = wrapper.find('input');

    expect(input.hasClass('ds-c-choice')).toBe(true);
  });

  it('applies small className to input', () => {
    const { wrapper } = render({ size: 'small' });
    const input = wrapper.find('input');

    expect(input.hasClass('ds-c-choice')).toBe(true);
    expect(input.hasClass('ds-c-choice--small')).toBe(true);
  });

  it('applies additional classNames to root element', () => {
    const { wrapper } = render({ className: 'foo' });

    expect(wrapper.hasClass('foo')).toBe(true);
  });

  it('applies additional classNames to input element', () => {
    const { wrapper } = render({ inputClassName: 'foo' });
    const input = wrapper.find('input');

    expect(input.hasClass('foo')).toBe(true);
  });

  it('accepts a string value', () => {
    const data = render({ value: 'bar' });
    const input = data.wrapper.find('input');

    expect(input.prop('value')).toBe(data.props.value);
  });

  it('accepts a number value', () => {
    const data = render({ value: 100 });
    const input = data.wrapper.find('input');

    expect(input.prop('value')).toBe(data.props.value);
  });

  it('accepts a custom id', () => {
    const data = render({ id: 'custom_id' });
    const input = data.wrapper.find('input');
    const labelNode = data.wrapper.find(FormLabel).dive();

    expect(input.prop('id')).toBe(data.props.id);
    expect(labelNode.prop('htmlFor')).toBe(data.props.id);
  });

  it('generates a unique id', () => {
    const sharedProps = {
      name: 'presidents',
      label: defaultProps.label,
    };
    const wrapper = shallow(
      <div>
        <Choice type="checkbox" value="a" {...sharedProps} />
        <Choice type="checkbox" value="b" {...sharedProps} />
      </div>
    ).render();

    const idRegex = new RegExp(`checkbox_${sharedProps.name}_[0-9]+`);
    const inputAId = wrapper.find('input').eq(0).attr('id');
    const inputBId = wrapper.find('input').eq(1).attr('id');

    // IDs should be unique!
    expect(inputAId).not.toBe(inputBId);

    // First Choice
    expect(inputAId).toMatch(idRegex);
    expect(wrapper.find('label').eq(0).attr('for')).toBe(inputAId);

    // Second choice
    expect(inputBId).toMatch(idRegex);
    expect(wrapper.find('label').eq(1).attr('for')).toBe(inputBId);
  });

  describe('state', () => {
    it('sets state for uncontrolled component', () => {
      const data = render({ defaultChecked: true });

      expect(data.wrapper.instance().isControlled).toBe(false);
      expect(data.wrapper.state('checked')).toBe(data.props.defaultChecked);
    });

    it('does not set state for controlled component', () => {
      const data = render({ checked: true });

      expect(data.wrapper.instance().isControlled).toBe(true);
      expect(data.wrapper.state()).toBeNull();
    });
  });

  describe('event handlers and emitters', () => {
    let props;

    beforeEach(() => {
      props = {
        onBlur: jest.fn(),
        onChange: jest.fn(),
      };
    });

    describe('onChange', () => {
      it('calls the onChange handler', () => {
        const data = render(props);
        const input = data.wrapper.find('input');

        input.simulate('change', {
          target: { checked: true },
        });

        expect(data.props.onBlur).toHaveBeenCalledTimes(0);
        expect(data.props.onChange).toHaveBeenCalledTimes(1);
      });

      it('updates state when uncontrolled component', () => {
        props.defaultChecked = true;
        const data = render(props);
        const input = data.wrapper.find('input');

        input.simulate('change', {
          target: { checked: false },
        });

        expect(data.wrapper.state('checked')).toBe(false);
      });

      it('skips updating state when controlled component', () => {
        props.checked = true;
        const data = render(props);
        const input = data.wrapper.find('input');

        input.simulate('change', {
          target: { checked: false },
        });

        expect(data.wrapper.state()).toBeNull();
      });
    });

    it('calls the onBlur handler', () => {
      const data = render(props);
      const input = data.wrapper.find('input');

      input.simulate('blur');

      expect(data.props.onBlur).toHaveBeenCalledTimes(1);
      expect(data.props.onChange).toHaveBeenCalledTimes(0);
    });

    describe('uncheck event emitter', () => {
      it('sets uncheckEventName for uncontrolled radio buttons', () => {
        const data = render({ type: 'radio', defaultChecked: false });

        expect(data.wrapper.instance().uncheckEventName).toBe(`${data.props.name}-uncheck`);
      });

      it('does not set uncheckEventName for controlled radio buttons', () => {
        const data = render({ type: 'radio', checked: false });

        expect(data.wrapper.instance().uncheckEventName).toBeUndefined();
      });

      it('does not set uncheckEventName for uncontrolled checkbox', () => {
        const data = render({ defaultChecked: true });

        expect(data.wrapper.instance().uncheckEventName).toBeUndefined();
      });
    });
  });

  describe('nested content', () => {
    const props = {
      checkedChildren: <strong className="checked-child">I am checked</strong>,
      uncheckedChildren: <strong className="unchecked-child">I am unchecked</strong>,
      name: 'foo',
      value: 'bar',
    };

    function expectCheckedChildren(wrapper) {
      expect(wrapper.find('.unchecked-child').length).toBe(0);
      expect(wrapper.find('.checked-child').length).toBe(1);
    }

    function expectUncheckedChildren(wrapper) {
      expect(wrapper.find('.unchecked-child').length).toBe(1);
      expect(wrapper.find('.checked-child').length).toBe(0);
    }

    describe('controlled component', () => {
      it('renders uncheckedChildren when not checked', () => {
        const { wrapper } = render(props);

        expectUncheckedChildren(wrapper);
      });

      it('renders uncheckedChildren when checked is changed to false', () => {
        const { wrapper } = render({ ...props, ...{ checked: true } });
        wrapper.setProps({ checked: false });

        expectUncheckedChildren(wrapper);
      });

      it('renders checkedChildren when checked', () => {
        const { wrapper } = render({ ...props, ...{ checked: true } });

        expectCheckedChildren(wrapper);
      });

      it('renders checkedChildren when checked is changed to true', () => {
        const { wrapper } = render({ ...props, ...{ checked: false } });
        wrapper.setProps({ checked: true });

        expectCheckedChildren(wrapper);
      });
    });

    describe('uncontrolled component', () => {
      it('renders uncheckedChildren when not defaultChecked', () => {
        const { wrapper } = render({ ...props, ...{ defaultChecked: false } });

        expectUncheckedChildren(wrapper);
      });

      it('renders uncheckedChildren when changed to unchecked', () => {
        const { wrapper } = render({ ...props, ...{ defaultChecked: true } });

        wrapper.setState({ checked: false });
        expectUncheckedChildren(wrapper);
      });

      it('renders checkedChildren when defaultChecked', () => {
        const { wrapper } = render({ ...props, ...{ defaultChecked: true } });

        expectCheckedChildren(wrapper);
      });
    });
  });
});
