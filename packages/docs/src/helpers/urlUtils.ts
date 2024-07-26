import join from 'url-join';
import { withPrefix } from 'gatsby';
import { LocationInterface } from './graphQLTypes';

export function makeGithubUrl(pathname = '') {
  const ghUrl = 'https://github.com/CMSgov/design-system';
  return join(ghUrl, pathname);
}

const sketchBoardIds = {
  core: 'bffbfeb1-59a1-48dd-842f-a1e0566e457f',
  healthcare: '4da17849-4fab-4684-b2ef-fe63ba7ff10b',
  medicare: 'c242aee5-25e9-4684-ac7d-0f084ffeb782',
};

// creates links to sketch assets
// in sketch, we are using the art board in 'inspect' mode for each component
export function makeSketchUrl(pathname = '', theme) {
  const sketchUrl = 'https://www.sketch.com/s/';
  return join(sketchUrl, sketchBoardIds[theme], 'a', pathname, '#Inspect');
}

const figmaDocumentIdAndLibraryName = {
  // cmsgov is not currently used; to do so update gql in `components/page-templates/InfoPage.tsx`
  cmsgov: 'p2z3UL1N4fP10z47F7am1v/CMS-Design-System-Library',
  core: 'OYkYP4pC9jwS7j2qafwmiv/CMS-Global-Library',
  healthcare: '4Z66yMTWr5rlEhYBvLx58j/HCgov-Design-System-Library',
  medicare: 'gwpXhAmk5noyDiDEs9DXCq/Mgov-Design-System-Library',
};

// creates links to Figma pages in specific libaries based on theme
export function makeFigmaUrl(nodeId = '', theme) {
  const figmaURL = 'https://www.figma.com/design/';
  return join(figmaURL, figmaDocumentIdAndLibraryName[theme], '?node-id=', nodeId);
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
      window.history.replaceState({}, '', url);
    }
  }
}
