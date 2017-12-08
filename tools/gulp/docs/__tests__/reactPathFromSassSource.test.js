import reactPathFromSassSource from '../reactPathFromSassSource';

describe('reactPathFromSassSource', () => {
  const sourcePath = 'foo/packages/core/src/components/Button/Button.scss';

  it('transforms path', () => {
    const path = reactPathFromSassSource(sourcePath, 'ButtonGroup');

    expect(path).toBe('core/src/components/Button/ButtonGroup');
  });

  it('returns component path', () => {
    const path = reactPathFromSassSource(
      sourcePath,
      'core/src/components/Foo/FooBar'
    );

    expect(path).toBe('core/src/components/Foo/FooBar');
  });
});
