import githubUrl from '../githubUrl';

describe('githubUrl', () => {
  it('return repo URL', () => {
    expect(githubUrl()).toBe('https://github.com/CMSgov/design-system');
  });

  it('return repo URL with path', () => {
    expect(githubUrl('foo')).toBe(
      'https://github.com/CMSgov/design-system/foo'
    );
  });
});
