const processMarkdownPage = require('../processMarkdownPage');

const markdown = `---
title: Foo
---
**Bar**`;

describe('processMarkdownPage', () => {
  const filePath = 'src/pages/intro.md';

  it('should convert Markdown to HTML', () => {
    const output = processMarkdownPage(filePath, markdown);
    expect(output.description.match(/<strong>/).length).toEqual(1);
  });

  it('should set page props', () => {
    const output = processMarkdownPage(filePath, markdown);
    expect(output.header).toEqual('Foo');
    expect(output.description).toEqual('<p><strong>Bar</strong></p>\n');
    expect(output.referenceURI).toEqual('intro');
  });

  it('should prepend rootPath', () => {
    const output = processMarkdownPage(filePath, markdown, '1.0');
    expect(output.referenceURI).toEqual('1.0/intro');
  });

  it('should set reference', () => {
    const output = processMarkdownPage(filePath, markdown, '1.0');
    expect(output.reference).toEqual('intro');
  });

  it('should clear referenceURI for index.md', () => {
    const output = processMarkdownPage('src/pages/index.md', markdown);
    expect(output.referenceURI).toEqual('');
  });

  it('should replace {{root}}', () => {
    const markdown2 = markdown + '{{root}}';
    const output = processMarkdownPage(filePath, markdown2, 'foo');
    expect(output.description.match(/foo/).length).toEqual(1);
  });
});
