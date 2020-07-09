const replaceTemplateTags = require('../replaceTemplateTags');

describe('replaceTemplateTags', () => {
  let markup;

  beforeEach(() => {
    markup = '{{root}}/bar';
  });

  describe('rootPath is a string', () => {
    it('replaces {{root}} with empty string', () => {
      expect(replaceTemplateTags(markup, { rootPath: '' })).toBe('/bar');
    });

    it('replaces {{root}} with rootPath, formatted as a relative URL', () => {
      expect(replaceTemplateTags(markup, { rootPath: '1.0.0' })).toBe('/1.0.0/bar');
    });
  });
});
