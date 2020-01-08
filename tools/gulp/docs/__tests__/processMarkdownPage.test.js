const processMarkdownPage = require('../processMarkdownPage');

describe('processMarkdownPage', () => {
  let filePath;

  beforeEach(() => {
    filePath = '/cms/design/packages/docs/src/pages/boom-bap.md';
  });

  describe('basic page', () => {
    let markdown;

    beforeEach(() => {
      markdown = `---
title: Foo
hide-example: true
---
**Bar**`;
    });

    it('converts Markdown to HTML', () => {
      return processMarkdownPage(filePath, markdown).then(output => {
        expect(output.description.match(/<strong>/).length).toBe(1);
      });
    });

    it('sets source.path relative to project directory', () => {
      return processMarkdownPage(filePath, markdown).then(output => {
        const relativePath = filePath.match(/packages\/[a-zA-Z.\-_/]+/)[0];
        expect(output.source.path).toBe(relativePath);
        expect(output.source.path).toMatch(/\.md$/);
      });
    });

    it('sets required page props', () => {
      return processMarkdownPage(filePath, markdown).then(output => {
        expect(output.depth).toBe(1);
        expect(output.header).toBe('Foo');
        expect(output.description).toBe('<p><strong>Bar</strong></p>\n');
        expect(output.markup).toBe('');
        expect(output.referenceURI).toBe('boom-bap');
        expect(output.weight).toBe(0);
      });
    });

    it('processes flags', () => {
      return processMarkdownPage(filePath, markdown).then(output => {
        expect(output.hideExample).toBe(true);
        expect(output.title).toBeUndefined();
      });
    });

    it('has no nested sections', () => {
      return processMarkdownPage(filePath, markdown).then(output => {
        expect(output.sections).toBeUndefined();
      });
    });

    it('prepends rootPath', () => {
      return processMarkdownPage(filePath, markdown, '1.0').then(output => {
        expect(output.referenceURI).toBe('1.0/boom-bap');
      });
    });

    it('sets reference property', () => {
      return processMarkdownPage(filePath, markdown, '1.0').then(output => {
        expect(output.reference).toBe('boom-bap');
      });
    });

    it('clears referenceURI for index.md', () => {
      return processMarkdownPage(filePath.replace('boom-bap.md', 'index.md'), markdown).then(
        output => {
          expect(output.referenceURI).toBe('');
        }
      );
    });

    it('replaces {{root}}', () => {
      const markdown2 = markdown + '{{root}}';
      return processMarkdownPage(filePath, markdown2, 'foo').then(output => {
        expect(output.description.match(/foo/).length).toBe(1);
      });
    });
  });

  describe('page with tabs', () => {
    let markdown;

    beforeEach(() => {
      markdown = `---
title: Foo
usage: |
  # Hello world
---
Guidance`;
    });

    it('sets usage as top-level description', () => {
      return processMarkdownPage(filePath, markdown).then(output => {
        expect(output.description.trim()).toBe('<h1 id="hello-world">Hello world</h1>');
      });
    });

    it('excludes usage from page properties', () => {
      return processMarkdownPage(filePath, markdown).then(output => {
        expect(output.usage).toBeUndefined();
      });
    });

    it('adds child section with guidance', () => {
      return processMarkdownPage(filePath, markdown).then(output => {
        const section = output.sections[0];
        expect(output.sections.length).toBe(1);
        expect(section.depth).toBe(output.depth + 1);
        expect(section.header).toBe('---');
        expect(section.description.trim()).toBe('<p>Guidance</p>');
        expect(section.reference).toMatch(/[a-z]\.guidance$/);
        expect(section.referenceURI).toMatch(/[a-z]\/guidance$/);
      });
    });
  });
});
