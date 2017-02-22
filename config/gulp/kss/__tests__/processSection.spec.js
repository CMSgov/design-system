'use strict';
const processSection = require('../processSection');

describe('processSection', () => {
  let section = {
    toJSON: () => (
      {
        description: '<p>Hello world</p><p>@react-example TestExample</p>',
        modifiers: [{
          name: '.primary',
          description: 'The primary action',
          className: ''
        }],
        parameters: []
      }
    )
  };

  let data;

  beforeAll(() => {
    data = processSection(section);
  });

  it('sets and replaces flags', () => {
    expect(data.reactExample).toEqual('TestExample');
    expect(data.description).toEqual('<p>Hello world</p>');
  });

  it('adds a sections property', () => {
    expect(data.sections).toEqual(expect.any(Map));
  });
});
