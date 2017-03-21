'use strict';
const processSection = require('../processSection');

describe('processSection', () => {
  let section = reference => {
    return {
      toJSON: () => (
        {
          description: '<p>Hello world</p><p>@react-component</p><p>@hide-markup</p><p>@status prototype</p>',
          markup: '<% var foo="bar" %><%= foo %>',
          modifiers: [{
            name: '.primary',
            description: 'The primary action',
            className: ''
          }],
          parameters: [],
          reference: reference
        }
      )
    };
  };

  let data;

  beforeAll(() => {
    data = processSection(section('components.button'), 'root');
  });

  it('sets and replaces flags', () => {
    expect(data.hasReactComponent).toEqual(true);
    expect(data.hideMarkup).toEqual(true);
    expect(data.status).toEqual('prototype');
    expect(data.description).toEqual('<p>Hello world</p>');
  });

  it('prepends rootPath', () => {
    expect(data.referenceURI).toEqual('root/components/button');
  });

  it('renders EJS', () => {
    expect(data.markup).toEqual('bar');
  });

  it('adds a sections property', () => {
    expect(data.sections).toEqual(expect.any(Array));
  });
});
