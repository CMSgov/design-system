const processMarkdownPage = require('../processMarkdownPage');

const markdown = `---
title: Foo
---
**Bar**`;

describe('processMarkdownPage', () => {
  it('should convert Markdown to HTML', () => {
    const output = processMarkdownPage('intro.md', markdown);
    expect(output.description.match(/<strong>/).length).toEqual(1);
  });

  it('should set page props', () => {
    const output = processMarkdownPage('intro.md', markdown);
    expect(output.header).toEqual('Foo');
    expect(output.description).toEqual('<p><strong>Bar</strong></p>\n');
    expect(output.referenceURI).toEqual('intro');
  });

  it('should prepend rootPath', () => {
    const output = processMarkdownPage('intro.md', markdown, '1.0');
    expect(output.referenceURI).toEqual('1.0/intro');
  });

  it('should clear referenceURI for index.md', () => {
    const output = processMarkdownPage('index.md', markdown);
    expect(output.referenceURI).toEqual('');
  });
});
