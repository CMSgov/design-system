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

/**
 * setQueryParam
 * @param name - name of query parameter
 * @param value - value of query parameter
 * @param reloadPage - describes if the page should reload after update, or update quietly.
 */
export function setQueryParam(name: string, value: string, reloadPage: boolean = false) {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.toString());
    url.searchParams.set(name, value);

    if (reloadPage) {
      window.location.search = url.searchParams.toString();
    } else {
      window.history.pushState({}, '', url);
    }
  }
}
