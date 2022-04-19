import join from 'url-join';

const cmsdsGithubUrl = 'https://github.com/CMSgov/design-system';

function githubUrl(pathname = '') {
  const ghUrl = process.env.githubUrl || cmsdsGithubUrl;
  return join(ghUrl, pathname);
}

export default githubUrl;
