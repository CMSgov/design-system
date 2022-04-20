import join from 'url-join';

function githubUrl(pathname = '') {
  const ghUrl = 'https://github.com/CMSgov/design-system';
  return join(ghUrl, pathname);
}

export default githubUrl;
