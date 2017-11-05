/* eslint-disable import/first */
jest.mock('../../../data/react-doc.json');
jest.mock('../ReactExample');

import React from 'react';
import ReactContent from '../ReactContent';
import { mount } from 'enzyme';

function render(customProps = {}, component = 'ComponentWithDescription') {
  const props = Object.assign(
    {
      reactComponent: component,
      source: {
        filename: `components/${component}/${component}.scss`,
        path: `packages/core/src/components/${component}/${component}.scss`
      }
    },
    customProps
  );

  // Wrapping ReactContent in a <div> because Enzyme doesn't yet support
  // React 16 fragments: https://github.com/airbnb/enzyme/issues/1213
  return {
    props: props,
    wrapper: mount(
      <div>
        <ReactContent {...props} />
      </div>
    )
  };
}

describe('ReactContent', () => {
  it('has description, example, and no props table', () => {
    const data = render();

    expect(data.wrapper.find('.c-details').length).toBe(1);
    expect(data.wrapper.find('ReactExample').length).toBe(1);
    expect(data.wrapper.find('ReactPropDocs').length).toBe(0);
  });

  it('has example and props table', () => {
    const data = render({}, 'ComponentWithProps');

    expect(data.wrapper.find('.c-details').length).toBe(0);
    expect(data.wrapper.find('ReactExample').length).toBe(1);
    expect(data.wrapper.find('ReactPropDocs').length).toBe(1);
  });

  it('hides example', () => {
    const data = render({
      hideExample: true
    });

    expect(data.wrapper.find('ReactExample').length).toBe(0);
  });

  it('uses reactExample prop for rendering example', () => {
    const data = render({ reactExample: 'Bar' });

    expect(data.wrapper.find('ReactExample').prop('path')).toMatch(/Bar/);
  });
});
