import componentPathFromSource from '../componentPathFromSource';

describe('componentPathFromSource', () => {
  const sourcePath = 'foo/packages/core/src/components/Button/Button.scss';

  it('transforms path', () => {
    const path = componentPathFromSource(sourcePath, 'ButtonGroup');

    expect(path).toBe('core/src/components/Button/ButtonGroup');
  });

  it('returns component path', () => {
    const path = componentPathFromSource(
      sourcePath,
      'core/src/components/Foo/FooBar'
    );

    expect(path).toBe('core/src/components/Foo/FooBar');
  });
});
