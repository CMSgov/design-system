import reactPathFromSource from '../reactPathFromSource';

describe('reactPathFromSource', () => {
  const sourcePath = 'foo/packages/cmsds/src/components/Button/Button.scss';

  it('transforms path', () => {
    const path = reactPathFromSource(sourcePath, 'ButtonGroup');

    expect(path).toBe('cmsds/src/components/Button/ButtonGroup');
  });

  it('returns component path', () => {
    const path = reactPathFromSource(sourcePath, 'cmsds/src/components/Foo/FooBar');

    expect(path).toBe('cmsds/src/components/Foo/FooBar');
  });
});
