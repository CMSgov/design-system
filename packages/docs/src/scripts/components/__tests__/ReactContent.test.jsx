/* eslint-disable import/first */
jest.mock('../ReactExample');

import React from 'react';
import ReactContent from '../ReactContent';
import { mount } from 'enzyme';

function render(
  customProps = {},
  docsContent = { description: true, props: true }
) {
  const props = Object.assign(
    {
      reactExamplePath: 'components/Button/Button.example.jsx',
      reactExampleSource: '<Foo />',
      reactComponentDocs: {
        description: docsContent.description ? '<p>Hello world</p>' : null,
        props: docsContent.props
          ? {
              locale: {
                type: { name: 'string' },
                required: false,
                description: '<p>A translation string</p>'
              }
            }
          : null
      },
      reactComponentPath: 'components/Button/Button.jsx'
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
  it('has description, example, and props table', () => {
    const data = render();

    expect(data.wrapper.find('.c-details').length).toBe(1);
    expect(data.wrapper.find('ReactExample').length).toBe(1);
    expect(data.wrapper.find('ReactPropDocs').length).toBe(1);
  });

  it('has no description or props table', () => {
    const data = render({}, { description: false, props: false });

    expect(data.wrapper.find('.c-details').length).toBe(0);
    expect(data.wrapper.find('ReactExample').length).toBe(1);
    expect(data.wrapper.find('ReactPropDocs').length).toBe(0);
  });

  it('hides example', () => {
    const data = render({
      hideExample: true
    });

    expect(data.wrapper.find('ReactExample').length).toBe(0);
  });

  it('uses reactExamplePath prop for rendering example', () => {
    const data = render();
    expect(data.wrapper.find('ReactExample').prop('path')).toMatch(
      /Button.example.jsx/
    );
  });
});
