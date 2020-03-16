import githubUrl from '../githubUrl';

describe('githubUrl', () => {
  it('return repo URL', () => {
    window.githubUrlBase = 'https://github.com/CMSgov/design-system';
    expect(githubUrl()).toBe('https://github.com/CMSgov/design-system');
  });

  it('return repo URL with path', () => {
    window.githubUrlBase = 'https://github.com/CMSgov/design-system';
    expect(githubUrl('foo')).toBe('https://github.com/CMSgov/design-system/foo');
  });
});
