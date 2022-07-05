import join from 'url-join';
import { removePositioning } from './casingUtils';

export function githubUrl(pathname = '') {
  const ghUrl = 'https://github.com/CMSgov/design-system';
  return join(ghUrl, pathname);
}

export function makePageUrl(fileRelativePath) {
  let pageUrl = removePositioning(fileRelativePath);
  return `/${pageUrl.replace('.mdx', '/')}`;
}

export function getQueryParamValue(value) {
  let query = {};
  if (typeof window !== 'undefined') {
    location.search
      .substr(1)
      .split('&')
      .map((item) => {
        query[item.split('=')[0]] = item.split('=')[1];
      });
    if (query[value]) {
      return query[value];
    } else {
      return null;
    }
  } else {
    return null;
  }
}
