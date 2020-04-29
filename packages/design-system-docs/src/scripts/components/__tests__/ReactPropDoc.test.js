import React from 'react';
import ReactPropDoc from '../ReactPropDoc';
import { shallow } from 'enzyme';

/**
 * Helper method for shallow rendering the <ReactPropDoc> component. The only props
 * initially defined are the required props.
 * @param {object} customProps - Additional props
 * @return {object}
 */
function shallowRender(customProps = {}) {
  const props = Object.assign(
    {
      name: 'foo',
      required: false,
      type: { name: 'string' }
    },
    customProps
  );

  return {
    props: props,
    wrapper: shallow(<ReactPropDoc {...props} />)
  };
}

describe('ReactPropDoc', () => {
  it('should render name', () => {
    const data = shallowRender();

    expect(
      data.wrapper
        .find('td')
        .first()
        .text()
    ).toBe(data.props.name);
  });

  it('should render "required"', () => {
    const data = shallowRender({ required: true });

    expect(
      data.wrapper
        .find('td .ds-c-badge')
        .first()
        .text()
    ).toBe('Required');
  });

  it('should render type', () => {
    const data = shallowRender();

    expect(
      data.wrapper
        .find('td')
        .at(1)
        .text()
    ).toBe(data.props.type.name);
  });

  it('should render default value', () => {
    const data = shallowRender({ defaultValue: { value: 'bar' } });

    expect(
      data.wrapper
        .find('td')
        .at(2)
        .text()
    ).toBe(data.props.defaultValue.value);
  });

  it('should render description', () => {
    const data = shallowRender({ description: 'bar' });

    expect(
      data.wrapper
        .find('td')
        .at(3)
        .html()
    ).toMatch(/bar/);
  });

  it('should render shape for PropType.arrayOf(PropType.shape)', () => {
    const data = shallowRender({
      type: {
        name: 'arrayOf',
        value: {
          name: 'shape',
          value: {
            onBlur: {
              name: 'func'
            },
            onChange: {
              name: 'func'
            }
          }
        }
      }
    });

    expect(
      data.wrapper
        .find('td')
        .at(1)
        .text()
    ).toBe('arrayOf[{onBlur, onChange}]');
  });

  it('should render computed shape value', () => {
    const data = shallowRender({
      type: {
        name: 'arrayOf',
        value: {
          computed: true,
          name: 'shape',
          value: 'Bar.propTypes'
        }
      }
    });

    expect(
      data.wrapper
        .find('td')
        .at(1)
        .text()
    ).toBe('arrayOf[Bar.propTypes]');
  });

  it('should render valid values of PropType.oneOf', () => {
    const data = shallowRender({
      type: {
        name: 'union',
        value: [{ name: 'string' }, { name: 'bool' }]
      }
    });

    expect(
      data.wrapper
        .find('td')
        .at(1)
        .text()
    ).toBe('string, bool');
  });
});
