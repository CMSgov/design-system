import join from 'url-join';

export function githubUrl(pathname = '') {
  const ghUrl = 'https://github.com/CMSgov/design-system';
  return join(ghUrl, pathname);
}

export function makePageUrl(fileRelativePath) {
  return `/${fileRelativePath.replace('.mdx', '/')}`;
}
