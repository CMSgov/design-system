const replaceTemplateTags = require('../replaceTemplateTags');

describe('replaceTemplateTags', () => {
  let markup;

  beforeEach(() => {
    markup = '{{root}}/bar';
  });

  it('replaces {{root}} with empty string', () => {
    expect(replaceTemplateTags(markup, { rootPath: '' })).toBe('/bar');
  });
  it('replaces {{root}} with rootPath, formatted as a relative URL', () => {
    expect(replaceTemplateTags(markup, { rootPath: '1.0.0' })).toBe('/1.0.0/bar');
  });
  it('replaces {{npm}} with npmPackage', () => {
    expect(replaceTemplateTags('import {{npm}}', { npmPackage: '@cmsgov/package' })).toBe(
      'import @cmsgov/package'
    );
  });
  it('replaces {{github}} with githubUrl', () => {
    expect(replaceTemplateTags('{{github}}', { githubUrl: 'www.github.com' })).toBe(
      'www.github.com'
    );
  });
  it('replaces {{name}} with name', () => {
    expect(replaceTemplateTags('{{name}}', { name: 'Design System' })).toBe('Design System');
  });
});
