const uniquePages = require('../uniquePages');

describe('uniquePages', () => {
  it('removes duplicate non-theme section', () => {
    const sections = uniquePages([
      {
        reference: 'foo',
        header: 'Core foo',
        source: { path: 'packages/design-system/foo.js' }
      },
      {
        reference: 'foo',
        header: 'Theme foo',
        source: { path: 'packages/themes/abc/foo.js' }
      },
      {
        reference: 'bar',
        header: 'Bar',
        source: { path: 'packages/design-system/bar.js' }
      }
    ]);

    expect(sections.length).toBe(2);
    expect(sections[0].header).toBe('Theme foo');
  });
});
