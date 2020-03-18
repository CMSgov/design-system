import reactPathFromSource from '../reactPathFromSource';

describe('reactPathFromSource', () => {
  const sourcePath = 'foo/packages/design-system/src/components/Button/Button.scss';

  it('transforms path', () => {
    const path = reactPathFromSource(sourcePath, 'ButtonGroup');

    expect(path).toBe('design-system/src/components/Button/ButtonGroup');
  });

  it('returns component path', () => {
    const path = reactPathFromSource(sourcePath, 'design-system/src/components/Foo/FooBar');

    expect(path).toBe('design-system/src/components/Foo/FooBar');
  });
});
