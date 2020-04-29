import reactPathFromSource from '../reactPathFromSource';

describe('reactPathFromSource', () => {
  const sourcePath = 'foo/packages/core/src/components/Button/Button.scss';

  it('transforms path', () => {
    const path = reactPathFromSource(sourcePath, 'ButtonGroup');

    expect(path).toBe('core/src/components/Button/ButtonGroup');
  });

  it('returns component path', () => {
    const path = reactPathFromSource(sourcePath, 'core/src/components/Foo/FooBar');

    expect(path).toBe('core/src/components/Foo/FooBar');
  });
});
