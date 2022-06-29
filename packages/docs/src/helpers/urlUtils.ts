import join from 'url-join';
import { removePositioning } from './casingUtils';

export function githubUrl(pathname = '') {
  const ghUrl = 'https://github.com/CMSgov/design-system';
  return join(ghUrl, pathname);
}

export function makePageUrl(fileRelativePath) {
  let pageUrl = removePositioning(fileRelativePath);
  return `/${pageUrl}/`;
}
