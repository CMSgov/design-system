const uniquePages = require('../generatePages/uniquePages');

describe('uniquePages', () => {
  it('removes duplicate non-child ds section', () => {
    const sections = uniquePages([
      {
        reference: 'foo',
        header: 'Child DS foo',
        source: { path: 'packages/core/foo.js' },
      },
      {
        reference: 'foo',
        header: 'Core foo',
        source: { path: 'node_modules/@cmsgov/design-system/abc/foo.js' },
      },
      {
        reference: 'bar',
        header: 'Child DS bar',
        source: { path: 'packages/core/bar.js' },
      },
    ]);

    expect(sections.length).toBe(2);
    expect(sections[0].header).toBe('Child DS foo');
  });
});
