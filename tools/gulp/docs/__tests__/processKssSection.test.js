'use strict';
const processKssSection = require('../processKssSection');

describe('processKssSection', () => {
  let section = reference => {
    return {
      toJSON: () => (
        {
          // These paragraphs need to be separated by a newline in order for
          // the flag processing to work properly.
          description: `<p>Hello world</p>\n<p>@react-component Component</p>\n<p>@hide-markup</p>\n<p>@status prototype</p>`,
          deprecated: false,
          experimental: false,
          header: 'Title - `<Component>`',
          markup: '<h1>Foo</h1>',
          modifiers: [{
            name: '.primary',
            description: 'The primary action',
            className: ''
          }],
          parameters: [],
          reference: reference,
          source: {
            line: 1
          }
        }
      )
    };
  };

  let promise;

  beforeAll(() => {
    promise = processKssSection(section('components.button'), 'root');
  });

  it('sets and replaces flags', () => {
    return promise.then(data => {
      expect(data.reactComponent).toBe('Component');
      expect(data.hideMarkup).toBe(true);
      expect(data.status).toBe('prototype');
      expect(data.description).toBe('<p>Hello world</p>');
    });
  });

  it('prepends rootPath', () => {
    return promise.then(data => {
      expect(data.referenceURI).toBe('root/components/button');
    });
  });

  it('converts Markdown in header', () => {
    return promise.then(data => {
      expect(data.header).toBe('Title - <code>&#x3C;Component&#x3E;</code>');
    });
  });

  it('adds a sections property', () => {
    return promise.then(data => {
      expect(data.sections).toEqual(expect.any(Array));
    });
  });
});
