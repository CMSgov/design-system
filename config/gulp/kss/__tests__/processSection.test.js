'use strict';
const processSection = require('../processSection');

describe('processSection', () => {
  let section = reference => {
    return {
      toJSON: () => (
        {
          description: '<p>Hello world</p><p>@react-component</p><p>@hide-markup</p>',
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
    data = processSection(section());
  });

  it('sets and replaces flags', () => {
    expect(data.hasReactComponent).toEqual(true);
    expect(data.hideMarkup).toEqual(true);
    expect(data.description).toEqual('<p>Hello world</p>');
  });

  it('renders EJS', () => {
    expect(data.markup).toEqual('bar');
  });

  it('adds a sections property', () => {
    expect(data.sections).toEqual(expect.any(Array));
  });
});
