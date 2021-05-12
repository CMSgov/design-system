'use strict';
const processKssSection = require('../generatePages/processKssSection');

describe('processKssSection', () => {
  const section = (reference) => {
    return {
      toJSON: () => ({
        // These paragraphs need to be separated by a newline in order for
        // the flag processing to work properly.
        description: `<p>Hello world</p>\n<p>@react-props Component</p>\n<p>@hide-markup</p>\n<p>@responsive</p>\n<p>@analytics</p>\n<p>@status prototype</p>`,
        deprecated: false,
        experimental: false,
        header: 'Title - `<Component>`',
        markup: '<h1>Foo</h1>',
        modifiers: [
          {
            name: '.primary',
            description: 'The primary action',
            className: '',
          },
        ],
        parameters: [],
        reference: reference,
        source: {
          line: 1,
        },
      }),
    };
  };

  let promise;

  beforeAll(() => {
    promise = processKssSection(section('components.button'), { rootPath: 'root' });
  });

  it('sets and replaces flags', () => {
    return promise.then((data) => {
      expect(data.reactProps).toBe('Component');
      expect(data.hideMarkup).toBe(true);
      expect(data.responsive).toBe(true);
      expect(data.analytics).toBe(true);
      expect(data.status).toBe('prototype');
      expect(data.description).toBe('<p>Hello world</p>');
    });
  });

  it('converts Markdown in header', () => {
    return promise.then((data) => {
      expect(data.header).toBe('Title - <code>&#x3C;Component&#x3E;</code>');
    });
  });

  it('adds a sections property', () => {
    return promise.then((data) => {
      expect(data.sections).toEqual(expect.any(Array));
    });
  });
});
