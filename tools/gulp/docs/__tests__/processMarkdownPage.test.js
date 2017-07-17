const processMarkdownPage = require('../processMarkdownPage');

const markdown = `---
title: Foo
hide-example: true
---
**Bar**`;

describe('processMarkdownPage', () => {
  const filePath = '/cms/design/packages/docs/src/pages/boom-bap.md';

  it('should convert Markdown to HTML', () => {
    return processMarkdownPage(filePath, markdown)
      .then(output => {
        expect(output.description.match(/<strong>/).length).toEqual(1);
      });
  });

  it('should set source.path relative to project directory', () => {
    return processMarkdownPage(filePath, markdown)
      .then(output => {
        const relativePath = filePath.match(/packages\/[a-zA-Z.\-_/]+/)[0];
        expect(output.source.path).toEqual(relativePath);
        expect(output.source.path).toMatch(/\.md$/);
      });
  });

  it('should set required page props', () => {
    return processMarkdownPage(filePath, markdown)
      .then(output => {
        expect(output.header).toEqual('Foo');
        expect(output.description).toEqual('<p><strong>Bar</strong></p>\n');
        expect(output.markup).toEqual('');
        expect(output.referenceURI).toEqual('boom-bap');
        expect(output.weight).toEqual(0);
      });
  });

  it('processes flags', () => {
    return processMarkdownPage(filePath, markdown)
      .then(output => {
        expect(output.hideExample).toBe(true);
        expect(output.title).toBeUndefined();
      });
  });

  it('should prepend rootPath', () => {
    return processMarkdownPage(filePath, markdown, '1.0')
      .then(output => {
        expect(output.referenceURI).toEqual('1.0/boom-bap');
      });
  });

  it('should set reference', () => {
    return processMarkdownPage(filePath, markdown, '1.0')
      .then(output => {
        expect(output.reference).toEqual('boom-bap');
      });
  });

  it('should clear referenceURI for index.md', () => {
    return processMarkdownPage(filePath.replace('boom-bap.md', 'index.md'), markdown)
      .then(output => {
        expect(output.referenceURI).toEqual('');
      });
  });

  it('should replace {{root}}', () => {
    const markdown2 = markdown + '{{root}}';
    return processMarkdownPage(filePath, markdown2, 'foo')
      .then(output => {
        expect(output.description.match(/foo/).length).toEqual(1);
      });
  });
});
