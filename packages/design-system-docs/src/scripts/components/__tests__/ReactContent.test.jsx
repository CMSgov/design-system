/* eslint-disable import/first */
jest.mock('../ReactExample');

import React from 'react';
import ReactContent from '../ReactContent';
import { mount } from 'enzyme';

function render(customProps = {}) {
  const props = {
    ...{
      reactExampleSource: '<Foo />',
      reactComponentProps: {
        locale: {
          type: { name: 'string' },
          required: false,
          description: '<p>A translation string</p>',
        },
      },
    },
    ...customProps,
  };

  // Wrapping ReactContent in a <div> because Enzyme doesn't yet support
  // React 16 fragments: https://github.com/airbnb/enzyme/issues/1213
  return {
    props: props,
    wrapper: mount(
      <div>
        <ReactContent {...props} />
      </div>
    ),
  };
}

describe('ReactContent', () => {
  it('has example, and props table', () => {
    const data = render();

    expect(data.wrapper.find('ReactExample').length).toBe(1);
    expect(data.wrapper.find('ReactPropDocs').length).toBe(1);
  });

  it('has no props table', () => {
    const data = render({ reactComponentProps: undefined });

    expect(data.wrapper.find('ReactExample').length).toBe(1);
    expect(data.wrapper.find('ReactPropDocs').length).toBe(0);
  });

  it('has no example', () => {
    const data = render({ reactExampleSource: undefined });

    expect(data.wrapper.find('ReactExample').length).toBe(0);
    expect(data.wrapper.find('ReactPropDocs').length).toBe(1);
  });
});
