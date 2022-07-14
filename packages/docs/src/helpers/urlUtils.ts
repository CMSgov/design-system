import join from 'url-join';

export function githubUrl(pathname = '') {
  const ghUrl = 'https://github.com/CMSgov/design-system';
  return join(ghUrl, pathname);
}

export function makePageUrl(fileRelativePath) {
  return `/${fileRelativePath.replace('.mdx', '/')}`;
}

/**
 * Gets value of query parameter from current browser URL
 *
 * @param {string} value - Query string key to search for
 * @returns Value of key if found, null if not
 */
export function getQueryParamValue(value: string) {
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
