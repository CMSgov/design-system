'use strict';
const processSection = require('../processSection');

describe('processSection', () => {
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
          markup: '<% var foo="bar" %><%= foo %> {{root}}',
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

  let data;

  beforeAll(() => {
    data = processSection(section('components.button'), 'root');
  });

  it('sets and replaces flags', () => {
    expect(data.reactComponent).toBe('Component');
    expect(data.hideMarkup).toBe(true);
    expect(data.status).toBe('prototype');
    expect(data.description).toBe('<p>Hello world</p>');
  });

  it('prepends rootPath', () => {
    expect(data.referenceURI).toBe('root/components/button');
  });

  it('renders EJS and replaces {{root}}', () => {
    expect(data.markup).toBe('bar /root');
  });

  it('converts Markdown in header', () => {
    expect(data.header).toBe('Title - <code>&#x3C;Component&#x3E;</code>');
  });

  it('adds a sections property', () => {
    expect(data.sections).toEqual(expect.any(Array));
  });
});
