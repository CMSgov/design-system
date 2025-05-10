import join from 'url-join';
import { withPrefix } from 'gatsby';
import { LocationInterface } from './graphQLTypes';

export function makeGithubUrl(pathname = '') {
  const ghUrl = 'https://github.com/CMSgov/design-system';
  return join(ghUrl, pathname);
}

const figmaDocumentIdAndLibraryName = {
  cmsgov: 'p2z3UL1N4fP10z47F7am1v/CMS-Design-System-Library',
  core: 'OYkYP4pC9jwS7j2qafwmiv/CMS-Global-Library',
  healthcare: '4Z66yMTWr5rlEhYBvLx58j/HCgov-Design-System-Library',
  medicare: 'gwpXhAmk5noyDiDEs9DXCq/Mgov-Design-System-Library',
};

// creates links to Figma pages in specific libaries based on theme
export function makeFigmaUrl(nodeId = '', theme) {
  const figmaURL = 'https://www.figma.com/design/';
  return join(figmaURL, figmaDocumentIdAndLibraryName[theme], `?node-id=${nodeId}`);
}

// creates links to storybook story
export function makeStorybookUrl(storyId, theme, storyType = 'story') {
  return withPrefix(`/storybook/?path=/${storyType}/${storyId}&globals=theme:${theme}`);
}

export function makePageUrl(fileRelativePath, location: LocationInterface) {
  return join(
    '/',
    fileRelativePath.replace('index.mdx', '').replace('.mdx', ''),
    '/',
    location.search
  );
}

/**
 * Gets value of query parameter from current browser URL
 *
 * @param {string} value - Query string key to search for
 * @returns Value of key if found, null if not
 */
export function getQueryParamValue(value: string): string | null {
  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(value);
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
      window.history.replaceState({}, '', url);
    }
  }
}

/**
 * isProduction
 * @returns boolean - true if we are on prod, aka design.cms.gov, and false otherwise
 */
export function isProduction(): boolean {
  if (!window) {
    return process.env.NODE_ENV === 'production';
  }
  return location.hostname == 'design.cms.gov';
}
